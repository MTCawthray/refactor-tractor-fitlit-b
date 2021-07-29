class UserRepo {
  constructor(users) {
    this.users = users;
  }

// ACCESS USER

  getDataFromID(id) { 
    return this.users.find((user) => id === user.id);
  }

  getDataFromUserID(id, dataSet) {
    return dataSet.filter((userData) => id === userData.userID);
  }

  /////////////////////////////////////////////
  
  // NEW HELPER FUNCTIONS

  getAllUsersAvgByDate(date, property, activityData) {
    const dataLog = activityData.filter(entry => entry.date === date);
    const propertyLog = dataLog.map(entry => entry[property]);
    const total = propertyLog.reduce((sum, num) => {
      return sum + num;
    });

    return Math.round(total / dataLog.length);
  }

  calcAvgAllUsers(key) {
    var result = this.users.reduce((acc, dataSet) => {
      return acc += dataSet[key];
    }, 0);
    return result / this.users.length;
  }

  // NEW USES OF HELPER FUNCTIONS

  calculateAverageStepGoal() {
    this.calcAvgAllUsers('dailyStepGoal');
  }

  /////////////////////////////////////////////

  // OG HELPER FUNCTIONS - ACCESS DATE(S)

  getToday(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet)[0].date;
  }

  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  }

  getWeekFromDate(date, id, dataSet) {
    let dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
    return this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
  }

  // OG HELPER FUNCTIONS ONLY USED ONCE

  // only used once: `Activity.getFriendsAverageStepsForWeek()`

  chooseWeekDataForAllUsers(dataSet, date) {
    return dataSet.filter(function(dataItem) {
      return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date)
    })
  }

  // only used once: activity.getAllUserAverageForDay()

  chooseDayDataForAllUsers(dataSet, date) {
    return dataSet.filter(function(dataItem) {
      return dataItem.date === date
    });
  }

    // only used once: user-repo.combineRankedUserIDsAndAveragedData() helper function below

  rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    return Object.keys(sortedObjectKeys).sort(function(b, a) {
      return (sortedObjectKeys[a].reduce(function(acc, sleepQualityValue) {
        acc += sleepQualityValue
        return acc;
      }, 0) / sortedObjectKeys[a].length) - (sortedObjectKeys[b].reduce(function(acc, sleepQualityValue) {
        acc += sleepQualityValue
        return acc;
      }, 0) / sortedObjectKeys[b].length)
    });
  }

  // only used once: activity.getFriendsAverageStepsForWeek()

  combineRankedUserIDsAndAveragedData(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    let rankedUsersAndAverages = this.rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod)
    return rankedUsersAndAverages.map(function(rankedUser) {
      rankedUser = {
        [rankedUser]: sortedObjectKeys[rankedUser].reduce(
          function(acc, sleepQualityValue) {
            acc += sleepQualityValue
            return acc;
          }, 0) / sortedObjectKeys[rankedUser].length
      };
      return rankedUser;
    });
  }

  // OG HELPER FUNCTIONS: OTHERS THAT WE SHOULD DISCUSS?

  // used in the date access helper functions above & 1 in activity.getStreak()

  makeSortedUserArray(id, dataSet) {
    let selectedID = this.getDataFromUserID(id, dataSet)
    let sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate;
  }

 // only used twice (in 2 other helper functions): user-repo.combineRankedUserIDsAndAveragedData() & user-repo.rankUserIDsbyRelevantDataValue()

  isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod) {
    return listFromMethod.reduce(function(acc, dataItem) {
      if (!acc[dataItem.userID]) {
        acc[dataItem.userID] = [dataItem[relevantData]]
      } else {
        acc[dataItem.userID].push(dataItem[relevantData])
      }
      return acc;
    }, {});
  }

}

export default UserRepo;