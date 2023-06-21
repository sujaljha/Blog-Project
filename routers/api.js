const express = require('express')
const BlogController = require('../controller/Api/BlogController')
const UsersContoller = require('../controller/Api/UsersContoller')
const router = express.Router()


router.get('/blogs',BlogController.Blogs)
router.post('/bloginsert',BlogController.BlogInsert)
router.get('/blogview/:id',BlogController.blogview)
router.get('/blogupdate/:id',BlogController.BlogUpdate)

// UsersContoller
router.post('/register',UsersContoller.Register)
router.post('/verifylogin',UsersContoller.VerifyLogin)
router.get('/logout',UsersContoller.Logout)
module.exports=router;