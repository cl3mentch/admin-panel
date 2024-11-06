"use client";
import { useMediaQuery } from "react-responsive";
import { Toaster } from "sonner";

const ToasterComponent = () => {
  const isXl = useMediaQuery({ query: "(min-width: 1280px)" });

  return (
    <Toaster
      richColors
      position={isXl ? "bottom-right" : "top-center"}
      expand={isXl ? true : false}
    />
  );
};

export default ToasterComponent;
