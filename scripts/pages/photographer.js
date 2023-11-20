const main = document.querySelector('main')

async function getPhotographers() {
    try {
        // Utilisez l'API fetch pour charger les données à partir du fichier JSON
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error('Échec du chargement des données des photographes');
        }

        const data = await response.json();
        const photographers = data.photographers;

        return {
            photographers: photographers
        };
    } catch (error) {
        console.error('Erreur lors du chargement des photographes:', error);
        return {
            photographers: [] // Retourne un tableau vide en cas d'erreur
        };
    }
}
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photograph-header');

    // Récupère l'ID depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'));

    if (!photographerId) {
        console.error('Pas de photographe avec cet ID');
        return;
    }

    // Filtrer le photographe spécifique par ID
    const specificPhotographer = photographers.find(photographer => photographer.id === photographerId);

    if (specificPhotographer) {
        // Afficher les données du photographe spécifique
        const photographerModel = photographerTemplate(specificPhotographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);

        // Afficher les médias du photographe spécifique
        await displayPhotographerMedia(photographerId);
    } else {
        console.error('Pas de photographe avec cet ID');
    }
    function setModalPhotographerName() {
        const modalTitle = document.querySelector('.modal-title');

        if (modalTitle) {
            modalTitle.textContent = 'Contactez-moi\n' + specificPhotographer.name;

        } else {
            console.error('Modal title element not found');
        }
    }

    setModalPhotographerName();
}


async function init() {
    // Récupère les données des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}
init();

function MediaTemplate(data) {
    const { photographerId, title, image, video, likes } = data;

    const mediaPath = video ? `assets/photos/${video}` : `assets/photos/${image}`;

    function getMediaDOM() {

        const article = document.createElement('article');
        if (video) {
            const videoElement = document.createElement('video');
            videoElement.setAttribute('src', mediaPath);
            videoElement.setAttribute('alt', title);
            videoElement.setAttribute('controls', true);
            article.appendChild(videoElement);
        } else {
            const imageElement = document.createElement('img');
            imageElement.setAttribute('src', mediaPath);
            imageElement.setAttribute('alt', title);
            article.appendChild(imageElement);
        }
        const divTxt = document.createElement('div');
        divTxt.classList.add("txt-media")
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        const likesElement = document.createElement('span');
        likesElement.textContent = likes;
        likesElement.classList.add(".like-span")
        const heartIcon = document.createElement('span');
        heartIcon.classList.add('fa-solid', 'fa-heart');
        likesElement.appendChild(heartIcon);

        divTxt.appendChild(titleElement);
        divTxt.appendChild(likesElement);
        article.appendChild(divTxt);

        return article;
    }

    return { photographerId, title, image, video, likes, getMediaDOM };
}

async function getPhotographerMedia(photographerId) {
    try {
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error('Échec du chargement des médias');
        }
        const data = await response.json();
        const mediaList = data.media.filter(media => media.photographerId === photographerId);

        return mediaList;
    } catch (error) {
        console.error('Erreur lors du chargement des médias du photographe:', error);
        return [];
    }
}
async function displayPhotographerMedia(photographerId) {
    try {
        const mediaList = await getPhotographerMedia(photographerId);

        const photographMedia = document.querySelector('.photograph-media');

        mediaList.forEach((mediaData) => {
            const mediaTemplate = MediaTemplate(mediaData);
            const mediaDOM = mediaTemplate.getMediaDOM();

            photographMedia.appendChild(mediaDOM);
        });
    } catch (error) {
        console.error('Erreur lors de l\'affichage des médias du photographe:', error);
    }
}


