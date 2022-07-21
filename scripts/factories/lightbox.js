import addElement from '../utils/addElement';

export default function lightboxFactory(images) {
    function getImageDOM(link) {
        // const alt = link.split('/').pop().split('.')[0].split('_').join(' ');
        // const alt = link.split('/').pop().split('.')[0].replaceAll(/_/g, ' ');
        const alt = link.replace(/^.*[\\/]|\.[^.]+$/g, '').replace(/_/g, ' ');
        const figure = document.querySelector('.lightbox_figure');
        const extension = link.split('.')[1];
        figure.innerHTML = '';
        if (extension === 'mp4') {
            addElement(figure, 'video', '', {
                src: link,
                title: alt,
                'aria-labelledBy': 'lightbox_title',
                controls: true,
                className: 'lightbox_media',
            });
        } else {
            addElement(figure, 'img', '', {
                class: 'lightbox_media',
                src: link,
                alt,
                'aria-labelledBy': 'lightbox_title',
            });
        }
        addElement(figure, 'figcaption', `${alt}`, {
            class: 'lightbox_title',
            id: 'lightbox_title',
            'aria-hidden': 'true',
        });
    }

    function getLightboxDOM() {
        const lightbox = addElement(document.body, 'div', '', {
            class: 'lightbox',
            role: 'dialog',
            'aria-hidden': 'false',
            'aria-modal': 'true',
            'aria-labelledBy': 'lightbox_title',
        });
        const container = addElement(lightbox, 'div', '', {
            id: 'lightbox_container',
            class: 'lightbox_container',
        });
        addElement(container, 'figure', '', {
            class: 'lightbox_figure',
            tabindex: '0',
        });
        addElement(lightbox, 'button', '', {
            class: 'lightbox_next',
            role: 'button',
            'aria-label': 'Va au media suivant',
        });
        addElement(lightbox, 'button', '', {
            class: 'lightbox_close',
            role: 'button',
            'aria-label': 'Ferme la fenêtre de dialogue',
        });
        addElement(lightbox, 'button', '', {
            class: 'lightbox_prev',
            role: 'button',
            'aria-label': 'Va au media précédent',
        });

        function closeLightbox(e, previousElement) {
            e.preventDefault();
            document.body.classList.remove('no-scroll');
            lightbox.remove();
            document.querySelectorAll('[inert]').forEach((element) => {
                element.removeAttribute('inert');
            });
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('click', closeLightbox);
            previousElement.focus();
        }

        function currentIndex(e) {
            e.preventDefault();
            const currentImg = document.querySelector('#lightbox_container')
                .firstElementChild.firstElementChild;
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

        function onKeyDown(e) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox(e, previousElement);
                    break;
                case 'ArrowLeft':
                    prevLightbox(e);
                    break;
                case 'ArrowRight':
                    nextLightbox(e);
                    break;
                default:
                    break;
            }
        }

        lightbox.addEventListener('keydown', onKeyDown);
        const close = lightbox.querySelector('.lightbox_close');
        const previousElement = document.activeElement;
        close.addEventListener('click', (e) => {
            closeLightbox(e, previousElement);
        });
        const prev = lightbox.querySelector('.lightbox_prev');
        prev.addEventListener('click', prevLightbox);
        const next = lightbox.querySelector('.lightbox_next');
        next.addEventListener('click', nextLightbox);

        return lightbox;
    }

    return { getLightboxDOM, getImageDOM };
}
