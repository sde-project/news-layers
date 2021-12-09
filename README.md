# news-layer
News aggregation layer

### Data Service Layer
The news providers used by this layer are:
- **General News Providers**:
    - The New York Times - [API](https://developer.nytimes.com/apis)
    - Financial Times - [API](https://developer.ft.com/portal)
    - The Guardian - [API](https://open-platform.theguardian.com/documentation/) - [LIMITS](https://open-platform.theguardian.com/access/)
- **Niche News Providers**:
    - CryptoCompare - [API](https://min-api.cryptocompare.com/) - [LIMITS](https://min-api.cryptocompare.com/pricing)
    - CryptoPanic - [API](https://cryptopanic.com/developers/api/)

### Adapter Service Layer
After the API fetching, all the news will be expressed with the following structure:
```
{
    "title": "news title",
    "content": "link to the news",
    "publishedAt": "date in which the news was published"
}
```