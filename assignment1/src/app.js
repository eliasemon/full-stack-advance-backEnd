const express = require("express");
const cors = require("cors");
const {
  generateFakeProfile,
  countChars,
  generateRandomNumber,
} = require("./services");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/char-counter/:text", (req, res) => {
  try {
    const str = req.params.text?.trim();

    if (!str || str.length < 0) throw new Error("Invalid query params!");

    res.status(200).json({
      result: countChars(str),
    });
  } catch (err) {
    res.status(422).json({
      message: err.message,
    });
  }
});

app.get("/person-maker", (req, res) => {
  try {
    const { properties } = req.query;
    const params = properties.split(",").map((item) => item.toLowerCase());

    if (!params.length > 0) throw new Error("Please select a parameter");

    res.status(200).json({
      params,
      profile: generateFakeProfile(params),
      route: req.originalUrl,
    });
  } catch (err) {
    res.status(422).json({
      message: err.message,
    });
  }
});

app.get("/random", (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start && !end) {
      throw new Error("Invalid Query Params!");
    }
    res.status(200).json({
      start,
      end,
      result: generateRandomNumber(Number(start), Number(end)),
      route: req.originalUrl,
    });
  } catch (err) {
    res.status(422).json({
      message: err.message,
    });
  }
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
