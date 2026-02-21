import react from "react";
import Image from "next/image";

export default function label2({
  title,
  image,
  body,
  alt,
  color,
  strokeColor,
  textColor,
  rounded,
}) {
  return (
    <div
      className={`${color ?? "bg-[#F8F8F8]"} ${strokeColor ? `border ${strokeColor}` : ""} ${rounded ?? ""} p-6 flex flex-col gap-2 border border-secondary`}
    >
      <div className="flex flex-row gap-[0.4rem] items-center">
        {image && (
          <div className="w-auto h-[2.2rem]">
            <Image
              src={image}
              height={400}
              width={400}
              alt={alt ?? ""}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <p className={`${textColor ?? "text-text-secondary"} font-medium!`}>
          {title ?? "title placeholder"}
        </p>
      </div>

      <p className={textColor ?? "text-text-secondary"}>
        {body ?? "paragraph placeholder"}
      </p>
    </div>
  );
}
