import { expect } from 'chai';
import Activity from '../src/Activity';
import UserRepo from '../src/User-repo';
import User from '../src/User';
import sampleActivityData from '../src/data/sample-activity.js'

describe('Activity', () => {
  let activityData, user1, user2, user3, user4, users, userRepo, activity;

  beforeEach(() => {
    activityData = sampleActivityData;
    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 5000,
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
      name: "Jerry Seinfield",
      address: "32 Baker Street, Denver CO 12345",
      email: "jseinfield@gmail.com",
      strideLength: 3.8,
      dailyStepGoal: 20000,
      friends: [1, 2, 4]
    });

    user4 = new User({
      id: 4,
      name: "Patrick the Starfish",
      address: "A rock in the ocean",
      email: "thebigpstar@pacificocean.net",
      strideLength: .2,
      dailyStepGoal: 13000,
      friends: [1, 2]
    });
    users = [user1, user2, user3, user4];
    userRepo = new UserRepo(users);
    activity = new Activity(activityData);
  });

  it('should be an instance of a class', () => {
    expect(activity).to.be.an.instanceOf(Activity);
  });

  it('should take in data', () => {
    expect(activity.activityData[0].userID).to.eql(1);
    expect(activity.activityData[4].date).to.eql("2019/06/16");
    expect(activity.activityData[3].numSteps).to.eql(3486);
    expect(activity.activityData[8].minutesActive).to.eql(168);
    expect(activity.activityData[10].flightsOfStairs).to.eql(5);
  });

  describe('getFriendActivity()', () => {

    it('should return an array', () => {
      expect(activity.getFriendsActivity(user3, userRepo)).to.be.an('array');
    });

    it('should get a users friend lists activity', () => {
      expect(activity.getFriendsActivity(user4, userRepo).length).to.eql(20);
    });
  });

  describe('getFriendsAverageStepsForWeek()', () => {
    it('should return an array', () => {
      expect(activity.getFriendsAverageStepsForWeek(user2, "2019/06/23", userRepo)).to.be.an('array');
    });

    it('should get a users ranked friendslist activity for a chosen week', () => {
      expect(activity.getFriendsAverageStepsForWeek(user4, "2019/06/15", userRepo)).to.eql([{
        '2': 4294
      }, {
        '1': 3577
      }]);

      expect(activity.getFriendsAverageStepsForWeek(user4, "2019/06/23", userRepo)).to.eql([{
        '1': 9908.625
      }, {
        '2': 7314.125
      }]);
    });

  });

  describe('showChallengeListAndWinner()', () => {
    it('should be an array', () => {
      expect(activity.showChallengeListAndWinner(user2, "2019/06/23", userRepo)).to.be.an('array');
    });

    it('should get a users ranked friendslist activity for a chosen week with names', () => {
      expect(activity.showChallengeListAndWinner(user4, "2019/06/15", userRepo)).to.eql([
        'Allie McCarthy: 4294', 'Alex Roth: 3577'
      ])
    });
  });

  describe('getWinnerId', () => {
    it('should return a number', () => {
      expect(activity.getWinnerId(user2, '2019/06/23', userRepo)).to.be.a('number')
    });

    it('should know the ID of the winning friend', () => {
      expect(activity.getWinnerId(user2, '2019/06/23', userRepo)).to.eql(1)
      expect(activity.getWinnerId(user4, "2019/06/15", userRepo)).to.eql(2)
    });
  });

  describe('getStreak()', () => {
    it('should show a 3-day increasing streak for a users step count', () => {
      expect(activity.getStreak(userRepo, 1, 'numSteps')).to.eql(['2019/06/17', '2019/06/20', '2019/06/23'])
    });

    it('should show a 3-day increasing streak for a users minutes of activity', () => {
      expect(activity.getStreak(userRepo, 2, 'minutesActive')).to.eql(['2019/06/19'])
    });
  });
})
