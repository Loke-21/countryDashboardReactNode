import React, { useState, useEffect, Suspense } from "react";
import Header from "../components/Header";
import { countryService } from "../services/countryService";
import { Country } from "../types/Country";
import { SearchBar } from "../components/SearchBar";
import { RegionFilter } from "../components/Filter";
import { CountryList } from "../components/CountryLists";
import Pagination from "../components/Pagination";
export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  // const [visibleCountries, setVisibleCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [capitalSearch, setCapitalSearch] = useState("");
  const [timezoneSearch, setTimezoneSearch] = useState("");
  const [region, setRegion] = useState("All");
  // const batchSize = 20;
  // const observerRef = useRef<IntersectionObserver | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCountries(page, region);
    // const startIndex = (page - 1) * itemsPerPage;
    // setVisibleCountries(countries.slice(startIndex, startIndex + itemsPerPage));
  };
  const fetchCountries = async (page = 1, region = "All") => {
    setLoading(true);
    try {
      let response;
      if (region === "All") {
        response = await countryService.getAllCountries(page, itemsPerPage);
        setCountries(response.countries);
        setTotalPages(response.totalPages);
      } else {
        const countriesArray = await countryService.getCountriesByRegion(
          region
        );
        setCountries(countriesArray);
        setTotalPages(1);
      }
      setLoading(false);
    } catch (err) {
      setError(`Failed to load countries, ${err}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountries(currentPage, region);
  }, [region]);

  // const loadMore = useCallback(() => {
  //   setVisibleCountries((prev) => [
  //     ...prev,
  //     ...countries.slice(prev.length, prev.length + batchSize),
  //   ]);
  // }, [countries]);
  // const lastCountryRef = useCallback(
  //   (node: HTMLDivElement | null) => {
  //     if (loading) return;
  //     if (observerRef.current) {
  //       observerRef.current.disconnect();
  //     }
  //     observerRef.current = new IntersectionObserver(([entry]) => {
  //       if (entry.isIntersecting) loadMore();
  //     });
  //     if (node) observerRef.current.observe(node);
  //   },
  //   [loading, loadMore]
  // );
  if (loading) {
    <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (error) {
    <p className="text-red-500">{error}</p>;
  }

  const handleSearchResults = (results: Country[]) => {
    setCountries(results);
  };
  console.log("countries shksjadjsakjd", countries);
  return (
    <React.Fragment>
      <Header />
      <div className="p-6">
        <div className="mb-4">
          <SearchBar
            countrySearch={countrySearch}
            capitalSearch={capitalSearch}
            timezoneSearch={timezoneSearch}
            onCountrySearchChange={setCountrySearch}
            onCapitalSearchChange={setCapitalSearch}
            onTimezoneSearchChange={setTimezoneSearch}
            onSearchResults={handleSearchResults}
          />
          <RegionFilter selectedRegion={region} onRegionChange={setRegion} />
        </div>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Suspense fallback={<p>Loading countries...</p>}>
            <CountryList countries={countries} />
          </Suspense>
        )}

        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </React.Fragment>
  );
}
