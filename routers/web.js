const express = require('express')
const router = express.Router()
const AdminController = require('../controller/Admin/AdminController')
const FrontendController = require('../controller/FrontendController')
const CategoryController = require('../controller/Admin/CategoryContoller')
const UserController = require('../controller/UserController')
const CheckUserAuth = require('../middleware/auth')

// Frontend contoller
router.get('/',FrontendController.home)
router.get('/about',FrontendController.about)
router.get('/blogdetail/:id',FrontendController.blogdetail)
router.get('/bloglist',FrontendController.bloglist)
router.get('/contact',FrontendController.contact)
router.get('/login',FrontendController.login)

// AdminController
router.get('/admin/dashboard',CheckUserAuth,AdminController.dashboard)
// Admin dashboard
router.get('/admin/blogs',AdminController.Blogs)
router.get('/admin/addblogs',AdminController.Addblogs)
router.post('/admin/insert_blog',AdminController.insertblog)
router.get('/admin/blog_view/:id',AdminController.BlogView)
router.get('/admin/blog_edit/:id',AdminController.BlogEdit)
router.post('/admin/blog_update/:id',AdminController.BlogUpdate)
router.get('/admin/blog_delete/:id',AdminController.BlogDelete)

// admin/categorycontoller
router.get('/admin/category',CategoryController.CategoryDisplay)
router.get('/admin/createcategory',CategoryController.CreateCategory)
router.post('/admin/categoryinsert',CategoryController.CreateInsert)

// UserController
router.get('/admin/register',UserController.Adminregister)
router.post('/register',UserController.Register)
router.post('/verify_login',UserController.VerifyLogin)
router.get('/logout',UserController.Logout)

module.exports = router