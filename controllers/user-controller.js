
import User from '../models/User';
import bcrypt from 'bcryptjs'

export const getAllUser = async(req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    //validation
    if(!users) {
        return res.status(404).json({message: "No Users Found"})
    }
    return res.status(200).json({users});
}


//signup controller
export const signup = async(req,res,next) => {
    const{name,email,password} = req.body;

    //validation
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        console.log(error)
    }

    if (existingUser){
        return res.status(404).json({message: "User Already exist! please login"})
    }
    const hashedPassword = bcrypt.hashSync(password);
    //new user
    const user = new User({
        name,
        email,
        password: hashedPassword
    });


    try {
       await user.save();
    } catch (error) {
        console.log(error)
    }
    return res.status(201).json({user})

}

//login controller

export const login = async(req, res ,next) =>{
    const{email,password} = req.body;

    //validation
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        console.log(error)
    }

    if (!existingUser){
        return res.status(404).json({message: "Could not find user by this Email"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    
    //password validation
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect password"})
    }
    return res.status(200).json({message: "Login successfull"})
}   
