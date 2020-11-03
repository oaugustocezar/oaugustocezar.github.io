function responsive_menu (){
        var button = document.querySelector(".menu-icon");
        var site = document.querySelector(".content");
        var lista = document.querySelector(".header-container");
        var header = document.querySelector(".header");
        var close = document.querySelector(".close-icon");
        
             button.addEventListener('click',function(){

                site.className = 'esconder';
                lista.className = 'header-container-show';
                header.className ='header_new'
                close.addEventListener('click',function(){
                    lista.className = 'header-container';
                    header.className = 'header';
                    site.className = 'content';
                });
                

        });
}

function search_bar(){

    var close = document.querySelector(".close-icon");

    var header = document.querySelector(".header");

    var search = document.querySelector(".search-icon");

    search.addEventListener('click', function(){

        header.className = 'search-show';

        close.addEventListener('click',function(){

            header.className = 'header';

        });



    });


}


function setUserValues(){
    
    
    var form = document.getElementById('button-cadastro');
    var username = document.getElementById('username')
    var passwd = document.getElementById('passwd');
    var confpasswd = document.getElementById('confpasswd');  

    var verify_user = document.getElementById('username-verify');
    var verify_passwd = document.getElementById("passwd-verify");
    var verify_confpasswd = document.getElementById("confpasswd-verify");
    var validate_username = "";
    var validate_passwd ="";

    username.addEventListener("keyup", function(){

        if(username.value == ''){

            verify_user.innerHTML = "Email deve ser preenchido";           
            
        }else if (validacaoEmail(username)){
            validate_username ="ok";
            verify_user.innerHTML = "";         
            

        }else{

            verify_user.innerHTML = "E-mail inválido";

                       
            
        }


    });

    

    passwd.addEventListener("keyup",function(){

        if(passwd.value == confpasswd.value){
            validate_passwd = "ok";
        }

        if(passwd.value == ''){
            verify_passwd.innerHTML = "Senha deve ser preenchida";   
            verify_confpasswd.innerHTML = "";                    
        }
        if(passwd.value.length < 4){
            verify_passwd.innerHTML = "Senha inválida";
            verify_confpasswd.innerHTML = "";
        }else if(passwd.value == confpasswd.value){
            validate_passwd = "ok";
            verify_passwd.innerHTML = "";
            verify_confpasswd.innerHTML = "";
            
            
        }else if (passwd.value != confpasswd.value){
            verify_confpasswd.innerHTML = "";
            verify_passwd.innerHTML = "";
        }else{
            verify_confpasswd.innerHTML ="";

        }
        


    });
    
    
    
    

    form.addEventListener('click', async function(){

       
        
        console.log(validate_username);
        console.log(username.value);
        console.log(passwd.value);
        console.log(confpasswd.value);
        console.log(validate_passwd);

        if(validate_username == "ok" && validate_passwd == "ok"){
            

            var json = await axios.post("http://localhost:3000/register",{
            "email": username.value,
            "password": passwd.value
        })
            .then(function(r){ 

                

                console.log(r);


                if( r.status == 200){
                    alert("Cadastro realizado com sucesso");   
                    open('login.html');                 
                }

                
 
    
            })
            .catch(function(error){   
                
                console.log(error);
                
               
            }); 

        }

           

            

    });

    
    
    

    
   
    
    
}

function validacaoEmail(field) {
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
    
    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
    
    return true;
    }
    else{
    
    return false;
    }
    }



function getUserValues(){



    


    var form = document.getElementById('button_login');
    var username = document.getElementById('username');
    var passwd = document.getElementById('passwd');
    var verify_user = document.getElementById('verify_username');
    var verify_passwd = document.getElementById("verify_passwd");

    username.addEventListener("keyup",function(){
        if(validacaoEmail(username)){
            verify_user.innerHTML="";            
        }else{
            verify_user.innerHTML="Não é um e-mail válido";

        }             

    });

    passwd.addEventListener("keyup", function(){
        if(passwd.value.length < 3){
            verify_passwd.innerHTML = "Não é uma senha válida";
        }else{

            verify_passwd.innerHTML = "";

        }

    });




    form.addEventListener('click', function(e){        

        
        
        
        var json = axios.post("http://localhost:3000/login",{
            "email": username.value,
            "password": passwd.value
        })
            .then(function(r){                


                if(r.status == 200){
                    alert("Login efetuado com sucesso");
                    localStorage.setItem("login", username.value);
                    localStorage.setItem(username.value, r.data.token);  
                    open('index.html');                                     
                }               
 
    
            })
            .catch(function(error){   
                
                
                
               
            }); 

        
    });



    








}


function verify_login(){

    var sair = document.getElementById("sair");
    var login_menu = document.getElementById("login_information");
    var login = localStorage.getItem("login");


    if(login == null){
        login_menu.innerHTML="";
        sair.innerHTML="";


    }else{
        login_menu.innerHTML="<li>"+login+"</li>";   
        
        


        sair.addEventListener('click', function(e){

            localStorage.clear();
            login_menu.innerHTML="";
            location.reload();


        });

    }

    
        
    


}

function search_api(){


    var login = localStorage.getItem("login");
    var search = document.getElementById('search');
    var button = document.getElementById('button_api');
    var p = document.getElementById('result');
    

    if(login == null){
        var li = document.createElement('li');
        li.innerHTML ="Necessário estar logado para acessar pesquisa. Faça agora o "+"<a href="+"login.html"+">Login</a>";
        p.appendChild(li);


    }else{
        button.addEventListener('click', function(){
            axios.get("https://calendarific.com/api/v2/holidays?&api_key=bb433f717e522421e7b553183371f2c27a83feae&country=BR&year="+search.value.substring(0,4))
                .then(function(res){
                    console.log(res.data.response.holidays)
                    let docs = res.data.response.holidays;
                    var i =0;
                    var control=0;
                    for(i; i < docs.length; i++){
                        
                        if(docs[i].date.iso==search.value){
                            
    
                            var li = document.createElement('li');
                            li.innerHTML = "Date: "+docs[i].date.iso+"<br>"+"Name: "+ docs[i].name+"<br>" + "Description: "+docs[i].description+"<br>"+ "Country: "+docs[i].country.name+"<br>";
                                              
                            p.appendChild(li);                         
                            
    
    
                        }else{
    
                            control ++;
                        
                        }  
                        
                        
    
                        
                    }
    
                
                if(control == i ){
                    var li = document.createElement('li');
                    li.innerHTML ="não encontrado";
                                      
                    p.appendChild(li);    
    
                }
    
                           
                    
                    
                });
    
    
    
    
        });

    }

    
    
   



    


 

    




}



    
    


     



        

       
