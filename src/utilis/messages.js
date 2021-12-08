const {toast} = require("react-toastify");

export const successMessage = (text) => {
    toast.success(text, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme:'colored',
        limit: 3,
        progress: undefined,
    });
}
export const errorMessage = (text) => {
    toast.error(text, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme:'colored',
        limit: 3,
        progress: undefined,
    });
}