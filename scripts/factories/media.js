import addElement from '../utils/addElement';

export default function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes } = data;
    const heart = `assets/icons/heart.svg`;
    const userImage = `assets/images/${photographerId}/${image}`;
    const userVideo = `assets/images/${photographerId}/${video}`;
    const mediaUser = document.querySelector('.photographer_media-user');

    function getUserMediaDOM() {
        const article = addElement(mediaUser, 'article', '', {
            class: 'product',
        });
        if (video) {
            const a = addElement(article, 'a', '', {
                href: userVideo,
            });
            addElement(a, 'video', '', {
                class: 'product-video',
                controls: true,
                src: userVideo,
            });
        } else {
            const a = addElement(article, 'a', '', {
                href: userImage,
            });
            addElement(a, 'img', '', {
                class: 'product-img',
                src: userImage,
                alt: title,
                id,
            });
        }
        const footer = addElement(article, 'footer', '', {
            class: 'product-footer',
        });
        addElement(footer, 'p', title, { class: 'product-title' });
        addElement(footer, 'span', likes, { class: 'product-likes' });
        addElement(footer, 'img', '', {
            class: 'product-heart',
            alt: 'likes',
            role: 'img',
            src: heart,
        });
        return article;
    }

    return { getUserMediaDOM };
}
