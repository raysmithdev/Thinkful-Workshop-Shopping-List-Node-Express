var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    text: String
});

module.exports = mongoose.model('Item', ItemSchema);
