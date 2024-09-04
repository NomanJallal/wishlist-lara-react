import React, { useState } from "react";
import WishlistItems from "@/Components/WishlistItems";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

function WishlistDetails({ auth, wishlist_detail }) {
    const { flash } = usePage().props;
    const { errors } = usePage().props;
    // State to manage the selected tab and its index
    const [selectedTab, setSelectedTab] = useState(
        Object.keys(wishlist_detail)[0]
    );
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Wishlist Details
                </h2>
            }
        >
            <Head title="Wishlist Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {Object.keys(wishlist_detail).length == 0 && (
                            <div className="p-6">
                                <p className="text-gray-500 text-center">
                                    No wishlist available.
                                </p>
                            </div>
                        )}
                        {Object.keys(wishlist_detail).length > 0 && (
                            <div className="p-6">
                                {flash.message && (
                                    <div className="py-2 px-4 rounded-md bg-green-300 text-center mb-6">
                                        {flash.message}
                                    </div>
                                )}

                                {/* Tabs */}
                                <div className="flex space-x-4 border-b border-gray-200">
                                    {Object.values(wishlist_detail).map(
                                        (wishlist) => (
                                            <button
                                                key={wishlist.id}
                                                onClick={() =>
                                                    setSelectedTab(wishlist.id)
                                                }
                                                className={`py-2 px-4 text-sm font-medium ${
                                                    selectedTab == wishlist.id
                                                        ? "border-b-2 border-blue-500 text-blue-600"
                                                        : "text-gray-500 hover:text-gray-700"
                                                }`}
                                            >
                                                {wishlist.name}
                                            </button>
                                        )
                                    )}
                                </div>

                                {/* Tab Content */}
                                <div className="mt-6">
                                    {wishlist_detail[selectedTab] &&
                                    wishlist_detail[selectedTab].items.length >
                                        0 ? (
                                        <div className="flex flex-wrap justify-center gap-4 p-4">
                                            {wishlist_detail[
                                                selectedTab
                                            ].items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                                                >
                                                    <WishlistItems
                                                        item={item}
                                                        can_add={false}
                                                        can_remove={true}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center mt-4">
                                            No items available in this wishlist.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default WishlistDetails;
