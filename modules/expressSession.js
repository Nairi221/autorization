const session = require('express-session');
const redisStorage = require('connect-redis')(session);

const host = 'localHost';
session({
    store: new redisStorage({
        host: host,
        port: 6379,
        client: client,
    }),
    secret: 'you secret key',
    saveUninitialized: true,
})


app.post('/ad', (req, res) => {
    if (!req.session.key) req.session.key = req.sessionID

    req.session.key[req.sessionID].showAd = req.body.showAd
    res.sendStatus(200)
})

app.get('/', (req, res) => {
    console.log(req.session.key[req.sessionID].showAd)
    res.sendStatus(200)
})


module.exports = session;