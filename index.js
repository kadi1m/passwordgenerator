const express = require('express')
const app = express()
const moment = require('moment')
const cors = require('cors'); // ✅ ADD THIS

const options = { "caseSensitive": true, "strict": true }

const genrouter = express.Router([options])

const allowedOrigins = [
    '192.168.1.112',
    'http://192.168.1.112:3000'
];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('❌ Not allowed by CORS'));
//     }
//   }
// }));
app.use(cors())

app.use('/genie', genrouter)

var generator = require('generate-password');


function passwordgen(plength, pnumbers, psymbols, plowercase, puppercase, pexcludeSimilarCharacter) {
    var password = generator.generate({
        length: plength,
        numbers: pnumbers,
        symbols: psymbols,
        lowercase: plowercase,
        uppercase: puppercase,
        excludeSimilarCharacters: pexcludeSimilarCharacter,
        exclude: '/"$`',
        strict: true
    });
    return password
}

app.get('/', function (req, res) {
    res.status(404).send("Sorry can't find that!")
    // res.send(passwordgen(12, false, false, false, true))
})

app.get('/health', function (req, res) {
    res.status(200).json({
        status: 'healthy',
        timestamp: moment().format(),
        uptime: process.uptime()
    })
})


// genrouter.get('/user/:id/length/:length/:symbols/:lowercase/:uppercase', function (req, res) {
//     let PROFILEID = req.params.id || 0
//     let length = req.params.length || 10
//     let symbols //req.params.symbols
//     let lowercase //req.params.lowercase
//     let uppercase //req.params.uppercase
//     if (req.params.symbols === "true") {
//         symbols = true
//     }else {
//         symbols = false
//     }
//     if (req.params.lowercase === "true") {
//         lowercase = true
//     }else {
//         lowercase = false
//     }
//     if (req.params.uppercase === "true") {
//         uppercase = true
//     }else {
//         uppercase = false
//     }
//     // let excludeSimCharacters = req.params.esc || "unknown"
//     // let exclude = req.params.esx || "unknown"
//     res.write(passwordgen(length, symbols, lowercase, uppercase, true))
//     res.write('\n')
//     res.write(moment().format() + " password generator used by userid: " + (req.params.id || "unkown"))
//     res.end()
// })
//localhost:3000/genie/user/10/length/50/true/true/true

genrouter.get('/pass/:length', function (req, res) {
    let length = req.params.length
    // console.log(length)
    if (length.length > 4) {
        length = 512
    }
    console.log(length.length)
    console.log(length)
    // console.log(moment().format() + " password generator used " + (req.params.id || "unkown"))
    res.write(passwordgen(length, false, false, true, true, true))
    res.end()
})
app.listen(process.env.PORT || 3000)
