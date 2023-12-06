function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('form');
    const sendButton = contactForm.querySelector('.contact_button');

    sendButton.addEventListener('click', function (e) {
        e.preventDefault();
        const formInputs = contactForm.querySelectorAll('.text-control');

        const formData = {};

        formInputs.forEach(input => {
            // Récupérez l'ID et la valeur de chaque champ de saisie
            const inputId = input.id;
            const inputValue = input.value;

            // Stockez la valeur dans l'objet formData avec le nom du champ comme clé
            formData[inputId] = inputValue;
            closeModal()
        });

        // Affichez les données du formulaire dans la console
        console.log('Données du formulaire :', formData);
    });
});