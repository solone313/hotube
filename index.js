const express = require('express')
const app = express()
const config = require("./config/key");
const port = 3000
const { User } = require("./models/User")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
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

app.post('/login',(req,res) => {
    //요청된 이메일을 데이터베이스에 있는지 확인한다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //있다면 비밀번호를 확인.
        user.comparePassword(req.body.password , (err, isMatch) => {
            if(!isMatch)
                return res.json({loginSuccess:false, message: "비밀번호가 틀렸습니다."})
            //맞다면 토큰생성.
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에 ? 쿠키
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
    
    
    

})