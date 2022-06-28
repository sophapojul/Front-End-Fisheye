import addElement from '../utils/addElement';

export default function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes } = data;
    // const heart = `assets/icons/heart.svg`;
    const userImage = `assets/images/${photographerId}/${image}`;
    const userVideo = `assets/images/${photographerId}/${video}`;
    const mediaUser = document.querySelector('.photographer_media-user');

    function getUserMediaDOM() {
        const article = addElement(mediaUser, 'article', '', {
            class: 'product',
        });

        function setUserVideo() {
            const a = addElement(article, 'a', '', {
                href: userVideo,
            });
            const vid = addElement(a, 'video', '', {
                class: 'product-video',
                controls: true,
                preload: 'metadata',
            });
            addElement(vid, 'source', '', {
                src: `${userVideo}#t=0.1`,
                type: 'video/mp4',
            });
        }

        function setUserImage() {
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

        video ? setUserVideo() : setUserImage();
        const footer = addElement(article, 'footer', '', {
            class: 'product-footer',
        });
        footer.innerHTML = `
        <p class="product-title">${title}</p>
        <span class="product-likes">${likes}</span>
        <svg width="19" height="19" viewBox="0 0 19 19" class="product-heart" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="currentcolor"/>
        </svg>
        `;
        // addElement(footer, 'p', title, { class: 'product-title' });
        // addElement(footer, 'span', likes, { class: 'product-likes' });
        // addElement(footer, 'img', '', {
        //     class: 'product-heart',
        //     alt: 'likes',
        //     role: 'img',
        //     src: heart,
        // });
        return article;
    }

    return { getUserMediaDOM };
}
