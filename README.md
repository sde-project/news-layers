# news-layers
News aggregation layers

### Data Service Layer
The news providers used by this layer are:
- **General News Providers**:
    - The New York Times - [API](https://developer.nytimes.com/apis) - [LIMITS](https://developer.nytimes.com/faq#a11)
    - The Guardian - [API](https://open-platform.theguardian.com/documentation/) - [LIMITS](https://open-platform.theguardian.com/access/)
- **Niche News Providers**:
    - CryptoCompare - [API](https://min-api.cryptocompare.com/) - [LIMITS](https://min-api.cryptocompare.com/pricing)
    - CryptoPanic - [API](https://cryptopanic.com/developers/api/) - [LIMITS](https://cryptopanic.com/developers/api/)
- **News Aggregation Providers**:
    - GNews - [API](https://gnews.io/docs/v4#introduction) - [LIMITS](https://gnews.io/#pricing)

### Adapter Service Layer
After the API fetching, all the news will be expressed with the following structure:
```
{
    "title": "news title",
    "content": "link to the news",
    "publishedAt": "date in which the news was published",
    "source": "API source"
}
```

### Business Logic Layer
News is retrieved from the Adapter Service Layer and filtered based on pre-defined rules.
Two routes are exposed:
- `/api/last`: get latest news from crypto niche news providers;
- `/api/search`: search for specific news based on the time frame and the currency.

The API documentation can be found [here]()