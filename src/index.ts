import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import multer from 'multer';
import { connectDB } from './config/db';
import log from './logger';
import initWebRoutes from './routes';
import { DestinationCallback, FileNameCallback } from './utils';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URL_CLIENT = process.env.URL_CLIENT as string;

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
    cb(null, 'src/assets/upload/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    const ext = file.originalname.split('.');
    const newExt = ext[ext.length - 1];
    cb(null, `${Date.now()}.${newExt}`);
  },
});

const upload = multer({ storage: storage });

app.use(express.static(__dirname + '/assets/upload'));
app.use(
  cors({
    origin: URL_CLIENT,
    methods: ['GET, POST, OPTIONS, PUT, PATCH, DELETE'],
    credentials: true,
    exposedHeaders: ['Set-cookie'],
    maxAge: 86400,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(upload.array('files'));

app.post('/api/admin/upload', (req: Request, res: Response) => {
  const tempFile = req.files;

  if (tempFile && tempFile.length > 0) {
    // @ts-ignore
    res.json(req.files[0]);
  }
});

initWebRoutes(app);
connectDB();

app.listen(PORT, () => {
  log.info(`SERVER LISTEN ON http://localhost:${PORT}`);
});
