import express from "express"
import cors from "cors"
import postRoutes from './routes/post.routes.js';
import userRoutes from './routes/user.routes.js';
import commentRoutes from './routes/comment.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', postRoutes);
app.use('/api', userRoutes);
app.use('/api', commentRoutes)

export {app}


