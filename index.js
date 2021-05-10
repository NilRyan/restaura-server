require("dotenv").config();


const express = require('express');

const app = express();

app.use(express.json());

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
}
)

app.post("/api/v1/restaurants/", (req, res) => {
  console.log(req.body)
  
})

app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id)
})

const port =  process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`)
})