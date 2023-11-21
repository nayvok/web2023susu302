const swithTheme = () => {
    const rootElem = document.documentElement;
    let dataTheme = rootElem.getAttribute("data-theme"), newTheme;
    newTheme = (dataTheme === "light") ? "dark" : "light";
    rootElem.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
}


const openModal = (element) => {
    document.getElementById(element).classList.add('modal-container_visible');
}


const closeModal = (element) => {
    document.getElementById(element).classList.remove('modal-container_visible');
}
