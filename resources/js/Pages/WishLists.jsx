import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import WishlistModal from "../Components/WishlistModal.jsx";
import ConfirmationModal from "../Components/ConfirmationModal.jsx";

export default function WishLists({ auth, wishlists }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, reset, clearErrors } = useForm({
        name: "",
        item: "",
    });

    const { flash } = usePage().props;
    const { errors } = usePage().props;

    const openModal = (id) => {
        clearErrors();
        var selectedItem = wishlists.filter((item) => item.id === id);
        setData(selectedItem[0] || []);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        clearErrors();
        setIsModalOpen(false);
        // setSelectedItem([]);
    };

    const storeWishlist = (e) => {
        e.preventDefault();
        const method = data.id ? "put" : "post";
        const url = data.id ? `/wishlist/${data.id}` : "/wishlist";

        router[method](url, data, {
            onSuccess: () => {
                reset();
                clearErrors();
                closeModal();
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Wishlist
                </h2>
            }
        >
            <Head title="WishList" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 ">
                            {flash.message && (
                                <div className="py-2 px-4 rounded-md bg-green-300 text-center mb-6">
                                    {flash.message}
                                </div>
                            )}
                            <div className="flex justify-end gap-2">
                                <button
                                    className="mb-2 px-4 py-2 bg-blue-600 text-white rounded"
                                    onClick={() => openModal()}
                                >
                                    Create
                                </button>
                            </div>
                            {wishlists.length === 0 && (
                                <div className="text-center text-gray-500 rounded border bg-gray-200 py-2">
                                    No Wishlists found.
                                </div>
                            )}
                            {wishlists.length > 0 && (
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b">
                                                Name
                                            </th>
                                            <th
                                                className="px-4 py-2 border-b"
                                                colSpan={2}
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishlists.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-2 border-b text-center">
                                                    {item.name}
                                                </td>
                                                <td className="px-4 py-2 border-b text-center">
                                                    <button
                                                        className="text-blue-500 hover:text-blue-700 mx-1"
                                                        onClick={() =>
                                                            openModal(item.id)
                                                        }
                                                    >
                                                        <HiPencilAlt
                                                            size={20}
                                                        />
                                                    </button>
                                                    <ConfirmationModal
                                                        id={item.id}
                                                        url={"/wishlist/"}
                                                        onConfirm={() => {
                                                            reset();
                                                            closeModal();
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <WishlistModal
                show={isModalOpen}
                onClose={closeModal}
                data={data}
                setData={setData}
                onSubmit={storeWishlist}
                errors={errors}
            />
        </AuthenticatedLayout>
    );
}
