// import addElement from '../utils/addElement';

export function likesFactory(likes, price) {
    // const heart = `assets/icons/heart.svg`;

    function getLikesDOM() {
        const likesDOM = document.createElement('div');
        likesDOM.classList.add('likes');
        likesDOM.setAttribute('role', 'list');
        likesDOM.setAttribute('aria-label', 'liste des likes');
        // addElement(
        //     likesDOM,
        //     'span',
        //     // `${incrementLike().toLocaleString('fr')} `,
        //     `${likes.toLocaleString('fr')} `,
        //     {
        //         class: 'likes_count',
        //         role: 'listitem',
        //         // 'aria-label': `${likes} likes`,
        //     }
        // );
        // addElement(likesDOM, 'img', '', {
        //     class: 'likes_heart',
        //     src: heart,
        //     alt: 'coeur',
        //     role: 'listitem',
        //     'aria-label': 'coeur',
        // });
        // addElement(likesDOM, 'span', `${price}€ / jour`, {
        //     class: 'likes_price',
        //     role: 'listitem',
        //     'aria-label': `${price}€ / jour`,
        // });
        likesDOM.innerHTML = `
                <span class="likes_count" role="listitem">${likes.toLocaleString(
                    'fr'
                )}</span>  
                <svg width="19" height="19" viewBox="0 0 19 19" class="likes_heart" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="currentcolor"/>
                </svg>
                <span class="likes_price" role="listitem" aria-label="${price}€ / jour">${price}€ / jour</span>
            `;
        return likesDOM;
    }

    return {
        getLikesDOM,
    };
}

export function updateLikesDisplay(el, value) {
    el.textContent = value;
}

export function incrementLike(el) {
    updateLikesDisplay(el, parseInt(el.textContent, 10) + 1);
}
