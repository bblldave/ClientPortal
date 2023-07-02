const authorize = (Model, accessField = 'accessList') => {
    return (req, res, next) => {
        const itemId = req.params.id;
        const userId = req.user;

        Model.findById(itemId)
            .then(item => {
                if (item.owner.toString() === userId.toString()) {
                    next();
                } else {
                    const accessEntry = item[accessField].find(entry => entry.user.toString() === userId.toString());
                    if (!accessEntry) {
                        res.status(403).send('Access denied');
                    } else {
                        res.permission = accessEntry.permission;
                        next();
                    }
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal server error');
            })
    }
}

module.exports = authorize;