import { Manager } from "socket.io-client";
import { API_URL, TOKEN_NAME } from "./constant";


// Get the base URL from the environment variable or use a default value
const baseURL =  API_URL;

// Create a socket manager instance
const manager = new Manager(baseURL, {
  autoConnect: true,
});

// Get the authenticated user and token
const isLoggedIn =
    typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_NAME) : ``;

const jwt = isLoggedIn;

// Create a socket instance with authentication
export const Socket = manager.socket("/", {
  auth: {
    token: jwt,
  },
});

// Open the socket connection
manager.open((err) => {
  if (err) {
    // An error occurred during the connection attempt
    console.error("Error opening socket connection:", err?.message);
  } else {
    // The connection was successfully established
    //console.log("Socket connection established successfully");
  }
});