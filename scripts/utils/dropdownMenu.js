export function sortMediaByTitle(media) {
    // return media.sort((a, b) => a.title.localeCompare(b.title));
    return media.sort(({ title: a }, { title: b }) => a.localeCompare(b));
}

export function sortMediaByDate(media) {
    // return media.sort((a, b) => new Date(a.date) - new Date(b.date));
    return media.sort(({ date: a }, { date: b }) => new Date(a) - new Date(b));
}

export function sortMediaByPopularity(media) {
    // return media.sort((a, b) => b.likes - a.likes);
    return media.sort(({ likes: a }, { likes: b }) => b - a);
}
