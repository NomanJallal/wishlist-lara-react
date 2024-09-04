import React, { useState } from "react";
import { router } from "@inertiajs/react";
import ConfirmationModal from "../Components/ConfirmationModal.jsx";

function WishlistItems({ item, wishlists, can_add, can_remove }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWishlist, setSelectedWishlist] = useState([]);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSelectChange = (e) => {
        setSelectedWishlist(e.target.value);
    };

    const handleSubmit = () => {
        const data = {
            wishlist_id: selectedWishlist,
            item_id: item.id,
        };

        const url = `/assign-items`;

        router.post(url, data, {
            onSuccess: () => {
                closeModal();
            },
            onError: (error) => {
                // Handle errors if necessary
                console.error(error);
            },
        });
    };
    const filteredWishlists = can_add
        ? wishlists.filter((wishlist) => {
              return !item.wish_lists.some(
                  (wish_list) => wish_list.id === wishlist.id
              );
          })
        : [];

    return (
        <>
            <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                    className="w-full h-32 object-cover"
                    src={item.image}
                    alt={item.name}
                />
                <div className="p-3">
                    <h2 className="text-lg font-medium text-gray-800 mb-1 truncate flex">
                        {item.name}
                        {can_remove && (
                            <div className="flex ml-auto">
                                <ConfirmationModal
                                    id={item.id}
                                    url={
                                        "/unassign-item/" +
                                        item.id +
                                        "/" +
                                        item.laravel_through_key
                                    }
                                    onConfirm={() => {
                                        closeRemoveModal;
                                    }}
                                    trash_icon={true}
                                />
                            </div>
                        )}
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                        {item.wish_lists &&
                            item.wish_lists.map((wish_list) => (
                                <div class="flex select-none items-center whitespace-nowrap rounded-lg bg-gradient-to-tr bg-green-700 py-1.5 px-2 font-sans text-xs font-bold uppercase text-white">
                                    <span class="">{wish_list.name}</span>

                                    <ConfirmationModal
                                        id={item.id}
                                        url={
                                            "/unassign-item/" +
                                            item.id +
                                            "/" +
                                            wish_list.id
                                        }
                                        onConfirm={() => {
                                            closeRemoveModal;
                                        }}
                                    />
                                </div>
                            ))}
                        {can_add && filteredWishlists.length > 0 && (
                            <button
                                className="bg-blue-500 text-white text-sm py-1 px-3 rounded hover:bg-blue-600"
                                onClick={openModal}
                            >
                                + Add to Wishlist
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg shadow-lg w-1/3">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-medium">
                                Select a Wishlist
                            </h2>
                            <button
                                className="absolute top-2 right-2 text-gray-500"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            <select
                                className="w-full border-gray-300 rounded-md mb-4"
                                value={selectedWishlist}
                                onChange={handleSelectChange}
                            >
                                <option value="">Select a wishlist</option>
                                {filteredWishlists?.map((wishlist, index) => (
                                    <option key={index} value={wishlist.id}>
                                        {wishlist.name}
                                    </option>
                                ))}
                            </select>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                                <button
                                    className="bg-gray-300 text-gray-800 py-1 px-3 rounded hover:bg-gray-400"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default WishlistItems;
