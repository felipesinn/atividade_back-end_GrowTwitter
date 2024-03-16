import express from "express"
import cors from "cors"

import {userRouter } from "./routes/users.routes"
import authRoutes from "./routes/auth.login.routes"




const app = express()
app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(authRoutes)


app.listen(3333, () => {
  console.log("🚀 Server ready at: http://localhost:3333 🚀")
})