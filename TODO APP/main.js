const urlApi = "https://jsonplaceholder.typicode.com/";
const container = document.getElementById("posts");



// Функция смены темы
function swithTheme() {
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


// Массив пользователей, включающий в себя объекты User
let users = [];
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}


// Функция получения данных пользователей из api
async function getUsers(){
    let data = [];
    await fetch(urlApi + 'users')
    .then(response => response.json())
    .then(json => {
        for (let key in json) {
            let user = new User(json[key].id, json[key].name)
            data.push(user);
        }
    });
    return data;
}


// Темплейт карточки
const cardTemplate = (id, title, author, description) => {
    return `
        <div class="card" id="${id}">
        <div class="card__header">
            <h3>${title}</h3>
            <div class="card__header-right">
                <p>${author}</p>
                <div class="card__menu">
                    <img src="/assets/edit.svg" class="edit" onclick="editCard(this)">
                    <img src="/assets/delete.svg" class="delete" onclick="deleteCard(this)">
                </div>
            </div>
        </div>
        <div class="card__description">
            <p>${description}</p>
        </div>
    `
}


// Функция проверки cardId
let cardId = 0;
function checkCardId(num) {
    if (cardId < num){
        cardId = num
    }
}


// Функция загрузки постов из api и localStorage
async function loadPosts(){
    await fetch(urlApi + 'posts')
    .then(response => response.json())
    .then(json => {
        json.forEach(element => {
            const author = users.find(user => user.id === element.userId);
            checkCardId(element.id);
            container.innerHTML += cardTemplate(element.id, element.title, author.name, element.body)
        });
    });

    for (let i = 0; i < localStorage.length; ++i) {
        const keyLocalStorage = localStorage.key(i);
        if (keyLocalStorage.includes("card")) {
            const data = JSON.parse(localStorage.getItem(keyLocalStorage))
            checkCardId(data.id);
            container.innerHTML += cardTemplate(data.id, data.title, data.author, data.description)
        };
    }
}


// Выполнение функий при запуске страницы
document.addEventListener("DOMContentLoaded", async () => {
    users = await getUsers();
    await loadPosts();

});


// Функция создания карточки пользователем, сохранения в localStorage и вывод на страницу
function createCard() {
    let title = document.getElementById("title");
    let description = document.getElementById("main");
    let author = document.getElementById("author");

    cardId += 1;
    let data = {
        id: cardId,
        title: title.value,
        description: description.value,
        author: author.value
    }

    localStorage.setItem(`card${cardId}`, JSON.stringify(data));

    container.innerHTML += cardTemplate(cardId, title.value, author.value, description.value);

    title.value = '';
    description.value = '';
    author.value = '';
    closeModal('createModel');
};


// Функция удаления поста
function deleteCard(element) {
    const parent = element.closest(".card");
    parent.remove();
    localStorage.removeItem(`card${parent.id}`);
};


function editCard(element) {
    const parent = element.closest(".card");
    let title = parent.querySelector("h3").textContent;
    let main = parent.querySelector(".card__description").querySelector("p").textContent;

    const modal = document.getElementById("editModel");
    modal.querySelector("#title").value = title;
    modal.querySelector("#main").value = title;

    openModal("editModel");


};