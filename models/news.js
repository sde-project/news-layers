/**
 * Basic class for each news, containing title, url and published at date
 */
class News {
    constructor(title, content, publishedAt) {
        this.title = title;
        this.content = content;
        this.publishedAt = new Date(publishedAt);
    }
}

module.exports = News;