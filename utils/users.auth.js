const passport = require("passport");
const session = require("express-session");
const usersRepo = require(__dirname + "\\users.repository.js");

module.exports = {
  // Initialisation des middleware de session et Passport
  initializeAuthentications(app) {
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    
    // Sérialisation des utilisateurs (sauvegardés dans la session)
    passport.serializeUser((userFromDb, doneFunction) => {
      const userObj = {
        id: userFromDb.user_id,
        name: userFromDb.user_name,
        role: userFromDb.user_role,
      };
      doneFunction(null, userObj);
    });

    // Désérialisation des utilisateurs (chargés depuis la session)
    passport.deserializeUser(async function (userObj, doneFunction) { 
      console.log("DE - SERIALIZING... ");
      console.log(userObj);
      let userFromDb = await usersRepo.getOneUser(userObj.name);
      console.log(userFromDb);
      doneFunction(null, userFromDb);
    });
  },

  authorizeRequest(requiredRole) {
    return function (request, response, next) {
      if (request.isAuthenticated()) { // Do we have an authenticated user?
        if (requiredRole) { // No special role needed for page -> check if current user has the SAME role (todo: hierarchy?)
          if (requiredRole === request.user.user_role) { 
            return next();
          } else {
            return response.end("401 Unautorized (bad user level)"); 
          }
        } else { // No special role needed for page -> next middleware
          return next();
        }
      } else { // not authenticated at all
        return response.end("401 Unautorized (not authenticated)");
        // OR: response.redirect("/auth"); 
      }
    }
  }

  
};
