import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/Auth.route.js';
import contactRoutes from './routes/Contact.route.js';
import setupSocket from './socket.js';
import messagesRoutes from './routes/Message.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URl = process.env.DATABASE_URl;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/contacts", contactRoutes)
app.use("/api/messages",messagesRoutes)

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setupSocket(server);

mongoose.connect(DATABASE_URl).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log(error);
});