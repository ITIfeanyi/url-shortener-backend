const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//db
require("./config/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
