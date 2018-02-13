const path = require('path')

const ruo = require('ruo')
const mustache = require('mustache-express')

const router = require('./route')

const port = 8080

async function main () {
  const app = await ruo.createApplicationAsync()

  app.engine('html', mustache())
  app.set('view engine', 'html')
  app.set('views', path.join(__dirname, '/view'))

  app.use(ruo.getRestMiddleware())
  app.use(router)

  app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`)
  })
}

main().catch((err) => {
  console.log(err.stack)
  process.exit(1)
})
