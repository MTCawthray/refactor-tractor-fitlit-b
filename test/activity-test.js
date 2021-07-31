import { expect } from 'chai';
import Activity from '../src/Activity';
import UserRepo from '../src/User-repo';
import User from '../src/User';
import sampleActivityData from '../src/data/sample-activity.js'

describe('Activity', function() {
  let activityData, user1, user2, user3, user4, users, userRepo, activity;

  beforeEach(function() {
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

  it('should take in data', function() {
    expect(activity.activityData[0].userID).to.eql(1);
    expect(activity.activityData[4].date).to.eql("2019/06/16");
    expect(activity.activityData[3].numSteps).to.eql(3486);
    expect(activity.activityData[8].minutesActive).to.eql(168);
    expect(activity.activityData[10].flightsOfStairs).to.eql(5);
  });

describe('getFriendActivity()', function() {

  it('should return an array', () => {
    expect(activity.getFriendsActivity(user3, userRepo)).to.be.an('array');
  });
 
  it('should get a users friend lists activity', function() {
    // console.log(activity.getFriendsActivity(user4, userRepo));
    expect(activity.getFriendsActivity(user4, userRepo)).to.eql([
      {
        userID: 1,
        date: '2019/06/15',
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16
      },
      {
        userID: 1,
        date: '2019/06/16',
        numSteps: 6637,
        minutesActive: 175,
        flightsOfStairs: 36
      },
      {
        userID: 1,
        date: '2019/06/17',
        numSteps: 14329,
        minutesActive: 168,
        flightsOfStairs: 18
      },
      {
        userID: 1,
        date: '2019/06/18',
        numSteps: 4419,
        minutesActive: 165,
        flightsOfStairs: 33
      },
      {
        userID: 1,
        date: '2019/06/19',
        numSteps: 8429,
        minutesActive: 275,
        flightsOfStairs: 2
      },
      {
        userID: 1,
        date: '2019/06/20',
        numSteps: 14478,
        minutesActive: 140,
        flightsOfStairs: 12
      },
      {
        userID: 1,
        date: '2019/06/21',
        numSteps: 6760,
        minutesActive: 135,
        flightsOfStairs: 6
      },
      {
        userID: 1,
        date: '2019/06/22',
        numSteps: 10289,
        minutesActive: 119,
        flightsOfStairs: 6
      },
      {
        userID: 1,
        date: '2019/06/23',
        numSteps: 13928,
        minutesActive: 218,
        flightsOfStairs: 21
      },
      {
        userID: 1,
        date: '2019/06/24',
        numSteps: 7186,
        minutesActive: 25,
        flightsOfStairs: 15
      },
      {
        userID: 2,
        date: '2019/06/15',
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10
      },
      {
        userID: 2,
        date: '2019/06/16',
        numSteps: 4112,
        minutesActive: 220,
        flightsOfStairs: 37
      },
      {
        userID: 2,
        date: '2019/06/17',
        numSteps: 13750,
        minutesActive: 65,
        flightsOfStairs: 4
      },
      {
        userID: 2,
        date: '2019/06/18',
        numSteps: 4662,
        minutesActive: 181,
        flightsOfStairs: 31
      },
      {
        userID: 2,
        date: '2019/06/19',
        numSteps: 9858,
        minutesActive: 243,
        flightsOfStairs: 44
      },
      {
        userID: 2,
        date: '2019/06/20',
        numSteps: 8153,
        minutesActive: 74,
        flightsOfStairs: 10
      },
      {
        userID: 2,
        date: '2019/06/21',
        numSteps: 10225,
        minutesActive: 174,
        flightsOfStairs: 26
      },
      {
        userID: 2,
        date: '2019/06/22',
        numSteps: 3605,
        minutesActive: 124,
        flightsOfStairs: 31
      },
      {
        userID: 2,
        date: '2019/06/23',
        numSteps: 4148,
        minutesActive: 142,
        flightsOfStairs: 0
      },
      {
        userID: 2,
        date: '2019/06/24',
        numSteps: 8568,
        minutesActive: 81,
        flightsOfStairs: 31
      }
    ]);
  });
});

describe('getFriendsAverageStepsForWeek()', function() {
  it('should return an array', () => {
    expect(activity.getFriendsAverageStepsForWeek(user2, "2019/06/23", userRepo)).to.be.an('array');
  });

  it('should get a users ranked friendslist activity for a chosen week', function() {
    expect(activity.getFriendsAverageStepsForWeek(user4, "2019/06/15", userRepo)).to.eql([{'2': 4294}, {'1': 3577}]);

    expect(activity.getFriendsAverageStepsForWeek(user4, "2019/06/23", userRepo)).to.eql([{'1': 9908.625}, {'2': 7314.125}]);
  });

});

describe('showChallengeListAndWinner()', function() {
  it('should be an array', () => {
    expect(activity.showChallengeListAndWinner(user2, "2019/06/23", userRepo)).to.be.an('array');
  });

  it('should get a users ranked friendslist activity for a chosen week with names', function() {
    expect(activity.showChallengeListAndWinner(user4, "2019/06/15", userRepo)).to.eql([
      'Allie McCarthy: 4294', 'Alex Roth: 3577'
    ])
  });
});

describe('getWinnerId', function() {
  it('should return a number', () => {
    expect(activity.getWinnerId(user2, '2019/06/23', userRepo)).to.be.a('number')
  });

  it('should know the ID of the winning friend', function() {
    expect(activity.getWinnerId(user2, '2019/06/23', userRepo)).to.eql(1)
    expect(activity.getWinnerId(user4, "2019/06/15", userRepo)).to.eql(2)
  });
});

describe('getStreak()', function() {
  it('should show a 3-day increasing streak for a users step count', function() {
    expect(activity.getStreak(userRepo, 1, 'numSteps')).to.eql(['2019/06/17', '2019/06/20', '2019/06/23'])
  });

  it('should show a 3-day increasing streak for a users minutes of activity', function() {
    expect(activity.getStreak(userRepo, 2, 'minutesActive')).to.eql(['2019/06/19'])
  });
});
})

