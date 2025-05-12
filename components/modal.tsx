import { ReactNode, useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    id?: string;
}

export default function Modal({ isOpen, onClose, children, id }: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div id={id} className="bg-white mx-5 rounded-2xl p-6 w-full max-w-lg shadow-xl relative animate-fade-in">
                <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-3xl" >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}
