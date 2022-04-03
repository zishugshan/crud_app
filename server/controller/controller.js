var Userdb = require('../model/model');

//create add user
exports.create = (req,res)=>{
    //validate req
    if(!req.body){
        res.status(400).send({message:"content can not be empty"});
        return;
    }

    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
    //save user in db
    user
    .save(user)
    .then(data=>{
        //res.send(data);
        res.redirect('/add-user');
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "some error in creating new user"
        })
    })
}

// all user
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"User not found !"})
            }
            else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:"error in finding data with ${id}"});
        })
    }
    else {
        Userdb.find()
        .then(user=>{
        res.send(user);
            })
        .catch(err=>{
        res.status(500).send({
            message:err.message || "some error in finding user"
            })
        })
    }
    
}

// update user
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"data can not be empty for update"})

    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
          
            res.status(400).send({message:"cannot update user with ${id},may be user not present "})
        }
        else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({message:"some error occured with this user ${id"});
    })
    
}

//delete use
exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Can not delete with ${id} ,may be data not found"});
        }
        else{
            res.send({
                message:"user was deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({message:"user can not be deleted! ${id}"});
    })
    
}