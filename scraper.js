const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = process.argv[2] || 'https://example.com';
const selector = process.argv[3] || 'h1, h2, h3';
const outFile = process.argv[4] || 'output.json';

async function scrape() {
  const response = await axios.get(url, {
    timeout: 10000,
    headers: { 'User-Agent': 'web-scraper (+https://github.com/ElbruzMafe/web-scraper)' }
  });

  const $ = cheerio.load(response.data);
  const results = [];

  $(selector).each((i, elem) => {
    const text = $(elem).text().trim();
    if (text) {
      results.push({ tag: elem.tagName, text });
    }
  });

  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`Found ${results.length} match(es) for "${selector}" on ${url} -> ${outFile}`);
}

scrape().catch(error => {
  console.error('Scrape failed:', error.message);
  process.exit(1);
});
