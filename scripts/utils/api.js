
export default async function getPhotographers() {
    return await fetch('data/photographers.json').then(res => res.json());
}
