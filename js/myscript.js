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
        

       
