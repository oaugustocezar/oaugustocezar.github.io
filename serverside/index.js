const { error } = require('console');
let http = require('http'),
    path = require('path')
    express = require('express'),
    app = express(),
    multer = require('multer'),
    expect = require('expect'),
    cors = require('cors'),
    formidable = require('formidable'),
    session = require ('express-session'),
    userDAO = require('./model/users'),
    fs = require('fs'),
    
    newsDAO = require('./model/content');

    const upload = multer({ dest: "uploads/" });

    var sess;

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
app.use( session({
    secret: 'super secret session key',
    resave: true,
    saveUninitialized: true,
    cookie: {secure:false}

}));

app.use(express.json());



app.get('/users', async (req, res) => {

   // console.log(req.session.email);

    res.render('news.hbs');

    
           
    //users = await userDAO.find();      
    
    //res.json(users);
    
});


app.post('/news', upload.single("img"), async (req,res)=>{

    const title = req.body.title;
    const content = req.body.content;
    const autor = sess.email;

    console.log(autor);

    const news = await newsDAO.insert(autor,title,content);   
    

    
    res.status(200).json({"mensagem": "Mensagem postada com sucesso"});



});

app.get('/shownews', async (req, res)=>{
    
    const autor = sess.email;
    console.log(autor);

    const news = newsDAO.find(autor);

    res.json(news);

    //console.log(news.title);

    //res.render('showposts', {title: news.title });

});



app.post('/login', async (req,res,next)=>{
    const email = req.body.email; 
    const senha = req.body.password; 
   // console.log(email);  
   // console.log(senha);  
    sess = req.session; 
    
    const user = await userDAO.find(email);
    
    if(user.length == 1){
        if(user[0].email == email && user[0].senha == senha){
            sess.email = email;
            console.log(sess.email);
            
            res.status(200).json({"mensagem": "Login efetuado com sucesso"});
            
       }else{
            return res.status(400).json({"mensagem": "senha incorreta"});

       }

    }else{
        return res.status(400).json({"mensagem": "usuario não cadastrado"});

   }     
  
});

app.get('/', (req,res)=>{

    //console.log(req.session);
    
    if(sess){
        res.render('news.hbs');
    }else{
        res.end("usuario não logado");
    }

});

app.get('/logout',(req,res)=>{

    sess=false; 
    
    res.end('logout efetuado');

});


app.post('/register', async (req,res)=>{
    
    const email =  req.body.email;
    const senha =  req.body.password
    console.log(email);


    const userEmail  = await userDAO.find(email);
    //console.log(userEmail.length);
    if(userEmail.length>0){
        
       return res.status(400).json({'error': 'Email já registrado'});
       
        
       }

    const user = await userDAO.insert(email, senha);
    return res.status(200).json({"mensagem": "Cadastro sucedido"});

       

    
         
         

        
    
    
    
    

});












app.listen(3000);