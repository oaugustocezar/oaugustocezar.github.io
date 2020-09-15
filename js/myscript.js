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

    var form = document.getElementById('formulario');
    var username = document.getElementById('username')
    var passwd = document.getElementById('passwd');
    var confpasswd = document.getElementById('confpasswd');
    var name = document.getElementById('fname');
    

    
    form.addEventListener('submit', function() {       
        
        
        if(username.value.length < 3){
            alert('user inválido')
        }else{
            var validate_username = "ok";

        }
        if(passwd.value == confpasswd.value){

            localStorage.setItem(username.value + ' passwd',passwd.value);
            localStorage.setItem(username.value + ' username',username.value);
            var validate_passwd = "ok";           
            
        }else{
            alert('Senhas diferentes');
        } 
        console.log(validate_username);
        if(validate_username == "ok" && validate_passwd == "ok"){
            alert('Usuário cadastrado com Local Storage');
        }
         
      
    });
   
}

function getUserValues(){


    var form = document.getElementById('form_login');
    var username = document.getElementById('username');
    var passwd = document.getElementById('passwd');

    form.addEventListener('submit', function(e){

        var result_username = localStorage.getItem(username.value+' username');
        var result_passwd= localStorage.getItem(username.value+ ' passwd');
        
       if(result_username == username.value){

           if(result_passwd == passwd.value){
               alert('logado');
           }else{
               alert('senha invalida');
           }           
       }else{
           alert('user nao cadastrado');
       }   

        
    });








}




    
    


     



        

       
