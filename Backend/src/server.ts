// Server generated
import express from "express"
import ViteExpress from "vite-express"
import cors from 'cors'
import { connectDatabase } from "#@/utils"
import { UserRouter } from "#@/routes"

connectDatabase()
const app = express()
/*
* Developer Note:
* BodyParser(body-parser) is deprecated so -
* we are using express as body parsing middleware
*/
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Local Middleware
app.get("/", (_, response) => {
    response.status(200).json({
        success: true,
        message: "Server is Up and Running"
    })
})
app.use("/user", UserRouter)


const IP = process.env.IP || 'localhost'
const PORT = parseInt(process.env.PORT || "3000")

ViteExpress.listen(app, PORT, () => {
    console.log(`Server is listening at http://${IP}:${PORT}`)
})