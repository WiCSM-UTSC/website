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

    return (
        <button
          type="button"
          onClick={() => setIsFlipped((prev) => !prev)}
          className="group relative h-80 w-80 focus:outline-none"
        >
            <div
                className="w-80 h-80 rounded-2xl"
                style={{ perspective: "1000px" }}
        >
                <div
                    className="relative w-full h-full rounded-2xl [filter:drop-shadow(0_0_9px_rgba(95,45,155,0.8))]"
                    style={{ transformStyle: "preserve-3d" }}
                >
            {/* Front side */}
                    <div 
                        className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg" 
                        style={{ 
                            backfaceVisibility: "hidden",
                            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            opacity: isFlipped ? 0 : 1,
                            transition: "transform 0.6s ease, opacity 0.6s ease",
                        }}
                    >
                        <div className="absolute top-3 right-3 z-20 text-purple-900 [filter:drop-shadow(0_0_4px_rgba(95,45,155,0.7))]">
                            <RotateCw size={20} strokeWidth={3} />
                        </div>

                        {imageUrl && (
                            <Image
                                src={imageUrl}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        )}
                        <div className="absolute bottom-4 left-4 text-left">
                            <p className="text-3xl font-black [filter:drop-shadow(0_0_3px_rgba(230,220,250,0.9))]">
                                {name}
                            </p>
                            <p className="text-3xl font-black [filter:drop-shadow(0_0_3px_rgba(230,220,250,0.9))]">
                                {position}
                            </p>
                        </div>
                    </div>

                {/* Back side */}
                    <div 
                        className="absolute inset-0 flex items-center justify-center p-4 rounded-2xl shadow-lg bg-[#F0E7FF]" 
                        style={{ 
                            backfaceVisibility: "hidden", 
                            transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
                            opacity: isFlipped ? 1 : 0,
                            transition: "transform 0.6s ease, opacity 0.6s ease",
                        }}
                    >
                        <div className="absolute top-3 right-3 z-20 text-purple-900 [filter:drop-shadow(0_0_4px_rgba(95,45,155,0.7))]">
                            <RotateCw size={20} strokeWidth={3} />
                        </div>
                        <p className="text-lg font-bold text-center leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </button>
    );
}

