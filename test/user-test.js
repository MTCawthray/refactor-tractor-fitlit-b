import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';
import sampleUserData from '../src/data/sample-users.js';
import sampleHydrationData from '../src/data/sample-hydration.js';
import sampleSleepData from '../src/data/sample-sleep.js';
import sampleActivityData from '../src/data/sample-activity.js';

describe('User', () => {
  let user1, user2, user3;

  beforeEach(() => {
    user1 = new User(sampleUserData[0]);
    user2 = new User(sampleUserData[1]);
    user3 = new User(sampleUserData[2]);
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
    const users = [user1, user2, user3];
    const userRepo = new UserRepo(users);

    expect(user1.getFriendsNames(userRepo)).to.eql(['Jarvis Considine', 'Herminia Witting']);
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

  describe('calcAvgForDate()', () => {

    it('should be a function', () => {
      expect(user2.calcAvgForDate).to.be.a('function');
    });

  });

  describe('getOverWeekAmount()', () => {

    it('should be a function', () => {
      expect(user3.getOverWeekAmount).to.be.a('function');
    });

    it('should be able to retrieve the daily water oz intake for a user over the course of a week', () => {
      const ouncesOverWeek = user1.getOverWeekAmount('2019/06/15', sampleHydrationData, "numOunces");
  
      expect(ouncesOverWeek).to.eql([37, 69, 96, 61, 91, 50, 50]);
    });

    it('should be able to retrieve the hours slept data for a user over the course of a week', () => {
      const hoursSleptWeek = user1.getOverWeekAmount('2019/06/15', sampleSleepData, 'hoursSlept');
  
      expect(hoursSleptWeek).to.eql([6.1, 4.1, 8, 10.4, 10.7, 9.3, 7.8]);
    });
  
    it('should be able to retrieve the sleep quality data for a user over the course of a week', () => {
      const sleepQualityWeek = user1.getOverWeekAmount('2019/06/15', sampleSleepData, 'sleepQuality');
  
      expect(sleepQualityWeek).to.eql([2.2, 3.8, 2.6, 3.1, 1.2, 1.2, 4.2]);
    });

    it('should be able to retrieve the daily steps for a user over the course of a week', () => {
      expect(user1.getOverWeekAmount('2019/06/15', sampleActivityData, 'numSteps')).to.eql([3577, 6637, 14329, 4419, 8429, 14478, 6760]);
    });
  
    it('should be able to retrieve the daily min active for a user over the course of a week', () => {
      expect(user1.getOverWeekAmount('2019/06/15', sampleActivityData, 'minutesActive')).to.eql([140, 175, 168, 165, 275, 140, 135]);
    });
  
    it('should be able to retrieve the daily flights of stairs for a user over the course of a week', () => {
      expect(user1.getOverWeekAmount('2019/06/15', sampleActivityData, 'flightsOfStairs')).to.eql([16, 36, 18, 33, 2, 12, 6]);
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

  describe('calcDailyMilesWalked()', () => {

    it('should be a function', () => {
      expect(user3.calcDailyMilesWalked).to.be.a('function');
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
