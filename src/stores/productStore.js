import { writable } from 'svelte/store';


// .env variables starting with VITE_ are accessible client and server side 
const base_url = import.meta.env.VITE_API_BASE_URL

// declare writable stores for products and categories
export let products = writable([]);
export let categories = writable([]);


// Function to fetch and return data from an API
// Full URI based on base_url + endpoint
const getAPIData = async (endpoint = '') => {
    try {
        const response = await fetch(`${base_url}${endpoint}`);
        const data = await response.json();
        //console.log(data);
        return data;

    } catch (err) {
        console.log('getAllProducts() error (store) ', err.message);
    } finally {

    }
}

// Function to get all products from the api
// sets the products store
export const getAllProducts = async () => {

    const data = await getAPIData('/product');
    products.set(data);
}

// Function to get all categories from the api
// sets the categories store
export const getAllCategories= async () => {

    const data = await getAPIData('/category');
    categories.set(data);     

}


// Function to get products in a category (by category id)
// sets the products store
export const getProductsByCat= async (cat_id = 0) => {

    // 
    if (cat_id > 0) {
        const data = await getAPIData(`/product/bycat/${cat_id}`);
        products.set(data);
    } else {
        getAllProducts();
    }

}


// Initialise the store when loaded
await getAllProducts();
await getAllCategories();