import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import homepageRoutes from './routes/homepage.js';
import literacyHomeRoutes from './routes/literacyHome.js';
import numeracyHomeRoutes from './routes/numeracyHome.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static("public"));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homepageRoutes);
app.use('/literacyHome', literacyHomeRoutes);
app.use('/numeracyHome', numeracyHomeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
