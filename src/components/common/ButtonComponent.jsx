
import { Link } from "react-router-dom";

const ButtonComponent = ({
  children,
  variant = "primary",
  bgColor,
  textColor,
  borderColor,
  icon: Icon,
  iconPosition = "left",
  iconSize = 20,
  size = "[13px]",
  className = "",
  onClick,
  to,
  type = "button",
  disabled = false,
  title,
}) => {
  const variants = {
    primary: {
      bg: "#2878F0",
      text: "#FFFFFF",
      border: "#2878F0",
    },
    secondary: {
      bg: "#FFFFFF",
      text: "#315982",
      border: "#E1EBF7C",
    },
    outline: {
      bg: "transparent",
      text: "#2878F0",
      border: "#2878F0",
    },
    danger: {
      bg: "#DC2626",
      text: "#FFFFFF",
      border: "#DC2626",
    },
    ghost: {
      bg: "transparent",
      text: "#315982",
      border: "transparent",
    },
  };

  const sizes = {
    sm: "px-3 py-2 text-sm gap-2",
    md: "px-5 py-3 text-base gap-2",
    lg: "px-7 py-4 text-lg gap-3",
  };

  const styleVariant = variants[variant] || variants.primary;

  const buttonStyle = {
    backgroundColor: bgColor ?? styleVariant.bg,
    color: textColor ?? styleVariant.text,
    borderColor: borderColor ?? styleVariant.border,
  };

  const buttonClass = `
    inline-flex items-center justify-center
    rounded-lg border-[1px] font-semibold
    transition-all duration-200
    hover:brightness-95
    focus:outline-none focus:ring-2 focus:ring-blue-300
    disabled:cursor-not-allowed disabled:opacity-50
    whitespace-nowrap
    ${sizes[size] || sizes.md}
    ${className}
  `;

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon size={iconSize} aria-hidden="true" />
      )}

      <span>{children}</span>

      {Icon && iconPosition === "right" && (
        <Icon size={iconSize} aria-hidden="true" />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClass}
        style={buttonStyle}
        title={title}
        aria-disabled={disabled}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        tabIndex={disabled ? -1 : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClass}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {content}
    </button>
  );
};

export default ButtonComponent;
