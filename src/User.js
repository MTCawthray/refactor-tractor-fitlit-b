class User {
  constructor(userDetails) {
    this.id = userDetails.id;
    this.name = userDetails.name;
    this.address = userDetails.address;
    this.email = userDetails.email;
    this.strideLength = userDetails.strideLength;
    this.dailyStepGoal = userDetails.dailyStepGoal;
    this.friends = userDetails.friends;

  }
  getFirstName() {
    return this.name.split(' ')[0];
  }

  getFriendsNames(userStorage) {
    return this.friends.map((friendId) => (userStorage.getDataFromID(friendId).name));
  }

  getDateAmount(date, data, property) {
    const entry = data.find(entry => {
      entry.date === date
      if ((entry.date === date) && (entry.userID === this.id)) {
        return entry[property];
      }
    })

    return entry[property]
  }

  calcAvgForDate(data, property) {
    const daily = data.map(entry => entry[property]);
    const total = daily.reduce((acc, curr) => {
      return acc + curr;
    });

    return Math.round(total / data.length);
  }

  getOverWeekAmount(startDate, data, property) {
    const usersData = data.filter(entry => entry.userID === this.id)
    const index = usersData.findIndex(entry => entry.date === startDate);
    const weekLog = usersData.slice(index, index + 7);

    return weekLog.map(entry => entry[property]);
  }

  calcAvgOverWeek(data, startDate, property) {
    const usersData = data.filter(entry => entry.userID === this.id)
    const index = usersData.findIndex(entry => entry.date === startDate);
    const weekLog = usersData.slice(index, index + 8);
    const weeklyStats = weekLog.map(entry => entry[property]);
    const total = weeklyStats.reduce((sum, num) => {
      return sum + num;
    });

    return Math.round(total / 7);
  }

    calcAvgAllTime(data, property) {
    const usersData = data.filter(entry => entry.userID === this.id)
    const dailySum = usersData.map(entry => entry[property]);
    const totalSum = dailySum.reduce((sum, num) => {
      return sum + num;
    });
    const avgAmount = totalSum / dailySum.length;

    return parseFloat(avgAmount.toFixed(1));
  }

  //activity specific methods
  calcDailyMilesWalked(activityData, date) {
    const usersData = activityData.filter(entry => entry.userID === this.id)
    const dateStats = usersData.find(entry => entry.date === date);
    const feetWalked = dateStats.numSteps * this.strideLength;
    const milesWalked = feetWalked / 5280;

    return parseFloat(milesWalked.toFixed(1));
  }

  getStepGoalResult(activityData, date) {
    const dailyInfo = activityData.find(entry => entry.date === date);
    const usersData = activityData.filter(entry => entry.userID === this.id)

    return dailyInfo.numSteps >= usersData.dailyStepGoal;
  }

  getDatesExceedingStepGoal(activityData) {
    const usersData = activityData.filter(entry => entry.userID === this.id)
    const dailyStepGoal = this.dailyStepGoal;
    const stepGoalExceededDays = usersData
      .filter(entry => entry.numSteps > dailyStepGoal);

    return stepGoalExceededDays.map(entry => entry.date);
  }

    getFlightsClimbedRecord(activityData) {
    const usersData = activityData.filter(entry => entry.userID === this.id)
    const sortedEntries = usersData.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })
    const [maxFlights] = sortedEntries;

    return maxFlights.flightsOfStairs;
  }
}

export default User;
