import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors'
import githubRoutes from "./routes/github.route"
import userRoutes from "./routes/user.route"
import wallpaperRoutes from "./routes/wallpaper.route"
import { userCreateAndDelete } from "./utils/clerkWebhook";

dotenv.config();
const app = express();
const clietUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({
    origin: clietUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Apply express.json() middleware to all routes EXCEPT the webhook route
app.use((req, res, next) => {
    if (req.path === '/api/webhooks') {
        return next();
    }
    express.json()(req, res, next);
});

app.use(urlencoded({ extended: true }));

// Webhook route with raw body parser
app.post(
    "/api/webhooks",
    bodyParser.raw({ type: "application/json" }),
    userCreateAndDelete
);

app.use('/api/v1/github', githubRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/wallpaper', wallpaperRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));