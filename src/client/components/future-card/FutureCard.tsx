import React, { useEffect, useState } from "react";
import InsideFutureContent from "./InsideFutureContent";
import FutureWeather from "@/src/server/models/future-weather-model";

const FutureCard = ({
  futureWeather,
}: {
  futureWeather: FutureWeather | null;
}) => {
  return (
    <div className="flex w-1/2 h-48 overflow-x-auto rounded-xl no-scrollbar">
      <div className="flex flex-row justify-between px-4 bg-primary gap-x-4">
        {futureWeather?.list?.map((item, index) => (
          <div key={index} className="flex items-center text-center">
            <InsideFutureContent futureWeather={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FutureCard;
