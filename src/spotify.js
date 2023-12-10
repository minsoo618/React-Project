import axios from "axios"; // importing axios, a popular HTTP client for making requests

const authEndpoint = "https://accounts.spotify.com/authorize?"; // base URL for spotify's authorization endpoint
const clientID = "d30a9a4dd2eb4b5b88e42cfbe3fd756c"; // my application's client ID provided by Spotify
const redirectUri = "http://localhost:3000"; // the URL where spotify will redirect after authentication, should match the one registered on Spotify Developer Dashboard
const scopes = ["user-library-read", "playlist-read-private"]; // scopes define the level of access you are requesting from the user's spotify account

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`; // creating the full URL for logging in, joining the scopes array into a space-separated string

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/", // base URL for Spotify's Web API
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function(config) {
    config.headers.Authorization = "Bearer " + token; // sets the 'Authorization' header with the access token for each request
    return config;
  });
};

export default apiClient; // exports the configured axios instance