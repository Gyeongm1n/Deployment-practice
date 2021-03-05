const express = require('express');

const {isLoggedIn} = require('./middlewares');
const {addFollowing} = require('../controllers/user');
const User = require('../models/user');
const Post = require('../models/post');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, addFollowing);

router.delete('/:id/unfollow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}});
        const user2 = await User.findOne({where: {id: parseInt(req.params.id, 10)}});
        if(user){
            await user.removeFollowing(user2);
            res.send('success');
        }else{
            res.status(404).send('no user');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}});
        if(user){
            await user.addLike(parseInt(req.params.id, 10));
            res.send('success');
        }else{
            res.status(404).send('no user');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete('/:id/unlike', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}});
        const post = await Post.findOne({where: {id: parseInt(req.params.id, 10)}});
        if(user){
            await user.removeLike(post);
            res.send('success');
        }else{
            res.status(404).send('no user');
        }
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;