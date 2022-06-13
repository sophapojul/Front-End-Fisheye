import '../../css/style.scss';
import { displayModal, closeModal } from '../utils/contactForm';

const contactBtn =document.querySelector('.contact_button');
contactBtn.addEventListener('click', displayModal);

const modalClose = document.querySelector('#modal_close');
modalClose.addEventListener('click', closeModal);