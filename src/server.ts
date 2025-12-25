import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./routers/main-router.js";
import { createServer } from "node:http";

const app = express();
const httpServer = createServer(app);

app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', mainRouter)

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server rodando em http://localhost:${PORT}`);
});
