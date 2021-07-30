const domUpdates = {
  renderFirstName(user) {
    const headerText = document.getElementById('headerText');
    headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  },

  renderInfoCard(name, address, email, strideLength, stepGoal, avStepGoal) {
    const sidebarName = document.getElementById('sidebarName');
    const userAddress = document.getElementById('userAddress');
    const userEmail = document.getElementById('userEmail');
    const userStridelength = document.getElementById('userStridelength');
    const userStepGoal = document.getElementById('stepGoal');
    const avgStepGoal = document.getElementById('avStepGoal');

    sidebarName.innerText = name;
    userAddress.innerText = address;
    userEmail.innerText = email;
    userStridelength.innerText = `Your stridelength is ${strideLength} meters.`;
    userStepGoal.innerText = `Your daily step goal is ${stepGoal}.`
    avgStepGoal.innerText = `The average daily step goal is ${avStepGoal}`;
  },

  renderFriendHTML(names) {
    const friendList = document.getElementById('friendList');
    friendList.insertAdjacentHTML('afterBegin', names.map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`));
  }
}
export default domUpdates;