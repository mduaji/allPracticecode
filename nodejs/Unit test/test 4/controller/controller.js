function loinController() {
    var userList;
    function loadUser(users) {
        userList = users;
    }

    function isValidUserId(user) {
        return userList.indexOf(user) >= 0
    }
    function isValidUserIdAsync(user, callback) {
        setTimeout(() => {
            callback(userList.indexOf(user) >= 0);
        }, 1);
    }
    return {
        isValidUserId,
        isValidUserIdAsync,
        loadUser
    }
}

module.exports = loinController();