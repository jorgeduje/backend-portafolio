
import {sequelize} from "./database/connectionpg";
import app from "./app"

sequelize
  .authenticate()
  .then(() => console.log("database autenticated"))
  .catch((err) => console.log(err));
sequelize
  .sync()
  .then(() => console.log("database syncronized"))
  .catch((err) => console.log(err));

app.listen(app.get("port"))

console.log("server on port", app.get("port"))
