function isLoggedIn(req, res, next) {
    if(!(req.session && req.session.userId)) {
        res.redirect('/login');
    }

    User.findById(req.session.userId, (err, user) => {
        if(err)
            return next(err);

        if(!user){
            res.redirect('/login');
        }

        user.password = undefined;
        req.user = user;
        res.locals.user = user;

        next();
    });
};