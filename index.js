const express = require('express')
const app = express()
const moment = require('moment')

const options = { "caseSensitive": true, "strict": true }

const genrouter = express.Router([options])

app.use('/genie', genrouter)

var generator = require('generate-password');


function passwordgen(plength, psymbols, plowercase, puppercase, pexcludeSimilarCharacter) {
    var password = generator.generate({
        length: plength,
        symbols: psymbols,
        lowercase: plowercase,
        uppercae: puppercase,
        pexcludeSimilarCharacter: pexcludeSimilarCharacter,
        strict: true
    });
    return password
}

app.get('/', function(req, res)
{
    res.status(404).send("Sorry can't find that!")
    // res.send(passwordgen(12, false, false, false, true))
})


genrouter.get('/user/:id/length/:length/:symbols/:lowercase/:uppercase', function (req, res) {
    let PROFILEID = req.params.id || 0
    let length = req.params.length || 10
    let symbols = req.params.symbols
    let lowercase = req.params.lowercase
    let uppercase = req.params.uppercase
    // let excludeSimCharacters = req.params.esc || "unknown"
    // let exclude = req.params.esx || "unknown"
    res.write(passwordgen(length, symbols, lowercase, uppercase, true))
    res.write('\n')
    res.write(moment().format() + " password generator used by userid: " + (req.params.id || "unkown"))
    res.end()
})
//localhost:3000/genie/user/10/length/50/true/true/true

genrouter.get('/pass', function (req, res) {
    // console.log(moment().format() + " password generator used " + (req.params.id || "unkown"))
    res.write(passwordgen(10, false, false, false, true))
    res.end()
})

// console.log(passwordgen(10, false, false, false, true))

genrouter.get('/pass24', function (req, res){
    res.write(passwordgen(24, true, true, true, false ));
    res.end()
})
app.listen(process.env.PORT || 3000)
