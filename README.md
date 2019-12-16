<p align="center">
  <a href="https://github.com/lauirvin/weather-api">
    <img alt="logo" src="https://i.imgur.com/vYbslHB.png" width="150" />
  </a>
</p>
<h1 align="center">
  Weather API
</h1>

Weather API built with NodeJS, Express, JWT, Mongoose.

## 🧰 Prerequisites

1. Install NodeJS https://nodejs.org/en/
2. Install dependencies `npm install`

## 🚀 Deployment

### Development

1. Locate the repository in bash
2. Run `npm install` in the repo folder
3. Run `node index` (OR `nodemon index` for hot reloading) in the repo folder
4. Open Postman (or similar application) and send `GET` request to http://localhost:8080/

#### Docker

1. Locate the repository in bash
2. Run `docker build -t weather-api . ` to build image
3. Run `docker run -p PORT:8080 -d weather-api` to run image to container
4. Run `docker ps` to verify if image is running
5. Open Postman (or similar application) and send `GET` request to http://0.0.0.0:PORT/

### 🧩 Usage

1. Send `GET` request to `/login` to retrieve authorization token (`<access_token>`)
2. Send `GET` request to `/weather` with a header key `Authorization` with the value `Bearer <access_token>`

## 👷 Built With

- [NodeJS](https://nodejs.org/) - Javascript runtime environment
- [Express](https://expressjs.com/) - NodeJS web framework
- [JWT](https://jwt.io/) - JSON Web Token library
- [Mongoose](https://mongoosejs.com/) - MongoDB Object Data Modeling (ODM) library 
- [OpenWeatherAPI](https://openweathermap.org/) - Data API

## 📚 Author

- **Irvin Ives Lau** - [lauirvin](https://github.com/lauirvin)
- https://www.irviniveslau.com
