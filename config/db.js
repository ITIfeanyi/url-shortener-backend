const mongoose = require("mongoose");

mongoose.connect(
  `${process.env.MONGO_URL}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("App connected to db");
    }
  }
);
