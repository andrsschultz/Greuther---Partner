console.log('testscript.js called');

class BlogPost {
    constructor(title, content, slug, date, coverURL, description, author, categories) {
        this.title = title;
        this.content = content;
        this.slug = slug;
        this.date = date;
        this.coverURL = coverURL;
        this.description = description;
        this.author = author;
        this.categories = categories;
    }
}

let blogPosts = [];

function fetchPosts() {
    console.log('fetchPosts() called');
    let url = 'https://strapi-production-ed2e.up.railway.app/api/posts?populate=%2A'

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            console.log('Response ok');
            console.log(response.json);
            return response.json();
        }
        )

        .then((jsonData) => {
            console.log('JSON data received');
            console.log(jsonData)
            let postList = document.getElementById("post-list");

            for (const dataEntry in jsonData.data) {
                console.log('Hello');
                const title = jsonData.data[dataEntry].attributes.title;
                const content = jsonData.data[dataEntry].attributes.content;
                const description = jsonData.data[dataEntry].attributes.description;
                const slug = jsonData.data[dataEntry].attributes.slug;
                const date = jsonData.data[dataEntry].attributes.date;
                const coverURL = jsonData.data[dataEntry].attributes.cover.data.attributes.formats.medium.url;
                //TBD: Nur erster Autor bis jetzt + fail wenn kein autor angegeben
                const author = jsonData.data[dataEntry].attributes.authors.data[0].attributes.name;
                //TBD: Nur erste Kategorie bis jetzt  + fail wenn kein kategorie angegeben
                const categories = jsonData.data[dataEntry].attributes.categories.data[0].attributes.name;

                blogPosts.push(new BlogPost(title, content, slug, date, coverURL, description, author, categories));
            }

            for(const post in blogPosts) {
                console.log(blogPosts[post]);
                //Create Blog Post Card
                postList.appendChild(createPostCard(blogPosts[post]))
            }
        });
}


function createPostCard(post) {

    let card = document.createElement("a");
    card.classList.add("post-card")
    //AUSTAUSCHEN
    card.href = `blog/artikel.html?slug=${post.slug}`;

    console.log(card.href);

    
    let postCardCover = document.createElement("div");
    postCardCover.classList.add("post-card-cover");

    let imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    let cardImage = document.createElement("img");
    cardImage.src = post.coverURL;

    let postTitle = document.createElement("h3");
    postTitle.innerHTML = post.title;

    let gradient = document.createElement("div");
    gradient.classList.add("image-gradient")

    let postDate = document.createElement("p");
    postDate.classList.add("post-card-date");
    //TBD: anpassen?
    postDate.innerHTML = post.date;

    let postDescription = document.createElement("p");
    postDescription.classList.add("post-card-description");
    //TBD: anpassen?
    postDescription.innerHTML = post.description;

    imageContainer.append(cardImage, gradient)

    postCardCover.append(imageContainer, postTitle)

    card.append(postCardCover, postDate, postDescription);

    return card;
}

fetchPosts();