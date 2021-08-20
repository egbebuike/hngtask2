//const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");
const fs  = require("fs");
const http = require("http");
const path = require("path")
const { parse } = require('querystring');
var qs = require('querystring');

const port = process.env.PORT || 3000

const server = http.createServer((request, response) => {
    if(request.url === "/submit" && request.method  === "POST"){
        /*
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            console.log(" nnn   ", parse(body));
        });
        */
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            //var post = qs.parse(body);

            const post = JSON.parse(JSON.stringify(body))
            console.log(post)


        });

        //console.log(request.body)
        response.writeHead(200, {'Content_Type': "text/css"})
        response.end("Your Input has been noted")

    }else if (request.url === "/submit" ){
        response.writeHead(200, {'Content_Type': "text/css"})
        response.end("Go back to the home page please")
    }
    
    let filepath = path.join(__dirname, "public", request.url === '/'? 'index.html': request.url)
    let contentType  = getContentType(filepath) || 'text/html'
    if(request.url === "/") toggler = 1;

    
    let emptypagepath = path.join(__dirname, "public", "404.html")
    fs.readFile(filepath, (err, content) => {
        if (err){
            if (err.code === 'ENOENT'){
                fs.readFile(emptypagepath, 'utf8', (err, content) => {
                    response.writeHead(200, {'Content-Type': contentType})
                })
            }
            else{
                response.writeHead(500)
                response.end("A server error has occured")
            }
        }
        if (!err){
            response.writeHead(200, {'Content_Type': contentType})
            response.end(content)
        }
    })

});

const getContentType = (filepath) => {
    let extname = path.extname(filepath)
    if (extname === ".js"){
        return 'text/javascript'
    }
    if (extname === '.css'){
        return 'text/css'
    }
    if (extname === ".jpg"){
        return "image/jpg"
    }
    if(extname === '.png'){
        return 'image/png'
    }
}

server.listen(port, '127.0.0.1')
console.log(`server is running on port ${port}`)
