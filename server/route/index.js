const moment = require('moment')
const express = require('express')

const service = require('../service/index')

const router = express.Router()

router.get('/', async function (req, res) {
  const page = parseInt(req.query.page, 10) || 1
  const data = await service.getArticlesAsync(page)

  const nextPage = data.pagination.nextPage ? ('/?page=' + data.pagination.nextPage) : ''
  const prevPage = data.pagination.prevPage ? ('/?page=' + data.pagination.prevPage) : ''
  const posts = data.articles.map((article) => {
    const date = moment(article.date).format('MMM DD, YYYY')
    article.date = date
    article.url = '/blog' + article.url
    return article
  })
  res.render('index', {
    posts,
    currentPage: page,
    totalPages: data.pagination.pages,
    nextPage,
    prevPage
  })
})

router.get('/blog/*', async function (req, res) {
  const url = '/' + req.params[0]
  const article = await service.getArticleByUrlAsync(url)
  const minutes = Math.ceil(article.content.length / 300)
  // TODO 404
  res.render('blog', {
    content: article.content,
    title: article.title,
    date: moment(article.date).format('MMM DD, YYYY'),
    minutes: minutes + (minutes > 1 ? ' minutes' : ' minute')
  })
})

module.exports = router
