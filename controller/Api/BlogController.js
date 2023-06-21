var cloudinary = require('cloudinary').v2;
const BlogModel = require('../../models/Blog')
cloudinary.config({
    cloud_name: 'dmiv17tmw',
    api_key: '912846225846571',
    api_secret: 'CoQDsbr4Tg4w9GFdQ4EUHCNFGKQ',
});

class BlogController {
    static Blogs = async (req, res) => {
        const blogs = await BlogModel.find()
        try {
            res.status(200).json({
                success: true,
                blogs
            })
        } catch (err) {
            console.log(err)
        }
    }
    static BlogInsert = async (req, res) => {
        // console.log(req.body.title);
        // console.log(req.files)
        const BlogImage = req.files.image
        // console.log(imagefile)
        const BlogImage_upload = await cloudinary.uploader.upload(BlogImage.tempFilePath, {
            folder: 'Blog_images',
            width: 400
        })
        try {
            const { title, description } = req.body;
            const result = new BlogModel({
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: BlogImage_upload.public_id,
                    url: BlogImage_upload.secure_url,
                },
            })
            await result.save()
            res
                .status(201)
                .send({
                    status: "success",
                    message: "Registration Successfull",
                    Image: BlogImage_upload.secure_url,
                })
        } catch (err) {
            console.log(err)
        }
    }
    static blogview = async (req, res) => {
        try {
            const viewdata = await BlogModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                viewdata,
            })
        } catch (err) {
            console.log(err)
        }
    }
    static BlogUpdate = async (req, res) => {
        try {
            const data = await BlogModel.findById(req.params.id);
            const imageId = data.image.public_id;
            await cloudinary.uploader.destroy(imageId);

            const BlogImage = req.files.image
            // console.log(imagefile)
            const BlogImage_upload = await cloudinary.uploader.upload(BlogImage.tempFilePath, {
                folder: 'Blog_images',
                width: 400
            })
            const update = await BlogModel.findByIdAndUpdate(req.params.id)({
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: BlogImage_upload.public_id,
                    url: BlogImage_upload.secure_url,
                },
            });
            //saving data
            await update.save();
            res.status(201).send({
                status: "success",
                message: "Update Successfull",
                Image: BlogImage_upload.secure_url,
            });

        } catch (err) {
            console.log(err)
        }
    }
    static DeleteBlog = async (req, res) => {

    }
}
module.exports = BlogController