/** Format a date as a string for display */
export const getFormattedDate = (date: string | number | Date) =>
	date
		? new Date(date).toLocaleDateString('en-gb', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: '';
