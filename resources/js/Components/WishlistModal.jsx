import React from 'react';
import Modal from '../Components/Modal.jsx';

export default function WishlistModal({ show, onClose, data, setData, onSubmit, errors }) {
    return (
        <Modal show={show} maxWidth="md">
            {errors.error && (
                <div className="py-2 px-4 rounded-md bg-red-300 text-center mb-6">
                    {errors.error}
                </div>
            )}
            <form className="max-w-sm mx-auto py-4" onSubmit={onSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setData("name", e.target.value)}
                        value={data.name}
                        id="name"
                        className={
                            errors.name
                                ? " border border-red-900 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }
                        placeholder="Enter List Name"
                        required
                    />

                    {errors.name && (
                        <small className="text-red-900">{errors.name}</small>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Description
                    </label>
                    <textarea
                        onChange={(e) => setData("description", e.target.value)}
                        value={data.description}
                        id="description"
                        className={
                            errors.description
                                ? "border border-red-900 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }
                        placeholder="Enter List Description"
                    />
                    {errors.description && (
                        <small className="text-red-900">
                            {errors.description}
                        </small>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Submit
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </form>
        </Modal>
    );
}
