import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const MessageDialog = ({ show, type, message, onClose }) => {
    if (!show) return null;

    const Icon = type === 'success' ? FaCheckCircle : FaExclamationCircle;
    const textColor = type === 'success' ? 'text-green-500' : 'text-red-500';

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-30" />

            <div className="bg-white rounded-lg p-6 md:p-8 lg:p-10 lg:max-w-md xl:max-w-lg relative">
                <button onClick={onClose} className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-700">
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

                <div>
                    <p className={`text-lg font-bold ${textColor}`}>
                        {type === 'success' ? (
                            <span className="flex items-center">
                <Icon className="mr-2" />
                Success
              </span>
                        ) : (
                            <span className="flex items-center">
                <Icon className="mr-2" />
                Error
              </span>
                        )}
                    </p>
                    <p className="text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default MessageDialog;
