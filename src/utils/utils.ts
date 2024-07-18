/** Format a date as a string for display */
export const getFormattedDate = (date: string | number | Date) =>
	date
		? new Date(date).toLocaleDateString('en-gb', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
		: '';

export const getLocationOnMap = (location: string) => {
	return 'https://maps.google.com/?q=' + location;
};

import { format } from 'date-fns';

export const convertTimestamp2Date = (timestamp: number, dateFormat: string) => {
	const date = new Date(timestamp);
	return format(date, dateFormat);
};
