export function fetchData(file) {
  return fetch(`http://localhost:3001/api/v1/${file}`).then(response => response.json());
}

export function postHydrationData(userId, currentDate, amount) {
  let body = {
    "userID": userId,
    "date": currentDate,
    "numOunces": parseFloat(amount)
  }
  return fetch(`http://localhost:3001/api/v1/hydration`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function postSleepData(userId, currentDate, hours, quality) {
  let body = {
    "userID": userId,
    "date": currentDate,
    "hoursSlept": parseFloat(hours),
    "sleepQuality": parseFloat(quality)

  }
  return fetch(`http://localhost:3001/api/v1/sleep`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function postActivityData(userId, currentDate, steps, minutes, stairs) {
  let body = {
    "userID": userId,
    "date": currentDate,
    "numSteps": parseFloat(steps),
    "minutesActive": parseFloat(minutes),
    "flightsOfStairs": parseFloat(stairs)
  }
  return fetch(`http://localhost:3001/api/v1/activity`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
}
