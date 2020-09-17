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
    

    var form = document.getElementById('button');
    var username = document.getElementById('username')
    var passwd = document.getElementById('passwd');
    var confpasswd = document.getElementById('confpasswd');  

    

    form.addEventListener('click', function(){


        if(username.value == ''){

            alert("Email deve ser preenchido");
            
        }else if (username.value.length < 4){

            alert("Email inválido");
            

        }else{

            var validate_username ="ok";
            
        }

        if(passwd.value == ''){
            alert("Senha deve ser preenchida");
        }else if(passwd.value.length < 4){
            alert("Senha inválida");
        }else if(passwd.value == confpasswd.value){
            var validate_passwd = "ok";
            
        }else{
            alert("senhas não coincidem");
        }
        
        
        

        if(validate_username == "ok" && validate_passwd == "ok"){

            var json = axios.post("https://reqres.in/api/register",{
            "email": username.value,
            "password": passwd.value
        })
            .then(function(r){ 

                console.log(r);


                if(r.status == 200){
                    alert("Cadastro realizado com sucesso");                    
                }

                
 
    
            })
            .catch(function(error){   
                
                alert(error);
                
               
            }); 

        }
        

            

    });

    
    
    

    
   
    
    
}

function getUserValues(){


    var form = document.getElementById('button_login');
    var username = document.getElementById('username');
    var passwd = document.getElementById('passwd');

    form.addEventListener('click', function(e){   

        
        
        
        var json = axios.post("https://reqres.in/api/login",{
            "email": username.value,
            "password": passwd.value
        })
            .then(function(r){                


                if(r.status == 200){
                    alert("Login efetuado com sucesso");
                    localStorage.setItem("login", username.value);
                    localStorage.setItem(username.value, r.data.token);                                       
                }               
 
    
            })
            .catch(function(error){   
                
                alert("Credenciais inválidas");
                
               
            }); 

        
    });








}




    
    


     



        

       
