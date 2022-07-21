import addElement from '../utils/addElement';

export default function mediaFactory(data) {
    const { photographerId, title, image, video, likes } = data;
    const userImage = `assets/images/${photographerId}/${image}`;
    const userVideo = `assets/images/${photographerId}/${video}`;
    const mediaUser = document.querySelector('.photographer_media');

    function getUserMediaDOM() {
        const figure = addElement(mediaUser, 'figure', '', {
            class: 'product',
        });

        function getUserVideo() {
            const vid = addElement(figure, 'video', '', {
                class: 'product-video',
                controls: 'controls',
                preload: 'metadata',
                'aria-labelledBy': 'product-title',
                src: `${userVideo}`,
            });
            addElement(vid, 'source', '', {
                src: `${userVideo}#t=0.1`,
                type: 'video/mp4',
                controls: 'controls',
            });
        }

        function getUserImage() {
            addElement(figure, 'img', '', {
                class: 'product-img',
                src: userImage,
                alt: title,
                tabindex: 0,
            });
        }

        if (video) {
            getUserVideo();
        } else {
            getUserImage();
        }
        const figcaption = addElement(figure, 'figcaption', '', {
            class: 'product-figcaption',
            tabindex: 0,
        });
        figcaption.innerHTML = `
        ${title}
        <span class="product-likes" aria-live="assertive">${likes}<span class="likes">likes</span> </span>
        <svg width="19" height="19" viewBox="0 0 19 19" class="product-heart" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="currentcolor"/>
        </svg>
        `;
        return figure;
    }

    return { getUserMediaDOM };
}
