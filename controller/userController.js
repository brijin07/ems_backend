// import user schema
const users=require('../models/userSchema')


// add data
exports.addUser=async(req,res)=>{

    req.file
    console.log('inside add user');
    const{fname,lname,email,mobile,gender,status,location}=req.body

    try{
        // check user aleredy exist
        const preuser=await users.findOne({email})
        if(preuser){
            res.status(406).json("user alredy exist")
            
        }else{
            // add new user 
            const newuser=new users({
                fname,lname,email,mobile,gender,status,profile:req.file.filename,location
            })
            await newuser.save()
            res.status(200).json(newuser)
        }



    }catch(err){
        res.status(401).json('error'+err)
    }
}

// get data

exports.getallUsers=async(req,res)=>{

    const search=req.query.search

    const query={
        fname:{$regex:search,$options:"i"}
    }
    try{
        const allusers=await users.find(query)

         res.status(200).json(allusers)
    }
    catch(err){
        res.status(401).json('error'+err)
    }
}

exports.deleteUser=async(req,res)=>{

    const{id}=req.params

    try {
const removedata=await users.findByIdAndDelete({_id:id})

res.status(200).json(removedata)
        
    } catch (err) {
        res.status(401).json(err)

    }
}


exports.editUser=async(req,res)=>{
    const{id}=req.params
    const{fname,lname,email,mobile,gender,status,location,profile}=req.body
    const file=req.file?req.file.filename:profile

    try{
        const updateUser=await users.findByIdAndUpdate({_id:id},{
            fname,lname,email,mobile,gender,status,profile:file,location
        },{new:true})

        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch(err){
        res.status(401).json(err)
    }


}



