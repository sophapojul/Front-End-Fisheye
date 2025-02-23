/**
 * It returns an object with a single method, getLikesDOM, which returns a DOM element
 * @param {Number} likes - the number of likes
 * @param {Number} price - the price of the product
 * @returns {Object} An object with a function getLikesDOM
 */
export function likesFactory(likes, price) {
    /**
     * It creates a DOM element, adds some classes, sets some attributes, and returns the element
     * @returns A DOM element
     */
    function getLikesDOM() {
        const likesDOM = document.createElement('aside');
        likesDOM.classList.add('likes');
        likesDOM.setAttribute('role', 'complementary');
        likesDOM.innerHTML = `
        <div class="likes_fixed" role="list">
                <span id="likes_count" class="likes_count" role="alert" aria-label="total de ${likes.toLocaleString(
                    'fr'
                )} likes">${likes.toLocaleString('fr')}</span>
                <svg width="19" height="19" viewBox="0 0 19 19" class="likes_heart" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="currentcolor"/>
                </svg>
                <span class="likes_price" role="listitem" aria-label="Émolument ${price}€ / jour">${price}€ / jour</span>
        </div>
            `;
        return likesDOM;
    }

    return {
        getLikesDOM,
    };
}

/**
 * It takes an element and a value, and updates the element's text content with the value, formatted as a French number
 * @param {HTMLSpanElement} el - the element to update
 * @param {Number} value - the new value to display
 */
export function updateLikesDisplay(el, value) {
    el.textContent = value.toLocaleString('fr');
}

/**
 * It takes an element and increments the number of likes by one
 * @param {HTMLSpanElement} el - The element that was clicked.
 */
export function incrementLike(el) {
    updateLikesDisplay(el, parseInt(el.textContent, 10) + 1);
}
