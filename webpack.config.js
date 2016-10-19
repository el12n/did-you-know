module.exports = {
  entry: [
    "./public/app.js", 
    "./public/controllers/main.js", 
    "./public/directives/loader.js", 
    "./public/services/core-service.js", 
    "./public/services/language-service.js",
  ],
  output: {
    path: __dirname,
    filename: "./public/views/assets/js/bundle.js"
  },
  watch: true
}