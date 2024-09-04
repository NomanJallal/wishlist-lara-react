
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
import { FaTimes, FaTrash, FaTrashAlt } from "react-icons/fa";

const ConfirmationModal = ({onConfirm, onCancel,url, trash_icon }) => {
    const handleShowConfirmation = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(url, {
                    onSuccess: () => {
                        if (onConfirm) onConfirm();
                    },
                    onError: (error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the item.",
                            icon: "error"
                        });
                    }
                });

                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success"
                });
            } else {
                if (onCancel) onCancel();
            }
        });
    };

    return (
        <button
            className="text-red-500 hover:text-red-700 ml-1"
            onClick={handleShowConfirmation}
        >
            {trash_icon ? <FaTrash size={16} /> : <FaTimes size={16} />}
        </button>
    );
};

export default ConfirmationModal;
