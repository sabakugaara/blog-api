module.exports = {
  get: async (req, res) => {
    const {name} = req.query
    await sleep(1000)
    res.send(`hello ${name}!`)
  }
}

async function sleep (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve()
    }, time)
  })
}
