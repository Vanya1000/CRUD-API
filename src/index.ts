import Application from "./server/Application.js";
import middlewareJsonParser from './server/middlewares/parseJson.js';
import middlewareBodyParser from './server/middlewares/bodyParser.js';
import userRouter from "./users/userRouter.js";
import 'dotenv/config';

const PORT = process.env.PORT;

const app = new Application();

app.use(middlewareBodyParser)
app.use(middlewareJsonParser);

app.addRouter(userRouter);

const start =  () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();