import { ThemeContext } from "@src/contexts/ThemeContext";
import { useContext } from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export default {
//   position: "top-right",
//   autoClose: 2500,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: false,
//   pauseOnFocusLoss: false,
//   draggable: true,
// } as ToastContainerProps;

export function ToastMessage() {
  const { theme } = useContext(ThemeContext);

  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      draggable={true}
      toastStyle={{
        backgroundColor: theme === "dark" ? "#303945" : "#ffffff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
      toastClassName="rounded-lg shadow-lg"
    />
  );
}
