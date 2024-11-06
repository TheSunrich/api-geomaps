import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  res.status(200).json({ message: "successful" });
});

module.exports = router;
