import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const STICKERS = [
  { src: "/images/name/blue-circle-sticker.svg",   name: "Blue Circle",    phrase: "perfectly round :)" },
  { src: "/images/name/yellow-star-sticker.svg",   name: "Yellow Star",    phrase: "you're a star!" },
  { src: "/images/name/green-square-sticker.svg",  name: "Green Square",   phrase: "keeping it square" },
  { src: "/images/name/pink-butterfly-sticker.svg", name: "Pink Butterfly", phrase: "flutter flutter~" },
  { src: "/images/name/purple-gem-sticker.svg",    name: "Purple Gem",     phrase: "rare find ✨" },
  { src: "/images/name/red-heart-sticker.svg",     name: "Red Heart",      phrase: "sending love" },
];

const ROTATIONS = [6, -3, 8, -6, 4, -8];

export default function StickerGrid({ stickers = [], position = 0 }) {
  const [animKey, setAnimKey] = useState(0);

  // Re-trigger pop animation each time this card scrolls into position 0
  useEffect(() => {
    if (position !== 0) return;
    const id = requestAnimationFrame(() => setAnimKey((k) => k + 1));
    return () => cancelAnimationFrame(id);
  }, [position]);

  return (
    <div className="grid grid-cols-3 gap-[1.25rem] md:gap-[2vw]">
      {STICKERS.map(({ src, name, phrase }, i) => (
        <motion.div
          key={i}
          className="group w-[3.5rem] md:w-[6vw] aspect-square rounded-[0.5rem] relative flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1, rotate: ROTATIONS[i] }}
          transition={{ duration: 0.2 }}
        >
          {/* Tooltip */}
          {stickers[i] ? (
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
              <div className="bg-white rounded-[0.5rem] px-2.5 py-1.5 flex flex-col items-center shadow-md">
                <span className="text-black text-xs font-medium leading-tight">{name}</span>
                <span className="text-black/50 text-xs leading-tight">{phrase}</span>
              </div>
            </div>
          ) : (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
              <div className="bg-white rounded-[0.5rem] px-2.5 py-1.5 shadow-md">
                <span className="text-black/50 text-xs leading-tight">visit again for another one</span>
              </div>
            </div>
          )}
          <div className="w-2 h-2 rounded-full bg-white/60 absolute" />
          {stickers[i] && (
            <Image
              key={`${animKey}-${i}`}
              src={src}
              width={96}
              height={96}
              alt=""
              style={{
                animation: `stickerPop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) ${300 + i * 110}ms both`,
              }}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
