import React from "react";

function containerText({ title, body, gutter, subheader = [] }) {
  return (
    <div
      className={`flex flex-col gap-[0.8rem] md:gap-[1rem] lg:gap-[1rem] md:max-w-[36rewm] lg:max-w-[42rem] xl:max-w-[60rem] max-w-full w-full ${gutter}} `}
    >
      <div className="flex flex-col gap-[0.5rem]">
        <h6 className="text-text-secondary"> {subheader || ""}</h6>
        <h2>{title || ""}</h2>
      </div>
      {body.map((item, key) => (
        <p className="text-text-teritary" key={key}>
          {item}
        </p>
      ))}
    </div>
  );
}

export default containerText;
