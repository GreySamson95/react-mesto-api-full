/* eslint-disable quotes */
/* eslint-disable quote-props */
const router = require('express').Router();

// eslint-disable-next-line arrow-body-style
router.use('/*', (req, res) => {
  return res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

module.exports = router;
