import { expect } from 'chai';
import Hydration from '../src/Hydration';
import UserRepo from '../src/User-repo';
import User from '../src/User';
import sampleHydrationData from '../src/data/sample-hydration.js';

describe('Hydration', () => {
  let hydration, hydrationData, user3, user4, users, userRepo;
  
  beforeEach( () => {
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
    users = [user3, user4];
    userRepo = new UserRepo(users);
    hydrationData = sampleHydrationData;
    hydration = new Hydration(hydrationData);
  });

  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of Hydration class', () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it('should take in a list of data', () => {
    expect(hydration.hydrationData[0].userID).to.equal(1);
    expect(hydration.hydrationData[2].numOunces).to.equal(47);
    expect(hydration.hydrationData[4].date).to.equal('2019/06/16');
    expect(hydration.hydrationData[1].id).to.equal(undefined);
  });

  describe('calculateFirstWeekOunces', () => {
    it('should find water intake by day for first week', () => {
      expect(hydration.calculateFirstWeekOunces(userRepo, 1)[0]).to.eql('2019/06/28: 57');
      expect(hydration.calculateFirstWeekOunces(userRepo, 1)[6]).to.eql('2019/06/22: 43');
    });
  });

  describe('calculateRandomWeekOunces', () => {
    it('should find ounces drank for that days week', () => {
      expect(hydration.calculateRandomWeekOunces('2019/06/18', 2, userRepo)[0]).to.eql('2019/06/18: 70');
      expect(hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo)[6]).to.eql(undefined);
    });
  })
});
