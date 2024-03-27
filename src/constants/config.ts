import currencyapi from "@everapi/currencyapi-js";

export const client = new currencyapi(import.meta.env.VITE_CURR_API_KEY);
