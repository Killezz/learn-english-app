const database = require("../database/db");
const express = require("express");
const Validator = require("jsonschema").Validator;
const validator = new Validator();

const translationSchema = {
  type: "object",
  properties: {
    english: { type: "string", minLength: 1, maxLength: 30 },
    finnish: { type: "string", minLength: 1, maxLength: 30 },
  },
  required: ["english", "finnish"],
};

const translationEditSchema = {
  type: "object",
  properties: {
    english: { type: "string", minLength: 1, maxLength: 30 },
    finnish: { type: "string", minLength: 1, maxLength: 30 },
  },
  anyOf: [{ required: ["english"] }, { required: ["finnish"] }],
};

const translationsRouter = express.Router();
translationsRouter.use(express.json());

translationsRouter.get("/", (req, res) => {
  database.findAll().then((locations) => res.json(locations));
});

translationsRouter.delete("/:myId([0-9]+)", (req, res) => {
  const id = parseInt(req.params.myId);
  database
    .deleteById(id)
    .then((message) => {
      res.json(message);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

translationsRouter.post("/", (req, res) => {
  const validation = validator.validate(req.body, translationSchema);
  if (validation.errors.length > 0) {
    res.status(400).json(validation.errors);
  } else {
    database
      .save(req.body)
      .then((translation) => res.status(201).json(translation));
  }
});

translationsRouter.patch("/:myId([0-9]+)", (req, res) => {
  const id = parseInt(req.params.myId);
  const validation = validator.validate(req.body, translationEditSchema);
  if (validation.errors.length > 0) {
    res.status(400).json(validation.errors);
  } else {
    database
      .editById(id, req.body)
      .then((message) => {
        res.json(message);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
});

module.exports = translationsRouter;
