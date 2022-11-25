class BlogPost {
    constructor(title, content, slug, date) {
        this.title = title;
        this.content = content;
        this.slug = slug;
        this.date = date;
    }
}

let blogPosts = [];

function fetchPosts()) {
    let url = 'TBD'

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json;
        }
        )
        .then((jsonData) => {
            //TBD
            let postList = document.getElementById("post-list");

            for (const dataEntry in dataJSON.data) {
                blogPosts.push(new BlogPost(dataJSON.data[dataEntry].attributes.title, dataJSON.data[dataEntry].attributes.content, dataJSON.data[dataEntry].attributes.slug, dataJSON.data[dataEntry].attributes.date));
            }

            for(const post in blogPosts) {
                //Create Blog Post Card
                postList.appendChild(createPostCard(blogPosts[post]))
            }
        });
}


function createPostCard(post) {
    let card = document.createElement("div");
    //TBD: Klasse in css hinzufügen
    card.classList.add("card");
    card.onclick = () => {
        //TBD: Anpassen
        window.location.replace(`/pages/article.html?id=${article.id}`)
    };

    let cardImage = document.createElement("img");
    //TBD: Klasse in css hinzufügen
    cardImage.classList.add("card-img");
    //TBD: Anpassen
    cardImage.src = `http://localhost:1337${article.cover_image.formats.thumbnail.url}`;

    let cardBody = document.createElement("div");
    //TBD: Klasse in css hinzufügen
    cardBody.classList.add("card-body");

    let postTitle = document.createElement("p");
    //TBD: Klasse in css hinzufügen
    postTitle.classList.add("card-title");
    //TBD: anpassen?
    postTitle.innerHTML = post.title;

    let postDescription = document.createElement("div");
    //TBD: Klasse in css hinzufügen
    postDescription.classList.add("card-description");
     //TBD: anpassen?
    postDescription.innerHTML = post.description;

     //TBD: 
    let postCategories = document.createElement("div");
    //TBD: Klasse in css hinzufügen
    postCategories.classList.add("post-categories-cont");

    let category;

    //TBD: anpassen? categories?
    post.category.forEach(tg => {
        if (tg.name) {
            tag = document.createElement("span")
            //TBD: Klasse in css hinzufügen
            tag.classList.add("post-tag");
            tag.innerHTML = tg.name;

            postCategories.appendChild(tag);
        }
    });

    cardBody.append(postTitle, postDescription, postCategories);

    card.append(cardImage, cardBody);

    return card;
}