export default async function getPhotographers() {
    return fetch('data/photographers.json').then((res) => {
        if (!res) throw new Error('Not Found');
        res.json();
    });
}
