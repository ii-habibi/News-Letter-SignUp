const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('resourses'))
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', function (req, res) {

    res.sendFile(__dirname + "/index.html")
})

app.post('/',(req, res)=>{
    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data)

    const url = "https://us14.api.mailchimp.com/3.0/lists/8596aa2095"
    const option = {
        method: "post",
        auth: "habib:eafc57dbf940dc1a04a251f661abd05c-us14"
    }
    const request = https.request(url, option,function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html")
        } else{
            res.sendFile(__dirname + '/failure.html')
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
    
})

app.post("/failure",(req, res)=>{
    res.redirect('/')
})

app.listen(3000, function(){
    console.log("Server is Running")
}) 
// API Key 
// eafc57dbf940dc1a04a251f661abd05c-us14

// list ID 
// 8596aa2095