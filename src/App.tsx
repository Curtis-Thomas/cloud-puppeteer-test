// App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]); // State to store scraped articles
  const [error, setError] = useState(null); // State to handle errors
  const [isLoading, setIsLoading] = useState(false); // State to handle loading

  const handleScrape = async () => {
    setIsLoading(true); // Set loading to true when fetch starts
    try {
      const response = await fetch("http://localhost:5000/scrape"); // Ensure you have the correct URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Parse response as JSON
      console.log(data); // Log the scraped articles
      setArticles(data); // Update state with scraped articles
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError(error.message); // Update error state
    } finally {
      setIsLoading(false); // Set loading to false after fetch completes
    }
  };

  return (
    <>
      <div>
        <h1>Puppeteer Test - Cloud Computing - Curtis Thomas</h1>
        <button
          style={{ display: isLoading ? "none" : "inline-block" }}
          onClick={handleScrape}
        >
          Scrape Yle News
        </button>
      </div>

      <div>
        <h2>Output</h2>
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <ul>
            {articles.map((article, index) => (
              <li
                style={{
                  borderBottom: "1px white solid",
                  marginTop: "5%",
                  display: "flex",
                  justifyContent: "left",
                }}
                key={index}
              >
                {index} -<strong>{article.heading}</strong>{" "}
                {/* Display only the heading */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
