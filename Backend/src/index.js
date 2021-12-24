const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes.routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () =>
  console.log("App is listening on url http://localhost:" + 8080)
);
