const Promise = require('bluebird')
const express = require('express')
const router = express.Router()

router.get('/', async function (req, res) {
  const {name} = req.query
  await Promise.delay(1000)

  res.render('index', {name})
})

module.exports = router
