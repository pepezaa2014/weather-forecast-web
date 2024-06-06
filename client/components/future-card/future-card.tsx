import React, { useEffect, useState } from "react";
import InsideFutureContent from "./inside-future-content";
import FutureWeather from "@/client/models/future-weather-model";

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
    <div className="bg-primary gap-x-2 flex flex-row overflow-x-auto justify-between">
      {futureWeather?.list?.map((item, index) => (
        <div key={index} className="flex p-4 items-center text-center">
          <InsideFutureContent futureWeather={item} />
        </div>
      ))}
    </div>
  );
};

export default FutureCard;
