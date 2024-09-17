import express from "express"
import cors from 'cors';
import {route as userRoute} from "./routes/user"
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRoute)

app.listen(3000);