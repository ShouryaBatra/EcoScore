// AmazonReviewScraper.jsx
const fetchAmazonData = async () => {
  try {
    const response = await fetch("http://localhost:3001/fetch-data");
    const data = await response.json();
    // console.log("Fetched Data:", data); // Log the data
    return data; // Return data if needed
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export default fetchAmazonData;
