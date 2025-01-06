import Sentiment from "sentiment";

// Utility function for sentiment analysis
export default function sentimentUtility(texts) {
  const sentiment = new Sentiment();

  // Reduce the array of texts into an object mapping text to sentiment score
  const result = texts.reduce((acc, text) => {
    const analysis = sentiment.analyze(text); // Perform sentiment analysis
    acc[text] = analysis.score; // Map text to its sentiment score
    return acc;
  }, {});

  return result; // Return the key-value pairs
}
