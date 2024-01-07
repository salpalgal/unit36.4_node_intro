const argv = process.argv[2];
const fs = require("fs")
const axios = require("axios")

function cat(arg){
    fs.readFile(`${arg}`,"utf8", function(err, data){
        if(err){
            console.log("ERROR :", err)
            process.exit(1)
        }
        else{
            console.log(data)
        }
    })
}
async function webCat(url){
    await axios.get(url).then(function(resp){
        console.log(resp["data"])
    }).catch(function(err){
        if (err){
            console.error(`ERROR fetch ${url} : ${err}` )
            process.exit(1) 
        }   
    });
   
}

function sort(argv){
    if(argv.slice(0,4)=="http"){
        webCat(argv)
    }else{
        cat(argv)
    }  
}
sort(argv)

