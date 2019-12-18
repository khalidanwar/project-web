$(function(){
 function Interaction(type,target,time){
    this.type=type;
    this.target=target;
    this.time=time;    
}
    var counter=0;
    var interactions=[];
    if(!window.localStorage.getItem('interactions')){
        interactions[0]= new Interaction('load','load window',(new Date).toLocaleTimeString());
        window.localStorage.setItem('interactions',JSON.stringify(interactions));
     }else{
         interactions=JSON.parse(window.localStorage.getItem('interactions'));
         interactions[interactions.length]=new Interaction('load','load window',(new Date).toLocaleTimeString());
         window.localStorage.setItem('interactions',JSON.stringify(interactions));
     }
   
var btn=document.getElementById('generate');
var char = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

btn.addEventListener('click',function(){
    interactions=JSON.parse(window.localStorage.getItem('interactions'));
    interactions[interactions.length]=new Interaction('click','click to generate letter',(new Date).toLocaleTimeString());
         window.localStorage.setItem('interactions',JSON.stringify(interactions));
    var rand=[];
    var nbr=document.getElementById('number').value;
    if(nbr>26){
        alert('you must enter number less than or equal 26');
    }else{
   while(rand.length < nbr){
    var val = Math.floor(Math.random() * 26) ;
    rand.push(val);
    var str='';
    for(i=0;i<rand.length;i++){
        str+="<button class='images' value='"+char[rand[i]]+"'>"+char[rand[i]]+"</button>"
    }
    document.getElementById('bt').innerHTML=str;
}
    var images=document.getElementsByClassName('images');
    for(i=0;i<images.length;i++){
        images[i].addEventListener('click',function(e){
            interactions=JSON.parse(window.localStorage.getItem('interactions'));
         interactions[interactions.length]=new Interaction('click','click to show picture of letter '+e.target.value,(new Date).toLocaleTimeString());
         window.localStorage.setItem('interactions',JSON.stringify(interactions));
        document.getElementById('pict').innerHTML="<img src='images/"+e.target.value+".jpg'>";
    })
}
    }
//    interactions=JSON.parse(window.localStorage.getItem('interactions'));
//    alert(interactions[1].time);
});

window.addEventListener('unload',function(){
    interactions=JSON.parse(window.localStorage.getItem('interactions'));
         interactions[interactions.length]=new Interaction('unload','unload window',(new Date).toLocaleTimeString());
         window.localStorage.setItem('interactions',JSON.stringify(interactions));
});

setInterval(function(){
        $.ajax({
    "type":"get",
    "url":"project.php",
    "data":{"getiInteractions":'get'},
    "success":function(response){

        res=JSON.parse(response);
        var str="<tr><th>type</th><th>target</th><th>time</th></tr>";
        for(i=0;i<res.length;i++){
            str+="<tr><td>"+res[i][1]+"</td><td>"+res[i][2]+"</td><td>"+res[i][3]+"</td></tr>";
        }
        $('table').html(str);

    }
});        
},500);
    

   setInterval(function(){
     $.ajax({
        "type":"post",
        "url":"project.php",
        "data":{"interactions":window.localStorage.getItem('interactions')},
        "success":function(response){
            interactions=JSON.parse(window.localStorage.getItem('interactions'));
            interactions=[];
            localStorage.clear();
            window.localStorage.setItem('interactions',JSON.stringify(interactions));
        }
    });
         
},5000);    
});
