// Title: User Handler
// Description: Handler to handle user related routes
// Aurthor: Shudipto Roy
// Date: 06/09/2025

//  dependencies
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  // console.log(requestProperties.method);
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const toAgrement =
    typeof requestProperties.body.toAgrement === "boolean" &&
    requestProperties.body.toAgrement === true
      ? requestProperties.body.toAgrement
      : false;

  if (firstName && lastName && phone && password && toAgrement) {
    //    make sure thar the user dosen't already exists
    data.read("users", phone, (err1) => {
      if (err1) {
        let userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          toAgrement,
        };
        // store the user to db
        data.create("users", phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              message: "User was created successfully!",
            });
          } else {
            callback(500, {
              error: "Could not created user!",
            });
          }
        });
      } else {
        callback(500, {
          error: "There was a problem in server side!",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your request!",
    });
  }
};

handler._user.get = (requestProperties, callback) => {
  // check the phone number is valid
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  if (phone) {
    // verify the user
    let token =
      typeof requestProperties.headerObject.token === "string"
        ? requestProperties.headerObject.token
        : false;

    tokenHandler._token.verify(token, phone, (tokenId) => {
      if (tokenId) {
        // lookup the user
        data.read("users", phone, (err, user) => {
          const userData = { ...parseJSON(user) };
          if (!err && userData) {
            delete userData.password;
            callback(200, userData);
          } else {
            callback(404, {
              error: "Requested user was not found!",
            });
          }
        });
      } else {
        callback(403, {
          error: "Authentication failure!",
        });
      }
    });
  } else {
    callback(404, {
      error: "Requested user was not found!",
    });
  }
};

handler._user.put = (requestProperties, callback) => {
  // check the phone number if valid
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      // verify the user
      let token =
        typeof requestProperties.headerObject.token === "string"
          ? requestProperties.headerObject.token
          : false;

      tokenHandler._token.verify(token, phone, (tokenId) => {
        if (tokenId) {
          // lookup the user
          data.read("users", phone, (err1, user) => {
            const userData = { ...parseJSON(user) };
            if (!err1 && userData) {
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.password = hash(password);
              }

              // store to database

              data.update("users", phone, userData, (err2) => {
                if (!err2) {
                  callback(200, {
                    message: "User was updated successfully!",
                  });
                } else {
                  callback(500, {
                    error: "There was a problem in your server side!",
                  });
                }
              });
            } else {
              callback(400, {
                error: "You have a problem in your request!",
              });
            }
          });
        } else {
          callback(404, {
            error: "Requested user was not found!",
          });
        }
      });
    } else {
      callback(400, {
        error: "You have a problem in your request!",
      });
    }
  } else {
    callback(400, {
      error: "Invalid phone number, Please try again!",
    });
  }
};

handler._user.delete = (requestProperties, callback) => {
  // check the phone number is valid
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    let token =
      typeof requestProperties.headerObject.token === "string"
        ? requestProperties.headerObject.token
        : false;

    tokenHandler._token.verify(token, phone, (tokenId) => {
      if (tokenId) {
        // lookup the user
        data.read("users", phone, (err1, userData) => {
          if (!err1 && userData) {
            data.delete("users", phone, (err2) => {
              if (!err2) {
                callback(200, {
                  message: "User was deleted successfully!",
                });
              } else {
                callback(500, {
                  error: "There was a error in server side!",
                });
              }
            });
          } else {
            callback(500, {
              error: "There was a error in server side!",
            });
          }
        });
      } else {
        callback(403, {
          error: "Authentication failure!",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your request!",
    });
  }
};

module.exports = handler;
