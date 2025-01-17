import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';
import sampleUserData from '../src/data/sample-users.js';
import sampleHydrationData from '../src/data/sample-hydration.js';
import sampleSleepData from '../src/data/sample-sleep.js';
import sampleActivityData from '../src/data/sample-activity.js';

describe('User', () => {
  let user1, user2, user3, users, userRepo;

  beforeEach(() => {
    user1 = new User(sampleUserData[0]);
    user2 = new User(sampleUserData[1]);
    user3 = new User(sampleUserData[2]);
    users = [user1, user2, user3];
    userRepo = new UserRepo(users);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user1).to.be.an.instanceOf(User);
  });

  it('should take a user data object', () => {
    expect(user1.id).to.equal(1);
    expect(user1.name).to.equal("Luisa Hane");
  });

  it('should take a different user data object', () => {
    expect(user2.id).to.equal(2);
    expect(user2.name).to.equal("Jarvis Considine");
  });

  describe('getFirstName()', () => {

    it('should be a function', () => {
      expect(user1.getFirstName).to.be.a.a('function');
    });

    it('should return user first name', () => {
      expect(user2.getFirstName()).to.equal("Jarvis");
    });

  });

  describe('getFriendsNames()', () => {

    it('should be a function', () => {
      expect(user1.getFriendsNames).to.be.a('function');
    });

    it('should return list of friend names from user repository', () => {
      expect(user1.getFriendsNames(userRepo)).to.eql(['Jarvis Considine', 'Herminia Witting']);
    });
  });

  describe('calcDailyMilesWalked()', () => {

    it('should be a function', () => {
      expect(user2.calcDailyMilesWalked).to.be.a('function');
    });

    it('should return the calculated daily miles walked for a given date', () => {
      expect(user1.calcDailyMilesWalked(sampleActivityData, '2019/06/22')).to.equal(8.4);
    });
  });

  describe('getDateAmount()', () => {

    it('should be a function', () => {
      expect(user1.getDateAmount).to.be.a('function');
    });

    it('should be able to retrieve the ounces consumed by a user on a specific date', () => {
      const numOunces = user1.getDateAmount('2019/06/15', sampleHydrationData, "numOunces");

      expect(numOunces).to.equal(37);
    });

    it('should be able to retrieve the hours slept by a user on a specific date', () => {
      const hoursSlept = user1.getDateAmount('2019/06/17', sampleSleepData, 'hoursSlept');

      expect(hoursSlept).to.equal(8);
    });

    it('should be able to retrieve the sleep quality of a user on a specific date', () => {
      const sleepQuality = user1.getDateAmount('2019/06/16', sampleSleepData, 'sleepQuality');

      expect(sleepQuality).to.equal(3.8);
    });

    it('should be able to calculate the miles walked by a user on a specific date', () => {
      const userMiles = user1.calcDailyMilesWalked(sampleActivityData, '2019/06/16');

      expect(userMiles).to.equal(5.4);
    });

    it('should retrieve the number of steps for a user on a specific date', () => {
      const numSteps = user1.getDateAmount('2019/06/15', sampleActivityData, 'numSteps');

      expect(numSteps).to.equal(3577);
    });

    it('should retrieve minutes active for a user on a specific date', () => {
      const minActive = user1.getDateAmount('2019/06/15', sampleActivityData, 'minutesActive');

      expect(minActive).to.equal(140);
    });

  });

  describe('getOverWeekAmount()', () => {

    it('should be a function', () => {
      expect(user3.getOverWeekAmount).to.be.a('function');
    });

    it('should be able to retrieve the daily water oz intake for a user over the course of a week', () => {
      const ouncesOverWeek = user1.getOverWeekAmount('2019/06/15', sampleHydrationData, "numOunces");

      expect(ouncesOverWeek).to.eql(["2019/06/15: 37", "2019/06/16: 69", "2019/06/17: 96", "2019/06/18: 61", "2019/06/19: 91", "2019/06/20: 50", "2019/06/21: 50"]);
    });

    it('should be able to retrieve the hours slept data for a user over the course of a week', () => {
      const hoursSleptWeek = user1.getOverWeekAmount('2019/06/15', sampleSleepData, 'hoursSlept');

      expect(hoursSleptWeek).to.eql(["2019/06/15: 6.1", "2019/06/16: 4.1", "2019/06/17: 8", "2019/06/18: 10.4", "2019/06/19: 10.7", "2019/06/20: 9.3", "2019/06/21: 7.8"]);
    });

    it('should be able to retrieve the sleep quality data for a user over the course of a week', () => {
      const sleepQualityWeek = user1.getOverWeekAmount('2019/06/15', sampleSleepData, 'sleepQuality');

      expect(sleepQualityWeek).to.eql(["2019/06/15: 2.2", "2019/06/16: 3.8", "2019/06/17: 2.6", "2019/06/18: 3.1", "2019/06/19: 1.2", "2019/06/20: 1.2", "2019/06/21: 4.2"]);
    });

    it('should be able to retrieve the daily steps for a user over the course of a week', () => {
      expect(user1.getOverWeekAmount('2019/06/15', sampleActivityData, 'numSteps')).to.eql(["2019/06/15: 3577", "2019/06/16: 6637", "2019/06/17: 14329", "2019/06/18: 4419", "2019/06/19: 8429", "2019/06/20: 14478", "2019/06/21: 6760"]);
    });

    it('should be able to retrieve the daily min active for a user over the course of a week', () => {
      expect(user1.getOverWeekAmount('2019/06/15', sampleActivityData, 'minutesActive')).to.eql(["2019/06/15: 140", "2019/06/16: 175", "2019/06/17: 168", "2019/06/18: 165", "2019/06/19: 275", "2019/06/20: 140", "2019/06/21: 135"]);
    });

    it('should be able to retrieve the daily flights of stairs for a user over the course of a week', () => {
      expect(user1.getOverWeekAmount('2019/06/15', sampleActivityData, 'flightsOfStairs')).to.eql(["2019/06/15: 16", "2019/06/16: 36", "2019/06/17: 18", "2019/06/18: 33", "2019/06/19: 2", "2019/06/20: 12", "2019/06/21: 6"]);
    });
  });

  describe('calcAvgOverWeek()', () => {

    it('should be a function', () => {
      expect(user1.calcAvgOverWeek).to.be.a('function');
    });

    it('should calculate the average minutes active for a user during a given week', () => {
      expect(user1.calcAvgOverWeek(sampleActivityData, '2019/06/15', 'minutesActive')).to.equal(188);
    });
  });

  describe('calcAvgAllTime()', () => {

    it('should be a function', () => {
      expect(user3.calcAvgAllTime).to.be.a('function');
    });

    it('should calculate the average daily water oz intake for a user of all time', () => {
      expect(user1.calcAvgAllTime(sampleHydrationData, "numOunces")).to.equal(56.1);
    });

    it('should calculate a users average daily hours slept over all time', () => {
      expect(user1.calcAvgAllTime(sampleSleepData, 'hoursSlept')).to.equal(7.8);
    });

    it('should calculate a users average daily sleep quality over all time', () => {
      expect(user1.calcAvgAllTime(sampleSleepData, 'sleepQuality')).to.equal(2.8);
    });
  });

  describe('getStepGoalResult()', () => {

    it('should be a function', () => {
      expect(user3.getStepGoalResult).to.be.a('function');
    });

    it('should determine whether a user reached their step goal on a specific date', () => {
      expect(user1.getStepGoalResult(sampleActivityData, '2019/06/16')).to.equal(false);
    });
  });

  describe('getDatesExceedingStepGoal()', () => {

    it('should be a function', () => {
      expect(user2.getDatesExceedingStepGoal).to.be.a('function');
    });

    it('should identify dates when user exceeded step goal', () => {
      expect(user1.getDatesExceedingStepGoal(sampleActivityData)).to.eql(['2019/06/17', '2019/06/20', '2019/06/22', '2019/06/23']);
    });
  });

  describe('getFlightsClimbedRecord()', () => {

    it('should be a function', () => {
      expect(user3.getFlightsClimbedRecord).to.be.a('function');
    });

    it('should retrieve the most flights climbed record for a user', () => {
      expect(user1.getFlightsClimbedRecord(sampleActivityData)).to.equal(36);
    });
  });
});
