const express = require('express')
const path = require('path')
const app = express()
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

console.log('process.env')
console.log(process.env)
console.log(process.env.FIREBASE_DATABASE_URL)

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log('Server is up ') 
})
