const ruo = require('ruo')
const port = 8080

async function main () {
  const app = await ruo.createApplicationAsync()

  app.use(ruo.getRestMiddleware())

  app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`)
  })
}

main().catch((err) => {
  console.log(err.stack)
  process.exit(1)
})
