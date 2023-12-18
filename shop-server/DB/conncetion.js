const mongoose = require('mongoose')
const connection_string = process.env.CONNECTION_STRING

mongoose.connect(connection_string).then((res)=>{
    console.log(`mongodb connected to shop db`)
}).catch((err)=>{
    console.log(err);
})