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
    // friendList.insertAdjacentHTML('afterBegin', names.map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`));
    friendList.innerHTML = '';
    names.forEach(name => {
      friendList.innerHTML += `<li class='historical-list-listItem'>${name}</li>`;
    })
  },

  renderHydrationInfo(currentUser, currentDate, hydrationData, startDate, userRepo, repo, randomDate, id) {
    const hydrationToday = document.getElementById('hydrationToday');
    const hydrationAverage = document.getElementById('hydrationAverage');
    const hydrationThisWeek = document.getElementById('hydrationThisWeek');
    const hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek'); 

    hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${currentUser.getDateAmount(currentDate, hydrationData, 'numOunces')}</span></p><p>oz water today.</p>`);
    hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${currentUser.calcAvgAllTime(hydrationData, 'numOunces')}</span></p> <p>oz per day.</p>`)
    hydrationThisWeek.insertAdjacentHTML('afterBegin', currentUser.getOverWeekAmount(startDate, hydrationData, 'numOunces').map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join(''));
    hydrationEarlierWeek.insertAdjacentHTML('afterBegin', repo.calculateRandomWeekOunces(randomDate, id, userRepo).map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join(''));
  },

  renderSubmittedHydration(oz) {
    hydrationToday.innerHTML = '';
    hydrationToday.innerHTML = `<p>You drank</p><p><span class="number">${oz}</span></p><p>oz water today.</p>`
  },

  renderSleepInfo(currentUser, currentDate, sleepData, startDate, userRepo, repo, randomDate, id) {
    const sleepToday = document.getElementById('sleepToday');
    const sleepQualityToday = document.getElementById('sleepQualityToday');
    const avUserSleepQuality = document.getElementById('avUserSleepQuality');
    const sleepThisWeek = document.getElementById('sleepThisWeek');
    const sleepEarlierWeek = document.getElementById('sleepEarlierWeek');

    sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${currentUser.getDateAmount(currentDate, sleepData, 'hoursSlept')}</span></p> <p>hours today.</p>`);
    sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${currentUser.getDateAmount(currentDate, sleepData, 'sleepQuality')}</span></p><p>out of 5.</p>`);
    avUserSleepQuality.insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${currentUser.calcAvgAllTime(sleepData, 'sleepQuality')}</span></p><p>out of 5.</p>`);
    sleepThisWeek.insertAdjacentHTML('afterBegin', this.makeSleepHTML(currentUser.getOverWeekAmount(startDate, sleepData, 'hoursSlept')));
    sleepEarlierWeek.insertAdjacentHTML('afterBegin', this.makeSleepHTML(repo.calculateWeekSleep(randomDate, id, userRepo)));
  },

  makeSleepHTML(method) {
    return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
  },

  renderSubmittedSleep(hrs, qual) {
    sleepToday.innerHTML = '';
    sleepToday.innerHTML = `<p>You slept</p> <p><span class="number">${hrs}</span></p> <p>hours today.</p>`
    sleepQualityToday.innerHTML = '';
    sleepQualityToday.innerHTML = `<p>Your sleep quality was</p> <p><span class="number">${qual}</span></p><p>out of 5.</p>`
  },

  renderActivityInfo(currentUser, currentDate, activityData, startDate, userRepo, id, repo, winnerId) {
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

    userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${currentUser.getDateAmount(currentDate, activityData, 'flightsOfStairs')}</span></p>`)
    avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${userRepo.getAllUsersAvgByDate(currentDate, 'flightsOfStairs', activityData)}</span></p>`)
    userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${currentUser.getDateAmount(currentDate, activityData, 'numSteps')}</span></p>`)
    avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${userRepo.getAllUsersAvgByDate(currentDate, 'numSteps', activityData)}</span></p>`)
    userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${currentUser.getDateAmount(currentDate, activityData, 'minutesActive')}</span></p>`)
    avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${userRepo.getAllUsersAvgByDate(currentDate, 'minutesActive', activityData)}</span></p>`)
    userStepsThisWeek.insertAdjacentHTML("afterBegin", this.makeStepsHTML(currentUser.getOverWeekAmount(startDate, activityData, 'numSteps')));
    userStairsThisWeek.insertAdjacentHTML("afterBegin", this.makeStairsHTML(currentUser.getOverWeekAmount(startDate, activityData, 'flightsOfStairs')));
    userMinutesThisWeek.insertAdjacentHTML("afterBegin", this.makeMinutesHTML(currentUser.getOverWeekAmount(startDate, activityData, 'minutesActive')));
    bestUserSteps.insertAdjacentHTML("afterBegin", this.makeStepsHTML(repo.userDataForWeek(winnerId, currentDate, userRepo, "numSteps")));
  },

  makeStepsHTML(method) {
    return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
  },
  
  makeStairsHTML(method) {
    return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
  },
  
  makeMinutesHTML(method) {
    return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
  },

  renderSubmittedActivity(steps, stairs, minutes) {
    userStepsToday.innerHTML = '';
    userStepsToday.innerHTML = `<p>Step Count:</p><p>You</p><p><span class="number">${steps}</span></p>`
    userStairsToday.innerHTML = '';
    userStairsToday.innerHTML = `<p>Stair Count:</p><p>You</><p><span class="number">${stairs}</span></p>`
    userMinutesToday.innerHTML = '';
    userMinutesToday.innerHTML = `<p>Active Minutes:</p><p>You</p><p><span class="number">${minutes}</span></p>`
  },

  renderFriendGameInfo(id, activityInfo, userStorage, dateString, user) {
    const friendChallengeListToday = document.getElementById('friendChallengeListToday');
    const streakList = document.getElementById('streakList');
    const streakListMinutes = document.getElementById('streakListMinutes');
    const friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
    const bigWinner = document.getElementById('bigWinner');

    friendChallengeListToday.insertAdjacentHTML("afterBegin", this.makeFriendChallengeHTML(activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
    streakList.insertAdjacentHTML("afterBegin", this.makeStepStreakHTML(activityInfo.getStreak(userStorage, id, 'numSteps')));
    streakListMinutes.insertAdjacentHTML("afterBegin", this.makeStepStreakHTML(activityInfo.getStreak(userStorage, id, 'minutesActive')));
    friendChallengeListHistory.insertAdjacentHTML("afterBegin", this.makeFriendChallengeHTML(activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
    bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
  },
  
  makeFriendChallengeHTML(method) {
    return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  },
  
  makeStepStreakHTML(method) {
    return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
  },

  hydrationButton: document.getElementById('hydrationSubmitButton'),
  hydrationInput: document.getElementById('numOunces'),
  hydrationHeader: document.getElementById('hydrationFormHeader'),

  activityButton: document.getElementById('activitySubmitButton'),
  stepsInput: document.getElementById('numSteps'),
  minInput: document.getElementById('minutesActive'),
  stairsInput: document.getElementById('flightsOfStairs'),
  activityHeader: document.getElementById('activityFormHeader'),

  sleepButton: document.getElementById('sleepSubmitButton'),
  hrInput: document.getElementById('hoursSlept'),
  qualInput: document.getElementById('sleepQuality'),
  sleepHeader: document.getElementById('sleepFormHeader')
}

export default domUpdates;