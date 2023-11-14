const swithTheme = () => {
    const rootElem = document.documentElement;
    let dataTheme = rootElem.getAttribute("data-theme"), newTheme;
    newTheme = (dataTheme === "light") ? "dark" : "light";
    rootElem.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
}

document.querySelector(".toggle-theme").addEventListener('click', swithTheme);









const openModal = () => {
    document.querySelector(".modal-container").classList.add('modal-container_visible');
}
const closeModal = () => {
    document.querySelector(".modal-container").classList.remove('modal-container_visible');
}

document.querySelector(".create-btn").addEventListener('click', openModal);
document.querySelector(".modal-container__close").addEventListener('click', closeModal);

