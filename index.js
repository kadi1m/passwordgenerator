const express = require('express')
const app = express()
// const moment = require('moment')

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
    res.redirect('genie/pass')
    // res.send(passwordgen(12, false, false, false, true))
})


// genrouter.post('/user/:id/:length?/:esc?', function (req, res) {
//     let PROFILEID = req.params.id
//     let length = req.params.length
//     let excludeSimCharacters = req.params.esc || "uknown"
//     let exclude = req.params.esx || "unknown"
//     res.write(passwordgen(10, false, false, false, true))
//     res.write(moment().format() + " password generator used " + (req.params.id || "unkown"))
//     res.end()
// })

genrouter.get('/pass', function (req, res) {
    console.log(moment().format() + " password generator used " + (req.params.id || "unkown"))
    res.write(passwordgen(10, false, false, false, true))
    res.end()
})

console.log(passwordgen(10, false, false, false, true))

genrouter.get('/pass24', function (req, res){
    res.write(passwordgen(24, true, true, true, false ));
    res.end()
})
app.listen(process.env.PORT || 3000)
