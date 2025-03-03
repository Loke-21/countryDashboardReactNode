import axios from "axios";
import { Country } from "../types/Country";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const cache: { [key: string]: { data: any; timestamp: number } } = {};

const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const getCache = async (url: string) => {
    const cachedData = cache[url];
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
        return cachedData.data;
    }

    const response = await axios.get(url);
    cache[url] = { data: response.data, timestamp: Date.now() };
    return response.data;
};

export const countryService = {   

    getAllCountries: async (page = 1, limit = 10) => {
        const response = await getCache(`${BASE_URL}/countries?page=${page}&limit=${limit}`);
        return {
            countries: response.data as Country[],
            totalCountries: response.totalCountries,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
        };
    },

    getCountryByCode: async (code: string) => {
        return getCache(`${BASE_URL}/countries/${code}`) as Promise<Country>;
    },

    getCountriesByRegion: async (region: string) => {
        return getCache(`${BASE_URL}/countries/region/${region}`) as Promise<
            Country[]
        >;
    },

    searchCountries: async (params: {
        name?: string;
        capital?: string;
        region?: string;
        timezone?: string;
    }) => {
        const queryString = new URLSearchParams(
            params as Record<string, string>
        ).toString();
        return getCache(`${BASE_URL}/countries/search?${queryString}`) as Promise<
            Country[]
        >;
    },
};