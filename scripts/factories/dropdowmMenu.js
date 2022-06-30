import addElement from '../utils/addElement';

/**
 * It creates a DOM element that contains a dropdown menu
 * @returns A function that returns an object with a method getDropdownMenuDOM
 */
export default function dropdownMenuFactory() {
    /**
     * It creates a dropdown menu with a list of options
     * @returns the DOM element of the dropdown menu.
     */
    function getDropdownMenuDOM() {
        const main = document.querySelector('#main');
        const media = addElement(main, 'section', '', {
            class: 'photographer_media',
        });
        const heading = document.createElement('span');
        heading.classList.add('photographer_media_heading');
        heading.textContent = 'Trier par ';
        heading.setAttribute('role', 'heading');
        heading.setAttribute('aria-level', '2');
        media.appendChild(heading);
        const dropdownMenu = addElement(media, 'div', '', {
            class: 'dropdown-menu',
        });
        addElement(media, 'div', '', {
            class: 'photographer_media-user',
        });
        addElement(dropdownMenu, 'input', '', {
            class: 'dropdown-menu_switch',
            type: 'checkbox',
            id: 'filter-switch',
            name: 'filter-switch',
            hidden: true,
        });
        const labelFilter = addElement(dropdownMenu, 'label', '', {
            class: 'dropdown-menu_options-filter',
            for: 'filter-switch',
        });
        const ulFilter = addElement(labelFilter, 'ul', '', {
            class: 'dropdown-menu_filter',
            role: 'listbox',
            tabindex: '0',
            'aria-label':
                'filtrer les media par date ou popularité ou par titre',
        });
        addElement(ulFilter, 'li', 'Popularité', {
            class: 'dropdown-menu_filter-selected',
            role: 'option',
            'aria-selected': 'true',
        });
        const li = addElement(ulFilter, 'li', '', {});
        const ulSelect = addElement(li, 'ul', '', {
            class: 'dropdown-menu_select',
            role: 'listbox',
            tabindex: '0',
            'aria-label':
                'filtrer les media par date ou popularité ou par titre',
        });

        addElement(ulSelect, 'li', 'Popularité', {
            class: 'dropdown-menu_select-option dropdown-menu_selected-option-hidden',
            role: 'option',
            tabindex: '0',
            'aria-label': 'Popularité',
        });
        addElement(ulSelect, 'li', 'Date', {
            class: 'dropdown-menu_select-option',
            role: 'option',
            tabindex: '0',
            'aria-label': 'Date',
        });
        addElement(ulSelect, 'li', 'Titre', {
            class: 'dropdown-menu_select-option',
            role: 'option',
            tabindex: '0',
            'aria-label': 'Titre',
        });
        return media;
    }

    return { getDropdownMenuDOM };
}
