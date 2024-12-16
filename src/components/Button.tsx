"use client";

import Link from "next/link";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  href,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const commonStyles = `border-4 border-black transition-all text-black hover:text-white hover:bg-slate-700 hover:border-slate-700 rounded-full p-4 py-1 hover:py-2 flex items-center justify-center ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return href ? (
    <Link href={href}>
      <a className={commonStyles}>{title}</a>
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={commonStyles}
    >
      {title}
    </button>
  );
};

export default Button;
