"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

interface ToastProps {
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = ({ message }: ToastProps) => {
    setMessage(message);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastPrimitive.Provider swipeDirection="right">
        <ToastPrimitive.Root
          open={open}
          onOpenChange={setOpen}
          className="bg-gray-800 text-white p-4 rounded shadow-lg fixed bottom-4 right-4"
        >
          <ToastPrimitive.Title>{message}</ToastPrimitive.Title>
        </ToastPrimitive.Root>

        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 p-4" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};
