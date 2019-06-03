function loinController(){
    
    function isValidUserId(userList,user){
        return userList.indexOf(user) >=0
    }
    function isValidUserIdAsync(userList,user,callback){
         setTimeout(()=> {
            callback(userList.indexOf(user)>=0);
        },1);
    }
    return{
        isValidUserId,
        isValidUserIdAsync
    }
}

module.exports=loinController();