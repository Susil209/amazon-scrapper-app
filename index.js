// import fetch from 'node-fetch';
const express = require("express");
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 5000;

const returnScraperApiUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the application.");
});

//get product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await fetch(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`);
    const data = await response.json();
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.json(error)
  }

  // await fetch(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`)
  //   .then((response) => {
  //     console.log(response);
  //     res.json(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.json(error);
  //   });
});

// get product reviews
app.get('/products/:productId/reviews',async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await fetch(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`);
    const data = await response.json();
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.json(error)
  }
})

// get product offers
app.get('/products/:productId/offers',async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await fetch(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
    const data = await response.json();
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.json(error)
  }
})

// get searched product
app.get('/search/:searchQuery',async (req, res) => {
  const { searchQuery } = req.params;

  try {
    const response = await fetch(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`);
    const data = await response.json();
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.json(error)
  }
})

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
