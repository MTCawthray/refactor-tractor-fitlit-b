import './css/base.scss';
import './css/styles.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import { fetchData, postHydrationData, postActivityData, postSleepData } from './apiCalls';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
import domUpdates from './domUpdates';

const {hydrationButton, hydrationInput, hydrationHeader, activityButton, stepsInput, minInput, stairsInput, activityHeader, sleepButton, hrInput, qualInput, sleepHeader} = domUpdates;

window.addEventListener('load', returnData);
hydrationButton.addEventListener('click', postHydrationInputs)
activityButton.addEventListener('click', postActivityInputs)
sleepButton.addEventListener('click', postSleepInputs)

let userData, hydrationData, sleepData, activityData, currentUser, userRepo, currentUserId, currentDate, startDate;

function getData() {
  return Promise.all([fetchData('users'), fetchData('hydration'), fetchData('sleep'), fetchData('activity')]);
}

function returnData() {
  getData()
  .then(promiseArray => {
    userData = promiseArray[0].userData;
    hydrationData = promiseArray[1].hydrationData;
    sleepData = promiseArray[2].sleepData;
    activityData = promiseArray[3].activityData;
    userRepo = new UserRepo(userData);
    // currentUser = new User(userRepo.getDataFromID(getRandomIndex(userData)));
    currentUser = new User(userRepo.getDataFromID(2));
    currentUserId = currentUser.id;
    // can we make a function that returns a random date? 
    currentDate = "2020/01/22";
    // can we make a function that splices the current date and returns it 7 days earlier???
    startDate = "2020/01/15";
  }).then(startApp);
}

// function getRandomIndex(array) {
//   const index = Math.floor(Math.random() * array.length);
//   return index;
// }

function startApp() {
  let hydrationRepo = new Hydration(hydrationData);
  let sleepRepo = new Sleep(sleepData);
  let activityRepo = new Activity(activityData);
  let randomHistory = makeRandomDate(userRepo, currentUserId, hydrationData);

  displayHistoricalWeek(randomHistory);
  addInfoToSidebar(currentUser, userRepo);
  displayHydrationInfo(hydrationRepo, randomHistory, currentUserId);
  displaySleepInfo(sleepRepo, randomHistory, currentUserId);
  let winnerNow = makeWinnerID(activityRepo, currentUser, currentDate, userRepo);
  displayActivityInfo(currentUserId, activityRepo, winnerNow);
  displayFriendGameInfo(currentUserId, activityRepo, userRepo, currentDate, currentUser);
}

function displayHistoricalWeek(randomHistory) {
  domUpdates.renderHistoricalWeek(randomHistory);
}

function addInfoToSidebar(user, userStorage) {
  const avStepGoal = userStorage.calculateAverageStepGoal();
  displayFirstName(user);
  displayInfoCard(user.name, user.address, user.email, user.strideLength, user.dailyStepGoal, avStepGoal);
  displayFriendHTML(user, userStorage);
}

function displayFirstName(user) {
  domUpdates.renderFirstName(user);
}

function displayInfoCard (name, address, email, strideLength, stepGoal, avStepGoal) {
  domUpdates.renderInfoCard(name, address, email, strideLength, stepGoal, avStepGoal);
}

function displayFriendHTML(user, userStorage) {
  let nameList = user.getFriendsNames(userStorage);
  domUpdates.renderFriendHTML(nameList);
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage);
}

function makeRandomDate(userStorage, id, dataSet) {
  let sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date;
}

function displayHydrationInfo(repo, randomDate, id) {
  domUpdates.renderHydrationInfo(currentUser, currentDate, hydrationData, startDate, userRepo, repo, randomDate, id);
}

function displaySleepInfo(repo, randomDate, id, ) {
  domUpdates.renderSleepInfo(currentUser, currentDate, sleepData, startDate, userRepo, repo, randomDate, id);
}

function displayActivityInfo(id, repo, winnerId) {
  domUpdates.renderActivityInfo(currentUser, currentDate, activityData, startDate, userRepo, id, repo, winnerId);
}

function displayFriendGameInfo(id, activityInfo, userStorage, dateString, user) {
  domUpdates.renderFriendGameInfo(id, activityInfo, userStorage, dateString, user);
}

function postHydrationInputs() {
  if (hydrationInput.value > 0 && hydrationInput.value < 200) {
    postHydrationData(currentUserId, currentDate, hydrationInput.value)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          console.log("success")
          console.log(currentUserId)
          hydrationHeader.innerText = "Great job! You have submitted your hydration data!"
          domUpdates.renderSubmittedHydration(hydrationInput.value)
        }
      })
      .catch(error => {
        hydrationHeader.innerText = "Could not Fetch :( Check Internet?";
        console.log(error)
      })
  } else if (hydrationInput.value > 200) {
    hydrationHeader.innerText = "Calm down Aquaman - Input too high!"
  } else {
    hydrationHeader.innerText = "Please enter a number 0 or higher"
  }
}

function postActivityInputs() {
  if (stepsInput.value > 0 && stepsInput.value < 55000 && minInput.value > 0 && minInput.value < 1440 && stairsInput.value > 0 && stairsInput.value < 2909) {
    postActivityData(currentUserId, currentDate, stepsInput.value, minInput.value, stairsInput.value)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          console.log("success")
          console.log(currentUserId)
          activityHeader.innerText = "Great job! You have submitted your activity data!"
          domUpdates.renderSubmittedActivity(activityInput.value)
        }
      })
      .catch(error => {
        activityHeader.innerText = "Could not Fetch :( Check Internet?"
        console.log(error)
      })
  } else if (stepsInput.value > 55000 || minInput.value > 1440 || stairsInput.value > 2909) {
    activityHeader.innerText = "You just missed the Olympics - Input too high!"
  } else {
    activityHeader.innerText = "Please enter a number 0 or higher"
  }
}

function postSleepInputs() {
  if (hrInput.value > 0 && hrInput.value < 24 && qualInput.value > 0 && qualInput.value < 5) {
    postSleepData(currentUserId, currentDate, hrInput.value, qualInput.value)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          console.log("success")
          console.log(currentUserId)
          sleepHeader.innerHTML = "Great job! You have submitted your sleep data!"
        }
      })
      .catch(error => {
        sleepHeader.innerHTML = "Could not Fetch :( Check Internet?"
        console.log(error)
      })
  } else if (hrInput.value > 24 || qualInput.value > 5) {
    sleepHeader.innerHTML = "Get out of town Rip Van Winkel - Input too high!"
  } else {
    sleepHeader.innerHTML = "Please enter a number 0 or higher"
  }
}

