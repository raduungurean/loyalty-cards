import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ClipLoader } from 'react-spinners';

const DeleteDialog = ({ open, onClose, onDelete, progress }) => {
    return (
        <Transition show={open}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-y-auto"
                static
                onClose={() => null}
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    </Transition.Child>

                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="fixed inset-0 flex items-center justify-center">
                            <div className="bg-white rounded-lg p-6 md:p-8 lg:p-10 lg:max-w-md xl:max-w-lg">
                                <div className="flex justify-end">
                                    <button
                                        onClick={onClose}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 cursor-pointer"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 8.586L15.95 2.636a1 1 0 1 1 1.414 1.414L11.414 10l5.95 5.95a1 1 0 1 1-1.414 1.414L10 11.414l-5.95 5.95a1 1 0 1 1-1.414-1.414L8.586 10 2.636 4.05A1 1 0 1 1 4.05 2.636L10 8.586z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <Dialog.Title as="h3" className="text-lg font-bold">
                                        Confirmation
                                    </Dialog.Title>
                                    <Dialog.Description as="p" className="text-sm">
                                        Are you sure you want to delete this card?
                                    </Dialog.Description>
                                </div>
                                <div className="flex justify-end mt-4 space-x-4">
                                    <button
                                        onClick={onDelete}
                                        className={`px-3 py-1 text-white bg-red-500 rounded ${
                                            progress ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        disabled={progress}
                                    >
                                        {progress ? (
                                            <>
                                                <ClipLoader color="#ffffff" size={20} /> Deleting...
                                            </>
                                        ) : (
                                            'Delete'
                                        )}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DeleteDialog;
