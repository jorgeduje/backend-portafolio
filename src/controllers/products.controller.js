import { Products } from "../models/model.products";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll({ where: { status: "active" } });
    res.status(200).json({
      status: "success",
      data: {
        products: products,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req, res) => {
  const { name, description, quantity } = req.body;

  // if (name == null || description == null || quantity == null) {
  //   return res
  //     .status(400)
  //     .json({ msg: "bad request, por favor llena los campos" });
  // }

  const newProduct = await Products.create({
    name,
    description,
    quantity,
  });

  res.status(201).json({ status: "succes", data: newProduct });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Products.findOne({
    where: { id: id, status: "active" },
  });
  if (!product) {
    res.status(404).json({ status: "error", msg: "id not found" });
  }
  res.status(201).json({ status: "succes", data: { product } });
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  const currentProduct = await Products.findOne({
    where: { id: id, status: "active" },
  });

  if (!currentProduct) {
    res.status(404).json({status: "error", msg: "id not found"})
    return
  }

  await currentProduct.update({status: "deleted"})
  res.status(204).json({status: "success"})


};

export const getTotalProducts = async (req, res) => {
  try {
    const products = await Products.findAll({ where: { status: "active" } });
    res.status(200).json({
      status: "success",
      data: {
        totalCount: products.length,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProductById = async (req, res) => {
  
  const { id } = req.params;

  const currentProduct = await Products.findOne({
    where: { id: id, status: "active" },
  });

  if (!currentProduct) {
    res.status(404).json({status: "error", msg: "id not found"})
    return
  }

  await currentProduct.update({
    ...currentProduct,
    ...req.body
  })
  res.status(204).json({status: "success"})

};

