"use client";

import { useState } from "react";
import Image from "next/image";

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
          className="group relative h-72 w-56 [perspective:1000px] focus:outline-none"
        >
          <div className="w-full h-72 [perspective:1000px]">
          <div
            className={`relative w-full h-full rounded-2xl bg-white shadow-lg transition-transform duration-500 [transform-style:preserve-3d] ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 [backface-visibility:hidden]">
                {imageUrl && (
                    <div className= "relative mb-2 h-30 w-30 overflow-hidden rounded-full">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>             
                )}

                <p className="text-lg fond-semibold text-purple-900 text-center">
                    {name}
                </p>
                <p className="text-lg text-purple-600 text-center">
                    {position}
                </p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="text-sm text-slate-800 text-center leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    </div>
</button>
    );
}

