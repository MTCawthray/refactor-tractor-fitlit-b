export function getData(file) {
  const promise = fetch(`http://localhost:3001/api/v1/${file}`).then((response) => response.json());
  return promise;
}