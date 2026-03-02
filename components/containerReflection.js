import React from "react";

function containerReflection({ reflections }) {
  return (
    <div>
      <div className="flex flex-col gap-8 lg:gap-13 w-full case-x-gutter">
        <div className="border-t border-secondary"></div>
        <div className="flex flex-col gap-[0.8rem] md:gap-4 lg:gap-4 w-full">
          <h2>Key Learnings</h2>
          <div className="flex flex-col gap-6">
            {reflections.map((item, key) => (
              <div
                className="flex flex-row gap-2 md:max-w-[36rewm] lg:max-w-2xl xl:max-w-240 max-w-full w-full"
                key={key}
              >
                <p>-</p>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-secondary"></div>
      </div>
    </div>
  );
}

export default containerReflection;
