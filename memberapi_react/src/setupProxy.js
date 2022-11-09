const { createProxyMiddleware } = require("http-proxy-middleware"); //기능 추가
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
    })
  );
};
