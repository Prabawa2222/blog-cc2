import React from "react";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border-4 border-black text-black hover:text-white hover:bg-slate-700 hover:border-none rounded-full p-4 py-1 flex items-center justify-center ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
