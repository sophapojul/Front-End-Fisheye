function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const getPhotographers = () =>
    fetch('data/photographers.json')
        .then(handleErrors)
        .then((res) => res.json())
        .catch((err) => console.log(err));

export default getPhotographers;
