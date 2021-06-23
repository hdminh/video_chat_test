const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:8080",
//       changeOrigin: true,
//     })
//   );
  app.use("/final-project-togethers-app.appspot.com",
  createProxyMiddleware({
      target: "https://storage.googleapis.com",
      changeOrigin: true,
  }))
}