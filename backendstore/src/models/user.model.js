const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First name is required"]
    },

    lastName:{
        type: String,
        required:[true, "Last name is required"]
    },

    email:{
        type: String,
        required: [true, "Email is required"],
        unique : true,
        lowercase:true,
        validate:{
            validator:function(v){
                return /\S+@\S+\.\S+/.test(v)
            },
            message:props=>`${props.value} is not a valid email address`
        }
    },
    password:{
        type: String,
        required:[true, "Password is required"],
        minLength:[6, "Password must be atleast 6 characters"]
    },
      role:{
        type: String,
        enum:["user", "admin"],
        default: "user",
      }


})

userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    }
     catch(error){
        next(error)
     }
})

const User = mongoose.model('User', userSchema)
module.exports = User