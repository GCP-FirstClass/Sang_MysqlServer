const express = require('express');
const mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: 'quizlist',
    port: 3306
});

let app = express();
function getRandomInt(min, max) { //min ~ max 사이의 임의의 정수 반환
    return Math.floor(Math.random() * (max - min)) + min;
}

app.set('port', process.env.PORT || 3330);

app.get('/quizlist', (req,res) => {
    con.query('SELECT * FROM quizlist', (err, rows) => {
        if(err) throw err;
        let num = getRandomInt(0, rows.length());
        res.json(rows[num]);
    });
});

app.listen(app.get('port'), () => {
    console.log('app.js/open-server:22', app.get('port'));
});