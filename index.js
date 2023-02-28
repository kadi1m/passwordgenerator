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


genrouter.post('/user/:id/:length?/:esc?', function (req, res) {
    let length = req.params.length
    let excludeSimCharacters = req.params.esc || "uknown"
    let exclude = req.params.esx || "unknown"
    console.log(moment().format() + " password generator used " + (req.params.id || "unkown"))
    res.write(passwordgen(10, false, false, false, true))
    res.end()
})

app.listen(3000)