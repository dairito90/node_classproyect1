const mongoose = require('mongoose');

const User = require('./user');
mongoose.connect('mongodb://drodriguez:j071312d@ds133291.mlab.com:33291/containers', (err) => {
    const me = new User({
        firstName: 'Dairon',
        lastName: 'Rodriguez',
        userName: 'drp',
        email: 'drodriguez@fvi.edu',
        password: 'nicePassword'
    });

    me.save((err) => {
        if (err) {
            throw err;
        }

        User.find((err, users) => {
            if (err) {
                throw err;
            }
            console.log(users);
            process.exit();
        });
    });
});
