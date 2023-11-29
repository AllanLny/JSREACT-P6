function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
    // Sélectionnez le formulaire et le bouton Envoyer
    const contactForm = document.querySelector('form');
    const sendButton = contactForm.querySelector('.contact_button');

    // Ajoutez un gestionnaire d'événements au clic sur le bouton Envoyer
    sendButton.addEventListener('click', function (e) {
        // Empêchez le comportement par défaut du formulaire (rechargement de la page)
        e.preventDefault();

        // Sélectionnez tous les champs de saisie du formulaire
        const formInputs = contactForm.querySelectorAll('.text-control');

        // Créez un objet pour stocker les données du formulaire
        const formData = {};

        // Parcourez chaque champ de saisie
        formInputs.forEach(input => {
            // Récupérez l'ID et la valeur de chaque champ de saisie
            const inputId = input.id;
            const inputValue = input.value;

            // Stockez la valeur dans l'objet formData avec le nom du champ comme clé
            formData[inputId] = inputValue;
        });

        // Affichez les données du formulaire dans la console
        console.log('Données du formulaire :', formData);

    });
});