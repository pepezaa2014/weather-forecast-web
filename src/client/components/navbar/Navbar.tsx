import React from "react";
import Searchfield from "./Searchfield";
import { Geocoding } from "../../../server/models/geocoding-model";

interface NavbarProps {
  setCurrentLocation: (location: Geocoding) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentLocation }) => {
  return (
    <div className="flex flex-row w-full h-16 bg-primary rounded-b-lg justify-end p-4 z-10 shadow-md">
      <Searchfield setCurrentLocation={setCurrentLocation} />
    </div>
  );
};

export default Navbar;
