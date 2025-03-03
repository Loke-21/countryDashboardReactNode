import React from "react";
import { CountryCard } from "./CountryCard";
import { Country } from "../types/Country";

interface CountryListProps {
    countries: Country[];
    lastCountryRef?: (node: HTMLDivElement | null) => void;
}

export const CountryList = ({ countries, lastCountryRef }: CountryListProps) => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.length > 0 ? (
                countries.map((country, index) => {
                    const isLast = index === countries.length - 1;
                    return (
                        <div key={country.code} ref={isLast ? lastCountryRef : null}>
                            <CountryCard {...country} />
                        </div>
                    );
                })
            ) : (
                <p className="text-gray-500">No countries found.</p>
            )}
        </div>
    );
}
