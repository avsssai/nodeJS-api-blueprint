const User = require("../models/user");
const Blog = require("../models/blog");
const { blogValidator } = require("../validators/blogValidator");

exports.get_all_blogs = async (req, res, next) => {
  //find all the blogs and send them to the res.
  const allBlogs = await Blog.find({});
  res.json({
    message: "Displaying all blogs.",
    All_blogs: allBlogs
  });
};

exports.create_a_blog = async (req, res, next) => {
  const { title, body } = req.body;
  const newBlog = new Blog({
    title: title,
    body: body
  });
  //validation of the entered body.
  const { error } = blogValidator(req.body);
  //if error in validation(the body entered doesn't match the model schema).
  if (error) {
    return res.status(400).send(error);
  }
  //if no error in validation.
  try {
    const savedBlog = await newBlog.save();
    res.status(200).json({
      message: "New blog created.",
      created_blog: savedBlog
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.findABlog = async (req, res, next) => {
  const blog_id = req.params.blog_id;
  var foundBlog = await Blog.findById({ _id: blog_id });
  if (!foundBlog) {
    res.status(400).json({
      message: "no blog found with the id given."
    });
  }
  res.status(200).json({
    message: "found the required blog.",
    foundBlog: foundBlog
  });
};

exports.delete_a_blog = async (req, res) => {
  try {
    const blog_id = req.params.blog_id;
    var foundBlog = await Blog.findByIdAndDelete({ _id: blog_id });
    if (!foundBlog) {
      return res.status(400).json({
        message: "Blog not found, couldn't delete."
      });
    }
    res.status(200).json({
      message: "deleted requested blog."
    });
  } catch (err) {
    return res.status(400).json({
      message: "Blog not found, couldn't delete.",
      error: err
    });
  }
};

exports.update_a_blog = async (req, res) => {
  try {
    const blog_id = req.params.blog_id;
    const update = {
      title: req.body.title,
      body: req.body.body
    };
    //find if the id exists.
    const foundBlog = await Blog.findById({ _id: blog_id });
    if (!foundBlog) {
      return res.status(400).json({
        message: "Blog not found, please check the ID number."
      });
    }
    //update the found blog.
    const updatedBlog = await Blog.findByIdAndUpdate({ _id: blog_id }, update,{new:true});
    const saveUpdatedBlog = await updatedBlog.save();

    if (!updatedBlog) {
      return res.status(400).json({
        message: "Blog not found, please check the ID number."
      });
    }
    res.status(200).json({
      message: "Blog updated",
      updatedBlog: saveUpdatedBlog
    });
  } catch (err) {
    res.status(400).json({
      message: "Couldn't update blog",
      error: err
    });
  }
};
