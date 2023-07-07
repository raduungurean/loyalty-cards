import React from 'react';
import { Dialog } from '@headlessui/react';
import CloseDialogButton from './CloseDialogButton';

const WrapperDialog = ({ children, onClose, open, title }) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 overflow-y-auto"
      open={open}
      onClose={onClose}
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-4 sm:mx-auto w-full lg:w-1/2 rounded-lg bg-white p-8">
            <div className="flex justify-end">
              <CloseDialogButton onClick={onClose} />
            </div>
            <Dialog.Title className="text-xl text-center">{title}</Dialog.Title>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default WrapperDialog;
