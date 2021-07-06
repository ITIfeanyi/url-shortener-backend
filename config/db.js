const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://url-shortener:v8yZbgeb5pbHMaj6@cluster0.ecyvm.mongodb.net/urlShortener?retryWrites=true&w=majority`,
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
