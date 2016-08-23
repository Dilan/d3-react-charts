var fs = require('fs');

module.exports = function(app) {
    app.get('/currency/:currency', function(req, res) {
        // ...
    });

    app.get('/data', function(req, res) {

        //console.log(__dirname)
        fs.readFile(__dirname + '/../data/data.json', function(err, value) {
            res.send(value);
        });


    });
};
