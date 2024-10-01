import { useState } from "react";

import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from '@mui/icons-material/Clear';

function ChangeUserRoleModal({ role, onClose, onConfirm, loading }) {
  const [userRole, setUserRole] = useState(role);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-55">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-96 p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-400"
          >
            &times;
          </button>

          <div className="flex flex-col gap-5 items-center">
            <p className="text-lg font-semibold">Choose Role </p>
            <span className="flex justify-center gap-10">
              <button
                onClick={() => setUserRole("user")}
                className={`text-base font-semibold  px-4 py-2 rounded ${
                  userRole == "user" ? "bg-secondary" : "bg-gray-900"
                }`}
              >
                User
              </button>
              <button
                onClick={() => setUserRole("admin")}
                className={`text-base font-semibold  px-4 py-2 rounded ${
                  userRole == "admin" ? "bg-secondary" : "bg-gray-900"
                }`}
              >
                Admin
              </button>
            </span>
            <span className="flex justify-center gap-10">
              <button
                disabled={loading}
                onClick={() => onConfirm(userRole)}
                className={`text-sm font-semibold  px-4 py-2 rounded bg-gray-100 text-gray-900 ${
                  loading && "cursor-not-allowed"
                }`}
              >
                <DoneIcon />
              </button>
              <button
                disabled={loading}
                onClick={() => onClose()}
                className={`text-sm font-semibold  px-4 py-2 rounded bg-gray-100 text-gray-900 ${
                  loading && "cursor-not-allowed"
                }`}
              >
                <ClearIcon />
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}


export default ChangeUserRoleModal