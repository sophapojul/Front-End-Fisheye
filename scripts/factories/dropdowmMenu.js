import addElement from '../utils/addElement';

export default function dropdownMenuFactory() {
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
            tabindex: '-1',
        });
        addElement(ulFilter, 'li', 'Popularité', {
            class: 'dropdown-menu_filter-selected',
            role: 'option',
            'aria-selected': 'true',
        });
        const li = addElement(ulFilter, 'li', '', {});
        const ulSelect = addElement(li, 'ul', '', {
            class: 'dropdown-menu_select',
        });

        addElement(ulSelect, 'li', 'Popularité', {
            class: 'dropdown-menu_select-option',
            role: 'option',
            style: 'display: none;',
        });
        addElement(ulSelect, 'li', 'Date', {
            class: 'dropdown-menu_select-option',
            role: 'option',
        });
        addElement(ulSelect, 'li', 'Titre', {
            class: 'dropdown-menu_select-option',
            role: 'option',
        });
        return media;
    }

    return { getDropdownMenuDOM };
}
