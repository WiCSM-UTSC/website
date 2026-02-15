import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#54528F] w-full mt-auto">
            <div className="px-10 py-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/wicsm_logo_transparent_1.png"
                            alt="WiCSM Logo"
                            width={170}
                            height={170}
                            className="drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)]"
                        />
                        <div>
                            <p className="text-white font-semibold text-6xl">WiCSM</p>
                            <p className="px-2 text-white font-semibold text-lg">
                                Women in Computer Science, Statistics and <br />
                                Mathematics UTSC
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-xl font-semibold text-white pr-40">
                        <a href="#" className="hover:underline">QUICKLINK 1</a>
                        <a href="#" className="hover:underline">QUICKLINK 2</a>
                        <a href="#" className="hover:underline">QUICKLINK 3</a>
                        <a href="#" className="hover:underline">QUICKLINK 4</a>
                    </div>
                </div>
                <div className="w-full h-[4px] bg-white opacity-20 mt-4"></div>
                <div className="flex justify-between items-end mt-4">
                    <p className="text-white px-6 py-6 font-semibold text-sm">
                        WiCSM @ 2026. All rights reserved.
                    </p>
                    <div className="flex gap-4 pr-10 pb-1">
                        <a href="#" className="w-12 h-12 bg-white hover:bg-gray-200 transition-colors rounded"></a>
                        <a href="#" className="w-12 h-12 bg-white hover:bg-gray-200 transition-colors rounded"></a>
                        <a href="#" className="w-12 h-12 bg-white hover:bg-gray-200 transition-colors rounded"></a>
                        <a href="#" className="w-12 h-12 bg-white hover:bg-gray-200 transition-colors rounded"></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}