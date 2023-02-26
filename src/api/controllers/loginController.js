const loginService = require('../services/loginService')
const jwt = require('jsonwebtoken')
/////////////////
const loginController = {
    //POST api/login
    login: async (req, res, next) => {
        const {userName, password} = req.body

        const data = await loginService.loginService(userName)
        if (data.status == 'success') {
            if (!data.data) {
                res.json({
                    status: 'failure', 
                    error: false,
                    responseTime: new Date(),
                    statusCode: res.statusCode,
                    author: 'Hào hoa sành điệu 6 múi phong cách hàn quốc',
                    data: {
                        message: `You have entered an invalid username or password.`,
                        title: 'Invalid username'
                    }
                    
                })
            }else {
                if (data.data.password == password) {
                    //success
                  
                    const { nickName, userName } = data.data
                    const token = jwt.sign( {nickName, userName}, process.env.ACCESS_TOKEN_API, {expiresIn : '30s'} )
                    res.json({
                        status: 'success', 
                        error: false,
                        responseTime: new Date(),
                        statusCode: res.statusCode,
                        author: 'Hào hoa sành điệu 6 múi phong cách hàn quốc',
                        data: {
                            token: token,
                            title: 'login successfully !!',
                            nickName: data.data.nickName
                        }
                        
                    })
                }else{
                    res.json({
                        status: 'failure', 
                        error: false,
                        responseTime: new Date(),
                        statusCode: res.statusCode,
                        author: 'Hào hoa sành điệu 6 múi phong cách hàn quốc',
                        data: {
                            message: `You have entered an invalid username or password.`,
                            title: 'Invalid password'
                        }
                        
                    })
                }
            }
           
        }else {
            res.json(data)
        }
    },
    //
}


module.exports = loginController




// //[GET] /login
// const pageLogin = (req, res) => {
//     res.render('login', { layout : false })
// }


// //[POST] /login
// const checkLogin = async (req, res) => {
//     const { username, password } = req.body;

//     const data = await checkLoginService(username)
//     if (data) {
//         if (data.password === password) {
//             res.redirect('/product')
//         } else {
//             res.redirect('/login')
//         }
//     }

//     res.render('login', { layout : false })
// }


// export { pageLogin, checkLogin };