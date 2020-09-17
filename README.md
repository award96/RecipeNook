# RecipeNook
## find and share recipes

https://www.recipenook.app

I created this fully functional website to become a better
developer and to have something to show for that growth.

## Stack

### Frontend
![react](/client/src/images/reactLogo.jpg | width=100)
![materialUI](/client/src/images/materialUILogo.png | width=200)

### Server
![nodeJS](/client/src/images/nodeJSLogo.png | width=200)
![expressJS](/client/src/images/ExpressJSLogo.png | width=200)

### Database
![mySQL](/client/src/images/mySQLlogo.png | width=200)

### Hosting
![heroku](/client/src/images/herokuLogo.png | width=200)

RecipeNook was created with a frontend of React and Material UI,
an Express JS server, and a Google Cloud MySQL database. The site is
hosted using Heroku.

## Users

The site is centered around users. The sign in process works through
Firebase Auth, and the MySQL DB stores user info - specifically their
id number, username, and avatar picture.

### Users can 
- make and edit a recipe
- post and edit a review
- follow one another
- favorite a recipe
- recieve a notification
- change their username
- add and change an avatar picture

Each user has a public profile page as well.

## Data Model

![DB model](/client/src/images/MySQLmodel.png)


#### All contact info is on the /about page of the website, or, if you like reading code, find it in client/src/components/about/Contact.js

