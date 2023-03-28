const express = require('express');
const { get } = require('../model/recipes');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await get();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
