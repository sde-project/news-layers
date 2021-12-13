/**
 * Basic class for each news, containing title, url and published at date
 */
class News {
    constructor(title, content, publishedAt, source) {
        this.title = title;
        this.content = content;
        this.publishedAt = new Date(publishedAt);
        this.source = source;
    }
}

module.exports = News;