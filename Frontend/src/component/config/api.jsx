import axios from 'axios';

export const API_URL = "https://e-commerce-server-production-30e0.up.railway.app"; //this is hsoted url
//export const API_URL = "http://localhost:8080"; //this is local url

export const api = axios.create({

    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
}); 