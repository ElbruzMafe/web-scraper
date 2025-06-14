const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://example.com';

axios(URL)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const results = [];

    $('h2').each((i, elem) => {
      results.push($(elem).text());
    });

    fs.writeFileSync('output.json', JSON.stringify(results, null, 2));
    console.log('Scraping completed.');
  })
  .catch(error => {
    console.error('Error:', error);
  });
