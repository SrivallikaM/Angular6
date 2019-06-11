const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const jwt_decode=require('jwt-decode');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/angularAssessment',{useNewUrlParser:true}).then(()=>{
    console.log("Database connected!!");
}).catch((err)=>{
    console.log(err);
});
const usersSchema=mongoose.Schema({
    "username":{
        type:String,
        required:[true,'Please provide username!!']
    },
    "password":{
        type:String,
        required:[true,'Please provide username!!']
   }
});

const usersModel=mongoose.model('users',usersSchema);

const postsSchema=mongoose.Schema({
    "postTitle":{
        type:String,
        required:[true,'Please provide post title!!']
    },
    "postDesc":{
        type:String,
        required:[true,'Please provide post Description!!']
   },
   "user":{
       type:String
   },
   "likesCount":{
     type:Number,
       default:0
   },
   "likedBy":
   {
       type:Array,
       default:[]
   },
   "comments":
   {
       type:Array,
       default:[]
   }
});

const postsModel=mongoose.model('posts',postsSchema);


app.post('/saveDetails',(req,res)=>
{
const user_doc=usersModel(req.body);
user_doc.save().then((data)=>{res.send(data)}).catch((err)=>{console.log(err);res.end();})

});

app.post('/getDetails',(req,res)=>
{
    usersModel.findOne(
      
        {username: req.body.username, password: req.body.password},
    
        
        
    ).then(function(doc) {
        if (doc) {

            var token=jwt.sign({
                username:req.body.username,
                org:"Marlabs"
            },"marlabs-secret-key",{expiresIn:"1h"})
            res.send({isLoggedIn:true,token:token});
            res.end();
        } else {
            res.status(403).send({isLoggedIn:false,err:"Invalid details"});
            res.end();
        }
        }).catch((err)=>{ console.log(err); res.end();});
      
})
app.use((req,res,next)=>
{
    var token=req.headers.authtoken;
    jwt.verify(token,"marlabs-secret-key",function(err,decoded)
    {
        if(err)
        {
            res.status(403).send({isLoggedIn:false,err:"Invalid details"});
            res.end();
        }
        else
        {
            req.decoded=decoded;
            next();
        }
    })
})
app.post('/submitPosts',(req,res)=>
{
    
    var token=req.headers.authtoken;
    var tokenDecoded=jwt_decode(token);
    var post=req.body;
    post["user"]=tokenDecoded.username;
    console.log(post);
    const post_doc=postsModel(post);
post_doc.save().then((data)=>{
    if(data)
    {
        res.send("Submitted");
    }
    else{
        res.send("Not Submitted");
    }
    }).catch((err)=>{console.log(err);res.end();})

});

app.get('/getPosts',(req,res)=>
{
    var token=req.headers.authtoken;
    var tokenDecoded=jwt_decode(token);
    postsModel.find(
      
        {},
    
        
        
    ).then(function(data) {
        //console.log(data)
        var newArray=[];

        newArray.push(data);
        newArray.push(tokenDecoded.username);
        res.send(newArray);
    }).catch((err)=>{ console.log(err); res.end();});
      
})

app.post('/likePosts',async (req,res)=>
{
 
    var token=req.headers.authtoken;
    var tokenDecoded=jwt_decode(token);
   
    

    try {

       

        var resp = await postsModel.find(

            {  },



        )
       
        var likesArray = resp[req.body.id].likedBy;
       
        likesArray.push(tokenDecoded.username);
       var objId=resp[req.body.id]._id;
      
        var response = await postsModel.where('_id', resp[req.body.id]._id).updateMany({ $set: { likedBy: likesArray,likesCount:likesArray.length} });
        var data=await postsModel.find({_id:objId} );
       
       
        res.send(data);

    }

    catch{
        (err) => { console.log(err); res.end(); }
    };

      
});

app.post('/addComments',async (req,res)=>
{
 
  
   
    

    try {

       

        var resp = await postsModel.find(

            {  },



        )
       
        var commentsArray = resp[req.body.id].comments;
       console.log(commentsArray);
        commentsArray.push(req.body.comments);
       var objId=resp[req.body.id]._id;
      
        var response = await postsModel.where('_id', resp[req.body.id]._id).updateMany({ $set: { comments: commentsArray} });
       
       
       
        res.send(response);

    }

    catch{
        (err) => { console.log(err); res.end(); }
    };

      
});

app.post('/likedBy',async (req,res)=>
{
 
    var token=req.headers.authtoken;
    var tokenDecoded=jwt_decode(token);
   
    

    try {

       

        var resp = await postsModel.find(

            {  },



        )
       
      
       var objId=resp[req.body.id]._id;
      
       
        var data=await postsModel.find({_id:objId} );
       
       
        res.send(data);

    }

    catch{
        (err) => { console.log(err); res.end(); }
    };

      
});

app.listen(3000,()=>{console.log("Server Listening to Port 3000")});