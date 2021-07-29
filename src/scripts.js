import './css/base.scss';
import './css/styles.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import { fetchData } from './apiCalls';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
import domUpdates from './domUpdates';

var sidebarName = document.getElementById('sidebarName');
var stepGoalCard = document.getElementById('stepGoalCard');
var userAddress = document.getElementById('userAddress');
var userEmail = document.getElementById('userEmail');
var userStridelength = document.getElementById('userStridelength');
var currentDateHere = document.getElementById('currentDate');

var hydrationToday = document.getElementById('hydrationToday');
var hydrationAverage = document.getElementById('hydrationAverage');
var hydrationThisWeek = document.getElementById('hydrationThisWeek');
var hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
var historicalWeek = document.querySelectorAll('.historicalWeek');
var sleepToday = document.getElementById('sleepToday');
var sleepQualityToday = document.getElementById('sleepQualityToday');
var avUserSleepQuality = document.getElementById('avUserSleepQuality');
var sleepThisWeek = document.getElementById('sleepThisWeek');
var sleepEarlierWeek = document.getElementById('sleepEarlierWeek');
var friendChallengeListToday = document.getElementById('friendChallengeListToday');
var friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
var bigWinner = document.getElementById('bigWinner');
var userStepsToday = document.getElementById('userStepsToday');
var avgStepsToday = document.getElementById('avgStepsToday');
var userStairsToday = document.getElementById('userStairsToday');
var avgStairsToday = document.getElementById('avgStairsToday');
var userMinutesToday = document.getElementById('userMinutesToday');
var avgMinutesToday = document.getElementById('avgMinutesToday');
var userStepsThisWeek = document.getElementById('userStepsThisWeek');
var userStairsThisWeek = document.getElementById('userStairsThisWeek');
var userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
var bestUserSteps = document.getElementById('bestUserSteps');
var streakList = document.getElementById('streakList');
var streakListMinutes = document.getElementById('streakListMinutes')

window.addEventListener('load', returnData)

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
    currentUser = new User(userRepo.getDataFromID(getRandomIndex(userData)))
    currentUserId = currentUser.id;
    currentDate = "2020/01/22";
    startDate = "2020/01/15";
    console.log(currentUser)
  }).then(startApp);
}

function getRandomIndex(array) {
  const index = Math.floor(Math.random() * array.length);
  return index;
}

// getData('users').then(data => {
//   userData = data.userData;
// }).then(startApp);

// getData('hydration').then(data => {
//   hydrationData = data.hydrationData;
//   console.log(hydrationData);
// }).then(startApp);

function startApp() {
  // let userList = [];
  // makeUsers(userList);
  // let userRepo = new UserRepo(userList);
  let hydrationRepo = new Hydration(hydrationData);
  // let sleepRepo = new Sleep(sleepData);
  // let activityRepo = new Activity(activityData);
  // var userNowId = pickUser();
  // let userNow = getUserById(userNowId, userRepo);
  // let today = makeToday(userRepo, currentUserId, hydrationData);
  // let startDate = "2020/01/15";
  // console.log(startDate)
  let randomHistory = makeRandomDate(userRepo, currentUserId, hydrationData);
  currentDateHere.innerHTML = `${currentDate}`;
  historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
  addInfoToSidebar(currentUser, userRepo);
  addHydrationInfo(randomHistory);
  // addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
  // let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  // addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  // addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
}
//below we pass an argument of empty array to populate with our user objects
// function makeUsers(array) {
//   userData.forEach(function(dataItem) { //userData will have to change to our API input
//     let user = new User(dataItem);
//     array.push(user);//now our userList array holds the user instances
//     //could we move userList array into this function and just return the userList?
//   })
// }

// function pickUser() {
//   return Math.floor(Math.random() * 50);
// }

// function getUserById(id, listRepo) {
//   return listRepo.getDataFromID(id);
// }


function addInfoToSidebar(user, userStorage) {
  sidebarName.innerText = user.name;
  displayFirstName(user);
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`
  avStepGoalCard.innerText = `The average daily step goal is ${userStorage.calculateAverageStepGoal()}`;
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;
  displayFriendHTML(user, userStorage);
}

function displayFirstName(user) {
domUpdates.renderFirstName(user);
}

function displayFriendHTML(user, userStorage) {
  let nameList = user.getFriendsNames(userStorage);
  domUpdates.renderFriendHTML(nameList);
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage)
}

function makeToday(userStorage, id, dataSet) {
  var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[0].date;
}

function makeRandomDate(userStorage, id, dataSet) {
  var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date

}

function addHydrationInfo(randomHistory) {
  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${currentUser.getDateAmount(currentDate, hydrationData, 'numOunces')}</span></p><p>oz water today.</p>`);
  hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${currentUser.calcAvgAllTime(hydrationData, 'numOunces')}</span></p> <p>oz per day.</p>`)

  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(currentUser.getOverWeekAmount(startDate, hydrationData, 'numOunces')));
  hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage)));
}

function makeHydrationHTML(method) {
  return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

// function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
//   sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>`);
//   sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`);
//   avUserSleepQuality.insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>`);
//   sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage)));
//   sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)));
// }

// function makeSleepHTML(id, sleepInfo, userStorage, method) {
//   return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
// }

// function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
//   return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
// }

// function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
//   userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`)
//   avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`)
//   userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>`)
//   avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`)
//   userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`)
//   avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`)
//   userStepsThisWeek.insertAdjacentHTML("afterBegin", makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "numSteps")));
//   userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "flightsOfStairs")));
//   userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "minutesActive")));
//   bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps")));
// }

// function makeStepsHTML(id, activityInfo, userStorage, method) {
//   return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
// }

// function makeStairsHTML(id, activityInfo, userStorage, method) {
//   return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
// }

// function makeMinutesHTML(id, activityInfo, userStorage, method) {
//   return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
// }

// function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
//   friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
//   streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
//   streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
//   friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
//   bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
// }

// function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
//   return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
// }

// function makeStepStreakHTML(id, activityInfo, userStorage, method) {
//   return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
// }

// // startApp()