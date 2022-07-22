import addElement from '../utils/addElement';

/**
 * It creates a DOM element that contains a dropdown menu
 * @returns A function that returns an object with a method getDropdownMenuDOM
 */
export default function dropdownFactory() {
    /**
     * It creates a dropdown menu with a list of options
     * @returns the DOM element of the dropdown menu.
     */
    function getDropdownDOM() {
        const main = document.querySelector('#main');
        const dropdown = addElement(main, 'section', '', {
            class: 'dropdown',
        });
        dropdown.innerHTML = `
            <label id="combo1-label" class="combo-label">Trier par </label>
            <div class="combo js-select">
              <div aria-controls="listbox1"
                   aria-expanded="false"
                   aria-haspopup="listbox"
                   aria-labelledby="combo1-label"
                   id="combo1"
                   class="combo-input"
                   role="combobox"
                   aria-activedescendant="combo1-0"
                   tabindex="0">
                   Popularité
              </div>
              <div class="combo-menu"
                   role="listbox"
                   id="listbox1"
                   aria-labelledby="combo1-label"
                   tabindex="-1">
                   <div role="option" id="combo1-0" class="combo-option option-current" aria-selected="true" tabindex="0">Popularité</div>
                   <div role="option" id="combo1-1" class="combo-option" aria-selected="false" tabindex="0">Date</div>
                   <div role="option" id="combo1-2" class="combo-option" aria-selected="false" tabindex="0">Titre</div>
              </div>
            </div>
        `;
        return dropdown;
    }

    /**
     * The function opens the dropdown menu by toggling the class 'open' on the element with the class 'js-select'. It also
     * adds event listeners to the comboInput and comboMenu elements. If the dropdown is open, the comboInput element's
     * aria-expanded attribute is set to true and the activeDescendant element is focused. If the dropdown is closed, the
     * comboInput element's aria-expanded attribute is set to false and the comboInput element is focused
     */
    function openDropdown() {
        const jsSelect = document.querySelector('.js-select');
        const comboInput = document.querySelector('.combo-input');
        const comboMenu = document.querySelector('.combo-menu');
        const activeDescendant = document.querySelector('.option-current');
        jsSelect.classList.toggle('open');
        comboInput.addEventListener('keydown', onKeyDown);
        comboMenu.addEventListener('mouseover', onMouseOver);
        comboMenu.addEventListener('keydown', onKeyDown);
        if (document.querySelector('.js-select').classList.contains('open')) {
            comboInput.setAttribute('aria-expanded', 'true');
            activeDescendant.focus();
        } else {
            comboInput.setAttribute('aria-expanded', 'false');
            comboInput.focus();
        }
    }

    /**
     * It removes the `open` class from the `js-select` element, sets the `aria-expanded` attribute of the `combo-input`
     * element to `false`, focuses the `combo-input` element, and removes the `mouseover` and `keydown` event listeners
     * from the `combo-menu` element
     */
    function closeDropdown() {
        const jsSelect = document.querySelector('.js-select');
        const comboInput = document.querySelector('.combo-input');
        const comboMenu = document.querySelector('.combo-menu');
        jsSelect.classList.remove('open');
        comboInput.setAttribute('aria-expanded', 'false');
        comboInput.focus();
        comboMenu.removeEventListener('mouseover', onMouseOver);
        comboMenu.removeEventListener('keydown', onKeyDown);
    }

    /**
     * When the user presses the Escape key, the dropdown is closed. When the user presses the Enter or Space key, the
     * dropdown is opened or closed. When the user presses the ArrowDown key, the next option is focused. When the user
     * presses the ArrowUp key, the previous option is focused
     * @param {keyboardEvent} ev - The event object.
     */
    function onKeyDown(ev) {
        const { key } = ev;
        const comboMenu = document.querySelector('.combo-input');
        const comboOptions = Array.from(
            document.querySelectorAll('.combo-option')
        );
        const activeDescendant = document.querySelector('.option-current');
        const index = comboOptions.findIndex(
            (el) => el === document.activeElement
        );
        switch (key) {
            case 'Escape':
                ev.preventDefault();
                closeDropdown();
                break;
            case 'Enter':
            case ' ': {
                ev.preventDefault();
                if (
                    document
                        .querySelector('.js-select')
                        .classList.contains('open')
                ) {
                    Array.from(activeDescendant.parentElement.children).forEach(
                        (el) => {
                            el.removeAttribute('aria-selected');
                        }
                    );
                    document
                        .querySelector('.option-current')
                        .classList.remove('option-current');
                    document.activeElement.setAttribute(
                        'aria-selected',
                        'true'
                    );
                    document.activeElement.classList.add('option-current');
                    comboMenu.innerText = document.activeElement.innerText;
                    comboMenu.setAttribute(
                        'aria-activedescendant',
                        document.activeElement.id
                    );
                    closeDropdown();
                } else {
                    openDropdown();
                }
                break;
            }
            case 'ArrowDown': {
                ev.preventDefault();
                if (
                    document
                        .querySelector('.js-select')
                        .classList.contains('open')
                ) {
                    let next;
                    if (index < comboOptions.length - 1) {
                        next = document.activeElement.nextElementSibling;
                    }
                    if (next) {
                        next.focus();
                    }
                }
                break;
            }
            case 'ArrowUp': {
                ev.preventDefault();
                if (
                    document
                        .querySelector('.js-select')
                        .classList.contains('open')
                ) {
                    let prev;
                    if (index > 0) {
                        prev = document.activeElement.previousElementSibling;
                    }
                    if (prev) {
                        prev.focus();
                    }
                }
                break;
            }
            default:
                break;
        }
    }

    /**
     * `onMouseOver` is a function that takes an event as an argument, prevents the default behavior of the event, and then
     * focuses on the target of the event
     * @param {MouseEvent} ev - the event object
     */
    const onMouseOver = (ev) => {
        ev.preventDefault();
        const { target } = ev;
        target.focus();
    };

    /**
     * When an option is clicked, the selected option is removed from the DOM, the text content of the combo input is set
     * to the text content of the option that was clicked, the option that was clicked is added to the DOM, the combo input
     * is set to the id of the option that was clicked, and the dropdown is opened
     * @param {HTMLElement} option - The option that was clicked.
     */
    const onClick = (option) => {
        const comboInput = document.querySelector('.combo-input');
        const selected = document.querySelector('.option-current');
        selected.classList.remove('option-current');
        selected.removeAttribute('aria-selected');
        // hideSelectedOption(option);
        comboInput.textContent = option.textContent;
        option.classList.add('option-current');
        option.setAttribute('aria-selected', 'true');
        comboInput.setAttribute('aria-activedescendant', option.id);
        openDropdown();
    };

    return {
        getDropdownDOM,
        openDropdown,
        onClick,
        onKeyDown,
        onMouseOver,
    };
}
