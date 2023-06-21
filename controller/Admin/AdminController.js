var cloudinary = require('cloudinary').v2;
const BlogModel = require('../../models/Blog')


    cloudinary.config({ 
        cloud_name: 'dkopmzxkx', 
        api_key: '479638242997363', 
        api_secret: 'qZ0-JJDHAtSSzeFZ6GANdN2YNdQ' 
      });


class AdminController {
    static dashboard = async (req, res) => {
        const{name,email}=req.data1;
        res.render('admin/dashboard',{n:name,e:email})
    }
    static Blogs = async (req, res) => {
        const data = await BlogModel.find()
        // console.log(data)
        res.render('admin/blog/blogdisplay', { d: data })
    }
    static Addblogs = async (req, res) => {
        res.render('admin/blog/addblogs')
    }
    static insertblog = async (req, res) => {
        // console.log(req.body.title);
        // console.log(req.files)
        const imagefile = req.files.blogimage
        // console.log(imagefile)
        const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'blogimage',
            width:400
        })
        try {
            const{title,description}=req.body;
            const result = new BlogModel({
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url,
                },
            })
            await result.save()
            res.redirect('/admin/addblogs')
        } catch (err) {
            console.log(err)
        }
    }
    static BlogView = async (req, res) => {
        const data = await BlogModel.findById(req.params.id)
        // console.log(data)
        // console.log(req.params.id)
        res.render('admin/blog/blogview',{viewdata:data})
     }
     static BlogEdit = async (req, res) => {
        const data = await BlogModel.findById(req.params.id)
        // console.log(data)
        // console.log(req.params.id)
        res.render('admin/blog/blogedit',{editdata:data})
     }
     static BlogUpdate = async (req, res) => {
        // console.log(req.body)
        // console.log(req.params.id)
        try{
            const user = await BlogModel.findById(req.params.id)
            const image_id = user.image.public_id;
            // console.log(image_id)
            await cloudinary.uploader.destroy(image_id)
            const imagefile = req.files.blogimage
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'blogimage',
            width:400
        })
            const data = await BlogModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url,
                },
            })
            await data.save()
            res.redirect('/admin/blogs')
        }catch(err){
            console.log(err)
        }
     }

     static BlogDelete = async (req,res) =>{
        // console.log(res.params.id)
        try{
            const user = await BlogModel.findById(req.params.id)
            const image_id = user.image.public_id;
            // console.log(image_id)
            await cloudinary.uploader.destroy(image_id)
            const result = await BlogModel.findByIdAndDelete(req.params.id);
            res.redirect('/admin/blogs')
        }catch(err){
            console.log(err)
        }
     }
}

module.exports = AdminController