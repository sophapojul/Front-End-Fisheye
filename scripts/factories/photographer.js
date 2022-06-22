/**
 * It creates a new element, sets its innerHTML, and adds it to the DOM
 * @param {HTMLElement} parent - The parent element to which the new element will be appended.
 * @param {String} tag - The HTML tag to create.
 * @param {string} text - The text to be added to the element.
 * @param {object} attributes - an object containing the attributes to be added to the element.
 * @returns {HTMLElement} The element that was created.
 */
export function addElement(parent, tag, text, attributes) {
    /** @const {HTMLElement} el */
    const el = document.createElement(tag);
    el.innerHTML = text;
    if (attributes) {
        Object.keys(attributes).forEach((key) => {
            el.setAttribute(key, attributes[key]);
        });
    }
    return parent.appendChild(el);
}

/**
 * It takes an id as a parameter, creates a new URL object with the photographer.html file as the path, appends the id to
 * the URL as a query string, and then opens the URL in the current window
 * @param {number} id - The id of the photographer.
 */
function openWindow(id) {
    /** @const {URL} url */
    const urlPhotograph = new URL('photographer.html', window.location.href);
    urlPhotograph.search = `?id=${id}`;
    window.open(urlPhotograph, '_self');
}

export default function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('photographer');
        addElement(article, 'img', '', {
            class: 'photographer_picture',
            src: picture,
            alt: `photo représentant ${name}`,
        });
        addElement(article, 'h2', `${name}`, { class: 'photographer_name' });
        addElement(article, 'p', `${city}, ${country}`, {
            class: 'photographer_location',
        });
        addElement(article, 'q', `${tagline}`, {
            class: 'photographer_tagline',
        });
        addElement(article, 'p', `${price}€/jour`, {
            class: 'photographer_price',
        });
        const img = article.querySelector('img');
        img.addEventListener('click', () => openWindow(id));
        return article;
    }

    function getUserHeaderDOM() {
        const header = document.createElement('div');
        header.classList.add('photographer_header');
        header.setAttribute('role', 'heading');
        header.setAttribute('aria-level', '2');
        const section = addElement(header, 'section', '', {
            class: 'photographer_details',
        });
        addElement(section, 'h1', `${name}`, { class: 'photographer_name' });
        addElement(section, 'p', `${city}, ${country}`, {
            class: 'photographer_location',
        });
        addElement(section, 'q', `${tagline}`, {
            class: 'photographer_tagline',
        });
        addElement(header, 'button', 'Contactez-moi', {
            class: 'photographer_contact',
            type: 'button',
            role: 'button',
            'aria-label': 'ouvrir le formulaire de contact',
        });
        addElement(header, 'img', '', {
            class: 'photographer_picture',
            src: picture,
            alt: `photo représentant ${name}`,
        });
        return header;
    }

    function getUserModalDOM() {
        function setAttributes(element, attributes) {
            Object.keys(attributes).forEach((attr) => {
                element.setAttribute(attr, attributes[attr]);
            });
        }

        const attributes = {
            id: 'contact_modal',
            class: 'contact_modal',
            role: 'dialog',
            'aria-hidden': 'true',
            'aria-modal': 'false',
            'aria-labelledby': 'contact_modal_title',
            style: 'display: none',
        };
        const contactModal = document.createElement('div');
        setAttributes(contactModal, attributes);
        const modal = addElement(contactModal, 'div', '', {
            class: 'modal',
            role: 'document',
        });
        const header = addElement(modal, 'div', '', {
            class: 'modal_header',
            role: 'heading',
            'aria-level': '2',
        });
        addElement(header, 'h2', 'Contactez-moi', {
            class: 'modal_title',
            id: 'contact_modal_title',
        });
        const btn = addElement(header, 'button', '', {
            type: 'button',
            'aria-label': 'fermer le formulaire de contact',
            class: 'modal_close',
            id: 'modal_close',
        });
        btn.innerHTML = `
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>
        </svg>
        `;
        // addElement(
        //     header,
        //     'svg',
        //     `<path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>`,
        //     {
        //         width: '42',
        //         height: '42',
        //         'aria-hidden': 'true',
        //         viewBox: '0 0 42 42',
        //         fill: 'white',
        //         xmlns: 'http://www.w3.org/2000/svg',
        //     }
        // );
        const form = addElement(modal, 'form', '', {
            id: 'modal_form',
            class: 'modal_form',
            name: 'modal_form',
        });
        addElement(form, 'p', `${name}`, { class: 'modal_name' });
        addElement(form, 'label', 'Prénom', { for: 'firstname' });
        addElement(form, 'input', '', {
            type: 'text',
            id: 'firstname',
            name: 'firstname',
        });
        addElement(form, 'label', 'Nom', { for: 'lastname' });
        addElement(form, 'input', '', {
            type: 'text',
            id: 'lastname',
            name: 'lastname',
        });
        addElement(form, 'label', 'Email', { for: 'email' });
        addElement(form, 'input', '', {
            type: 'email',
            id: 'email',
            name: 'email',
        });
        addElement(form, 'label', 'Votre message', { for: 'message' });
        addElement(form, 'textarea', '', {
            id: 'message',
            name: 'message',
            rows: '10',
            cols: '70',
        });
        addElement(form, 'button', 'Envoyer', {
            class: 'modal_submit',
            type: 'submit',
            'aria-label': 'envoyer le formulaire de contact',
        });
        return contactModal;
    }

    return {
        getUserCardDOM,
        getUserHeaderDOM,
        getUserModalDOM,
    };
}

export function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes } = data;
    const heart = `assets/icons/heart.svg`;
    const userImage = `assets/images/${photographerId}/${image}`;
    const userVideo = `assets/images/${photographerId}/${video}`;
    const mainSection = document.querySelector('.photographer_media');

    function getUserMediaDOM() {
        const article = addElement(mainSection, 'article', '', {
            class: 'product',
        });
        if (video) {
            const a = addElement(article, 'a', '', {
                href: userVideo,
            });
            addElement(a, 'video', '', {
                class: 'product-video',
                controls: true,
                src: userVideo,
            });
        } else {
            const a = addElement(article, 'a', '', {
                href: userImage,
            });
            addElement(a, 'img', '', {
                class: 'product-img',
                src: userImage,
                alt: title,
                id,
            });
        }
        const footer = addElement(article, 'footer', '', {
            class: 'product-footer',
        });
        addElement(footer, 'p', title, { class: 'product-title' });
        addElement(footer, 'span', likes, { class: 'product-likes' });
        addElement(footer, 'img', '', {
            class: 'product-heart',
            alt: 'likes',
            role: 'img',
            src: heart,
        });
        return article;
    }

    return { getUserMediaDOM };
}

export function lightboxFactory(images) {
    function getImageDOM(link) {
        console.log(link);
        const alt = link.split('/').pop().split('.')[0].split('_').join(' ');
        const container = document.querySelector('.lightbox_container');
        const ext = link.split('.')[1];
        // if (link.includes('mp4')) {
        if (ext === 'mp4') {
            container.innerHTML = '';
            addElement(container, 'video', '', {
                class: 'lightbox_video',
                controls: true,
                src: link,
            });
        } else {
            container.innerHTML = '';
            addElement(container, 'img', '', {
                class: 'lightbox_img',
                src: link,
                alt,
            });
        }
    }

    function getLightboxDOM() {
        const lightbox = addElement(document.body, 'div', '', {
            class: 'lightbox',
            role: 'dialog',
            'aria-hidden': 'true',
            'aria-modal': 'false',
            'aria-labelledby': 'contact_modal_title',
            style: 'display: block',
        });
        addElement(lightbox, 'button', '', {
            class: 'lightbox_close',
        });
        addElement(lightbox, 'button', '', {
            class: 'lightbox_prev',
        });
        addElement(lightbox, 'button', '', {
            class: 'lightbox_next',
        });
        addElement(lightbox, 'div', '', {
            id: 'lightbox_container',
            class: 'lightbox_container',
        });

        function closeLightbox(e) {
            e.preventDefault();
            lightbox.remove();
            lightbox.removeEventListener('click', closeLightbox);
        }

        function currentIndex(e) {
            e.preventDefault();
            const currentImg = document.querySelector(
                '#lightbox_container'
            ).firstElementChild;
            return images.findIndex(
                (image) => image === currentImg.getAttribute('src')
            );
        }

        function prevLightbox(e) {
            let index = currentIndex(e);
            if (index === 0) {
                index = images.length;
            }
            getImageDOM(images[index - 1]);
        }

        function nextLightbox(e) {
            let index = currentIndex(e);
            if (index === images.length - 1) {
                index = -1;
            }
            getImageDOM(images[index + 1]);
        }

        const close = lightbox.querySelector('.lightbox_close');
        close.addEventListener('click', closeLightbox);
        const prev = lightbox.querySelector('.lightbox_prev');
        prev.addEventListener('click', prevLightbox);
        const next = lightbox.querySelector('.lightbox_next');
        next.addEventListener('click', nextLightbox);

        return lightbox;
    }

    return { getLightboxDOM, getImageDOM };
}
