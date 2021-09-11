# MyPrivateLife

This website allow you to post your thoughts anonymously, adding expresivity with a related gif. You will be able to see the reactions and comments to your post and see other anonymous posts.

[![live website](private-life.JPG)](https://my-private-life.netlify.app/)

### MosCow Priorization
#### Must have:
  - Emoji feature (Three emogis at least!)
  - Random gif from giphy
  - Board with other articles
  - Comment section
  
#### Should have:
  - Responsive

#### Could have:
  - Show the posts that fits with a search query (with regex in the backend)

#### Will not have:

####
Dependencies:
  - Bootstrap
  - express

dev-dependencies:
  - Jest
  - supertest
  - cors
  - nodemon

Installation
=======================

1. Clone the repository
2. Navigate into the server folder
3. Run npm install to download dependencies

Usage
=======================

A. Start The backend server
1. Open a new terminal instance 
2. Navigate into the server folder
3. Run npm start
  - console will log that the server is running
  - localhost:3000 can be visited

B. Start The front end server
1. Open a new terminal instance 
2. Navigate into the client folder
3. Run npm start
  - console will log the address of the newly started server

C. Using the application
1. Visit the webpage via the address generated by http-server
2. The home page will show a random post - click the post to comment and react to it
3. To add a post click `Add a Post`
4. To see previously added posts click `View All Posts`

D. Available APIs
#### GET
- `/` - Retrieve all data
- `/posts` - Retrieve all posts
- `/posts/random` - Retrieve a random post
- `/posts/{id}` - Retrieve a single post
- `/posts/{id}/comments` - Retrieve the comments for a single post

#### POST
- `/posts` - Create a new post
    This requires a json payload in the following format...
    ```{
        "title": "",
        "content": "",
        "gif": {
            "moving":"url of gif",
            "still":"url for static image of gif"
        }
    }```

- `/posts/{id}/comment` - Add a comment to an existing post
    This requires a json payload in the following format...
    ```{
        "text": ""
    }```

#### PUT
- `/posts/{id}/{reaction}` - React to a specific post
    reaction can be one of these values
    - thumbsUp
    - heart
    - angryFace


######## CHANGELOG ##########

- Home page basic look and feel developed
- Server code added for initial routes
- Random post added to the homepage
- Single post page created
- Post Model code added
- Added functionality to comment on a post
- Server code refactored to allow for test suite
- Emoji reactions added to single post page
- Add a post page added
- All posts page released
- Code added to support heroku deployment
- Client code updated to point to heroku
- Server Test Suit improved
- All Posts filter added
- Post truncated on preview pages
- Styling Tweaks
- Fix for Heroku remove fs.readFile()
- Background positioning fixed
- Add more Server Side tests
- Footer positioning reworked
- Client Side Tests Added


########### BUGS / OUTSTANDING DEV ###########

- [x] Filter on all posts page
- [x] Logo on all posts page link to homepage 
- [x] Consistent styling across pages
- [x] Comment button will link to single post page
- [ ] If you search for a gif with Enter key it tries to submit the form
- [ ] Improved error handling 
