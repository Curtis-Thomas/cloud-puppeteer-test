import express from "express"; // Import express
import cors from "cors"; // Import cors
import puppeteer from "puppeteer"; // Import puppeteer

const app = express();
const PORT = 5000;

// Use CORS middleware
app.use(cors());

app.get("/scrape", async (req, res) => {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the Yle website
    await page.goto("https://yle.fi/");

    // Wait for the specific content to load
    await page.waitForSelector("h3"); // Wait for h3 elements to be present

    // Scrape h3 headings from the page
    const articles = await page.evaluate(() => {
      const headingElements = document.querySelectorAll("h3"); // Select all h3 elements

      return Array.from(headingElements).map((heading) => {
        return {
          heading: heading.innerText, // Get the text content of each h3 element
        };
      });
    });

    // Log the scraped articles to the console
    console.log(articles);

    // Close the browser
    await browser.close();

    // Send the scraped articles as a response
    res.json(articles); // Respond with the h3 headings only
  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).send("Error occurred while scraping the website.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
