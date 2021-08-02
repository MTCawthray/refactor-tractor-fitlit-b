import { expect } from 'chai';
import UserRepo from '../src/User-repo';
import User from '../src/User';
import sampleHydrationData from '../src/data/sample-hydration.js';
import sampleSleepData from '../src/data/sample-sleep.js';

describe('User Repo', () => {
  let user1, user2, user3, user4, user5, users, userRepo, hydrationData, sleepData;

  beforeEach(() => {
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
    users = [user1, user2, user3, user4, user5];
    userRepo = new UserRepo(users);
    hydrationData = sampleHydrationData;
    sleepData = sampleSleepData;
  });

  it('should be a function', () => {
    expect(UserRepo).to.be.a('function');
  });

  it('takes an array of user data', () => {
    expect(userRepo.users).to.include(user2);
  });

  it('should return user data when given user ID', () => {
    expect(userRepo.getDataFromID(1)).to.eql(user1);
    expect(userRepo.getDataFromID(2)).to.eql(user2);
  });

  it('should return the average of all users step goals', () => {
    expect(userRepo.calculateAverageStepGoal()).to.equal(18600);
  });

  describe('array changes', () => {

    it('should get a users data from its userID in any data set', () => {

      expect(userRepo.getDataFromUserID(1, hydrationData)).to.eql([{
        userID: 1,
        date: '2019/06/15',
        numOunces: 37
      },
      {
        userID: 1,
        date: '2019/06/16',
        numOunces: 69
      },
      {
        userID: 1,
        date: '2019/06/17',
        numOunces: 96
      },
      {
        userID: 1,
        date: '2019/06/18',
        numOunces: 61
      },
      {
        userID: 1,
        date: '2019/06/19',
        numOunces: 91
      },
      {
        userID: 1,
        date: '2019/06/20',
        numOunces: 50
      },
      {
        userID: 1,
        date: '2019/06/21',
        numOunces: 50
      },
      {
        userID: 1,
        date: '2019/06/22',
        numOunces: 43
      },
      {
        userID: 1,
        date: '2019/06/23',
        numOunces: 39
      },
      {
        userID: 1,
        date: '2019/06/24',
        numOunces: 61
      },
      {
        userID: 1,
        date: '2019/06/25',
        numOunces: 51
      },
      {
        userID: 1,
        date: '2019/06/26',
        numOunces: 52
      },
      {
        userID: 1,
        date: '2019/06/27',
        numOunces: 29
      },
      {
        userID: 1,
        date: '2019/06/28',
        numOunces: 57
      }
      ]);
    });

    it('should get a users most recent date using the app', () => {
      expect(userRepo.getToday(2, hydrationData)).to.eql("2019/06/28");
    });

    it('should sort data by date and extract its week', () => {
      expect(userRepo.getFirstWeek(2, hydrationData)[3].date).to.eql("2019/06/25");
    });

    it('should get a sorted week of data for a single user from a date', () => {
      expect(userRepo.getWeekFromDate('2019/06/21', 1, hydrationData)[3].date).to.eql("2019/06/18");
      expect(userRepo.getWeekFromDate('2019/06/20', 3, hydrationData)[3].date).to.eql("2019/06/17");
    });

    it('should get a week of data for all users in data set', () => {
      expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/06/18')[2].date).to.eql("2019/06/15");
      expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/06/18')[2].userID).to.eql(3);
      expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/06/18')[3].date).to.eql("2019/06/16");
      expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/06/18')[3].userID).to.eql(1);
    });

    it('should get a day of data for all users in data set', () => {
      expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[0].date).to.eql('2019/06/15');
      expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[0].hoursSlept).to.eql(6.1);
      expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[2].date).to.eql('2019/06/15');
      expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[2].userID).to.eql(3);
    });

    it('should isolate a user ID and its values of any relevant data', () => {
      expect(userRepo.isolateUsernameAndRelevantData(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))).to.eql({
        '1': [2.2, 3.8, 2.6, 3.1, 1.2, 1.2, 4.2],
        '2': [4.7, 3.8, 3, 3.2, 2.5, 2.4, 4.8],
        '3': [4.7, 3.4, 4.9, 2.6, 3.4, 1.2, 3.7],
        '6': [4, 4]
      });

      expect(userRepo.isolateUsernameAndRelevantData(hydrationData, "2019/06/21", 'numOunces', userRepo.chooseWeekDataForAllUsers(hydrationData, "2019/06/21"))).to.eql({
        '1': [37, 69, 96, 61, 91, 50, 50],
        '2': [75, 91, 96, 70, 76, 71, 27],
        '3': [47, 99, 28, 40, 85, 51, 41]
      });
    });

    it('should rank user ids according to relevant data value averages', () => {
      expect(userRepo.rankUserIDsbyRelevantDataValue(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))).to.eql(['6', '2', '3', '1']);
    });

    it('should show list in order of userID and average of relevant value', () => {
      expect(userRepo.combineRankedUserIDsAndAveragedData(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))[0]).to.eql({
        '6': 4
      })
    });
  });
});
