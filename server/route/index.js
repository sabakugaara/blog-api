const moment = require('moment')
const express = require('express')

const service = require('../service/index')

const router = express.Router()

router.get('/', async function (req, res) {
  const page = req.query.page || 1
  const data = await service.getArticlesAsync(page)

  const nextPage = data.pagination.nextPage ? ('/?page=' + data.pagination.nextPage) : ''
  const prevPage = data.pagination.prevPage ? ('/?page=' + data.pagination.prevPage) : ''
  const posts = data.articles.map((article) => {
    const date = moment(article.date).format('MMM DD, YYYY')
    article.date = date
    return article
  })
  res.render('index', {
    posts,
    currentPage: page,
    totalPages: data.pagination.count,
    nextPage,
    prevPage
  })
})

module.exports = router
