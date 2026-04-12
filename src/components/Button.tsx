import Link from "next/link";
import Image from "next/image";

interface ButtonData {
  href?: string;
  label?: string;
  showLabel?: boolean;
  primary?: boolean;
  showIcon?: boolean;
  icon?: string;
  style?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  href,
  label,
  showLabel=false,
  icon = "",
  primary = false,
  showIcon = false,
  style = "",
  onClick,
  type = "button",
}: ButtonData) {
  const className = `flex cursor-pointer gap-2 ${primary ? "bg-(--color-normal) hover:bg-(--color-normal-hover) text-white" : "bg-white hover:bg-(--color-light) text-(--color-normal) border border-(--color-normal)"} px-4 py-2 2xl:px-6 2xl:py-3 rounded-4xl transition-all duration-150 justify-center items-center font-medium text-[14.5px] max-sm:text-[12px] 2xl:text-[20px]`;

  if (onClick || !href) {
    return (
      <button type={type} onClick={onClick} className={className}>
        <Image
          src={`/${icon}`}
          alt="icon"
          width={18}
          height={18}
          className={`${showIcon ? "block" : "hidden"} 2xl:w-7`}
        />
        <span className={`${showLabel} ? "block": "hidden"`}>{label}</span>
      </button>
    );
  }

  return (
    <Link href={href} scroll={true} className={className}>
      <Image
        src={`/${icon}`}
        alt="icon"
        width={18}
        height={18}
        className={`${showIcon ? "block" : "hidden"} 2xl:w-7`}
      />
      <span className={`${showLabel} ? "block": "hidden"`}>{label}</span>
    </Link>
  );
}

