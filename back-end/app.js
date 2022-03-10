const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const path = require("path")
const auth = require("./middleware/auth")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")
const commentRoutes = require("./routes/comment")


const app = express()

app.use(cors())
app.use(helmet())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./models")
db.sequelize.sync()

app.use("/images", express.static(path.join(__dirname, "images")))
app.use("/api/auth", authRoutes)
app.use("/api/users", auth, userRoutes)
app.use("/api/posts", auth, postRoutes)
app.use("/api/comments", auth, commentRoutes)

module.exports = app