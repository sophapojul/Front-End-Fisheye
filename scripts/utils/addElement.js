/**
 * It creates a new element, sets its innerHTML, and adds it to the DOM
 * @param {HTMLElement} parent - The parent element to which the new element will be appended.
 * @param {String} tag - The HTML tag to create.
 * @param {string} text - The text to be added to the element.
 * @param {object} attributes - an object containing the attributes to be added to the element.
 * @returns {HTMLElement} The element that was created.
 */
export default function addElement(parent, tag, text, attributes) {
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
