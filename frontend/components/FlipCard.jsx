"use client";

import { useState } from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";

export default function FlipCard({ 
    name, 
    position, 
    description,
    imageUrl 
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
          type="button"
          onClick={() => setIsFlipped((prev) => !prev)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative h-96 w-80 focus:outline-none transition-all duration-300"
          style={{
            filter: isHovered
              ? "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.3))"
              : "none",
            transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          }}
        >
            <div
                className="w-83 [height:25rem] rounded-1xl"
                style={{
                    perspective: "1000px",
                }}
        >
                <div
                    className="relative w-full h-full rounded-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                >
                   
                {/* Front side */}
                    <div
                        className="absolute inset-0 rounded-1xl bg-[#F9F7FF] shadow-2xl"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            opacity: isFlipped ? 0 : 1,
                            transition: "transform 0.6s ease, opacity 0.6s ease",
                        }}
                    >

                        <div className="h-full w-full overflow-hidden rounded-2xl">
                            {imageUrl && (
                                <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 px-6 pb-24">
                                    <div className="relative w-full [height:28rem]">
                                        <Image
                                            src={imageUrl}
                                            alt={name}
                                            fill
                                            className="object-cover rounded-1xl [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.3))]"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="absolute bottom-4 left-0 right-0 text-center">
                                <p className="text-3xl font-black text-black [filter:drop-shadow(0_0_3px_rgba(230,220,250,0.9))]">
                                    {name}
                                </p>
                                <p className="text-3xl font-black text-black [filter:drop-shadow(0_0_3px_rgba(230,220,250,0.9))]">
                                    {position}
                                </p>
                            </div>
                        </div>
                    </div>


                {/* Back side */}
                    <div 
                        className="absolute inset-0 flex items-center justify-center p-4 rounded-1xl shadow-2xl bg-[#F0E7FF]" 
                        style={{ 
                            backfaceVisibility: "hidden", 
                            transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
                            opacity: isFlipped ? 1 : 0,
                            transition: "transform 0.6s ease, opacity 0.6s ease",
                        }}
                    >

                        <p className="text-lg font-bold text-black text-center leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </button>
    );
}

