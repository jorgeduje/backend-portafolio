import express from "express";
import config from "./config";
import productsRoutes from "./routes/products.routes";
const cors = require("cors")
const app = express();

app.use(cors())
app.set("port", config.port);
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/products", productsRoutes);


export default app;
