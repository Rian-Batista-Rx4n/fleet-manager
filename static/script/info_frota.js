

// ---- Roleta ----
let currentIndex = 0;
const images = document.querySelectorAll(".agregado-img");
const deleteForm = document.getElementById("delete-form");
const agregadoSection = document.querySelector(".agregado-section");
const frotaId = agregadoSection.dataset.frota;

function showImage(index) {
    images.forEach((img, i) => img.classList.toggle("hidden", i !== index));
    deleteForm.action = `/delete_agregado/${frotaId}/${index}`;
}

// Navegação
document.getElementById("next-agregado").addEventListener("click", () => {
    if (images.length === 0) return;
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

document.getElementById("prev-agregado").addEventListener("click", () => {
    if (images.length === 0) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

showImage(currentIndex);
