import addElement from '../utils/addElement';

export default function lightboxFactory(images) {
    function getImageDOM(link) {
        console.log(link);
        const alt = link.split('/').pop().split('.')[0].split('_').join(' ');
        const container = document.querySelector('.lightbox_container');
        const ext = link.split('.')[1];
        // if (link.includes('mp4')) {
        if (ext === 'mp4') {
            container.innerHTML = '';
            addElement(container, 'video', '', {
                class: 'lightbox_video',
                controls: true,
                src: link,
            });
        } else {
            container.innerHTML = '';
            addElement(container, 'div', '', {
                class: 'lightbox_loader',
            });
            const image = document.createElement('img');
            image.setAttribute('src', link);
            image.setAttribute('alt', alt);
            image.setAttribute('class', 'lightbox_image');
            image.onload = function () {
                container.innerHTML = '';
                container.appendChild(image);
            };
        }
    }

    function getLightboxDOM() {
        const lightbox = addElement(document.body, 'div', '', {
            class: 'lightbox',
            role: 'dialog',
            'aria-hidden': 'true',
            'aria-modal': 'false',
            'aria-labelledby': 'contact_modal_title',
            style: 'display: block',
        });
        addElement(lightbox, 'button', '', {
            class: 'lightbox_close',
        });
        addElement(lightbox, 'button', '', {
            class: 'lightbox_prev',
        });
        addElement(lightbox, 'button', '', {
            class: 'lightbox_next',
        });
        addElement(lightbox, 'div', '', {
            id: 'lightbox_container',
            class: 'lightbox_container',
        });

        function closeLightbox(e) {
            e.preventDefault();
            lightbox.remove();
            document.removeEventListener('click', closeLightbox);
            document.removeEventListener('keydown', onKeyUp);
        }

        function currentIndex(e) {
            e.preventDefault();
            const currentImg = document.querySelector(
                '#lightbox_container'
            ).firstElementChild;
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

        function onKeyUp(e) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox(e);
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

        document.addEventListener('keydown', onKeyUp);
        const close = lightbox.querySelector('.lightbox_close');
        close.addEventListener('click', closeLightbox);
        const prev = lightbox.querySelector('.lightbox_prev');
        prev.addEventListener('click', prevLightbox);
        const next = lightbox.querySelector('.lightbox_next');
        next.addEventListener('click', nextLightbox);

        return lightbox;
    }

    return { getLightboxDOM, getImageDOM };
}
