const { User } = require("../models/User");

let auth = (req, res, next) => {
    //인증처리를 하는 곳
    // 1. 클라이언트 쿠키에서 토큰값을 가져온다.
    let token = req.cookies.x_auth;
    // 2. 토큰을 복호화 한후 해당 유저를 찾는다.
    User.findByToken(token, (err,user)=>{
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })

    // 3. 유저가 있으면 인증 ㅇ
    // 4. 없으면 인증 No!
}


module.exports = { auth };