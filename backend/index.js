import express from "express";
import dotenv from "dotenv";
import pasteRoutes from "./routes/pasteRoutes.js";
import { connectMongo } from "./db/mongo.js";
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors({
    origin: "https://mernpastebin-production1.onrender.com"
}));

app.use(express.json());

connectMongo();

app.use("/api", pasteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
