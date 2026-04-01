import Link from "next/link"
import Image from "next/image";

interface ButtonData {
    href: string;
    label: string;
    primary?: boolean;
    showIcon?: boolean;
    icon?: string;
}

export default function Button({href, label, icon="", primary=false, showIcon=false}: ButtonData) {
    return (
        <Link href={href} scroll={true} className={`flex gap-2 ${primary ? "bg-(--color-normal) hover:bg-(--color-normal-hover) text-white" : "bg-white hover:bg-(--color-light) text-(--color-normal) border border-(--color-normal)"} px-4 py-2 2xl:px-6 2xl:py-3 rounded-4xl transition-all duration-150 justify-center items-center font-medium text-[14.5px] max-sm:text-[12px] 2xl:text-[20px]`}>
            <Image src={`/${icon}`} alt="icon" width={20} height={20} className={`${showIcon ? "block" : "hidden"} 2xl:w-7`}/>
            {label}
        </Link>
    )
}