const express = require('express')
const app = express()
const config = require("./config/key");
const port = 3000
const { User } = require("./models/User")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json());


const mongoose = require("mongoose")
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB Connected'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/register',(req,res) => {
        //회원가입할떄 필요한 정보들을 client에서 가져오면
        //그것들을 데이터베이스에 넣어준다

        const user = new User(req.body)

        user.save((err,doc) => {
            if(err) return res.json({success:false,err})
            return res.status(200).json({
                success: true
            })
        })
    }
)