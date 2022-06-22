export function sortMediaByTitle(media) {
    return media.sort((a, b) => a.title.localeCompare(b.title));
}

export function sortMediaByDate(media) {
    return media.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function sortMediaByPopularity(media) {
    const sorted = media.sort((a, b) => a.likes - b.likes);
    return media.sort((a, b) => a.likes - b.likes);
}
