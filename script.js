//DOM ELEMENTS
let API = "http://localhost:8000/person"
const mainPage = document.querySelector(".main-page");
const loginPage = document.querySelector(".login-page");
const middleContent = document.querySelector(".middle-content");
const btnTop = document.querySelector(".btn-top")
const newsFeedPage = document.querySelector(".feeds-page")
const loginModal = document.querySelector(".login-modal")
const modalX = document.querySelector(".login-modal i")
const logimFormBtn = document.querySelector(".login-form-btn")
const postBtn = document.querySelector(".post-btn")
const modalWrapper = document.querySelector(".modal-wrapper")
const modal = document.querySelector(".modal")
const postModalX = document.querySelector(".modal-header i")
const modalPostBtn = document.querySelector(".modal-header button")
const modalFooterPlus = document.querySelector(".modal-footer span")
const modalInput = document.querySelector(".modal-input")
const user = document.querySelector(".user")
const sidebar = document.querySelector(".sidebar")
const sidebarWrapper = document.querySelector(".sidebar-wrapper")
const xBtn = document.querySelector(".sidebar-header i")
const toogle = document.querySelector(".toggle")
const circle = document.querySelector(".circle")



// ---------------------------------------------------------------------- 

// MAIN PAGE 

const goToLoginPage = () => {
    mainPage.style.display = "none"
    loginPage.style.display = "grid"
}


middleContent.addEventListener("click", (e) => {
    if (e.target.classList[1] === "main-btn") {
        goToLoginPage()
    }
})


const inputUserInfo = document.querySelector(".user-info")
const inputPassword = document.querySelector(".password")
btnTop.addEventListener("click", () => {
    if (inputUserInfo.value !== "" && inputPassword.value !== "") {
        mainPage.style.display = "none"
        newsFeedPage.style.display = "block"
    } else {
        goToLoginPage()
        loginModal.style.display = "block"
    }
})
// Login Page
modalX.addEventListener("click", () => {
    loginModal.style.display = "none"
})

logimFormBtn.addEventListener("click", () => {
    const loginUserInfo = document.querySelector(".login-user-info")
    const loginPassword = document.querySelector(".login-password")

    if (loginUserInfo.value !== "" && loginPassword.value !== "") {
        loginPage.style.display = "none"
        newsFeedPage.style.display = "block"
    } else {
        loginModal.style.display = "block"
    }
})

// post modal 
postBtn.addEventListener("click", () => {
    modal.style.display = "block"
    modalWrapper.classList.add("modal-wrapper-display")
    if (modalWrapper.value !== "") {
        modalInput.value = "";
        changeOpacity(0.5)
    }
})

const changeOpacity = x => {
    modalPostBtn.style.opacity = x;
    modalFooterPlus.style.opacity = x;
}

postModalX.addEventListener("click", () => {
    modal.style.display = "none"
    modalWrapper.classList.remove("modal-wrapper-display")

})

modalInput.addEventListener("keypress", (e) => {
    if (e.target.value !== "") {
        changeOpacity(1)
    }
})

modalInput.addEventListener("blur", (e) => {
    if (e.target.value === '') {
        changeOpacity(0.5)
    }
})
// sidebar


user.addEventListener("click", () => {
    sidebar.classList.add("sidebar-display")
    sidebarWrapper.classList.add("sidebar-wrapper-display")
})

xBtn.addEventListener("click", () => {
    sidebar.classList.remove("sidebar-display")
    sidebarWrapper.classList.remove("sidebar-wrapper-display")
})

//dark mode

const darkElements1 = document.querySelectorAll(".dark-mode-1")
const darkElements2 = document.querySelectorAll(".dark-mode-2")
const lightTexts = document.querySelectorAll(".light-text")
const borders = document.querySelectorAll(".border")



toogle.addEventListener("click", () => {
    circle.classList.toggle("move")
    Array.from(darkElements1).map(darkEl1 => darkEl1.classList.toggle("dark-1"))
    Array.from(darkElements2).map(darkEl2 => darkEl2.classList.toggle("dark-2"))
    Array.from(lightTexts).map(lightText => lightText.classList.toggle("light"))
    Array.from(borders).map(border => border.classList.toogle("border-color"))
})



const modalPhoto = document.querySelector('.modal-photo')
const modalName = document.querySelector(".modal-name")
const modalText = document.querySelector('.modal-input')
const modalImg = document.querySelector('.urlImg')
const btnPost = document.querySelector('.btnAdd')
const sectionRead = document.querySelector('.section__read')
// console.log(modalPhoto, modalName, modalText, modalImg, btnPost)


// =========== Create start ============
function createPost(obj) {
    fetch(API, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(obj),
    }).then(() => readPost())
}

btnPost.addEventListener("click", () => {
    let obj = {
        photo: modalPhoto.value,
        name: modalName.value,
        text: modalText.value,
        image: modalImg.value,
    };
    createPost(obj);
    modalPhoto.value = "",
    modalName.value = "",
    modalText.value = "",
    modalImg.value = ""
});

btnPost.addEventListener('click', () => {
    if (inputUserInfo.value !== "" && inputPassword.value !== "") {
        mainPage.style.display = "none"
        newsFeedPage.style.display = "block"
    } else {
        goToLoginPage()
        loginModal.style.display = "block"
    }
    
})


// SEARCH START
let inpSearch = document.querySelector('.search-bar-input')
let searchValue = inpSearch.value;
inpSearch.addEventListener("input", (e) => {
    searchValue = e.target.value;
    readPost()
});
// SEARCH END

// read start
async function readPost() {
    let data = await fetch(`${API}?q=${searchValue}&_page=${currentPage}&_limit=${limit}`).then((res) => res.json())
    sectionRead.innerHTML = "";
    // console.log(data)
    data.forEach((person) => {
        let postCard = document.createElement("div");
        postCard.id = person.id;
        sectionRead.innerHTML += `
      <div class="">
      <div class="post border">
      <div class="user-avatar">
        <img src="${person.photo}" alt="" />
      </div>
      <div class="post-content">
        <div class="post-user-info light-text">
          <h4>${person.name}</h4>
          <i class="fas fa-check-circle"></i>
        </div>
        <p class="post-text light-text">${person.text}</p>
        <div class="post-img">
          <img src="${person.image}" alt="post" />
        </div>
        <div class="post-icons">
          <i class="far fa-comment"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
          <i class="fas fa-share-alt"></i>
          <img
          src="https://cdn-icons-png.flaticon.com/512/1799/1799391.png"
          alt=""
          id=${person.id}
          class="read_del"
          onclick="deletePost(${person.id})"
        />
        <img class="btnEdit" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" alt="" 
        onclick="handleEditBtn(${person.id})"/>
        </div>
        </div>
        </div>
        </div>
      `;
    });
pageTotal()
}


// delete start
async function deletePost(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE",
    });
    readPost();
}

// EDIT START
const modalEdit = document.getElementById('modal-edit')

const btnEditClose = document.getElementById('modal-edit-close')
const btnEditSave = document.getElementById('btn-save-edit')

const inpYourPhoto = document.getElementById('inp-photo')
const inpName = document.getElementById('inp-name')
const inpText = document.getElementById('inp-text')
// console.log(inpName)
const inpUrlImage = document.getElementById('inp-Urlimage')
// console.log(inpUrlImage)
async function editPost(id, newObj) {
    if (
        !inpYourPhoto.value.trim() ||
        !inpName.value.trim() ||
        !inpText.value.trim() ||
        !inpUrlImage.value.trim()
    ) {
        alert("Заполните поля!");
        return;
    }
    await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(newObj),
    }).then(() => readPost());
    // readPost();
}

let editId = ""
function handleEditBtn(id) {
    modalEdit.style.display = "block"
    fetch(`${API}/${id}`).then((res) => res.json().then((postInfo) => {

        inpYourPhoto.value = postInfo.photo;
        inpName.value = postInfo.name;
        inpText.value = postInfo.text;
        inpUrlImage.value = postInfo.image;

        editId = postInfo.id
    }))
}

btnEditSave.addEventListener('click', () => {
    let newObj = {
        photo: inpYourPhoto.value,
        name: inpName.value,
        text: inpText.value,
        image: inpUrlImage.value,
    }
    editPost(editId, newObj)
    modalEdit.style.display = 'none'
})

btnEditClose.addEventListener("click", function () {
    modalEdit.style.display = "none";
});
// EDIT END

let prevBtn = document.querySelector('#prev-btn')
let nextBtn = document.querySelector('#next-btn')
let currentPage = 1;
let limit = 3;

// pagination start
let countPage;
async function pageTotal() {
  let data = await fetch(`${API}?q=${searchValue}`).then((res) => res.json());
  countPage = Math.ceil(data.length / limit);
  console.log(countPage);
}

prevBtn.addEventListener("click", () => {
    if (currentPage < 1) return;
  currentPage--
  readPost();
});
nextBtn.addEventListener("click", () => {
    if (currentPage >= countPage) return;
  currentPage++
  readPost();
});
readPost()
// pagination end