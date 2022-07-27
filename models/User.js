// 'Required modules' section start    
    
    //'Downloaded modules' section start
    const mongoose =require("mongoose");
    //'Downloaded modules' section end
        
    //'Developer-defined modules' section start

    //'Developer-defined modules' section end 

// 'Required modules' section end.

// 'User-Model Schema' section starts

    const UserSchema=mongoose.Schema({
        name:{
            type:   String,
            required:   true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required:true
        },
        date:{
            type:Date,
            default: Date.now
        }

    }
    )

// 'User-Model Schema' section ends

//'Export' section start
    module.exports = User = mongoose.model('user',UserSchema);
//'Export' section end 
