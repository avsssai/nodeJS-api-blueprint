const express = require('express');
const Blog = require("../models/blog");


const router = express.Router();

const blogsController = require('../controllers/blogsController');

//get all blogs\
router.get('/',blogsController.get_all_blogs);

//get a specific blog.]
router.get('/:blog_id',blogsController.findABlog);

//create a new blog.
router.post('/',blogsController.create_a_blog);

//delete a blog.
// router.delete('/:blog_id',blogsController.deleteABlog);
router.delete('/:blog_id',blogsController.delete_a_blog);

//update a blog.
router.put('/:blog_id', blogsController.update_a_blog);


module.exports = router;
