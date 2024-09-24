
const http = require('http')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer((req, res)=>{

    if(req.method === 'GET'){
        //http://localhost:9000/?username=Dineshkumar&email=sendmail2dk%40gmail.com&password=12345&confirmPassword=12345
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(`<center>GET method is servered</center>`)

        const parsedURL = url.parse(req.url, true)

        const {name,uname,email, password,phone} = parsedURL.query

        res.write(`<center>`)
        res.write(`<strong>Name: </strong> <i>${name}</i><br>`)
        res.write(`<strong>Username: </strong> <i>${uname}</i><br>`)
        res.write(`<strong>Email: </strong> <i>${email}</i><br>`)
        res.write(`<strong>Password: </strong> <i>${password}</i><br>`)
        res.write(`<strong>Phone: </strong> <i>${phone}</i><br>`)
        res.write(`</center>`)

        res.end()
    }
    else if(req.method === 'POST'){
        //http://localhost:9000/
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(`<center>POST method is servered</center>`)

        let inputs = ""

        req.on('data', chunk=>{
          inputs += chunk.toString()
        })

        req.on('end', ()=>{
            const {name,uname, email, password,phone} = querystring.parse(inputs)

            res.write(`<center>`)
            res.write(`<strong>Name: </strong> <i>${name}</i><br>`)
            res.write(`<strong>Username: </strong> <i>${uname}</i><br>`)
            res.write(`<strong>Email: </strong> <i>${email}</i><br>`)
            res.write(`<strong>Password: </strong> <i>${password}</i><br>`)
            res.write(`<strong>Phone: </strong> <i>${phone}</i><br>`)
            res.write(`</center>`)
            
            res.end()
        })        
    }
    else{
        res.writeHead(405, {'Content-Type': 'text/html'})
        res.write(`<center>Invalid Method</center>`)
        res.end()
    }

})


server.listen(7000, ()=>{
    console.log("Server is running @ http://localhost:9000")
})