const Article = require('../model/article')

exports.addNewArticleAsync = async function ({title, content, url}) {
  // TODO utc timezone
  const date = Date.now()
  const articleId = await Article.addAsync({
    title,
    content,
    url,
    date
  })

  // TODO log index failed
  await Article.indexDateAsync(articleId, date)
}

/**
 * get articles
 * @param {number} page
 * @param {string} orderBy order field, now only support date
 * @param {string} order asc or desc, now only support desc
 *
 * @returns {Object} data {articles: [], pagination: {nextPage: ,  prevPage: , count: }}
 */
exports.getArticlesAsync = async function (page = 1, orderBy = 'date', order = 'desc', perPage = 10) {
  const count = await Article.countAsync()
  const limit = perPage
  const offset = (page - 1) * perPage
  const pages = Math.ceil(count / perPage)

  const nextPage = page < pages - 1 ? page + 1 : false
  const prevPage = page - 1 > 0 ? page - 1 : false

  const ids = await Article.pagingByDateAsync(limit, offset)

  const articles = []
  for (let index = 0; index < ids.length; index++) {
    const article = await Article.getAsync(ids[index])
    articles.push(article)
  }

  return {
    articles,
    pagination: {
      nextPage,
      prevPage,
      count
    }
  }
}
