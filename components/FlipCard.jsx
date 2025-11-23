"use client";

import { userState } from "react";
import Image from "next/image";

export default function FlipCard({ 
    name = "Name", 
    position = "Position", 
    description = "This person is important for WiCSM.",
    imageUrl 
}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const flip = (event) => {
        event.stopPropagation();
        setIsFlipped((prev) => !prev);
    };

    return (
        <div className="w-full h-72 [perspective:1000px]">
          <div
            className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
            style={{
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
            >
                {/* Front Side */}
                <div className="absolute inset-0 bg-white rounded-3x1 shadow-lg p-5 flex flex-col items-center justify-between [backface-visibility:hidden]">
                    <button 
                        type="button"
                        onClick={flip}
                        className="self-end text-purple-600 text-xl"
                    >   
                        ↻
                    </button>
                

                    {/* Imgage */}
                    <div className="flex flex-col items-start mt-auto">

                        {imageUrl && (
                            <div className= "w-16 h-16 rounded-full overflow-hidden mb-3">
                                <Image
                                    src={imageUrl}
                                    alt={name}
                                    witdth={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                />
                            </div>                            
                        )}
                    
                        {/* Name and Position */}
                        <p className="text-lg font-bold leading-tight">{name}</p>
                        <p className="text-lg font-bold leading-tight">{position}</p>
                    </div>
                </div>

            {/* Back Side */}
            <div className="absolute inset-0 bg-white rounded-3x1 shadow-lg p-5 flex flex-col justify-between [backface-visibility:hideen] [transform:rotateY(180deg)]">
                <button
                    type="button"
                    onClick={flip}
                    className="self-end text-purple-600 text-xl"
                >   
                    ↻
                </button>

                <p className="text-left text-sm text-gray-700">
                    {description}
                </p>
            </div>
        </div>
    </div>
    );

}