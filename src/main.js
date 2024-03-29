import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImages } from "./js/pixabay-api.js";
import { render } from "./js/render-functions.js";


export const lightbox = new SimpleLightbox('.gallery-link', {
    captionsData: "alt",
    captionDelay: 250,
});

export const refs = {
    form: document.querySelector(".form"),
    searchInput: document.getElementById("searchInput"),
    searchBtn: document.querySelector("button"),
    loadBtn: document.querySelector(".load-more-button"),
    loader: document.querySelector(".loader"),
    gallery: document.querySelector(".gallery"),
}


export let query = "";
export let currentPage = 1;
export let pageLimit = 15;

hideLoader();
hideLoadBtn();

refs.form.addEventListener("submit", async event => {
    event.preventDefault();
    currentPage = 1;
    refs.gallery.innerHTML = "";
    query = refs.searchInput.value.trim();
    if (query !== '') {
        try {
            const data = await getImages(query, currentPage);
            const maxPage = Math.ceil(data.totalHits / pageLimit);
            render(data);
            hideLoader();
            showLoadBtn();
        }
        catch(error) {
            console.log(error);
        };
    }   else {
            displayMessage("Empty field!");
            hideLoadBtn();
    }

    refs.form.reset();
});

refs.loadBtn.addEventListener("click", async onLoadMoreClick => {
    currentPage += 1;
    const data = await getImages(query, currentPage);
    hideLoader();
    render(data);
    showLoadBtn();
    const item = document.querySelector(".gallery-item");
    const rect = item.getBoundingClientRect();
    window.scrollBy({
        top: rect.height * 2,
        behavior: "smooth",
})
    if(currentPage > pageLimit) {
        displayMessage("We're sorry, but you've reached the end of search results.");
        hideLoadBtn();
        hideLoader();
    }
})


export function displayMessage(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: "topRight",
        backgroundColor: "red",
    });
}

export function hideLoader() {
    refs.loader.style.display = "none";
}

export function showLoader() {
    refs.loader.style.display = "block";
}

function hideLoadBtn() {
    refs.loadBtn.style.display = "none";
}

function showLoadBtn() {
    refs.loadBtn.style.display = "block";    
}

