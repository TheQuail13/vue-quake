import { date, format } from 'quasar';
const { capitalize } = format;

export function formatDate(inputDate) {
    let dateToFormat = typeof inputDate === 'string' ? Date.parse(inputDate) : inputDate;

    if (isNaN(dateToFormat) === false) {
        return date.formatDate(dateToFormat, "MM-DD-YYYY HH:mm:ss");
    }

    return dateToFormat;
}

export function capitalizeWord(word) {
    if (typeof word === 'string') {
        return capitalize(word)
    }

    return word;
}