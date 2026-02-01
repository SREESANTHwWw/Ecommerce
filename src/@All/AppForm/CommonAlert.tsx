
import React from "react";

interface CommonAlertProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CommonAlert: React.FC<CommonAlertProps> = ({
  isOpen,
  title = "Confirmation",
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-sm">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-[var(--main-web-color)] cursor-pointer text-white hover:bg-[var(--main-web-color-2)]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonAlert;
