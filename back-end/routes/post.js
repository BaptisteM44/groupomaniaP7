const express = require("express")
const router = express.Router()
const postCtrl = require("../controllers/post")
const multer = require("../middleware/multer-config")

router.get("/", postCtrl.findAllPosts)
router.get("/users/:id", postCtrl.findAllPostsForOneUser)
router.get("/:id", postCtrl.findOnePost)
router.post("/", multer, postCtrl.createPost)
router.put("/:id", multer, postCtrl.modifyPost)
router.delete("/:id", postCtrl.deletePost)

module.exports = router