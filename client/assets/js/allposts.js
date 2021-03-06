const filter = document.getElementById('filter');
const cardsContainer = document.querySelector('#allPosts');

filter.addEventListener('keyup', filterPosts);

// retrieve all posts as soon as site is loaded
function getAllPosts(){
    fetch('https://my-private-life.herokuapp.com/posts')
    .then(resp => resp.json())
    .then(appendPosts)
    .catch(console.warn);
}

getAllPosts();

//creates framework of cards and populates with content from posts.json
function appendPosts(data){
    for(let i=0; i<data.length; i++){
        let numComments = data[i].comments.length;
        let {heart: numHearts, thumbsUp: numThumbs, angryFace: numAngry} = data[i].reactions;
        
        let newCard = document.createElement('div');
        newCard.setAttribute('class','col singleCard');
        cardsContainer.appendChild(newCard);
        
        let newInnerCard = document.createElement('div');
        newInnerCard.setAttribute('class','card h-100');
        newCard.appendChild(newInnerCard);
        
        // add event listener 'mouseenter' to start the gif and 'mouseleave' to switch back to still 
        let gif = document.createElement('img');
        gif.setAttribute('class', 'card-img-top');
        gif.setAttribute('src', data[i].gif.still);
        gif.setAttribute('alt', 'Giphy gif');
        gif.addEventListener('mouseenter', function() {
            gif.setAttribute('src', data[i].gif.moving);
        })
        gif.addEventListener('mouseleave', function() {
            gif.setAttribute('src', data[i].gif.still);
        })
        newInnerCard.appendChild(gif);
        
        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body')
        newInnerCard.appendChild(cardBody);
        
        let cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'card-title')
        cardTitle.textContent = data[i].title;
        cardBody.appendChild(cardTitle);
        
        let cardText = document.createElement('p');
        cardText.setAttribute('class', 'card-text');

        let cardBodyText = data[i].content;
        if(cardBodyText.length > 120) {
            cardBodyText = cardBodyText.substring(0,120) + '...';
        }
        cardText.textContent = cardBodyText;
        cardBody.appendChild(cardText);

        let postMeta = document.createElement('div');
        postMeta.className = ('post-meta');
        cardBody.appendChild(postMeta);
        
        let commentAnchor = document.createElement('a');
        commentAnchor.setAttribute('class', 'btn btn-secondary')
        commentAnchor.href = 'singlePost?id=' + data[i].id;
        commentAnchor.textContent = 'Comment'
        postMeta.appendChild(commentAnchor);
        
        let reactionsDiv = document.createElement('div');
        reactionsDiv.setAttribute('class', 'post-comments');
        postMeta.appendChild(reactionsDiv);
        
        let iForThumbs = document.createElement('i');
        iForThumbs.setAttribute('class', 'far fa-thumbs-up');
        reactionsDiv.appendChild(iForThumbs);
        let spanForThumbs = document.createElement('span')
        spanForThumbs.setAttribute('class', 'thumbs-count');
        spanForThumbs.textContent = numThumbs;
        reactionsDiv.appendChild(spanForThumbs);
        
        let iForHearts = document.createElement('i');
        iForHearts.setAttribute('class', 'far fa-heart');
        reactionsDiv.appendChild(iForHearts);
        let spanForHearts = document.createElement('span')
        spanForHearts.setAttribute('class', 'heart-count');
        spanForHearts.textContent = numHearts;
        reactionsDiv.appendChild(spanForHearts);
        
        let iForAngry = document.createElement('i');
        iForAngry.setAttribute('class', 'far fa-angry');
        reactionsDiv.appendChild(iForAngry);
        let spanForAngry = document.createElement('span')
        spanForAngry.setAttribute('class', 'angry-count');
        spanForAngry.textContent = numAngry;
        reactionsDiv.appendChild(spanForAngry);
        
        let iForComments = document.createElement('i');
        iForComments.setAttribute('class', 'far fa-comments');
        reactionsDiv.appendChild(iForComments);
        let spanForComments = document.createElement('span')
        spanForComments.setAttribute('class', 'comment-count');
        spanForComments.textContent = numComments;   
        reactionsDiv.appendChild(spanForComments);
    }
}

// function to correctly filter posts by title and content
function filterPosts(e) {
    let text = e.target.value.toLowerCase();
    let cardTitleArray = Array.from(document.getElementsByClassName('card-title')); 
    let cardtextArray = Array.from(document.getElementsByClassName('card-text'));

    // combine arrays so only have to search through 1
    let searchingArray = [];
    for (let i = 0; i < cardTitleArray.length; i++) {
        searchingArray[i] = cardTitleArray[i].textContent + ' ' + cardtextArray[i].textContent;
        }

    //match with card-title and card-text content + node chaining to display correct content
    for(let i=0; i<searchingArray.length; i++){ 
        let postContent = searchingArray[i];
       if(postContent.toLowerCase().indexOf(text) !=-1){
            cardTitleArray[i].parentNode.parentNode.parentNode.style.display='block';
        } else {
            cardTitleArray[i].parentNode.parentNode.parentNode.style.display='none';
        }
    }; 
};

module.exports = {
    getAllPosts,
    appendPosts,
    filterPosts
}