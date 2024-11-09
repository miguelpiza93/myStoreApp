const DATE_FORMAT_OPTIONS = {
    fullDay: { dateStyle: 'short', timeStyle: 'short' },   // Fecha y hora completa
    month: { year: 'numeric', month: 'long' },         // Mes y año
    year: { year: 'numeric' },                         // Solo año
    day: { dateStyle: 'short' }                   // Solo fecha, sin hora
};

/**
 * Converts a UTC date string to a local formatted string.
 * @param {string} UTCDateString - The UTC date string to be converted.
 * @param {boolean} short - Whether to return only the date part.
 * @returns {string} - The local formatted date string.
 */
export const utcToLocalFormat = (UTCDateString, formatOption = DATE_FORMAT_OPTIONS.fullDay) => {
    const date = new Date(UTCDateString);
    const formatOptions = DATE_FORMAT_OPTIONS[formatOption];
    return new Intl.DateTimeFormat('default', formatOptions).format(date);
};

/**
 * Converts a Date object to a string in YYYY-MM-DD format.
 * @param {Date} date - The Date object to be converted.
 * @returns {string} - The formatted date string in YYYY-MM-DD format.
 */
export const dateToString = (date) => {
    return date.toISOString().split('T')[0];
}
