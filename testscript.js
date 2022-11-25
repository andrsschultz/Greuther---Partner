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
                //TBD: Anpassen an JSON model, check api call
                const title = jsonData.data[dataEntry].attributes.title;
                const content = jsonData.data[dataEntry].attributes.content;
                const description = jsonData.data[dataEntry].attributes.description;
                const slug = jsonData.data[dataEntry].attributes.slug;
                const date = jsonData.data[dataEntry].attributes.date;
                const coverURL = jsonData.data[dataEntry].attributes.cover.data.attributes.formats.medium.url;
                //TBD: Nur erster Autor bis jetzt
                const author = jsonData.data[dataEntry].attributes.authors.data[0].attributes.name;
                //TBD: Nur erste Kategorie bis jetzt
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

    let card = document.createElement("div");
    card.classList.add("card");
    card.onclick = () => {
        //TBD: Anpassen
        window.location.replace(`/pages/article.html?id=${article.id}`)
    };

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img");
    //TBD: Anpassen
    cardImage.src = post.coverURL;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let postTitle = document.createElement("p");
    postTitle.classList.add("card-title");
    //TBD: anpassen?
    postTitle.innerHTML = post.title;

    let postDescription = document.createElement("div");
    postDescription.classList.add("card-description");
     //TBD: anpassen?
    postDescription.innerHTML = post.description;

    //TBD: 
    let postCategories = document.createElement("div");
    postCategories.classList.add("post-categories-cont");

    //für was??
    let category;

    //TBD: anpassen? categories?
    // post.categories.forEach(tg => {
    //     if (tg.name) {
    //         tag = document.createElement("span")
    //         tag.classList.add("post-category-tag");
    //         //TBD anpassen
    //         tag.innerHTML = tg.name;

    //         postCategories.appendChild(tag);
    //     }
    // });

    cardBody.append(postTitle, postDescription, postCategories);

    card.append(cardImage, cardBody);

    return card;
}

fetchPosts();