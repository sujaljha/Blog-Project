const BlogModel = require('../models/Blog')
const CategoryModel = require('../models/Category')

class FrontendController{

   static home = async(req,res)=>{
      try{
         // const blog_data = await BlogModel.find()
         const blog_data = await BlogModel.find().sort({_id:-1}).limit(8)

         // console.log(blog_data)
         res.render('front/home',{d:blog_data})
      }catch(err){
         console.log(err)
      }
    
   }

   static about = async(req,res)=>{
    res.render('front/about')
   }

   static contact = async(req,res)=>{
    res.render('front/contact')
   }

   static blogdetail = async(req,res)=>{
      try{
         // console.log(req.params.id)
         const category = await CategoryModel.find()
         const recentblog = await BlogModel.find().sort({_id:-1}).limit(4)
         // console.log(category)
         const detail = await BlogModel.findById(req.params.id)
         // console.log(detail)
         res.render('front/blogdetail',{d:detail,c:category,r:recentblog})
      }catch(err){
         console.log(err)
      }
   }

   static bloglist = async(req,res)=>{
      try{
         // const blog_data = await BlogModel.find()
         const blog_data = await BlogModel.find().sort({_id:-1}).limit(8)

         // console.log(blog_data)
         res.render('front/bloglist',{d:blog_data})
      }catch(err){
         console.log(err)
      }
   }

   static login = async(req,res)=>{
    res.render('front/login',{message:req.flash('success'),error:req.flash('error')})
   }
}


module.exports=FrontendController