import '../../css/style.scss';
import photographerFactory   from "../factories/photographer";

async function getPhotographers() {
    const photographers = await fetch('data/photographers.json').then(response => response.json()).then(data => data.photographers);
    return {
        photographers
    };
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        '.photographer_section'
    );

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    await displayData(photographers);
}

init();
