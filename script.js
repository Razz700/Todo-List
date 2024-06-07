let todo=document.getElementById('todo');
let priority=document.querySelector('select');
priority.value="";
todo.value="";
let date=document.getElementById('date');
let add=document.getElementById('addbtn');
let error=document.getElementById('error');
error.style.color="brown";
let success=document.getElementById('success');
success.style.color="green";
let checktodo=true;
let count=0,countToday=1,countFuture=1,put,countCompleted=1;
//
render();
//

add.addEventListener('click',()=>{
    checktodo=true;
if (todo.value!="" && date.value!="Deadline" && priority.value!="") {
  let data=JSON.parse(localStorage.getItem('data'))??[];
  localStorage.setItem('data',JSON.stringify(data));
   data.forEach(item => {
    if (item.name==todo.value) {
        error.textContent="Already todo exists!!";
        success.textContent="";
checktodo=false;
    } });
   if (checktodo) {
    success.textContent="";
    error.textContent="";
    let d1=new Date(date.value);
    d1.setHours(0,0,0,0);
 let d=new Date();
 d.setHours(0,0,0,0);
 const div=document.createElement('div');
 count++;
if (d1>d || d1<d) {
    put=countFuture;
    countFuture++;
}else{
    put=countToday;
    countToday++;
}
//
let dateStr=new Date(date.value);
dateStr=`${dateStr.getDate()}/${dateStr.getMonth()+1}/${dateStr.getFullYear()}`;

// let dateStr=(date.value).split('-');
// dateStr=[dateStr[2],dateStr[1],dateStr[0]];
// dateStr=dateStr.join("/");
//
 div.setAttribute('id',`id${count}`);
 div.innerHTML=`<div>${put}.
 <p style="width:300px;">${todo.value}</p></div>
 <p>${dateStr}</p>
 <p style="width:200px;">Priority: ${priority.value}</p>
 <div>
 <p onclick='completed("id${count}")'><img src='resources/1.png'></p>
 <p onclick='delete1("id${count}")'><img src='resources/trash 1.png'></p>
 </div>
`;
 if (d1>d) {
    document.getElementById('upcoming').appendChild(div);
    store();
}else if (d1<d) {
       // error.innerHTML="Date cannot be past value!!";
       document.getElementById('upcoming').appendChild(div); 
       div.style.cssText="border:2px solid red";
       store();
}else{
    document.getElementById('today').appendChild(div); 
    store();
}
success.textContent="Todo Added!!";
    error.textContent="";
 priority.value="";
todo.value="";
date.value="Deadline";
}//end of if(checktodo)
}//end of empty fields
else{
   error.innerHTML="Fields cannot be empty!";
   success.textContent="";
}
});// end of add event click

function store(){
    let obj={
        name:todo.value,
        priority:priority.value,
        completed:false,
        date:date.value
    }
    let data=JSON.parse(localStorage.getItem('data'));
    data.push(obj);
    localStorage.setItem('data',JSON.stringify(data));
}

function completed(id){ 
    success.textContent="";
    error.textContent="";
    let data=JSON.parse(localStorage.getItem('data'));
let todoname=document.querySelector(`#${id}>div>p`).textContent;
data.forEach((item)=>{
if (item.name==todoname) {
   item.completed=true; 
}
});
localStorage.setItem('data',JSON.stringify(data));
render();
}

function render(){
    count=0;
    countToday=1;
    countFuture=1;
    countCompleted=1;
    success.textContent="";
    error.textContent="";
    document.getElementById('today').innerHTML="  <p>Today’s TodoList</p>";
    document.getElementById('upcoming').innerHTML=" <p>Future TodoList</p>";
    document.getElementById('completed').innerHTML=" <p>Completed TodoList</p>";
    let d1=new Date();
    d1.setHours(0,0,0,0);
    let data=JSON.parse(localStorage.getItem('data'))??[];
    data.forEach((item)=>{
    const d=new Date(item.date);
    d.setHours(0,0,0,0);
    const div=document.createElement('div');
    count++;
   if ((d1>d || d1<d) && !item.completed) {
    put=countFuture;
    countFuture++;
   }else if(!item.completed){
    put=countToday;
    countToday++;
   }else{
    put=countCompleted;
    countCompleted++;
   }
   let dateStr=new Date(item.date);
dateStr=`${dateStr.getDate()}/${dateStr.getMonth()+1}/${dateStr.getFullYear()}`;

    div.setAttribute('id',`id${count}`);
    div.innerHTML=`<div>${put}.
    <p style="width:300px;">${item.name}</p></div>
    <p>${dateStr}</p>
    <p style="width:200px;">Priority: ${item.priority}</p>
    <div>
    <p onclick='completed("id${count}")'><img src='resources/1.png'></p>
    <p onclick='delete1("id${count}")'><img src='resources/trash 1.png'></p>
    </div>`;
    if (d>d1 && !item.completed) {
       document.getElementById('upcoming').appendChild(div);
   }else if (d<d1 && !item.completed) {
          document.getElementById('upcoming').appendChild(div); 
          div.style.cssText="border:2px solid red";
   }else if(!item.completed){
       document.getElementById('today').appendChild(div); 
   }else{
    div.innerHTML=`<div>${put}.
    <p style="width:300px;">${item.name}</p></div>
    <p>${dateStr}</p>
    <p style="width:200px;">Priority: ${item.priority}</p>
    <div>
    <p onclick='delete1("id${count}")'><img src='resources/trash 2.png'></p>
    </div>`;
    document.getElementById('completed').appendChild(div);
   }
    });
}  

function delete1(id){
let data=JSON.parse(localStorage.getItem('data'));
let todoname=document.querySelector(`#${id}>div>p`).textContent;
let data1=[];
data.forEach((item)=>{
if (todoname==item.name) {
   delete item; 
}else{
    data1.push(item);
}
});
localStorage.setItem('data',JSON.stringify(data1));
render();
success.textContent="Todo Deleted!!";
error.textContent="";
}