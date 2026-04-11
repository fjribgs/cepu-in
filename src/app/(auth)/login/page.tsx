import Image from "next/image"
import Button from "@/components/Button"
import Link from "next/link"

export default function Login() {
    return (
        <div className="flex relative p-4 gap-12 h-screen items-center justify-center">
            <div className="absolute text-start w-full top-10 left-10 max-sm:left-5">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/auth/back.svg" width={30} height={30} alt="Back"/>
                        Kembali
                    </Link>
                </div>
            
            <div className="flex flex-col justify-center items-center w-full gap-10 mx-40">

                <div className="flex flex-col text-center text-(--color-normal) gap-1.5">
                    <h1 className="font-nunito font-bold text-5xl 2xl:text-6xl">Login</h1>
                    <p className="font-inter font-light text-xl">Masukkan kredensial Anda</p>
                </div>

                <form action='' className="flex flex-col gap-3 w-full">
                    <input type="text" name="username" placeholder="Username" className="bg-(--color-light) rounded-[100px] py-2 2xl:py-3.5 px-4 2xl:px-6 placeholder:text-sm placeholder:font-inter
                    2xl:placeholder:text-lg"/>
                    <input type="text" name="password" placeholder="Password" className="bg-(--color-light) rounded-[100px] py-2 2xl:py-3.5 px-4 2xl:px-6 placeholder:text-sm placeholder:font-inter
                    2xl:placeholder:text-lg"/>
                </form>

                <div className="w-full">
                    <Button href="" label="Masuk" primary icon="auth/login-icon.svg" showIcon style="px-20"/>
                </div>
            </div>

            <div className="flex items-end justify-end h-full w-full max-md:hidden">
                <Image src="/auth/login-img.webp" width={500} height={1000} alt="" 
                    className="rounded-2xl h-full object-cover w-full"/>
            </div>
        </div>
    )
}