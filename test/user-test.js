import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';
import sampleUserData from '../src/data/sample-users.js';
import sampleHydrationData from '../src/data/sample-hydration.js';
import sampleSleepData from '../src/data/sample-sleep.js';
import sampleActivityData from '../src/data/sample-activity.js';

describe('User', function() {
  let user1, user2, user3;

  beforeEach(() => {
    user1 = new User(sampleUserData[0]);
    user2 = new User(sampleUserData[1]);
    user3 = new User(sampleUserData[2]);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should take a user data object', function() {
    expect(user1.id).to.equal(1);
    expect(user1.name).to.equal("Luisa Hane");
  });

  it('should take a different user data object', function() {
    expect(user2.id).to.equal(2);
    expect(user2.name).to.equal("Jarvis Considine");
  });

  it('should return user first name', function() {
    expect(user2.getFirstName()).to.equal("Jarvis");
  });

  it('should return list of friend names from user repository', function() {
    const users = [user1, user2, user3];
    const userRepo = new UserRepo(users);

    expect(user1.getFriendsNames(userRepo)).to.eql(['Jarvis Considine', 'Herminia Witting']);
  });

  //HYDRATION TESTS
  it('should be able to retrieve the ounces consumed by a user on a specific date', function() {
    const numOunces = user1.getDateAmount('2019/06/15', sampleHydrationData, "numOunces");

    expect(numOunces).to.equal(37);
  });

  it('should calculate the average daily water oz intake for a user of all time', function() {
    const avgDailyWater = user1.calcAvgAllTime(sampleHydrationData, "numOunces");

    expect(avgDailyWater).to.equal(56.1);
  });

  it('should be able to retrieve the daily water oz intake for a user over the course of a week', function() {
    const ouncesOverWeek = user1.getOverWeekAmount('2019/06/15', sampleHydrationData, "numOunces");

    expect(ouncesOverWeek).to.eql([37, 69, 96, 61, 91, 50, 50]);
  });

  //SLEEP TESTS
  it('should be able to retrieve the hours slept by a user on a specific date', function() {
    const hoursSlept = user1.getDateAmount('2019/06/17', sampleSleepData, 'hoursSlept');

    expect(hoursSlept).to.equal(8);
  });

  it('should be able to retrieve the sleep quality of a user on a specific date', function() {
    const sleepQuality = user1.getDateAmount('2019/06/16', sampleSleepData, 'sleepQuality');

    expect(sleepQuality).to.equal(3.8);
  });

  it('should calculate a users average daily hours slept over all time', function() {
    const avgHrsSlept = user1.calcAvgAllTime(sampleSleepData, 'hoursSlept');

    expect(avgHrsSlept).to.equal(7.8);
  });

  it('should calculate a users average daily sleep quality over all time', function() {
    const avgSleepQuality = user1.calcAvgAllTime(sampleSleepData, 'sleepQuality');

    expect(avgSleepQuality).to.equal(2.8);
  });

  it('should be able to retrieve the hours slept data for a user throughout a given week', function() {
    const hoursSleptWeek = user1.getOverWeekAmount('2019/06/15', sampleSleepData, 'hoursSlept');

    expect(hoursSleptWeek).to.eql([6.1, 4.1, 8, 10.4, 10.7, 9.3, 7.8]);
  });

  it('should be able to retrieve the sleep quality data for a user throughout a given week', function() {
    const sleepQualityWeek = user1.getOverWeekAmount('2019/06/15', sampleSleepData, 'sleepQuality');

    expect(sleepQualityWeek).to.eql([2.2, 3.8, 2.6, 3.1, 1.2, 1.2, 4.2]);
  });

  //ACTIVITY
  it('should be able to calculate the miles walked by a user on a specific date', function() {
    const userMiles = user1.calcDailyMilesWalked(sampleActivityData, '2019/06/16');

    expect(userMiles).to.equal(5.4);
  });

  it('should retrieve the number of steps for a user on a specific date', function() {
    const numSteps = user1.getDateAmount('2019/06/15', sampleActivityData, 'numSteps');

    expect(numSteps).to.equal(3577);
  });

  it('should retrieve minutes active for a user on a specific date', function() {
    const minActive = user1.getDateAmount('2019/06/15', sampleActivityData, 'minutesActive');

    expect(minActive).to.equal(140);
  });

  it('should calculate the average minutes active for a user during a given week', function() {
    const avgMinutes = user1.calcAvgOverWeek(sampleActivityData, '2019/06/15', 'minutesActive');

    expect(avgMinutes).to.equal(188);
  });

});
