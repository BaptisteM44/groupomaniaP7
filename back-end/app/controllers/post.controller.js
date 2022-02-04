// const { post } = require("jquery");
// const uploadFile = require("../middleware/multer-config");
// const fs = require('fs')

const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

exports.createPost = async (req, res) => {
    // Valider la requête
    // if (!req.posts) {
    //   console.log(body)
    //     res.status(400).send({
    //       message: "Content can not be empty!"
    //     });
    //     return;
    //   }
      // Créer Post 
      const post = {
        title: req.body.title,
        description: req.body.description,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        published: req.body.published ? req.body.published : false
        // published: req.body.posts ? req.body.posts : false
      };

      // Sauvegarder Post dans la database
    Post.create(post)
        .then(data => {
        res.send(data);
        })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erreur survenu lors de la création du post"
      });
    });
}

exports.getAllPosts = (req, res) => {

  const published = req.query.published;
  var condition = published ? { published: { [Op.like]: `%${published}%` } } : null;

  Post.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
    
}

exports.getOnePost = (req, res) => {
    const id = req.params.id;

  Post.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
}

exports.deletePost = (req, res) => {
    const id = req.params.id;

  Post.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
}

exports.findAllPublished = (req, res) => {
    Post.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };