let express=require("express")
let app=express()
app.use(express.json())
app.use(function(req,res,next){
    res.header ("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    )
    res.header (
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        )
next();
})
var port=process.env.PORT||2410
app.listen(port,() =>console. log(`Node App listening on port ${port}!`))

const {Client}=require("pg")
const client=new Client({
    user:"postgres",
    password:"jaychopra932@gmail.com",
    database:"postgres",
    port:5432,
    host:"db.zwpjdnlwasupjnravaab.supabase.co",
    ssl:{rejectUnauthorized:false}
})
client.connect(function(res,err){
    console.log("Connected!!!")
})

app.get("/mobiles",function(req,res){
    let {brand,ram,rom,sortBy}=req.query
    let sql="SELECT * FROM mobiles"
    client.query(sql,function(err,result){
        if(err) res.status(404).send("No Data Found")
        else{
            let arr=[...result.rows]
            if(ram){
                arr=arr.filter((a)=>ram.findIndex((b)=>b==a.ram)>=0)
            }
            if(brand){
                arr=arr.filter((a)=>brand.findIndex((b)=>b==a.brand)>=0)
            }
            if(rom){
                arr=arr.filter((a)=>rom.findIndex((b)=>b==a.rom)>=0)
            }
            if(sortBy=="id"){
                arr=arr.sort((a,b)=>a.id-b.id)
            }
            if(sortBy=="price"){
                arr=arr.sort((a,b)=>a.price-b.price)
            }
            if(sortBy=="name"){
                arr=arr.sort((a,b)=>a.name.localeCompare(b.name))
            }
            if(sortBy=="brand"){
                arr=arr.sort((a,b)=>a.brand.localeCompare(b.brand))
            }
            if(sortBy=="ram"){
                arr=arr.sort((a,b)=>a.ram.localeCompare(b.ram))
            }
            if(sortBy=="rom"){
                arr=arr.sort((a,b)=>a.rom.localeCompare(b.rom))
            }
            if(sortBy=="os"){
                arr=arr.sort((a,b)=>a.os.localeCompare(b.os))
            }
            res.send(arr)
        }
    })
})
app.get("/mobiles/:id",function(req,res){
    let id=+req.params.id
    let sql=`Select * from mobiles where Id=${id}`
    client.query(sql,function(err,result){
        if(err) res.status(404).send("No Data Found")
        else{ 
            res.send(result.rows)
        }
    })
    
})
app.get("/mobiles/brand/:brand",function(req,res){
    let brand=req.params.brand
    let sql="SELECT * FROM mobiles"
    client.query(sql,function(err,result){
        if(err) res.status(404).send("No Data Found")
        else{ 
            let arr=result.rows.filter((a)=>a.brand==brand)
            res.send(arr)
        }
    })
})
app.get("/mobiles/RAM/:RAM",function(req,res){
    let RAM=req.params.RAM
    let sql="SELECT * FROM mobiles"
    client.query(sql,function(err,result){
        if(err) res.status(404).send("No Data Found")
        else{ 
            let arr=result.rows.filter((a)=>a.ram==RAM)
            res.send(arr)
        }
    })
})
app.get("/mobiles/ROM/:ROM",function(req,res){
    let ROM=req.params.ROM                  
    let sql="SELECT * FROM mobiles"
    client.query(sql,function(err,result){
        if(err) res.status(404).send("No Data Found")
        else{ 
            let arr=result.rows.filter((a)=>a.rom==ROM)
            res.send(arr)
        }
    })
})
app.get("/mobiles/OS/:OS",function(req,res){
    let OS=req.params.OS
    let sql="SELECT * FROM mobiles"
    client.query(sql,function(err,result){
        if(err) res.status(404).send("No Data Found")
        else{ 
            let arr=result.rows.filter((a)=>a.os==OS)
            res.send(arr)
        }
    })
})

app.post("/mobiles",function(req,res){
    let body=req.body
    let sql=`INSERT INTO  mobiles(name,price,brand,ram,rom,os) VALUES ('${body.name}',${body.price},'${body.brand}','${body.ram}','${body.rom}','${body.os}')`
    client.query(sql,function(err,result){
        if(err) res.status(404).send(err)
        else{ 
            res.send("Inserted")
        }

    })
})
app.put("/mobiles/:id",function(req,res){
    let id=+req.params.id
    let body=req.body
    let sql=`UPDATE mobiles SET name='${body.name}',price=${body.price},brand='${body.brand}',ram='${body.ram}',rom='${body.rom}',os='${body.os}' WHERE Id=${id}`
    client.query(sql,function(err,result){
        if(err) res.status(404).send(err)
        else{ 
            res.send("Inserted")
        }

    })
})
app.delete("/mobiles/:id",function(req,res){
    let id=+req.params.id
    let sql=`DELETE FROM mobiles WHERE Id=${id};`
    client.query(sql,function(err,result){
        if(err) res.status(404).send(err)
        else{ 
            res.send("DELETED")
        }

    })
})