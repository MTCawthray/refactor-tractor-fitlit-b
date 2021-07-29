const domUpdates = {
  renderFirstName(user) {
    let headerText = document.getElementById('headerText');
    headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  
  },

  renderFriendHTML(names) {
    let friendList = document.getElementById('friendList');
    friendList.insertAdjacentHTML('afterBegin', names.map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`));
  },


}
export default domUpdates;