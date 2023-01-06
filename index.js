const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const app = express();
app.use(express.json());
app.use(cors())
dotenv.config();
let port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB conected successfull"))
  .catch((err) => console.log("DB conection error: ", err));
app.use("/app/api/images",express.static("images"));
app.use("/app/api", userRoute);
app.use("/app/api", postRoute);
app.get("/app/apii", async(req,res)=>{
  res.status(200).json({name:"user",count:77})
});

app.listen(port);


