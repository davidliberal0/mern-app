const express = require('express')
const app = express() 
const path = require('path')
const PORT = process.env.PORT || 3500 // server deployment port 


// Allows Express to serve static files
// Serve files such as HTML, CSS, JS, etc. 
app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirnamem, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
