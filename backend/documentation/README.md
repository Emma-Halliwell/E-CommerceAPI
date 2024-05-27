# E-CommerceAPI Part 1

## Project Description

This application was made as part of an E-Commerce API project for Codecademy. It allows users to look up and buy sports equipment. Some of the technologies I used on this projects are PostgreSQL (Postbird), Postman, and Swagger. I used Postbird to create the databases needed. This allows the projects to find specific products as well as sending the products to the cart. I used Postman to test the end points are working as expected. This allowed me to make changes as and when required. Lastly, I used Swagger to document the API that have created. This allows developer to know how to use the API.

I faced some challenges when completing the project. I found it hard to register and subsequently log in users. I searched the internet for help, I came across using sequalize. Sequalize works with Postbird as well the project to help register and log in users. I look forward to using this new information in later projects. This project took me along time to finish. I still believe that are improvements that need to made. I believe that the more knowledge that I acquire the better this project will become. This project will be used as a part of another project later.

## How to install and run the project?

Here is how to access and install this project.

Step 1 - Fork the repository to your GitHub account.
Step 2 - Clone the GitHub repository to your local repository.
Step 3 - Open Git Bash
Step 4 - Navigate to the local repository where you have stored the project.
Step 5 - Run npm install in Git Bash. This will install all the required packages and dependencies.
Step 6 - Open the project in you favourite code editor. Please bare in mind this project was written in Visual Studio Code.
Step 7 - If not already installed you will need to download Postman and PostgreSQL (PostBird).
Step 8 - Postman will need to know the endpoints that are defined in the project. They can be found in documentation folder with openapi.json and openapi.yaml or in app.js.
Step 9 - In PostgreSQL (Postbird) create a database with a name of choice.
Step 10 - In PostgreSQL (Postbird) you will need to create a number of different tables. Those tables are :-
    * checkout
    * orders
    * price
    * products
    * session_cart
    * user_details
    * Please note that a SequalizeMeta, Users, and user_is_seq should also be created with the project. These tables will aid in registering and login in users.
Step 11 - Back in your code editor make sure that you create a .env file. In this file should be PostgreSQL connection using PG_HOST, PG_USER, PG_DATABASE, PG_PASSWORD, PG_PORT. As well as JWT_SECRET which is a random string of number and letters.
Step 12 - In Git Bash run Node app.js. This will start the project. Once the project has started Git Bash will tell you App has started on port 3000
Step 13 - You can use Postman to interact with the API endpoints.

## How to use the project?

This projects has been documented using Swagger. You can access this documentation by opening the documentation folder within the project. You can download Swagger from the following GitHub repository - https://github.com/swagger-api/swagger-editor. You will need to fork the repository to your GitHub account and then clone the repository into your local repository. 

Please do not make any changes to this project as it is a project from a course I am currently on.