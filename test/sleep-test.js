import { expect } from 'chai';

import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Sleep', function() {
  let sleepData;
  let sleep;
  let user1;
  let user2;
  let user3;
  let user4;
  let user5;
  let users;
  let userRepo;

  beforeEach(function() {
    sleepData = [{
      "userID": 1,
      "date": "2017/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2017/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 3,
      "date": "2017/06/15",
      "hoursSlept": 2,
      "sleepQuality": 3
    },
    {
      "userID": 4,
      "date": "2017/06/15",
      "hoursSlept": 5.4,
      "sleepQuality": 3
    },
    {
      "userID": 1,
      "date": "2018/07/15",
      "hoursSlept": 4.1,
      "sleepQuality": 3.6
    },
    {
      "userID": 2,
      "date": "2018/07/15",
      "hoursSlept": 9.6,
      "sleepQuality": 2.9
    },
    {
      "userID": 3,
      "date": "2018/07/15",
      "hoursSlept": 2,
      "sleepQuality": 3
    },
    {
      "userID": 4,
      "date": "2018/07/23",
      "hoursSlept": 8.1,
      "sleepQuality": 3.5
    },
    {
      "userID": 1,
      "date": "2019/05/30",
      "hoursSlept": 8.9,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2019/05/30",
      "hoursSlept": 4.4,
      "sleepQuality": 1.6
    },
    {
      "userID": 3,
      "date": "2019/05/30",
      "hoursSlept": 4,
      "sleepQuality": 1
    },
    {
      "userID": 4,
      "date": "2019/05/30",
      "hoursSlept": 8,
      "sleepQuality": 3.4
    },
    {
      "userID": 1,
      "date": "2019/08/22",
      "hoursSlept": 10.1,
      "sleepQuality": 1.8
    },
    {
      "userID": 2,
      "date": "2019/08/22",
      "hoursSlept": 6.9,
      "sleepQuality": 1.2
    },
    {
      "userID": 3,
      "date": "2019/08/22",
      "hoursSlept": 4,
      "sleepQuality": 1
    },
    {
      "userID": 4,
      "date": "2019/06/21",
      "hoursSlept": 6.1,
      "sleepQuality": 3.5
    },
    {
      "userID": 4,
      "date": "2019/06/20",
      "hoursSlept": 4.7,
      "sleepQuality": 4
    },
    {
      "userID": 4,
      "date": "2019/06/19",
      "hoursSlept": 10.1,
      "sleepQuality": 1.3
    },
    {
      "userID": 4,
      "date": "2019/06/18",
      "hoursSlept": 7.9,
      "sleepQuality": 1.6
    },
    {
      "userID": 4,
      "date": "2019/06/17",
      "hoursSlept": 5.9,
      "sleepQuality": 1.6
    },
    {
      "userID": 4,
      "date": "2019/06/16",
      "hoursSlept": 9.6,
      "sleepQuality": 1
    },
    {
      "userID": 4,
      "date": "2019/06/15",
      "hoursSlept": 9,
      "sleepQuality": 3.1
    },
    {
      "userID": 2,
      "date": "2019/06/21",
      "hoursSlept": 6.1,
      "sleepQuality": 3.5
    },
    {
      "userID": 2,
      "date": "2019/06/20",
      "hoursSlept": 4.7,
      "sleepQuality": 4
    },
    {
      "userID": 2,
      "date": "2019/06/19",
      "hoursSlept": 10.1,
      "sleepQuality": 3.3
    },
    {
      "userID": 2,
      "date": "2019/06/18",
      "hoursSlept": 7.9,
      "sleepQuality": 3.6
    },
    {
      "userID": 2,
      "date": "2019/06/17",
      "hoursSlept": 5.9,
      "sleepQuality": 3.6
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "hoursSlept": 9.6,
      "sleepQuality": 4
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 9,
      "sleepQuality": 3.1
    },
    {
      "userID": 5,
      "date": "2019/06/21",
      "hoursSlept": 9,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/20",
      "hoursSlept": 8,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/19",
      "hoursSlept": 10,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/18",
      "hoursSlept": 9,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/17",
      "hoursSlept": 8,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/16",
      "hoursSlept": 10,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/15",
      "hoursSlept": 9,
      "sleepQuality": 4
    }
    ];


    sleep = new Sleep(sleepData);
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
  });

  it('should take in a list of data', function() {
    expect(sleep.sleepData[1].userID).to.equal(2);
    expect(sleep.sleepData[3].hoursSlept).to.equal(5.4);
    expect(sleep.sleepData[6].sleepQuality).to.equal(3);
    expect(sleep.sleepData[7].date).to.equal('2018/07/23');
  });

  it('should return person with best quality sleep for the week', function() {

    expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo)).to.eql(["Bugs Bunny"]);
  })
  it('should return all qualifying users if best quality sleep is a tie', function() {
    sleepData = sleepData.push({
      "userID": 6,
      "date": "2019/06/15",
      "hoursSlept": 9,
      "sleepQuality": 4
    })
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

    expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo)).to.eql(["Bugs Bunny", "Richmond"]);
  })

  it('should return person with longest sleep for the day', function() {

    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(["Bugs Bunny"]);
  })
  it('should return all qualifying users if longest sleep is a tie', function() {
    sleepData = sleepData.push({
      "userID": 6,
      "date": "2019/06/21",
      "hoursSlept": 9,
      "sleepQuality": 4
    })
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

    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(["Bugs Bunny", "Richmond"]);
  })
  //make this test fail when user is NOT best in week
});
