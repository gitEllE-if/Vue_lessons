export function get(url) {
    return fetch(url).then(data => data.json())
}
