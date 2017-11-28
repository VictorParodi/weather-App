let getUser = (id, callback) => {
    let user = { id, name: 'Jerico' };
    callback(user);
}

getUser(01, (userObj) => console.log(userObj));