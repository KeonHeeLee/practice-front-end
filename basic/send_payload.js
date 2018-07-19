httpRequest = new XMLHttpRequest();

function basic_submit(this_form) {
    var title = this_form.title.value;
    var contents = this_form.contents.value;

    if(title == "") alert("Please write title.");
    else if(contents == "") alert("Please write source code.");
    
    else if(title != "" && contents != ""){
        if(confirm("Do you want to submit this source code?")){
            var request = JSON.stringify({"title": title, "contents":contents});
            httpRequest.open("post","/",true);
            httpRequest.setRequestHeader('Content-Type', 'application/json');
            httpRequest.timeout = 2000;
            httpRequest.send(request);
            httpRequest.callback();
        }
    } 
}

httpRequest.onload = function(){
    if(httpRequest.readyState == httpRequest.DONE){
        if(httpRequest.status == 200 || httpRequest.status == 201){
            alert("Submitting Complete.");
            location.replace("/");
        } else alert("Server error. (status code:"+ httpRequest.status+")");
    }
}

httpRequest.ontimeout = function (e) {
    alert("Timeout - Didn't connect with server.");
};
