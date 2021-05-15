require("dotenv").config();


const express = require('express');
const cors = require("cors");
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
     res.status(200).json({
       status: "success",
       results: results.rows.length,
       data: {
         restaurant: results.rows
       },
     })
  } catch (err) {
    console.log(err);
  }
  
  }
)

app.get("/api/v1/restaurants/:id", async (req, res) => {
   const {id} = req.params;
  
   // Use parameterized queries instead of template strings to avoid SQL injections

   const restaurant = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
   const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [id]);
   
   res.status(200).json(
     {
       status: "success",
       data: {
         restaurant: restaurant.rows[0],
         reviews: reviews.rows

       }
     }
   )
}
)

app.post("/api/v1/restaurants/", async (req, res) => {
  console.log(req.body);
  const {name, location, price_range} = req.body;
  const values = [name, location, price_range]

  try {
    const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", values);
    res.status(201).json(
      {
        status: "success",
        data: {
          restaurant: results.rows[0]
        }
      }
    )
  } catch (err) {
    console.log(err);
  }
  
  
})

app.put("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  const { id } = req.params;
  const { name, location, price_range} = req.body;
  const values = [name, location, price_range, id]
  try {
    const result = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", values)
  
    res.status(201).json(
    {
      status: "success",
      data: {
        restaurant: result.rows[0]
      }
    }
  )
  } catch (err) {
    console.log(err)
  }
  
})

app.delete("/api/v1/restaurants/:id", async (req, res) => {

  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id] )
    res.status(204).json({
      status: "success"
    })
  } catch (err) {
    console.log
  }
  
});

const port =  process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`)
})