# web-scraper

A small Node.js scraper that fetches a page, pulls out every element matching a CSS
selector, and writes the results to a JSON file.

I wrote this while learning how `cheerio` handles server-rendered HTML. It is
deliberately tiny — one file, two dependencies, no framework — so it is easy to
copy into a bigger project or use as a starting point when you just need to grab
a list of things off a page.

## Features

- Fetch any URL and query it with a normal CSS selector
- Output is a JSON array of `{ tag, text }`, with empty nodes skipped
- URL, selector and output path are all command-line arguments
- 10s request timeout, non-zero exit code on failure

## Tech stack

Node.js, axios, cheerio.

## Running it

```bash
npm install
node scraper.js
```

That scrapes `https://example.com` for `h1, h2, h3` and writes `output.json`:

```json
[
  {
    "tag": "h1",
    "text": "Example Domain"
  }
]
```

Arguments are `url`, `selector`, `outFile`:

```bash
node scraper.js https://news.ycombinator.com ".titleline > a" links.json
```

## Project structure

```
.
├── scraper.js     # fetch, parse, write
└── package.json
```

## Known limitations

- Static HTML only. Pages that render their content with JavaScript will come back
  empty — that needs a headless browser, not cheerio.
- No pagination, no crawling, no rate limiting. One URL, one request.
- Only the text of each match is kept; attributes such as `href` are dropped.
- No `robots.txt` check, so be considerate about where you point it.
