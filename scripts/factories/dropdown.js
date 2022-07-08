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
        const dropdown = addElement(main, 'div', '', {
            class: 'dropdown',
        });
        dropdown.innerHTML = `
            <label id="combo1-label" class="combo-label">Trier par </label>
            <div class="combo js-select">
              <div aria-controls="listbox1"
                   aria-haspopup="listbox"
                   aria-labelledby="combo1-label"
                   id="combo1"
                   class="combo-input"
                   role="button"
                   tabindex="0">Popularité
              </div>
              <div class="combo-menu"
                   role="listbox"
                   id="listbox1"
                   >
                   <div role="option" class="combo-option option-current" aria-selected="true" aria-label="Popularité">Popularité</div>
                   <div role="option" class="combo-option" aria-selected="false" aria-label="Date" >Date</div>
                   <div role="option" class="combo-option" aria-selected="false" aria-label="Titre" >Titre</div>
              </div>
            </div>
        `;
        return dropdown;
    }

    function openDropdown() {
        document.querySelector('.js-select').classList.toggle('open');
        const comboMenu = document.querySelector('.combo-input');
        comboMenu.toggleAttribute('aria-expanded');
        document.querySelectorAll('.combo-option').forEach((option) => {
            option.toggleAttribute('aria-activedescendant');
        });
    }

    return { getDropdownDOM, openDropdown };
}
