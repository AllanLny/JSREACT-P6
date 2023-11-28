
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
            console.error('Modal title error');
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


        const totalLikes = calculateTotalLikes(mediaList);

        const totalLikesElement = document.createElement('h5');
        totalLikesElement.classList.add('total-likes');
        totalLikesElement.textContent = ` ${totalLikes}  `;

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-solid', 'fa-heart', 'totalLikeHeart');
        const populaireTarif = document.querySelector('.populaire-tarif');
        populaireTarif.appendChild(totalLikesElement);
        populaireTarif.appendChild(heartIcon);


        const selectElement = document.getElementById('sort');

        selectElement.addEventListener('change', () => {
            const sortBy = selectElement.value;
            sortMedia(sortBy, mediaList);
        });

    } catch (error) {
        console.error('Erreur lors de l\'affichage des médias du photographe:', error);
    }
    const mediaList = await getPhotographerMedia(photographerId);


    // La fonction de tri
    function sortMedia(sortBy) {

        switch (sortBy) {
            case 'popularité':
                mediaList.sort((a, b) => b.likes - a.likes);
                break;
            case 'date':
                mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'titre':
                mediaList.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
            // Aucun tri par défaut
        }
        updateMediaDisplay();
    }

    // La fonction pour mettre à jour l'affichage avec la nouvelle liste triée
    function updateMediaDisplay() {
        const photographMedia = document.querySelector('.photograph-media');

        // Effacer le contenu actuel
        photographMedia.innerHTML = '';
        mediaList.forEach((mediaData) => {
            const mediaTemplate = MediaTemplate(mediaData);
            const mediaDOM = mediaTemplate.getMediaDOM();
            photographMedia.appendChild(mediaDOM);
        });
    }
}

// Fonction pour calculer le total des likes des médias
function calculateTotalLikes(mediaList) {
    return mediaList.reduce((sum, media) => sum + media.likes, 0);
}

