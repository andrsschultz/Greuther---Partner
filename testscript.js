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
    let url = 'https://strapi-production-ed2e.up.railway.app/api/posts?populate=%2A'

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json;
        }
        )
        .then((jsonData) => {
            let postList = document.getElementById("post-list");

            for (const dataEntry in jsonData.data) {
                //TBD: Anpassen an JSON model, check api call
                const title = dataJSON.data[dataEntry].attributes.title;
                const content = dataJSON.data[dataEntry].attributes.content;
                const description = dataJSON.data[dataEntry].attributes.description;
                const slug = dataJSON.data[dataEntry].attributes.slug;
                const date = dataJSON.data[dataEntry].attributes.date;
                const coverURL = dataJSON.data[dataEntry].attributes.cover.data.attributes.formats.medium.url;
                //TBD: Nur erster Autor bis jetzt
                const author = dataJSON.data[dataEntry].attributes.authors.data[0].attributes.name;
                //TBD: Nur erste Kategorie bis jetzt
                const categories = dataJSON.data[dataEntry].attributes.categories.data[0].attributes.name;

                blogPosts.push(new BlogPost(title, content, slug, date, coverURL, description, author, categories));
            }

            for(const post in blogPosts) {
                console.log(post)
                //Create Blog Post Card
                //postList.appendChild(createPostCard(blogPosts[post]))
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
    cardImage.src = `http://localhost:1337${article.cover_image.formats.thumbnail.url}`;

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
    post.category.forEach(tg => {
        if (tg.name) {
            tag = document.createElement("span")
            tag.classList.add("post-category-tag");
            //TBD anpassen
            tag.innerHTML = tg.name;

            postCategories.appendChild(tag);
        }
    });

    cardBody.append(postTitle, postDescription, postCategories);

    card.append(cardImage, cardBody);

    return card;
}

fetchPosts();