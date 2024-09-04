import React, { useState } from 'react';

function SelectWishlistModal({ isOpen, onClose, wishlists }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg w-1/3">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-medium">Select a Wishlist</h2>
                    <button
                        className="absolute top-2 right-2 text-gray-500"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    <select className="w-full border-gray-300 rounded-md">
                        {wishlists.map((wishlist, index) => (
                            <option key={index} value={wishlist.id}>
                                {wishlist.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Modal;
