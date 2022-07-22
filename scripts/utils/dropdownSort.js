/**
 * It sorts an array of media objects by their title property
 * @param {Object[]} media - The array of media objects to sort.
 * @returns {Object[]} An array of objects sorted by title.
 */
export function sortMediaByTitle(media) {
    // return media.sort((a, b) => a.title.localeCompare(b.title));
    return media.sort(({ title: a }, { title: b }) => a.localeCompare(b));
}

/**
 * It sorts an array of media objects by date
 * @param {Object[]} media - the array of media objects
 * @returns {Object[]} An array of objects sorted by date.
 */
export function sortMediaByDate(media) {
    // return media.sort((a, b) => new Date(a.date) - new Date(b.date));
    return media.sort(({ date: a }, { date: b }) => new Date(a) - new Date(b));
}

/**
 * It takes an array of media objects and returns a new array of media objects sorted by the number of likes
 * @param {Object[]} media - the array of media objects
 * @returns {Object[]} An array of objects sorted by the number of likes.
 */
export function sortMediaByPopularity(media) {
    // return media.sort((a, b) => b.likes - a.likes);
    return media.sort(({ likes: a }, { likes: b }) => b - a);
}
