const urlApi = "https://jsonplaceholder.typicode.com/";
const container = document.getElementById("posts");
const selectAuthor = document.getElementById("select-author");
const postsImportant = document.getElementById("posts-important");

// Функция смены темы
function switchTheme() {
  const rootElem = document.documentElement;
  let dataTheme = rootElem.getAttribute("data-theme"),
    newTheme;
  newTheme = dataTheme === "light" ? "dark" : "light";
  rootElem.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// Функция октрытия модального окна
const openModal = (element) => {
  document.getElementById(element).classList.add("modal-container_visible");
};

// Функция закрытия модального окна
const closeModal = (element) => {
  document.getElementById(element).classList.remove("modal-container_visible");
};

const preloader = (value) => {
  if (value === "start") {
    document.getElementById("loader").classList.add("container_loader-visible");
    document.querySelector("body").style.overflow = "hidden";
  }
  if (value === "end") {
    document
      .getElementById("loader")
      .classList.remove("container_loader-visible");
    document.querySelector("body").style.overflow = "visible";
  }
};

// Массив пользователей, включающий в себя объекты User
let users = [];
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

// Функция получения данных пользователей из api
async function getUsers() {
  let data = [];
  await fetch(urlApi + "users")
    .then((response) => response.json())
    .then((json) => {
      for (let key in json) {
        let user = new User(json[key].id, json[key].name);
        data.push(user);
      }
    });
  return data;
}

// Темплейт карточки
const cardTemplate = (id, title, author, description, important) => {
  let bookmark = "";
  let bookmarkStyle = 'style="border: solid 2px #d72dbb; border-radius: 20px;"';
  if (important !== "important") {
    bookmark =
      '<img src="./assets/bookmark.svg" class="bookmark" onclick="importantCard(this)" alt="Добавить в важоне"></img>';
    bookmarkStyle = "";
  }
  return `
        <div class="card" id="${id}" ${bookmarkStyle}>
        <div class="card__header">
            <h3>${title}</h3>
            <div class="card__header-right">
                <p>${author}</p>
                <div class="card__menu">
                    <img src="./assets/edit.svg" class="edit" onclick="editCard(this)" alt="Редактировать">
                    ${bookmark}
                    <img src="./assets/delete.svg" class="delete" onclick="deleteCard(this)" alt="Удалить">
                </div>
            </div>
        </div>
        <div class="card__description">
            <p>${description}</p>
        </div>
    `;
};

// Функция проверки cardId
let cardId = 0;
function checkCardId(num) {
  if (cardId < num) {
    cardId = num;
  }
}

// Функция загрузки постов из api и localStorage
async function loadPosts() {
  container.innerHTML = "";
  postsImportant.innerHTML = "";
  preloader("start");
  let importantCard = [];
  for (let i = 0; i < localStorage.length; ++i) {
    const keyLocalStorage = localStorage.key(i);
    if (keyLocalStorage.includes("important")) {
      importantCard.push(Number(localStorage.getItem(keyLocalStorage)));
    }
  }

  await fetch(urlApi + "posts")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((element) => {
        const author = users.find((user) => user.id === element.userId);
        checkCardId(element.id);
        if (importantCard.includes(element.id)) {
          postsImportant.innerHTML += cardTemplate(
            element.id,
            element.title,
            author.name,
            element.body,
            "important"
          );
        } else {
          container.innerHTML += cardTemplate(
            element.id,
            element.title,
            author.name,
            element.body
          );
        }
      });
    });

  for (let i = 0; i < localStorage.length; ++i) {
    const keyLocalStorage = localStorage.key(i);
    if (keyLocalStorage.includes("card")) {
      const data = JSON.parse(localStorage.getItem(keyLocalStorage));
      const author = users.find((user) => user.id === Number(data.author));
      checkCardId(data.id);
      if (importantCard.includes(data.id)) {
        postsImportant.innerHTML += cardTemplate(
          data.id,
          data.title,
          author.name,
          data.description,
          "important"
        );
      } else {
        container.innerHTML += cardTemplate(
          data.id,
          data.title,
          author.name,
          data.description
        );
      }
    }
  }

  for (let i = 0; i < users.length; ++i) {
    selectAuthor.innerHTML += `<option value="${users[i].id}">${users[i].name}</option>`;
  }

  preloader("end");
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
  let author = document.getElementById("select-author");

  cardId += 1;
  let data = {
    id: cardId,
    title: title.value,
    description: description.value,
    author: author.value,
  };

  const authorId = users.find((user) => user.id === Number(author.value));
  localStorage.setItem(`card${cardId}`, JSON.stringify(data));

  container.innerHTML += cardTemplate(
    cardId,
    title.value,
    authorId.name,
    description.value
  );

  title.value = "";
  description.value = "";
  closeModal("createModel");
}

// Функция удаления поста
async function deleteCard(element) {
  const parent = element.closest(".card");
  const cardId = parent.id;

  for (let i = 0; i < localStorage.length; ++i) {
    const keyLocalStorage = localStorage.key(i);
    if (keyLocalStorage.includes("important")) {
      let info = confirm("Вы уверены, что хотите удалить этот пост?");
      if (info === true) {
        parent.remove();
      } else {
        return;
      }
    }
    if (keyLocalStorage.includes(parent.id)) {
      localStorage.removeItem(keyLocalStorage);
    }
  }

  await loadPosts();
}

// Функция обновления данных в localStorage
function updateLocalStorage(cardKey, titleValue, descriptionValue) {
  const data = localStorage.getItem(`card${cardKey}`);
  if (data) {
    const parseData = JSON.parse(data);
    parseData.title = titleValue;
    parseData.description = descriptionValue;
    localStorage.setItem(`card${cardKey}`, JSON.stringify(parseData));
  }
}

// Функция редактирования карточки
function editCard(element) {
  const parent = element.closest(".card");
  const title = parent.querySelector("h3");
  const main = parent.querySelector(".card__description").querySelector("p");

  const modal = document.getElementById("editModel");
  modal.querySelector("#title").value = title.textContent;
  modal.querySelector("#main").value = main.textContent;

  openModal("editModel");

  modal.querySelector(".form-button").addEventListener("click", () => {
    updateLocalStorage(
      parent.id,
      modal.querySelector("#title").value,
      modal.querySelector("#main").value
    );
    title.textContent = modal.querySelector("#title").value;
    main.textContent = modal.querySelector("#main").value;
    closeModal("editModel");
  });
}

async function importantCard(element) {
  const parent = element.closest(".card");
  localStorage.setItem(`${parent.id}important`, parent.id);
  parent.id += "important";
  await loadPosts();
}
