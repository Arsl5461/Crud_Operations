const mongoose = require("mongoose");
var colors = require('colors');

const dbConnection = async() =>{
  try {
    let conn = await mongoose.connect('mongodb+srv://arsltech337:Arslanakmal786@test.4cugboe.mongodb.net/?retryWrites=true&w=majority')
    console.log(`Database connected on ${conn.connection.host} host..!`.bgYellow.red)
  } catch (error) {
      console.log(`Error in connection ${error}`)
  }
}
module.exports = dbConnection;