import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import router from './routes/user-routes'

const app = express();
app.use(express.json())

//route
app.use('/api/user', router)

//db connection and port listening
mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    try {
        app.listen(process.env.PORT, () => {
            console.log("server is running and db connection is successfully connected on port", process.env.PORT)
        })
    } catch (error) {
        console.log(error)
    }
})

app.use('/api', (req, res, next) => {
    res.send("Hello world")
})

