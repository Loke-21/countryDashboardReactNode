import { DateTime } from "luxon";

export const getCurrentTime = (timezones: string[]): string => {
    if (timezones?.length === 0) return "Time unknown";

    const timezone = timezones?.[0];
    return DateTime.now().setZone(timezone).toFormat("h:mm a");
};