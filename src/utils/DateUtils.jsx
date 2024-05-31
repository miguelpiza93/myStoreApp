/**
 * Converts a UTC date string to a local formatted string.
 * @param {string} UTCDateString - The UTC date string to be converted.
 * @param {boolean} short - Whether to return only the date part.
 * @returns {string} - The local formatted date string.
 */
export const utcToLocalFormat = (UTCDateString, short = false) => {
    const date = new Date(UTCDateString);
    if (short) {
        return date.toLocaleDateString(); // Returns only the date part
    } else {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; // Returns date and time
    }
}

/**
 * Converts a Date object to a string in YYYY-MM-DD format.
 * @param {Date} date - The Date object to be converted.
 * @returns {string} - The formatted date string in YYYY-MM-DD format.
 */
export const dateToString = (date) => {
    return date.toISOString().split('T')[0];
}
