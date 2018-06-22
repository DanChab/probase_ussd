const app = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
    res.send('This is a USSD test by ProBase')
})

app.post('*', (req, res) => {
    let {sessionId, serviceCode, phoneNumber, text} = req.body
    if (text == '') {
         // This is the first request. Note how we start the response with CON
         let response = `CON What would you want to check
         1. My Account
         2.My Phone Number`
         res.send(response)
    } else if (text == '1'){
        // Business logic for first level response
        let response = `CON choose information you want to view
        1. Account number
        2. Account balance`
        res.send(response)
    } else if (text == '2') {
        // Business logic for first level response
        let response = `END Your phone number is ${phoneNumber}`
        res.send(response)
    }else if (text == '1*1') {
        // Bussiness logic for first level response
        let AccountNumber = 'ACC1001'
        let response = `END Your account number is ${AccountNumber}`
        res.send(response)
    }else if (text == '1*2') {
        // This is a second level response where the user selected 1 in the first instance
        let balance = 'K 50,000.00'
        // This is a terminal request. Note how we  start the response with END
        let response = `END Your balance is ${balance}`
        res.send(response)
    }else {
        res.status(400).send('Bad resquest')
    }

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})