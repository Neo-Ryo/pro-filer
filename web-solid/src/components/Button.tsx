import { JSX } from "solid-js";

export default function Button(props: {
  child: string | JSX.Element;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}) {
  const { child, onClick, className, type, disabled } = props;
  return (
    <button
      class={`px-4 py-1 border border-primBtn text-primBtn rounded-md hover:bg-primBtn hover:text-mainDark transition ease-in ${className}`}
      onClick={onClick ? onClick : () => undefined}
      type={type}
      disabled={disabled ? true : false}
    >
      {child}
    </button>
  );
}
