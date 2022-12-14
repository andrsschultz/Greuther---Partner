function checkForArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const slugID = urlParams.get('slug');

    if (slugID) {
        console.log('hello')
        console.log(slugID);
        getArticle(slugID);
    } else {
        showMissingArticleMsg("An article can't be retrieved without an slug ID.");
    }
}


function getArticle(slugID) {
    const articleReq = new Request(`https://strapi-production-ed2e.up.railway.app/api/post/find-by-slug/${slugID}?populate=%2A`);

    console.log(`https://strapi-production-ed2e.up.railway.app/api/post/find-by-slug/${slugID}?populate=%2A`)
    console.log(articleReq)

    fetch(articleReq)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        })
        .then(displayArticle)
        //.catch(showMissingArticleMsg);
}

function displayArticle(article) {

    if ('large' in article.data.attributes.cover.data.attributes.formats) {
        document.getElementById("article-cover").src = article.data.attributes.cover.data.attributes.formats.large.url;
    } else if ('medium' in article.data.attributes.cover.data.attributes.formats) {
        document.getElementById("article-cover").src = article.data.attributes.cover.data.attributes.formats.medium.url;
    } else if ('small' in article.data.attributes.cover.data.attributes.formats) {
        document.getElementById("article-cover").src = article.data.attributes.cover.data.attributes.formats.small.url;
    }

    document.getElementById("article-title").innerHTML = article.data.attributes.title;

    document.getElementById("article-date").innerHTML = article.data.attributes.date;

    document.getElementById("article-description").innerHTML = article.data.attributes.description;


    const showdown = window.showdown;
    const converter = new showdown.Converter();
    document.getElementById("article-content").innerHTML = converter.makeHtml(article.data.attributes.content);

}



checkForArticle();
