const auth = require('./mutations/auth');
const createSittee = require('./mutations/createSitte');
const createOrUpdateDate = require('./mutations/createOrUpdateDate');
const stripe = require("./mutations/Stripe");

const Mutation = {
  ...auth,
  ...createSittee,
  ...createOrUpdateDate,
  ...stripe
}

module.exports = {
  Mutation,
}
