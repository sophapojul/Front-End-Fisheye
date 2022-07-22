/**
 * If the response is not ok, throw an error
 * @param response - The response object returned by the fetch() call.
 * @returns The response object is being returned.
 */
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

/**
 * It fetches the photographers.json file, handles any errors, parses the response as JSON, and returns the JSON data
 */
const getPhotographers = () =>
    fetch('data/photographers.json')
        .then(handleErrors)
        .then((res) => res.json())
        .catch((err) => console.log(err));

export default getPhotographers;
