

document.addEventListener('DOMContentLoaded', function () {
    const photographMedia = document.querySelector('.photograph-media');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');

    let currentMediaIndex = 0;
    let mediaList = [];

    photographMedia.addEventListener('click', function (event) {
        const clickedArticle = event.target.closest('.MediaArticle');

        if (clickedArticle) {
            console.log('Article clicked');
            // Mise à jour de la liste des médias et de l'index actuel
            mediaList = Array.from(document.querySelectorAll('.MediaArticle'));
            currentMediaIndex = mediaList.indexOf(clickedArticle);

            // Affichez la lightbox avec le média cliqué
            openLightbox(mediaList[currentMediaIndex]);
        }
    });

    function openLightbox(mediaArticle) {
        const mediaPath = mediaArticle.querySelector('img, video').getAttribute('src');
        const mediaType = mediaArticle.querySelector('video') ? 'video' : 'image';
        const mediaTitle = mediaArticle.querySelector('h3').textContent;


        if (mediaType === 'image') {
            lightboxImage.src = mediaPath;
            lightboxImage.style.display = 'block';
            lightboxVideo.style.display = 'none';
        } else if (mediaType === 'video') {
            lightboxVideo.src = mediaPath;
            lightboxVideo.style.display = 'block';
            lightboxImage.style.display = 'none';
        }

        lightbox.style.display = 'flex';
        lightboxTitle.style.display = 'block';
        lightboxTitle.textContent = mediaTitle;
    }


    document.querySelector('.fa-solid.fa-angle-left').addEventListener('click', function () {
        showPreviousMedia();
    });

    document.querySelector('.fa-solid.fa-angle-right').addEventListener('click', function () {
        showNextMedia();
    });

    function showPreviousMedia() {
        currentMediaIndex = (currentMediaIndex - 1 + mediaList.length) % mediaList.length;
        openLightbox(mediaList[currentMediaIndex]);
    }

    function showNextMedia() {
        currentMediaIndex = (currentMediaIndex + 1) % mediaList.length;
        openLightbox(mediaList[currentMediaIndex]);
    }
    //Ajout défilement au clavier + Escape au clavier
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                showPreviousMedia();
                break;
            case 'ArrowRight':
                showNextMedia();
                break;
            case 'Escape':
                closeLightbox();
                break;
        }
    });
});

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.style.display = 'none';
    lightbox.style.display = 'none';
    lightboxTitle.style.display = 'none';

}
