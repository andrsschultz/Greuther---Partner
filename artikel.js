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

    document.getElementById("article-cover").src = article.data.attributes.cover.data.attributes.formats.large.url;

    // document.getElementById("article-title").innerHTML = article.title;

    // document.getElementById("article-description").innerHTML = article.description;

    // document.getElementById("published_date").innerHTML = (new Date(article.published_at)).toDateString();

    // let articleTags = document.getElementById("article-tags");

    // let tag;

    // article.tags.forEach(tg => {
    //     if (tg.name) {
    //         tag = document.createElement("span")
    //         tag.classList.add("article-tag");
    //         tag.innerHTML = tg.name;

    //         articleTags.appendChild(tag);
    //     }
    // });

    // const showdown = window.showdown;
    // const converter = new showdown.Converter();

    // document.getElementById("article-content").innerHTML = converter.makeHtml(article.content);

    // document.getElementById("article-cont").style = "display: flex; display: -webkit-box; display: -ms-flexbox;";
}



checkForArticle();
