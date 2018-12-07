var mongoose = require('mongoose')

// Another collection for item/shopping list
var item = new mongoose.Schema({
  name: {
    type: String
  },

  done: {
    type: Boolean
  }
},

  {
    collection: 'items'
  }
)

module.exports = mongoose.model('Item', item)