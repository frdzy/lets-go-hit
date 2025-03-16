import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import classnames, { padding } from 'tailwindcss-classnames';

interface Props {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
}

export const PopoverDialog = ({ children, onClose }: Props) => {
  const [open, setOpen] = useState(true);
  console.log('state: open', open);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <button
              style={{
                display: 'block',
                right: 16,
                top: 16,
                position: 'absolute',
              }}
              className={classnames(padding('p-1'))}
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                width={24}
                height={24}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {children}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
