# Learn English App

![Learn English App](https://i.gyazo.com/534f9e61553dcbb24bef399773675de9.png)

Full-stack Learn English App that has frontend built with React and backend with Node.js. On "Learn English" page you will type correct answers for either finnish or english translation and after checking answers it shows you total score and also correct answers for rows that were wrong. On dashboard you can add new translation pairs to database and also edit and delete them. Frontend also scored 100/100 on Google Lighthouse accessibility test.

### Built With

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## Getting Started

To get a local copy up and running follow these simple steps.

1. Set up database
   ```sql
   CREATE TABLE translations (
       id INT AUTO_INCREMENT PRIMARY KEY,
       english VARCHAR(255),
       finnish VARCHAR(255)
   );
   ```
2. Clone the repo
   ```sh
   git clone https://github.com/Killezz/react-tasks-app.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create ".env" file in root directory and set database variables
   ```sh
   DB_HOST="DB HOST ADDRESS"
   DB_USER="DB USER"
   DB_PASSWORD="DB PASSWORD"
   DB_DATABASE="DB DATABASE NAME"
   ```
5. Run frontend and backend concurrently
   ```sh
   npm run dev:start
   ```

## Screencast

[https://www.youtube.com/watch?v=2Gi3m_J2aZQ](https://www.youtube.com/watch?v=2Gi3m_J2aZQ)
