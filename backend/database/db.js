require("dotenv").config();
const mysql = require("mysql");
const Validator = require("jsonschema").Validator;
const validator = new Validator();

const idSchema = {
  type: "number",
  minimum: 0,
};

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
};

let connectionPool;

const connectionFunctions = {
  connect: async () => {
    return new Promise((resolve, reject) => {
      connectionPool = mysql.createPool(config);
      connectionPool.getConnection((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  close: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  save: async (translation) => {
    return new Promise((resolve, reject) => {
      connectionPool.query(
        "INSERT INTO translations (english, finnish) VALUES (?, ?)",
        [translation.english, translation.finnish],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({ message: `new translation pair saved` });
          }
        }
      );
    });
  },
  findAll: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.query(
        "SELECT * FROM translations;",
        (err, translations) => {
          // Error handling
          if (err) {
            reject(err);
          } else {
            resolve(translations);
          }
        }
      );
    });
  },
  editById: async (id, newValues) => {
    return new Promise((resolve, reject) => {
      const validation = validator.validate(id, idSchema);
      if (validation.errors.length > 0) {
        resolve(validation.errors);
      } else {
        const updateFields = { ...newValues };
        connectionPool.query(
          "UPDATE translations SET ? WHERE id = ?",
          [updateFields, id],
          (err, result) => {
            // Error handling
            if (err) {
              reject(err);
            } else if (result.affectedRows > 0) {
              resolve({ message: `translation pair edited by id ${id}` });
            } else {
              reject({
                message: `could not edit translation pair by id ${id}`,
              });
            }
          }
        );
      }
    });
  },
  deleteById: async (id) => {
    return new Promise((resolve, reject) => {
      const validation = validator.validate(id, idSchema);
      if (validation.errors.length > 0) {
        resolve(validation.errors);
      } else {
        connectionPool.query(
          "DELETE FROM translations WHERE id = ?",
          [id],
          (err, result) => {
            // Error handling
            if (err) {
              reject(err);
            } else if (result.affectedRows > 0) {
              resolve({ message: `translation pair deleted by id ${id}` });
            } else {
              reject({
                message: `could not delete translation pair by id ${id}`,
              });
            }
          }
        );
      }
    });
  },
};

module.exports = connectionFunctions;
