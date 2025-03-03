export interface Country {
    code: string;
    name: string;
    flag: string;
    region: string;
    population: number;
    languages: { [key: string]: string };
    currencies: {
        [code: string]: Currency;
    };
    capital?: string[];
    timezones: string[];
}
export type Currency = {
    name: string;
    symbol: string;
};

