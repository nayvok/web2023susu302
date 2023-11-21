const urlApi = "https://jsonplaceholder.typicode.com/";
const container = document.getElementById("posts");



// Функция смены темы
const swithTheme = () => {
    const rootElem = document.documentElement;
    let dataTheme = rootElem.getAttribute("data-theme"), newTheme;
    newTheme = (dataTheme === "light") ? "dark" : "light";
    rootElem.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
}

// Функция октрытия модального окна
const openModal = (element) => {
    document.getElementById(element).classList.add('modal-container_visible');
}

// Функция закрытия модального окна
const closeModal = (element) => {
    document.getElementById(element).classList.remove('modal-container_visible');
}



let users = [];
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

// Загрузка постов из api при запуске странички
document.addEventListener("DOMContentLoaded", () => {
    fetch(urlApi + 'users')
    .then(response => response.json())
    .then(json => {
        for (let key in json) {
            let user = new User(json[key].id, json[key].name)
            users.push(user);
        }
    });

    fetch(urlApi + 'posts')
        .then(response => response.json())
        .then(json => {
            for (let key in json) {
                const currentPost = json[key];
                const author = users.find(user => user.id === currentPost.userId);

                container.innerHTML += `
                    <div class="card" id="${currentPost.id}">
                    <div class="card__header">
                        <h3>${currentPost.title}</h3>
                        <div class="card__header-right">
                            <p>${author.name}</p>
                            <div class="card__menu">
                                <img src="/assets/edit.svg" class="edit" onclick="editCard(this)">
                                <img src="/assets/delete.svg" class="delete" onclick="deleteCard(this)">
                            </div>
                        </div>
                    </div>
                    <div class="card__description">
                        <p>${currentPost.body}</p>
                    </div>
                `
            }
        });
});
