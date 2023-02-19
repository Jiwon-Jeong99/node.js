var relationship1 = {
  name: "zero",
  friends: ["nero", "hero", "xero"],
  logFriends: function () {
    var that = this;
    this.friends.forEach((friend) => {
      console.log(that.name, friend);
    });
  },
};
relationship1.logFriends();
