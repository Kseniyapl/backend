const db = require('../dbConfig')
module.exports = {
  getMarkets,
  getMarketById,
  addMarket,
  editMarket,
  deleteMarket,
  getStallsByMarketId
}
function getStallsByMarketId(market_id) {
  return db('stalls')
    .where({ market_id })
}
function getMarkets() {
  return db ('markets')
}

function getMarketById(id) {
  return db('markets')
    .where({ id })
    .first()
}
function addMarket(data) {
  return db('markets').insert(data, ['id'])
}
function editMarket(id, data) {

    return db('markets')
      .where({ id })
      .update({ ...data }, ['id'])
}
function deleteMarket(id) {
  return db('markets')
    .where({ id })
    .del()
}
