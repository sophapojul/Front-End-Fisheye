export default async function getPhotographers() {
    return fetch('data/photographers.json').then((res) => res.json());
}
