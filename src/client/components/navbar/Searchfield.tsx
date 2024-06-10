import React, { useEffect, useState } from "react";
import { Geocoding } from "../../../server/models/geocoding-model";
import { useHandleSelect } from "../weather-forecast/actions";
import { GET as fetchGeocoding } from "@/src/app/api/app/geocoding/route";

interface SearchfieldProps {
  setCurrentLocation: (location: Geocoding) => void;
}

const Searchfield: React.FC<SearchfieldProps> = ({ setCurrentLocation }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [searchCity, setSearchCity] = useState<string>("");
  const [geocodingData, setGeocodingData] = useState<Geocoding[] | null>(null);

  const { handleSelect } = useHandleSelect({
    setCurrentLocation,
    setIsDropdownVisible,
    setSearchCity,
  });

  useEffect(() => {
    const fetchGeo = async () => {
      if (!searchCity) return;
      try {
        const data = await fetchGeocoding({ q: searchCity });
        setGeocodingData(data);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchGeo();
  }, [searchCity]);

  return (
    <div className="relative flex items-center bg-white rounded px-2 py-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="gray"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        className="text-black focus:outline-none pl-2 w-full"
        onBlur={(e) => {
          if (
            !e.relatedTarget ||
            !e.relatedTarget.classList.contains("dropdown-item")
          ) {
            setIsDropdownVisible(false);
          }
        }}
        onFocus={() => searchCity && setIsDropdownVisible(true)}
      />
      {isDropdownVisible && geocodingData && geocodingData.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full top-8 right-0 max-h-60 overflow-y-auto z-20">
          {geocodingData.map((location, index) => (
            <li
              key={index}
              className="dropdown-item px-4 py-2 cursor-pointer hover:bg-gray-200"
              onMouseDown={() => handleSelect(location)}
            >
              {location.name} ({location.country})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchfield;
