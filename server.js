var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Item       = require('./models/item');
var emoji      = require('node-emoji');

mongoose.connect('mongodb://localhost:27017/shopping-list-app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.route('/items')

    // store an item
    .post(function(req, res) {

        var item = new Item();
        item.text = req.body.text;

        item.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Item created!' });
        });

    })

    // get all items
    .get(function(req, res) {
        Item.find(function(err, items) {
            if (err)
                res.send(err);

            res.json(items);
        });
    });


app.use('/api', router);

app.listen(port, function() {
  console.log('Woooyaaa, server is up and running', emoji.get('sunglasses'));
});
