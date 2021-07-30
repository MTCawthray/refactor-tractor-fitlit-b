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

const currentDateHere = document.getElementById('currentDate');

// const hydrationToday = document.getElementById('hydrationToday');
const hydrationAverage = document.getElementById('hydrationAverage');
const hydrationThisWeek = document.getElementById('hydrationThisWeek');
const hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');



const sleepToday = document.getElementById('sleepToday');
const sleepQualityToday = document.getElementById('sleepQualityToday');
const avUserSleepQuality = document.getElementById('avUserSleepQuality');
const sleepThisWeek = document.getElementById('sleepThisWeek');
const sleepEarlierWeek = document.getElementById('sleepEarlierWeek');

const friendChallengeListToday = document.getElementById('friendChallengeListToday');
const friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
const bigWinner = document.getElementById('bigWinner');

const userStepsToday = document.getElementById('userStepsToday');
const avgStepsToday = document.getElementById('avgStepsToday');
const userStairsToday = document.getElementById('userStairsToday');
const avgStairsToday = document.getElementById('avgStairsToday');
const userMinutesToday = document.getElementById('userMinutesToday');
const avgMinutesToday = document.getElementById('avgMinutesToday');
const userStepsThisWeek = document.getElementById('userStepsThisWeek');
const userStairsThisWeek = document.getElementById('userStairsThisWeek');
const userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
const bestUserSteps = document.getElementById('bestUserSteps');
const streakList = document.getElementById('streakList');
const streakListMinutes = document.getElementById('streakListMinutes')

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
    // can we make a function that returns a random date? 
    currentDate = "2020/01/22";
    // can we make a function that splices the current date and returns it 7 days earlier???
    startDate = "2020/01/15";
    console.log(currentUser)
  }).then(startApp);
}

function getRandomIndex(array) {
  const index = Math.floor(Math.random() * array.length);
  return index;
}

function startApp() {
  let hydrationRepo = new Hydration(hydrationData);
  let sleepRepo = new Sleep(sleepData);
  let activityRepo = new Activity(activityData);
  let randomHistory = makeRandomDate(userRepo, currentUserId, hydrationData);
  currentDateHere.innerHTML = `${currentDate}`;

  displayHistoricalWeek(randomHistory)
  addInfoToSidebar(currentUser, userRepo);
  addHydrationInfo(randomHistory, currentUserId, hydrationRepo);
  addSleepInfo(randomHistory, currentUserId, sleepRepo);
  let winnerNow = makeWinnerID(activityRepo, currentUser, currentDate, userRepo);
  addActivityInfo(currentUserId, activityRepo, winnerNow);
  addFriendGameInfo(currentUserId, activityRepo, userRepo, currentDate, currentUser);
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
  return activityInfo.getWinnerId(user, dateString, userStorage)
}

function makeRandomDate(userStorage, id, dataSet) {
  let sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
}

function addHydrationInfo(randomDate, id, repo) {
  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${currentUser.getDateAmount(currentDate, hydrationData, 'numOunces')}</span></p><p>oz water today.</p>`);
  hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${currentUser.calcAvgAllTime(hydrationData, 'numOunces')}</span></p> <p>oz per day.</p>`)

  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(currentUser.getOverWeekAmount(startDate, hydrationData, 'numOunces')));
  hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(repo.calculateRandomWeekOunces(randomDate, id, userRepo)));
}

function makeHydrationHTML(method) {
  return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

function addSleepInfo(randomDate, id, repo) {
  sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${currentUser.getDateAmount(currentDate, sleepData, 'hoursSlept')}</span></p> <p>hours today.</p>`);
  sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${currentUser.getDateAmount(currentDate, sleepData, 'sleepQuality')}</span></p><p>out of 5.</p>`);
  avUserSleepQuality.insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${currentUser.calcAvgAllTime(sleepData, 'sleepQuality')}</span></p><p>out of 5.</p>`);
 
  sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(currentUser.getOverWeekAmount(startDate, sleepData, 'hoursSlept')));
  sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(repo.calculateWeekSleep(randomDate, id, userRepo)));
}

function makeSleepHTML(method) {
  return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
}

function addActivityInfo(id, repo, winnerId) {
  userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${currentUser.getDateAmount(currentDate, activityData, 'flightsOfStairs')}</span></p>`)
  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${userRepo.getAllUsersAvgByDate(currentDate, 'flightsOfStairs', activityData)}</span></p>`)
  userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${currentUser.getDateAmount(currentDate, activityData, 'numSteps')}</span></p>`)
  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${userRepo.getAllUsersAvgByDate(currentDate, 'numSteps', activityData)}</span></p>`)
  userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${currentUser.getDateAmount(currentDate, activityData, 'minutesActive')}</span></p>`)
  avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${userRepo.getAllUsersAvgByDate(currentDate, 'minutesActive', activityData)}</span></p>`)
  userStepsThisWeek.insertAdjacentHTML("afterBegin", makeStepsHTML(currentUser.getOverWeekAmount(startDate, activityData, 'numSteps')));
  userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(currentUser.getOverWeekAmount(startDate, activityData, 'flightsOfStairs')));
  userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(currentUser.getOverWeekAmount(startDate, activityData, 'minutesActive')));
  bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(repo.userDataForWeek(winnerId, currentDate, userRepo, "numSteps")));
}

function makeStepsHTML(method) {
  return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

function addFriendGameInfo(id, activityInfo, userStorage, dateString, user) {
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(activityInfo.getStreak(userStorage, id, 'numSteps')));
  streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(activityInfo.getStreak(userStorage, id, 'minutesActive')));
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
}

function makeFriendChallengeHTML(method) {
  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}