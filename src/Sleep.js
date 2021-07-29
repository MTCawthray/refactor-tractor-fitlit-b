class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }
 
  calculateWeekSleep(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.hoursSlept}`);
  }
  

  determineBestSleepers(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.isolateUsernameAndRelevantData(this.sleepData, date, 'sleepQuality', timeline);

    return Object.keys(userSleepObject).filter(function(key) {
      return (userSleepObject[key].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / userSleepObject[key].length) > 3
    }).map(function(sleeper) {
      return userRepo.getDataFromID(parseInt(sleeper)).name;
    })
  }
  determineSleepWinnerForWeek(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'sleepQuality', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }
  determineSleepHoursWinnerForDay(date, userRepo) {
    let timeline = userRepo.chooseDayDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'hoursSlept', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }
  getWinnerNamesFromList(sortedArray, userRepo) {
    let bestSleepers = sortedArray.filter(function(element) {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });

    let bestSleeperIds = bestSleepers.map(function(bestSleeper) {
      return (Object.keys(bestSleeper));
    });

    return bestSleeperIds.map(function(sleepNumber) {
      return userRepo.getDataFromID(parseInt(sleepNumber)).name;
    });
  }
}


export default Sleep;