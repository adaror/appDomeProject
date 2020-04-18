const db = require('./db.json');

module.exports = {
  getUser: userId => db.find(user => user._id === userId)
}