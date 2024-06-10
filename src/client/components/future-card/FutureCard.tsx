import React, { useEffect, useState } from "react";
import InsideFutureContent from "./InsideFutureContent";
import FutureWeather from "@/src/server/models/future-weather-model";

const FutureCard = ({
  futureWeather,
}: {
  futureWeather: FutureWeather | null;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex w-1/2 h-48 overflow-x-auto rounded-xl">
      <div className="flex flex-row overflow-x-auto bg-primary px-4 gap-x-4 justify-between">
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
