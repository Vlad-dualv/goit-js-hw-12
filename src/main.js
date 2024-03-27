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
    loader: document.querySelector(".loader"),
    gallery: document.querySelector(".gallery"),
}

hideLoader();

export let query = "";


refs.form.addEventListener("submit", async event => {
    event.preventDefault();

    refs.gallery.innerHTML = "";
    query = refs.searchInput.value.trim();
    if (query !== '') {
        try {
            const data = await getImages(query);
            render(data);
            hideLoader();
        }
        catch(error) {
            console.log(error);
        };
    }   else {
            displayMessage("Empty field!")
    }

    refs.form.reset();
});

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

