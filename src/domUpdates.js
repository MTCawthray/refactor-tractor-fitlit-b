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


}
export default domUpdates;