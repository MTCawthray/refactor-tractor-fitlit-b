const domUpdates = {
  renderHistoricalWeek(randomHistory) {
    const historicalWeek = document.querySelectorAll('.historicalWeek');
    historicalWeek.forEach(element => element.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
  },
  
  renderFirstName(user) {
    const headerText = document.getElementById('headerText');
    headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  },

  renderInfoCard(name, address, email, strideLength, stepGoal, avStepGoal) {
    const sidebarName = document.getElementById('sidebarName');
    const userAddress = document.getElementById('userAddress');
    const userEmail = document.getElementById('userEmail');
    const userStridelength = document.getElementById('userStridelength');
    const userStepGoal = document.getElementById('stepGoal');
    const avgStepGoal = document.getElementById('avStepGoal');

    sidebarName.innerText = name;
    userAddress.innerText = address;
    userEmail.innerText = email;
    userStridelength.innerText = `Your stridelength is ${strideLength} meters.`;
    userStepGoal.innerText = `Your daily step goal is ${stepGoal}.`
    avgStepGoal.innerText = `The average daily step goal is ${avStepGoal}`;
  },

  renderFriendHTML(names) {
    const friendList = document.getElementById('friendList');
    friendList.insertAdjacentHTML('afterBegin', names.map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`));
  }



  // function addHydrationInfo(randomDate, id, repo) {
  //   hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${currentUser.getDateAmount(currentDate, hydrationData, 'numOunces')}</span></p><p>oz water today.</p>`);
  //   hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${currentUser.calcAvgAllTime(hydrationData, 'numOunces')}</span></p> <p>oz per day.</p>`)
  
  //   hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(currentUser.getOverWeekAmount(startDate, hydrationData, 'numOunces')));
  //   hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(repo.calculateRandomWeekOunces(randomDate, id, userRepo)));
  // }

  // function makeHydrationHTML(method) {
  //   return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
  // }

  // function addSleepInfo(randomDate, id, repo) {
  //   sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${currentUser.getDateAmount(currentDate, sleepData, 'hoursSlept')}</span></p> <p>hours today.</p>`);
  //   sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${currentUser.getDateAmount(currentDate, sleepData, 'sleepQuality')}</span></p><p>out of 5.</p>`);
  //   avUserSleepQuality.insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${currentUser.calcAvgAllTime(sleepData, 'sleepQuality')}</span></p><p>out of 5.</p>`);
   
  //   sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(currentUser.getOverWeekAmount(startDate, sleepData, 'hoursSlept')));
  //   sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(repo.calculateWeekSleep(randomDate, id, userRepo)));
  // }

  // function makeSleepHTML(method) {
  //   return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
  // }

  // function addActivityInfo(id, repo, winnerId) {
  //   userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${currentUser.getDateAmount(currentDate, activityData, 'flightsOfStairs')}</span></p>`)
  //   avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${userRepo.getAllUsersAvgByDate(currentDate, 'flightsOfStairs', activityData)}</span></p>`)
  //   userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${currentUser.getDateAmount(currentDate, activityData, 'numSteps')}</span></p>`)
  //   avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${userRepo.getAllUsersAvgByDate(currentDate, 'numSteps', activityData)}</span></p>`)
  //   userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${currentUser.getDateAmount(currentDate, activityData, 'minutesActive')}</span></p>`)
  //   avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${userRepo.getAllUsersAvgByDate(currentDate, 'minutesActive', activityData)}</span></p>`)
  //   userStepsThisWeek.insertAdjacentHTML("afterBegin", makeStepsHTML(currentUser.getOverWeekAmount(startDate, activityData, 'numSteps')));
  //   userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(currentUser.getOverWeekAmount(startDate, activityData, 'flightsOfStairs')));
  //   userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(currentUser.getOverWeekAmount(startDate, activityData, 'minutesActive')));
  //   bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(repo.userDataForWeek(winnerId, currentDate, userRepo, "numSteps")));
  // }

  // function makeStepsHTML(method) {
  //   return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
  // }
  
  // function makeStairsHTML(method) {
  //   return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
  // }
  
  // function makeMinutesHTML(method) {
  //   return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
  // }

  // function addFriendGameInfo(id, activityInfo, userStorage, dateString, user) {
  //   friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  //   streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(activityInfo.getStreak(userStorage, id, 'numSteps')));
  //   streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(activityInfo.getStreak(userStorage, id, 'minutesActive')));
  //   friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  //   bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
  // }
  
  // function makeFriendChallengeHTML(method) {
  //   return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  // }
  
  // function makeStepStreakHTML(method) {
  //   return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
  // }


}
export default domUpdates;