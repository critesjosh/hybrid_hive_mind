const { TwitterApi } = require('twitter-api-v2');
const yahooFinance = require('yahoo-finance2');
const Sentiment = require('sentiment');

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
const sentiment = new Sentiment();

exports.analyzeSentiment = async (req, res) => {
  try {
    const { symbol } = req.body;
    
    // Fetch tweets
    const tweets = await twitterClient.v2.search(`${symbol} stock lang:en -is:retweet`);
    
    // Analyze sentiment
    const sentiments = tweets.data.map(tweet => sentiment.analyze(tweet.text));
    const averageSentiment = sentiments.reduce((acc, curr) => acc + curr.score, 0) / sentiments.length;

    res.json({
      symbol,
      sentimentScore: averageSentiment.toFixed(2),
      tweetCount: tweets.data.length,
      sentiments: sentiments.map(s => s.score)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHistoricalData = async (req, res) => {
  try {
    const { symbol } = req.params;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const data = await yahooFinance.historical(symbol, {
      period1: startDate,
      period2: endDate,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentPrice = async (req, res) => {
  try {
    const { symbol } = req.params;
    const quote = await yahooFinance.quote(symbol);
    
    res.json({
      symbol,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 