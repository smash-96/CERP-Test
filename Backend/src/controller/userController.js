const pool = require("../db/db_init");
const { v4: uuidv4 } = require("uuid");

const createList = async (req, res) => {
  try {
    const uuid = uuidv4().toString();
    const { title } = req.body;

    if (!title) {
      return res.status(404).send({
        status: 404,
        message: "Title not Found",
      });
    } else {
      await pool.query(
        "INSERT INTO list(id, title, archived, inserted, updated) VALUES($1,$2,$3,$4,$5)",
        [uuid, title, false, new Date(), new Date()]
      );

      const obj = {
        status: 200,
        message: "List Created Successfully",
      };
      return res.status(200).send(obj);
    }
  } catch (error) {
    const obj = {
      status: 400,
      message: error.message,
    };
    return res.status(400).send(obj);
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await pool.query(`SELECT * FROM list`);

    return res.status(200).send({
      status: 200,
      data: {
        todo_lists: lists.rows,
      },
    });
  } catch (error) {
    const obj = {
      status: 400,
      message: error.message,
    };
    return res.status(400).send(obj);
  }
};

const updateList = async (req, res) => {
  try {
    const { title, archived } = req.body;
    const { listId } = req.params;

    if (!title && !archived) {
      return res.status(404).send({
        status: "404",
        message: "Unknown error occurred",
      });
    }

    if (title) {
      const isArchived = await pool.query(
        "SELECT archived FROM list WHERE id=$1",
        [listId]
      );

      if (isArchived === false) {
        await pool.query("UPDATE list SET title=$1, updated=$2  WHERE id=$3", [
          title,
          new Date(),
          listId,
        ]);
      } else {
        return res.status(400).send({
          status: "400",
          message: "Archived List Cannot be Updated",
        });
      }
    } else {
      await pool.query("UPDATE list SET archived=$1, updated=$2  WHERE id=$3", [
        archived === true ? true : false,
        new Date(),
        listId,
      ]);
    }

    return res.status(200).send({
      status: "200",
      message: "List Updated Successfully",
    });
  } catch (error) {
    const obj = {
      status: 400,
      message: error.message,
    };
    return res.status(400).send(obj);
  }
};

const createItem = async (req, res) => {
  try {
    const uuid = uuidv4().toString();
    const data = req.body;

    return res.status(200);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getItems = async (req, res) => {
  try {
    const uuid = uuidv4().toString();
    const data = req.body;

    return res.status(200);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getItem = async (req, res) => {
  try {
    const uuid = uuidv4().toString();
    const data = req.body;

    return res.status(200);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const updateItem = async (req, res) => {
  try {
    const uuid = uuidv4().toString();
    const data = req.body;

    return res.status(200);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  createList,
  getLists,
  updateList,
  createItem,
  getItems,
  getItem,
  updateItem,
};
