import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "success" | "error";
    onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);
        return () => {
            clearTimeout(timer);
        };
    },[]);

    const style =
        type === "success"
            ? "bg-green-700 fixed top-4 z-50 p-4 rounded-md text-white max-w-md"
            : "bg-red-700 fixed top-4 z-50 p-4 rounded-md text-white max-w-md";

    return (
        <div className={style}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
