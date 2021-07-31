export function fetchData(file) {
  return fetch(`http://localhost:3001/api/v1/${file}`).then(response => response.json());
}

export function postHydrationData(userId, date, amount){
  let body = {
    "userID": userId, 
    "date": date, 
    "numOunces": amount
  }
  return fetch(`http://localhost:3001/api/v1/hydration`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
}

