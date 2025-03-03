import React from "react";

interface RegionFilterProps {
    selectedRegion: string;
    onRegionChange: (region: string) => void;
}

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export const RegionFilter = ({ selectedRegion, onRegionChange }: RegionFilterProps) => {
    return (
        <div className="mb-4">
            <label className="w-full block text-sm font-medium text-gray-700 mb-2">
                Filter by Region
            </label>
            <select
                className="w-full border border-gray-300 px-4 py-2"
                value={selectedRegion}
                onChange={(e) => onRegionChange(e.target.value)}
            >
                {regions.map((region) => (
                    <option key={region} value={region}>
                        {region}
                    </option>
                ))}
            </select>
        </div>
    )
}