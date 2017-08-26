// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {


//     res.send('respond with a resource');
// });

// module.exports = router;

exports.list = function(req, res) {

    req.getConnection(function(err, connection) {

        if (err)
            console.log('Error : %s', err);
        var query = connection.query('select * from student', function(err, result) {
            if (err)
                console.log('Error : %s', err);
            res.render('home', { data: result });
        });
    });
};

exports.add = function(req, res) {
    res.render('adduser');
};

exports.save = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection) {

        var data = {
            name: input.name,
            email: input.email,
            phone: input.phone
        };

        connection.query("insert into student set ?", data, function(err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/');
        });
    });
};

exports.edit = function(req, res) {

    var id = req.params.id;

    req.getConnection(function(err, connection) {

        connection.query('select * from student where id = ?', [id], function(err, rows) {
            if (err)
                console.log("Error edit : %s", err);

            res.render('edituser', { data: rows });
        });
    });
};

exports.save_edit = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var id = req.params.id;

    req.getConnection(function(err, connection) {

        var data = {
            name: input.name,
            email: input.email,
            phone: input.phone
        };

        connection.query('update student set ? where id = ?', [data, id], function(err, rows) {

            if (err)
                console.log("Error updating : %s", err);
            res.redirect("/");
        });

    });
};


exports.delete_user = function(req, res) {

    var id = req.params.id;

    req.getConnection(function(err, connection) {

        connection.query('DELETE FROM student  WHERE id = ?', [id], function(err, result) {
            if (err)
                console.log("Error deleting : %s ", err);

            res.redirect('/users');
        });
    });
};