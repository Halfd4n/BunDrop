export class userService {

  static registerUser(newUsername, newPassword) {

    let newUser = {
      username: newUsername,
      password: newPassword,
      favoriteProductsId: [

      ]
    }

    let result = fetch('http://localhost:7001/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).catch(error => console.log(error));

    return result;

  }

  static isUsernameTaken(usernameToCheck, allUsers) {
    
    let foundUser = allUsers.find(u => u.username === usernameToCheck);

    if(foundUser === undefined) {
      return false;
    } else {
      return true;
    }
  }

  static signInUser(user) {

    sessionStorage.setItem(user.id, JSON.stringify(user));
  }

  static isThereAUserSignedIn(userIdsToCheck) {

    let user = null;

    userIdsToCheck.forEach(id => {
      let result = sessionStorage.getItem(id)

      if(result != null) {
        user = result
      };
    })   

    if(user !== null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  static signOutUser() {
    sessionStorage.clear();
  }

  static toggleFavoriteProduct(id, signedInUser) {
    
    let result = signedInUser.favoriteProductsId.find(p => p === id);

    if(result !== undefined) {

      let indexOfFoundProduct = signedInUser.favoriteProductsId.indexOf(id);

      signedInUser.favoriteProductsId.splice(indexOfFoundProduct, 1)

      this.updateUserInDbAndSession(signedInUser);
      
      return false;
    }
    else {
      signedInUser.favoriteProductsId.push(id);

      this.updateUserInDbAndSession(signedInUser);

      return true;
    }
  }

  static updateUserInDbAndSession(signedInUser) {
    
    fetch(`http://localhost:7001/users/${signedInUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signedInUser)
    }).catch(error => console.log(error.message));

    sessionStorage.setItem(signedInUser.id, JSON.stringify(signedInUser))
  }
}