/*
    request.js 는 사용자가 입력을 하고 엔터를 누르는 경우 서버에 요청을 보낼 수 있도록 구현합니다.
*/

window.addEventListener("load",function(){

    let description_box = document.getElementById('description_box')
    description_box.addEventListener("keydown", function(e){
        if(e.keyCode==13){

            let request = new Request("/request/");
            request.set_callback(function(result){

                let result_box = document.getElementById('result_content').innerHTML = result;

            });
            request.add_data("message1",description_box.value);
            request.request();


        }



    })
});


class Request{
    constructor(dst_url){
        this.__dst_url = dst_url;
        this.__formdata = new FormData();
        this.__function = function(result){};

        let __connection = new XMLHttpRequest();
        this.__connection = __connection;

        let __this = this;
        this.__connection.onload = function(){

            let result = __connection.responseText;
            __this.__function(result);

        }



    }

    add_data(key, value){
        this.__formdata.append(key,value);
    }

    del_data(key){
        this.__formdata.del(key);
    }

    set_callback(func){
        this.__function = func;
    }

    request(){
        this.__connection.open("POST",this.__dst_url,true);
        this.__connection.send(this.__formdata);

    }




}


