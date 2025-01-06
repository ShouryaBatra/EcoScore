const express = require("express");
const cors = require("cors");
const { ApifyClient } = require("apify-client");

const app = express();
const port = 3001;

// Enable CORS for all origins
app.use(cors()); // Allow all origins, you can limit this to specific domains later if needed

app.get("/fetch-data", async (req, res) => {
  const client = new ApifyClient({
    token: process.env.VITE_APIFY_TOKEN,
  });

  const input = {
    productUrls: [{ url: "https://www.amazon.com/dp/B0CWXNS552" }],
    maxReviews: 100,
    sort: "helpful",
    includeGdprSensitive: false,
    filterByRatings: ["allStars"],
    reviewsUseProductVariantFilter: false,
    reviewsEnqueueProductVariants: false,
    proxyCountry: "AUTO_SELECT_PROXY_COUNTRY",
    scrapeProductDetails: false,
    reviewsAlwaysSaveCategoryData: false,
    scrapeQuickProductReviews: true,
  };

  try {
    const run = await client.actor("R8WeJwLuzLZ6g4Bkk").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    res.json(items); // Send back JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
