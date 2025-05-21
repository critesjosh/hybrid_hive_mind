# Stock Sentiment Analyzer

This project analyzes Twitter sentiment about stocks and correlates it with stock price movements.

## Features

- Real-time Twitter sentiment analysis for any stock ticker
- Historical stock price data visualization
- Correlation between social media sentiment and stock performance
- Beautiful, responsive UI with real-time updates

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory with your Twitter API credentials:
```
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. Enter a stock ticker symbol (e.g., AAPL, GOOGL, TSLA)
2. Click "Analyze Sentiment"
3. View the sentiment analysis results and price correlation

## Technical Stack

- Next.js for the frontend and API routes
- Twitter API v2 for social media data
- Yahoo Finance API for stock data
- Sentiment.js for natural language processing
- Chart.js for data visualization
- TailwindCSS for styling

## Notes

- Twitter API rate limits apply
- Stock data is delayed by 15 minutes
- Sentiment analysis is performed using basic NLP techniques
