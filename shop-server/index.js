require('dotenv').config()
const exp = require('express')
const cors = require('cors')
require('./DB/conncetion')
const routes = require('./Routes/router')
const shop_Server = exp()
shop_Server.use(cors())
shop_Server.use(exp.json())
shop_Server.use(routes)
const PORT = 3000 || process.env.PORT

shop_Server.listen(PORT,()=>{
    console.log(`Shop server is online at Port ${PORT}`);
})

shop_Server.get('/',(req,res)=>{
    res.status(200).send("<p style='color:red'>Shop Server is Online</p>")
})