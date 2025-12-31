const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/article.routes");

const app = express();

app.use(cors());               // ✅ THIS LINE FIXES IT
app.use(express.json());

app.use("/api/articles", articleRoutes);

module.exports = app;

/*mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on 5000"));*/
module.exports = app;
