import axios from "axios";
import { refs, query, showLoader} from "../main";

export function getImages() {
    const BASE_URL = "https://pixabay.com/api/";
    const params = new URLSearchParams({
        key: "43015885-c3997a91f23585149f1baaf72",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
    });
    const url = `${BASE_URL}?${params}`;

    showLoader();

    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
};

