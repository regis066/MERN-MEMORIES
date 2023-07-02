import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js'


export const signIn = async (req,res) =>{

    const { email , password} = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password , existingUser.password);

        if(!isPasswordCorrect)return res.status(400).json({message : "Invalid Email or Password"});


        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'jwtsecret', {expiresIn: '1h'});

        res.status(200).json({ result: existingUser , token})


    } catch (error) {
        res.status(500).json({message: 'Something went wrong....'});
    }
    
}
export const signUp = async (req,res) =>{

    const { firstName , lastName, email, password , confirmPassword} = req.body;


    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({message: "User already Exists...."});

        if(password !== confirmPassword) return res.status(400).json({message: " Passwords mismatch"})

        if (!password) {
            throw new Error('Invalid password');
          }
          
          if (!confirmPassword) {
            throw new Error('Invalid confirmPassword');
          }
        const salt = await bcrypt.genSalt(12);

        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await User.create({ email , password: hashedPassword ,name: `${firstName} ${lastName}`} );

        const token = jwt.sign({email: result.email, id: result._id} , 'jwtsecret' , { expiresIn: '1h'} )


        res.status(200).json({ result, token})
    } catch (error) {
        res.status(500).json({ message: "Something went wrong ..."});
        console.log(error)

    }

}