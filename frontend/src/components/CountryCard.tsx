import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCurrentTime } from "../utils/helper";

interface CountryCardProps {
  code: string;
  name: string;
  flag: string;
  region: string;
  timezones: string[];
}

export const CountryCard = ({
  code,
  name,
  flag,
  region,
  timezones,
}: CountryCardProps) => {
  const isValidUrl = flag.startsWith("http://") || flag.startsWith("https://");
  return (
    <Link href={`/countries/${encodeURIComponent(code)}`}>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-all duration-300 ease-in-out hover:shadow-lg">
        {isValidUrl ? (
          <div className="relative w-16 h-16">
            <Image
              className="object-contain"
              src={flag}
              alt={`Flag of ${name}`}
              fill
              sizes="64px"
            />
          </div>
        ) : (
          <p className="text-center">No Flag Available</p>
        )}

        <div className="mt-4 text-center">
          <h2 className="font-semibold">{name.toString()}</h2>
          <p className="text-sm text-gray-600">{region}</p>
          <p className="text-sm text-gray-500 mt-2">
            {getCurrentTime(timezones)}
          </p>
        </div>
      </div>
    </Link>
  );
};
