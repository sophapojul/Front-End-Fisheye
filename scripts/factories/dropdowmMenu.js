import addElement from '../utils/addElement';

export default function dropdownMenuFactory() {
    // const section = document.querySelector('.photographer_media');

    function getDropdownMenuDOM() {
        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu');
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
        });
        addElement(ulSelect, 'li', 'Date', {
            class: 'dropdown-menu_select-option',
            role: 'option',
        });
        addElement(ulSelect, 'li', 'Titre', {
            class: 'dropdown-menu_select-option',
            role: 'option',
        });
        // section.insertBefore(dropdownMenu, section.firstChild);
        // function closeDropdownMenu() {
        //     dropdownMenu.classList.remove('dropdown-menu_open');
        // }
        return dropdownMenu;
    }

    return { getDropdownMenuDOM };
}

// .dropdown {
//     width: 170px;
//     background-color:#901C1C;
//     font-family: 'Lato', sans-serif;
// &__switch:checked + &__options-filter &__select {
//         transform: scaleY(1);
//     }
//
// &__switch:checked + &__options-filter &__filter:after {
//         transform: rotate(-135deg);
//     }
//
// &__options-filter {
//         width: 100%;
//         cursor: pointer;
//     }
//
// &__filter {
//         position: relative;
//         display: flex;
//         padding: 20px;
//         color: white;
//         background-color: #901C1C;
//         border-radius: 5px 5px 0 0;
//         font-size: 14px;
//         text-transform: uppercase;
//         transition: .3s;
//
//     &:focus {
//             border: 1px solid #918FF4;
//             border-color: #000;
//             outline: none;
//         }
//
//     &::after {
//             position: absolute;
//             top: 45%;
//             right: 20px;
//             content: '';
//             color: #fff;
//             width: 10px;
//             height: 10px;
//             border-right: 2px solid #595959;
//             border-bottom: 2px solid #595959;
//             transform: rotate(45deg) translateX(-45%);
//             transition: .2s ease-in-out;
//         }
//     }
//
// &__select {
//         position: absolute;
//         top: 100%;
//         left: 0;
//         width: 100%;
//         overflow: hidden;
//         background-color:#901C1C;
//         border-radius: 0 0 5px 5px;
//         transform: scaleY(0);
//         transform-origin: top;
//         font-weight: 300;
//         transition: .2s ease-in-out;
//     }
//
// &__select-option {
//         position: relative;
//         padding: 20px;
//         transition: .3s;
//
//     &:after {
//             content:'';
//             background: #fff;
//             position: absolute;
//             top: 1px;
//             left: 10px;
//             width: 90%;
//             height: 1px;
//         }
//
//     }
// }
// `<div className="dropdown">
//     <input type="checkbox" className="dropdown__switch" id="filter-switch" hidden />
//     <label htmlFor="filter-switch" className="dropdown__options-filter">
//         <ul className="dropdown__filter" role="listbox" tabIndex="-1">
//             <li className="dropdown__filter-selected" aria-selected="true">
//                 Popularité
//             </li>
//             <li>
//                 <ul className="dropdown__select">
//                     <li className="dropdown__select-option" role="option">
//                         Date
//                     </li>
//                     <li className="dropdown__select-option" role="option">
//                         Titre
//                     </li>
//                 </ul>
//             </li>
//         </ul>
//     </label>
// </div>`;

// Change option selected
// const label = document.querySelector('.dropdown__filter-selected');
// const options = Array.from(
//     document.querySelectorAll('.dropdown__select-option')
// );
//
// options.forEach((option) => {
//     option.addEventListener('click', () => {
//         label.textContent = option.textContent;
//     });
// });

// Close dropdown onclick outside
// document.addEventListener('click', (e) => {
//     const toggle = document.querySelector('.dropdown__switch');
//     const element = e.target;
//
//     if (element == toggle) return;
//
//     const isDropdownChild = element.closest('.dropdown__filter');
//
//     if (!isDropdownChild) {
//         toggle.checked = false;
//     }
// });
