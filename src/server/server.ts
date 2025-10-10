// to read from env file
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import spotifyRoutes from "./routes/spotifyRoutes.js";
import mongoRoutes from "./routes/mongoRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const result = dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());

// using the router for all /api routes
app.use('/api', spotifyRoutes);
app.use('/api', mongoRoutes);
app.use('/api', geminiRoutes);

const CLIENT_DIST_DIR = path.resolve(__dirname, "..");

app.use(
    "/assets",
    express.static(path.join(CLIENT_DIST_DIR, "assets"), {
        immutable: true,
        maxAge: "1y"
    })
);

app.use(express.static(CLIENT_DIST_DIR));

app.get(/^(?!\/api)(?!\/assets\/).+/, (req, res, next) => {
    const accept = req.headers.accept || "";
    if (accept.includes("text/html")) {
        res.sendFile(path.join(CLIENT_DIST_DIR, "index.html"));
    } else {
        next();
    }
});


// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})