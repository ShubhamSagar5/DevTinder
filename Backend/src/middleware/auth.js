

const adminAuth = (req,res,next) => {

    const token = "xyzz" 

    if(token !== "xyzz"){
        return res.status(500).json({
            success:false,
            message:"Admin Token Not Match"
        })
    }else{
        console.log("Authentiacte")
        next()
    }
 
}


const userAuth = (req,res,next) => {
    const token = "xyz" 

    if(token !== "xyz"){
        return res.status(500).json({
            success:false,
            message:"Admin Token Not Match"
        })
    }else{
        console.log("Authentiacte")
        next()
    }
}


module.exports = {
    adminAuth,
    userAuth
}