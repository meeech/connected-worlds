// server.js
var livereload = require("livereload");
var server = livereload.createServer({
    originalPath: "http://localhost/connected-worlds"
});
server.watch('/Users/mitch/Sites/connected-worlds');