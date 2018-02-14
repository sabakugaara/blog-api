const Redis = require('ioredis')

const redis = new Redis()

const PREFIX = 'article:'
/**
 * add a new blog
 * @param {Object} blog - new blog
 * @param {string} blog.title - the title of the blog
 * @param {string} blog.content - the content of the blog, is markdown format
 * @param {number} blog.date - create timestamp(ms) of the blog(UTC timezone)
 * @param {url} blog.url - relative link path of the blog, start with `/`
 *
 * @returns {number} id - new blog's id
 */
exports.addAsync = async function ({
  title,
  content,
  date,
  url,
  summary
}) {
  const id = await generateNewArticleIdAsync()

  console.log(title, content, date, url)
  // TODO summary
  const key = `${PREFIX}header:${id}`
  const multi = redis.multi()
  await multi.hset(key, 'title', title)
  .hset(key, 'content', content)
  .hset(key, 'summary', summary || content)
  .hset(key, 'date', date)
  .hset(key, 'url', url)
  .exec()

  return id
}

/**
 * index new blog's create time
 * @param {string} id - blog id
 * @param {number} date - blog's create timestamp
 *
 * @returns {boolean}
 */
exports.indexDateAsync = async (id, date) => {
  const key = `${PREFIX}index:date`
  const count = await redis.zadd(key, 'NX', date * -1, id)
  return count === 1
}

exports.getAsync = async (id) => {
  const key = `${PREFIX}header:${id}`
  const article = await redis.hgetall(key)
  article.date = Number(article.date)
  return article
}

/**
 * @returns {number[]} article ids
 */
exports.pagingByDateAsync = async (limit, offset) => {
  const key = `${PREFIX}index:date`
  const ids = await redis.zrangebyscore(key, '-inf', 0, 'LIMIT', offset, limit)
  return ids
}

/**
 * index blog's comment numbers
 * @param {string} id blog id
 * @param {number} commentNums comment numbers of this blog
 */
exports.incrCommentNumsAsync = async (id, incr = 1) => {
  const key = `${PREFIX}index:comment_count`
  await redis.zincrby(key, incr, id)
}

/**
 * @returns {number} the number of all articles
 */
exports.countAsync = async () => {
  const key = `${PREFIX}index:date`
  const count = await redis.zcard(key)
  return count
}

async function generateNewArticleIdAsync () {
  const articleId = await redis.incr(`${PREFIX}id`)
  return articleId
}
