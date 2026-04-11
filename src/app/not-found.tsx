import './globals.css';
import Navbar from '@/components/Navbar';

export default function NotFound() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col align-center justify-center text-center w-screen h-screen text-(--color-normal)">
                <h1 className='font-bold font-nunito text-8xl 2xl:text-[130px]'>404</h1>
                <p className='font-normal font-inter text-black 2xl:text-xl'>Halaman Tidak Ditemukan :(</p>
            </div>
        </div>
    )
}