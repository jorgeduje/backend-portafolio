import { getConnection, sql, queries } from "../database";
export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllProducts);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createProduct = async (req, res) => {
  const { name, description } = req.body;
  const { quantity } = req.body;

  if (name == null || description == null || quantity == null) {
    return res
      .status(400)
      .json({ msg: "bad request, por favor llena los campos" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .query(queries.createNewProduct);
    res.json({ name, description, quantity });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id)
    .query(queries.getProductById);
  res.send(result.recordset[0]);
};
export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id)
    .query(queries.deleteProduct);
  res.sendStatus(204);
};
export const getTotalProducts = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getTotalProducts);
  res.json(result.recordset[0][""]);
};

export const updateProductById = async (req, res) => {
  const { name, description, quantity } = req.body;
  const { id } = req.params;

  if (name == null || description == null || quantity == null) {
    return res
      .status(400)
      .json({ msg: "bad request, por favor llena los campos" });
  }

  const pool = await getConnection();
  await pool
    .request()
    .input("name", sql.VarChar, name)
    .input("description", sql.Text, description)
    .input("quantity", sql.Int, quantity)
    .input("id", sql.Int, id)
    .query(queries.updateProductById);

  res.json({ name, description, quantity });
};
