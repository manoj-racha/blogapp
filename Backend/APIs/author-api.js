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
    // console.log(dbres)
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
        await authorscollection.insertOne(newUser);
        // send res
        res.send({message:"author is created"})
    }
}))
// http://localhost:4000/author-api/new-article

// get the articlescollection

// author login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    // get the user cred obj from client
    const userCred = req.body;
    // console.log(userCred)
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
            const signedToken = jwt.sign({username:dbres.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            // send res
            res.send({message:"login success",token:signedToken,user:dbres})

        }
    }

}))


// adding a new article
authorApp.post('/new-article', async (req, res) => {
    //get new article from author
    // let authorsCollection =
    const newAtricle = req.body;
    //console.log(newAtricle)
    //check author identity
    let dbAuthor = await authorscollection.findOne({
      username: newAtricle.username,
    });
    //if author not found
    // console.log("checking completed",dbAuthor)
    if (dbAuthor === null) {
      res.send({ message: "Invalid Author name" });
    } else {
      let result = await articlescollection.insertOne(newAtricle);
    //   console.log(result)
      res.status(201).send({ message: "New article added" });
    }
  });

// updating the article
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res) =>{
    // get the modified article obj
    const modifiedArticle = req.body;
    // update the aticle
    let result = await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    const newArticle = await articlescollection.findOne({articleId:modifiedArticle.articleId});
    // console.log(newArticle)
    // send res
    res.send({message:"Article is modified",article:newArticle},)
}))

// delete the article by article id
authorApp.put('/article/:articleId',expressAsyncHandler(async(req,res) =>{
    // get the article id from url
    const articleIdfromUrl = Number(req.params.articleId);
    // get the article
    const articleToDelete = req.body;
    // update the status to false
    if(articleToDelete.status === true){
    let resp =await articlescollection.updateOne({ articleId: articleIdfromUrl }, { $set: { status: false } });  
    res.send({message:"article is deleted"})
    // console.log(resp)
    }
    if(articleToDelete.status === false)
        {
            let resp =await articlescollection.updateOne({ articleId: articleIdfromUrl }, { $set: { status: true } });  
            res.send({message:"article is restored"})
            // console.log(resp)
        }
    // console.log(resp)  // send res
    
}))

// get the artcle of same author by author name
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res) =>{
    // get the username from usrl
    const usernameFromUrl = req.params.username;
    // get the articles whose status is true
    const articlesList = await articlescollection.find({username:usernameFromUrl}).toArray();
    // send res
    res.send({message:"articles List",payload:articlesList})
}))


// export the author app
module.exports=authorApp;