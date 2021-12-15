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


### Messages structure
All the news our services will deal with will be expressed with the following structure:
```
{
    "title": "news title",
    "content": "link to the news",
    "publishedAt": "date in which the news was published",
    "source": "API source",
    "sentiment": "Sentiment of the news, from -1 (negative) to +1 (positive)"
}
```

### Adapter Service Layer
News is retrieved from different news providers.
**Five routes** are exposed:
- `/api/cryptocompare`: get latest or search for specific news from **cryptocompare**
- `/api/cryptopanic`: get latest or search for specific news from **cryptopanic**
- `/api/gnews`: get latest or search for specific news from **gnews**
- `/api/nytimes`: get latest or search for specific news from **nytimes**
- `/api/theguardian`: get latest or search for specific news from **theguardian**

The API documentation can be found [here]()

### Business Logic Layer
News is retrieved from the Adapter Service Layer, filtered based on pre-defined rules and checked for duplicates.
The sentiment is calculated in this layer using *VADER*.
**Two routes** are exposed:
- `/api/latest`: get latest news from crypto niche news providers;
- `/api/search`: search for specific news based on the time frame and the currency.

The API documentation can be found [here]()
