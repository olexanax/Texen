import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js'

//=======ПІДСВІТКА ТЕКСТУ================
const links = document.querySelectorAll('.link');
links.forEach(link => {
    const chars = link.textContent.split("").map(char => `<span>${char}</span>`).join('');
    link.innerHTML = chars

});
//=======МЕНЮ БУРГЕР================
const burgerButton = document.querySelector('.header_menu_button');
const menu = document.querySelector('.menu');
const body = document.querySelector('body');

const toggleMenu = () => {
    menu.classList.toggle('hidden')
    body.classList.toggle('overflowHidden')
    burgerButton.classList.toggle('close')
}
burgerButton.addEventListener("click", toggleMenu)
//=======КОПІЮВАННЯ ТЕКСТУ================
let emailButton = document.querySelector('.emailButton')
let phoneButton = document.querySelector('.phoneButton')
let modalTextCopied = document.querySelector('.modal__text_copied');
let modalTextCopiedBtn = modalTextCopied?.querySelector('.button');
let email = document.querySelector('.email')?.textContent
let phone = document.querySelector('.phone')?.textContent


const copyContent = async (e, text) => {
    e.preventDefault()
    try {
        await navigator.clipboard.writeText(text);
        modalTextCopied.classList.remove('hidden')
        body.classList.add('overflowHidden')

    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}
const addListeners = (elem, text) => {
    elem.addEventListener("click", (e) => copyContent(e, text))
}
if (modalTextCopied && modalTextCopiedBtn && (emailButton && phoneButton || phoneButton && phone)) {
    addListeners(emailButton, email);
    addListeners(phoneButton, phone)
    modalTextCopiedBtn.addEventListener("click", (e) => {
        e.preventDefault()
        modalTextCopied.classList.add('hidden')
        body.classList.remove('overflowHidden')

    })
}
//=======СЛАЙДЕР================
const reviewsSwiper = new Swiper('.swiper_review', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper_review-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper_review-button-next',
        prevEl: '.swiper_review-button-prev',
    }
});
const projectsSwiper = new Swiper('.swiper_projects', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper_projects-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper_projects-button-next',
        prevEl: '.swiper_projects-button-prev',
    }
});

//=======ADD LINK================
const formLinkBlock = document.querySelector('.form__link__block')
const inputBlocks = document.querySelectorAll('.form__block__input__block')
const inputBlock = document.querySelector('.form__block__input__block')

if (formLinkBlock) {
    function addNewInput() {
        const newInputBlock = inputBlock.cloneNode(true);
        newInputBlock.querySelector('a').innerHTML = '<img src = "../images/icons/remove.svg" alt = ""/> '
        newInputBlock.querySelector('input').value = ''
        formLinkBlock?.appendChild(newInputBlock);
        changeActions()
    }
    function removeInput(e) {
        e.target.tagName === "IMG" ? e.target.parentNode.parentNode.remove() : e.target.parentNode.remove();
        changeActions()
    }
    function addAction(e) {
        if (e.target && (e.target.classList.contains("small__button") || e.target.tagName === "IMG")) {
            e.preventDefault()
            if (targetCheck(e)) {
                addNewInput()
            } else {
                removeInput(e)
            }
        }
    }
    function changeActions() {
        document.querySelectorAll('.form__block__input__block')?.forEach((block, i) => {
            if (!i) {
                return;
            } else {
                block.querySelector("input").addEventListener("input", e => {
                    if (e.target.value.length) {
                        block.querySelector('a').innerHTML = '<img src = "../images/icons/add.svg" alt = ""/> '


                    } else {
                        block.querySelector('a').innerHTML = '<img src = "../images/icons/remove.svg" alt = ""/> '
                    }

                })
            }

        })

    }
    function targetCheck(e) {
        return e.target.parentNode === inputBlocks[0] || e.target.parentNode.parentNode === inputBlocks[0] ||
            (e.target.tagName === "A"
                ? e.target.parentNode.querySelector('input')?.value.length
                : e.target.parentNode.parentNode.querySelector('input')?.value.length)
    }
    formLinkBlock.addEventListener("click", addAction)
    changeActions()
}

//=======BACK BUTTONS================
const buttons = document.querySelectorAll('a.button');

const backButtons = Array.from(buttons).filter(button => {
    const span = button.querySelector('span');
    return span.textContent.trim().toLowerCase() === 'back';
});
backButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        window.history.back();
    })
})

//=======CHOOSE TITLE================
const radioButons = document.querySelectorAll('.form__block__radio-button')
const titleInput = document.querySelector(".form__title__block")?.querySelector("input")
if (radioButons && titleInput) {
    radioButons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            titleInput.value = ""
            radioButons.forEach(btn => {
                if (btn.dataset.value === e.target.dataset.value) {
                    btn.classList.add('selected__radio')
                    return;
                }
                btn.classList.remove('selected__radio')
                btn.addEventListener("mouseover", () => {
                    btn.classList.add("form__block__radio-button_active")
                });
                btn.addEventListener("mouseout", () => {
                    btn.classList.remove("form__block__radio-button_active")
                });
            })
        })
    })
    titleInput.addEventListener("input", e => {
        if (e.target.value.length) {
            radioButons.forEach(btn => {
                btn.classList.remove('selected__radio')
            })
        }
    })
}
//=======DYNAMIC URL's================

const urls = document.querySelectorAll(".route")
const currentUrl = window.location.href
const baseUrl = currentUrl.slice(0, currentUrl.indexOf('pages/'))
urls.forEach(link => {
    const localUrl = link.href.slice(link.href.indexOf("pages"))
    link.href = `${baseUrl}${localUrl}`
})