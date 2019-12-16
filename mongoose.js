const mongoose = require("mongoose");

// Set up default mongoose connection
const url = "mongodb://127.0.0.1/db";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(url, options, (err, db) => {
  if (err) throw err;
  console.log("Database connected!");
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "connection error:"));

// Open DB
db.once("open", () => {
  console.log("Database openend!");
});

// Schema configurations
const weatherSchema = new mongoose.Schema({
  coord: {
    lon: Number,
    lat: Number
  },
  weather: [
    {
      id: Number,
      main: String,
      description: String,
      icon: String
    }
  ],
  base: String,
  main: {
    temp: Number,
    feels_like: Number,
    temp_min: Number,
    temp_max: Number,
    pressure: Number,
    humidity: Number
  },
  visibility: Number,
  wind: {
    speed: Number,
    deg: Number
  },
  clouds: {
    all: Number
  },
  dt: Number,
  sys: {
    type: { type: Number },
    id: Number,
    country: String,
    sunrise: Number,
    sunset: Number
  },
  timezone: Number,
  id: Number,
  name: String,
  cod: Number
});

const Weather = mongoose.model("Weather", weatherSchema);

async function insertData(data) {
  await Weather.create(data);
  console.log("data inserted!");
}

async function findData() {
  return await Weather.find();
}

function clearDB() {
  Weather.collection.drop();
}

module.exports = {
  insertData: insertData,
  findData: findData,
  clearDB: clearDB
};
