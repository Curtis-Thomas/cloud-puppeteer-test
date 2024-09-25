const puppeteer = require("puppeteer");

(async () => {
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
})();
