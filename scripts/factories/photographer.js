function addElement(parent, tag, text, {...attributes}) {
    const el = document.createElement(tag);
    el.innerHTML = text;
    Object.keys(attributes).forEach(key => el.setAttribute(key, attributes[key]));
    parent.appendChild(el);
}
export default function photographerFactory(data) {
    const picture = `assets/photographers/${data.portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('photographer');
        addElement(article, 'img', '', { class: 'photographer_picture', src: picture });
        addElement(article, 'h2', `${ data.name }`, { class: 'photographer_name' });
        addElement(article, 'p', `${ data.city }, ${ data.country }`, { class: 'photographer_location' });
        addElement(article, 'p', `${ data.tagline }`, { class: 'photographer_tagline' });
        addElement(article, 'p', `${ data.price }€/jour`, { class: 'photographer_price' });
        return article;
    }
    return { getUserCardDOM };
}
