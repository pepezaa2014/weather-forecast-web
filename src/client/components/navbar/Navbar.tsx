import React from "react";
import Searchfield from "./Searchfield";
import { Geocoding } from "../../../server/models/geocoding-model";
import Image from "next/image";

interface NavbarProps {
  setCurrentLocation: (location: Geocoding) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentLocation }) => {
  return (
    <div className="z-10 flex flex-row justify-between w-full h-20 p-4 rounded-b-lg shadow-md bg-primary">
      <div className="flex flex-row items-center justify-center">
        <Image
          src="/images/sun.png"
          alt=""
          className="mr-2"
          width={50}
          height={40}
        />
        <h2>Weather Forecast</h2>
      </div>
      <Searchfield setCurrentLocation={setCurrentLocation} />
    </div>
  );
};

export default Navbar;
