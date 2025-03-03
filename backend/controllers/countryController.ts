import { Request, Response, NextFunction } from "express";
import axios from "axios";
import NodeCache from "node-cache";
import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const REST_COUNTRIES_API = process.env.API_URL as string;
console.log('REST_COUNTRIES_API', REST_COUNTRIES_API)
const cache = new NodeCache({ stdTTL: 3600 });

interface Country {
  code?: string;
  name: string;
  flag: string;
  region: string;
  timezones?: string[];
  population?: number;
  languages?: Record<string, string>;
  currency?: Record<string, { name: string; symbol: string }>;
}

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

const fetchCountries = async (): Promise<Country[]> => {
  let countries = cache.get<Country[]>("countries");
  if (!countries) {
    const { data } = await axios.get(REST_COUNTRIES_API, { httpsAgent });
    countries = data.map((country: any) => ({
      code: country.cca3,
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
      timezones: country.timezones,
      population: country.population,
      languages: country.languages,
      currency: country.currencies,
    })) as Country[];

    cache.set("countries", countries);
  }
  return countries;
};

export const getCountries = asyncHandler(async (req, res) => {
  const { page = "1", limit = "10" } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  const countries = await fetchCountries();
  const totalCountries = countries.length;
  const totalPages = Math.ceil(totalCountries / limitNumber);
  const startIndex = (pageNumber - 1) * limitNumber;
  const paginatedData = countries.slice(startIndex, startIndex + limitNumber);
  // const startIndex = (parseInt(page as string) - 1) * parseInt(limit as string);
  // const paginatedData = countries.slice(startIndex, startIndex + parseInt(limit as string));

  // res.json(paginatedData);
  res.json({
    data: paginatedData,
    totalCountries,
    totalPages,
    currentPage: pageNumber,
  });
});

export const getCountryByCode = asyncHandler(async (req, res) => {
  const { code } = req.params;
  let country = cache.get<Country>(`country_${code}`);

  if (!country) {
    const { data } = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`, { httpsAgent });

    if (!data || data.length === 0) {
      res.status(404).json({ error: "Country not found" });
      return;
    }

    country = {
      name: data[0].name.common,
      flag: data[0].flags.svg,
      population: data[0].population,
      languages: data[0].languages,
      region: data[0].region,
      currency: data[0].currencies,
      timezones: data[0].timezones,
    };

    cache.set(`country_${code}`, country);
  }

  res.json(country);
});

export const filterCountriesByRegion = asyncHandler(async (req, res) => {
  const { region } = req.params;
  const countries = await fetchCountries();
  const filteredCountries = countries.filter((country) => country.region === region);

  res.json(filteredCountries);
});

export const searchCountries = asyncHandler(async (req, res) => {
  const { name, capital, region, timezone } = req.query;
  let countries = await fetchCountries();

  if (name) {
    const searchName = (name as string).toLowerCase();
    countries = countries.filter((country) => country.name.toLowerCase().includes(searchName));
  }

  if (capital) {
    const searchCapital = (capital as string).toLowerCase();
    countries = countries.filter((country: any) =>
      country.capital && country.capital[0].toLowerCase().includes(searchCapital)
    );
  }

  if (region) {
    countries = countries.filter((country) => country.region === region);
  }

  if (timezone) {
    countries = countries.filter((country) => country.timezones?.includes(timezone as string));
  }

  if (!countries.length) {
    res.status(404).json({ error: "No matching countries found" });
    return;
  }

  res.json(countries);
});

