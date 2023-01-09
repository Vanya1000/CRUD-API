import Application from './../src/server/Application';
import middlewareBodyParser from './../src/server/middlewares/bodyParser';
import middlewareJsonParser from './../src/server/middlewares/parseJson';
import userRouter from './../src/users/userRouter';

const app = new Application();

app.use(middlewareBodyParser)
app.use(middlewareJsonParser);

app.addRouter(userRouter);

export default app;
