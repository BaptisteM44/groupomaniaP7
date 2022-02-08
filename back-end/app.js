const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const auth = require("./middleware/auth")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const messageRoutes = require("./routes/message")
const commentRoutes = require("./routes/comment")

app.use(cors())


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./models")
db.sequelize.sync()

app.use("/images", express.static(path.join(__dirname, "images")))
app.use("/api/auth", authRoutes)
app.use("/api/users", auth, userRoutes)
app.use("/api/messages", auth, messageRoutes)
app.use("/api/comments", auth, commentRoutes)

module.exports = app