export function fetchData(file) {
  return fetch(`http://localhost:3001/api/v1/${file}`).then(response => response.json());
}