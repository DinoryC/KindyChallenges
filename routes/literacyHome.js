import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('/literacy/literacyHome.ejs');
});

export default router;