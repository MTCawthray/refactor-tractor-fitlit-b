import { expect } from 'chai';
import sampleSleepData from '../src/data/sample-sleep.js';
import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Sleep', function() {
  let sleepData, sleep, user1, user2, user3, user4, user5, users, userRepo;

  beforeEach(function() {
    sleepData = sampleSleepData;
    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    });
    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });
    user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });
    user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    user5 = new User({
      id: 5,
      name: "Bugs Bunny",
      address: "1234 Looney Street, Denver CO 80301-1697",
      email: "BugsB1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    let user6 = new User({
      id: 6,
      name: "Richmond",
      address: "1234 Looney Street, Denver CO 80301-1697",
      email: "BugsB1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    users = [user1, user2, user3, user4, user5, user6];
    userRepo = new UserRepo(users);
    sleep = new Sleep(sleepData);
  });

  it('should take in a list of data', function() {
    console.log(sleep.sleepData);
    expect(sleep.sleepData[1].userID).to.equal(2);
    expect(sleep.sleepData[3].hoursSlept).to.equal(4.1);
    expect(sleep.sleepData[6].sleepQuality).to.equal(2.6);
    expect(sleep.sleepData[7].date).to.equal('2019/06/17');
  });

  it('should return person with best quality sleep for the week', function() {
    expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo)).to.eql(["Richmond"]);
  });

  it('should return all qualifying users if best quality sleep is a tie', function() {
    expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo)).to.eql(["Richmond"]);
  });

  it('should return person with longest sleep for the day', function() {
    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(["Richmond"]);
  });

  it('should return all qualifying users if longest sleep is a tie', function() {
    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(["Richmond"]);
  });
});
