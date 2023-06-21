// const TeacherModel = require('../../models/Teacher')

// class TeacherController{
//     static dashboard = async(req,res)=>{
//         res.render('admin/dashboard')
//     }
//     static Blogs = async(req,res)=>{
//         res.render('admin/blog/blogdisplay')
//     }
//     static Addblogs = async(req,res)=>{
//         res.render('admin/blog/addblogs')
//     }
//     static insertblog = async(req,res)=>{
//         // console.log(req.body.title);
//         try{
//             const result = new TeacherModel({
//                 title: req.body.title,
//                 email: req.body.email,
//                 address: req.body.address
//             })
//             await result.save()
//             res.redirect('/admin/addblogs')
//         }catch(err){
//             console.log(err)
//         }
//     }
    
// }

// module.exports=TeacherController