const connect = require("./db")
const express = require("express")
const app = express()
const PORT = 5000
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//middlewares
app.use(express.json())
app.use(cors({
    origin: "https://samirweb.onrender.com",
    credentials: true
}))
dotenv.config()
connect()
app.use(cookieParser())

//Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/user", require("./routes/user"))
app.use("/api/project", require("./routes/project"))
app.use("/api/blog", require("./routes/blog"))
app.use("/api/feedback", require("./routes/feedback"))

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})