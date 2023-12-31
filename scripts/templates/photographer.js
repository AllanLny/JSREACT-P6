function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const Profilepicture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const anchor = document.createElement('a');
        anchor.setAttribute("href", "photographer.html?id=" + id)
        anchor.setAttribute("aria-label", "Bouton d'ancre pour accéder à la page du photographe" + " " + name);
        const img = document.createElement('img');
        img.setAttribute("src", Profilepicture);
        img.setAttribute("alt", "Photo du photographe" + " " + name)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        const h5 = document.createElement('h5');
        h5.textContent = price + "€/jour";
        article.appendChild(anchor);
        anchor.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);


    }
    return { name, Profilepicture, city, country, id, getUserCardDOM }
}

function MediaTemplate(data) {
    const { photographerId, title, image, video, likes, date } = data;

    const mediaPath = video ? `assets/photos/${video}` : `assets/photos/${image}`;

    function getMediaDOM() {

        const article = document.createElement('article');
        article.setAttribute("class", "MediaArticle")
        if (video) {
            const videoElement = document.createElement('video');
            videoElement.setAttribute("class", "MediaImgOrVideo");
            videoElement.setAttribute('src', mediaPath);
            videoElement.setAttribute('alt', "Vidéo de " + title);
            videoElement.setAttribute('controls', true);
            article.appendChild(videoElement);
        } else {
            const imageElement = document.createElement('img');
            imageElement.setAttribute("class", "MediaImgOrVideo");
            imageElement.setAttribute('src', mediaPath);
            imageElement.setAttribute('alt', "Photographie de " + title);
            article.appendChild(imageElement);
        }
        const divTxt = document.createElement('div');
        divTxt.classList.add("txt-media");
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        const likesElement = document.createElement('span');
        likesElement.textContent = likes;
        likesElement.classList.add(".like-span");
        const heartBtn = document.createElement('btn');
        heartBtn.classList.add('heartBtn');
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-solid', 'fa-heart');
        heartBtn.appendChild(heartIcon);
        divTxt.appendChild(titleElement);
        divTxt.appendChild(likesElement);
        divTxt.appendChild(heartBtn);
        article.appendChild(divTxt);


        heartBtn.addEventListener('click', liked);


        function liked() {
            const populaireTarif = document.querySelector(".populaire-tarif");
            const AllLike = populaireTarif.querySelector(".total-likes");

            const Liked = heartBtn.classList.contains("Liked");

            if (!Liked) {
                // Ajouter la classe Liked et + 1
                heartBtn.classList.add("Liked");
                likesElement.textContent = Number(likesElement.textContent) + 1;
                AllLike.textContent = Number(AllLike.textContent) + 1;
            } else {
                // Supprimer la classe Liked et - 1
                heartBtn.classList.remove("Liked");
                likesElement.textContent = Number(likesElement.textContent) - 1;
                AllLike.textContent = Number(AllLike.textContent) - 1;
            }
        }

        return article;
    }

    return { photographerId, title, image, video, likes, date, getMediaDOM };
}
