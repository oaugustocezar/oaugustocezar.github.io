let http = require('http'),
    path = require('path')
    express = require('express'),
    app = express(),
    cors = require('cors'),
    userDAO = require('./model/users');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'view'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.json());

app.get('/users', async (req, res) => {

    const busca = req.query.busca;
           
    users = await userDAO.find(busca);      
    
    res.json(users);
    
});


app.post('/register', async (req,res)=>{
    const email =  req.body.email;
    const senha =  req.body.password
    
    const user = await userDAO.insert(email, senha);
    res.json({ok:true});

});


app.post('/login', async(req,res)=>{
    const email = req.body.email; 
    const senha = req.body.password;
    console.log(email);
    console.log(senha);
    const user = await userDAO.find(email,senha);
    res.json({ok:true});
})


app.listen(3000);