// create user api app
const exp = require('express')
const userApp = exp.Router();
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const verifyToken = require('../Middlewares/verifyToken')

// get the userscollection
let usercollection;
let articlescollection;
userApp.use((req,res,next)=>{
    usercollection = req.app.get('usercollection');
    articlescollection = req.app.get('articlescollection')
    next();
})

// user registration route
// userApp.post('/user',(req,res)=>{
//     console.log(req.body)
// })

// user registration route
userApp.post('/user',expressAsyncHandler(async(req,res) =>{
    // get user resource from clinet
    const newUser = req.body;

    // check for duplicate user
    const dbres = await usercollection.findOne({username:newUser.username})
    // if user found in db
    if(dbres !== null)
    {
        res.send({message:"user existed"})
    }else{
        //hash the password
        const hashedPassword = await bcryptjs.hash(newUser.password,6)
        // replace the plain password with hashed passord
        newUser.password = hashedPassword;
        // create new user
        await usercollection.insertOne(newUser);
        // send res
        res.send({message:"user is created"})
    }
}))

// user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    // get the user cred obj from client
    const userCred = req.body;

    // check for user name
    const dbres = await usercollection.findOne({username:userCred.username})
    if(dbres === null)
    {
        res.send({message:"Invalid user"})
    }
    else //check for password
    {
        const status = await bcryptjs.compare(userCred.password,dbres.password)
        if(status === false)
        {
            res.send({message:"Invlid Password"})
        }
        else
        {
            // create jwt token
            const signedToken = jwt.sign({username:dbres.username},process.env.SECRET_KEY,{expiresIn:20})
            // send res
            res.send({message:"login success",token:signedToken,user:dbres})

        }
    }

}))

// get articles of all users
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res) =>{
    // get articlescollection object
    const articlescollection = req.app.get('articlescollection');
    // get all articles
    let articlesList = await articlescollection.find({status:true}).toArray()
    // send res
    res.send({message:"articles",payload:articlesList})
}))


// post a comment on article
userApp.put('/comment/:articleIdFromUrl',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get the articleIdFromUrl
    const articleIdFromUrl = req.params.articleIdFromUrl;
    // get the comment obj from cleint
    const comment = req.body;
    // inser the commentobj in the comment array of the article by id
    const result = await articlescollection.updateOne({articleId:articleIdFromUrl},{$addToSet:{comments:comment}})
    console.log(comment)
    // send res
    res.send({message:"comment is posted"})
}))
// export the user app
module.exports=userApp;