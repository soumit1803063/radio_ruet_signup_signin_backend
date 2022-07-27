//'required modules' section start

    //'downloaded modules' section start
    const mongoose= require("mongoose");
    //'downloaded modules' section end

    //'Developer-defined Modules' section starts
    const config= require("config"); 
    const db=config.get('mongoURI')
    //'Developer-defined Modules' section ends

//'required modules' section end


//'Database Connection' section starts
    const connectDB = async ()=>{
        try {
            await mongoose.connect(db);
            console.log("Mongodb connected...")

        } catch (err) {
            console.error(err.message);
            process.exit(1)//Exit process with failure
        }
    }
//'Database Connection' section ends


//'Export' section start
    module.exports = connectDB;
//'Export' section end 