const User = require('../models/user');

// Create new user => /users/new
exports.newUser = async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(200).json({
        data: {
            'type': 'user',
            'id': user._id,
            'attributes': {
                'name': user.name,
                'age': user.age,
                'hobby': user.hobby,
                'surgeon': user.surgeon,
                'dateAdded': user.dateAdded
            }
        }
    })
}