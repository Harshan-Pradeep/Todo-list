const express=require("express");
const bodyParser=require("body-parser");

const app=express();

let items=[];
let workItems=[];

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))


//handle get request which is come from home route.
//send current data as a title.
app.get("/",(req,res)=>{

    const date=new Date();
    
    var options={
        weekday:"long",
        day:"numeric",
        month:"long",
    };
    
    let currentDate=date.toLocaleDateString("en-US",options);

    res.render("list",{
        listTitle:currentDate,
        newListItems:items
    })
})

//hadle post request
//If post request come from work route then todo item push to workitems array and redirect to work route
//else todo item push to item array and redirect to home route
app.post("/",(req,res)=>{

    let item=req.body.todoItem;
    if (req.body.list==="Work"){
        console.log(req.body);
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
         res.redirect("/");
    }
 
})

//handle get request which is come from work route
app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"Work List",newListItems:workItems});
});



app.listen(3000,()=>console.log("Server is running on port 3000"))