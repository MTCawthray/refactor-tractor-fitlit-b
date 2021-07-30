const domUpdates = {
  renderFirstName(user) {
    let headerText = document.getElementById('headerText');
    headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  },

  renderInfoCard() {
    const sidebarName = document.getElementById('sidebarName');
    const userAddress = document.getElementById('userAddress');
    const userEmail = document.getElementById('userEmail');
    const userStridelength = document.getElementById('userStridelength');
    const stepGoal = document.getElementById('stepGoal');
    const avStepGoalCard = document.getElementById('avStepGoal');
  },

  renderFriendHTML(names) {
    let friendList = document.getElementById('friendList');
    friendList.insertAdjacentHTML('afterBegin', names.map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`));
  }
}
export default domUpdates;