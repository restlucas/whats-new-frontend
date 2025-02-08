import { toast } from "react-toastify";

export const toastConfirmAlert = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const id = toast(
      () => (
        <div className="p-2">
          <h2 className="mb-6">{message}</h2>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => {
                resolve(true);
                toast.dismiss(id);
              }}
              className="bg-emerald-500 text-white rounded-md py-2 px-4 duration-200 hover:bg-emerald-700"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                resolve(false);
                toast.dismiss(id);
              }}
              className="rounded-md py-2 px-4 duration-200 hover:bg-secondary-dark dark:bg-tertiary"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  });
};
