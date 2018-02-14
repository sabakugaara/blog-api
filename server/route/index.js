const Promise = require('bluebird')
const express = require('express')
const router = express.Router()

router.get('/', async function (req, res) {
  await Promise.delay(1000)

  res.render('index', {
    posts: [{
      date: 'Jul 11, 2015',
      href: '/jekyll/pixyll/2015/07/11/announcing-pixyll-version-2/',
      title: 'Announcing Version 2.0',
      summary: 'Now, Pixyll is lighter weight and more customizable than before.'
    }],
    currentPage: 2,
    totalPages: 3,
    nextPage: '/page3',
    prevPage: '/page1'
  })
})

module.exports = router
