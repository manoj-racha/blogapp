// create author api app
const exp = require('express')
const authorApp = exp.Router();
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const verifyToken = require('../Middlewares/verifyToken');

// get the userscollection
let authorscollection;
let articlescollection ;
authorApp.use((req,res,next)=>{
    authorscollection = req.app.get('authorscollection');
    articlescollection = req.app.get('articlescollection')
    next();
})


// author registration route
authorApp.post('/author',expressAsyncHandler(async(req,res) =>{
    // get author resource from clinet
    const newUser = req.body;

    // check for duplicate author
    const dbres = await authorscollection.findOne({username:newUser.username})
    // if user found in db
    if(dbres !== null)
    {
        res.send({message:"author existed"})
    }else{
        //hash the password
        const hashedPassword = await bcryptjs.hash(newUser.password,6)
        // replace the plain password with hashed passord
        newUser.password = hashedPassword;
        // create new author
        await usercollection.insertOne(newUser);
        // send res
        res.send({message:"author is created"})
    }
}))

// get the articlescollection

// author login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    // get the user cred obj from client
    const userCred = req.body;

    // check for user name
    const dbres = await authorscollection.findOne({username:userCred.username})
    if(dbres === null)
    {
        res.send({message:"Invalid Author"})
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


// adding a new article
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get the  new article from client
    const newArticle = req.body;

    // post it to db
    await articlescollection.insertOne(newArticle);

    // send res
    res.send({message:"new article created"})

    
}))

// updating the article
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res) =>{
    // get the modified article obj
    const modifiedArticle = req.body;
    // update the aticle
    let result = await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})

    // send res
    res.send({message:"Article is modified"})
}))

// delete the article by article id
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res) =>{
    // get the article id from url
    const articleIdfromUrl = req.params.articleId;
    // get the article
    const articleToDelete = req.body;
    // update the status to false
    await articlescollection.updateOne({articleId:articleIdfromUrl},{$set:{...articleToDelete,status:false}}) 
    // send res
    res.send({message:"article is deleted"})
}))

// get the artcle of same author by author name
authorApp.get('/article/:username',verifyToken,expressAsyncHandler(async(req,res) =>{
    // get the username from usrl
    const usernameFromUrl = req.params.username;
    // get the articles whose status is true
    const articlesList = await articlescollection.find({"$and":[{status:true},{username:usernameFromUrl}]}).toArray();
    // send res
    res.send({message:"articles List",payload:articlesList})
}))


// export the author app
module.exports=authorApp;