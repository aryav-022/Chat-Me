export async function useFetch(path = "", method = "GET", body = {}, headers = { "Content-type": "application/json; charset=UTF-8" }) {
    const url = `${import.meta.env.VITE_SERVER_ADDRESS}/${path}`;
    const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers
    });

    const res = await response.json();
    return res;
}
