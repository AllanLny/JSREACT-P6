async function getPhotographers() {
    try {
        // Use the fetch API to load data from the JSON file
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error('Failed to fetch photographers data');
        }

        const data = await response.json();
        const photographers = data.photographers;

        return {
            photographers: photographers
        };
    } catch (error) {
        console.error('Error fetching photographers:', error);
        return {
            photographers: [] // Return an empty array in case of an error
        };
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();