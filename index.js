require("dotenv").config();

const express = require('express');

const app = express();

app.get(
  "/api/v1/restaurants", (req, res) => {
    res.status(200).json({
      status: "success",
      data: {
        restaurant: ["mcdonalds", "wendys"]
      },
    })
  }
)

app.get("/api/v1/restaurants/:id", (req, res) => {
   console.log(req.params);
   res.status(200).json({
     meow: "meow"
   })
  }
)

app.post("/api/v1/restaurants/", (req, res) => {
  console.log(req)
  
})

const port =  process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`)
})