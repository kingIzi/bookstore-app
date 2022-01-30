//Imports
const express = require("express")
const app = express()
const PORT = 3000

//Static files
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/images',express.static(__dirname + 'public/images'))
app.use('/js',express.static(__dirname + 'public/js'))

//Set Views
app.set('views','./views')
app.set('view engine','ejs')

//Index page
app.get('',(req,res) => {
    res.render('index')
})

//Listen on port 3000
app.listen(PORT, () => console.info(`Listening on port ${PORT}`))