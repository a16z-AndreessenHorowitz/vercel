const mongose=require('mongoose')


module.exports.connect= async ()=>{
    try {
        mongose.connect(process.env.MONGO_URL)
        console.log("connect success")
    } catch (error) {
        console.log("connect error")
    }

}
