// /*----------------jsonServer---------*/
// /*引入json-server*/
// const jsonServer = require('json-server')
// /*搭建一个server*/
// const apiServer = jsonServer.create()
// /*将db.json关联到server*/
// const db = require('./router')
// const apiRouter = jsonServer.router(db)
// const middlewares = jsonServer.defaults()
// apiServer.use(middlewares)
// apiServer.use(apiRouter)
// /*监听端口*/
// apiServer.listen(3000, () => {
//   console.log('3000 is running')
// })
