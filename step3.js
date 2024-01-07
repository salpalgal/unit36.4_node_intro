const argv = process.argv;
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
    if(argv[2].slice(0,4)=="http"){
        webCat(argv[2])
    }
    if(argv[2]== "--out"){
        writeToFile(read(argv[4]),argv[3])
    }
    else{
        cat(argv[2])
    }  
}

function read(file){
    const fileContent = fs.readFileSync(`${file}`, "utf8")
    return fileContent
}


function writeToFile(content,path){
    fs.writeFile(`${path}`, content, {encoding:"utf8", flag: "a"}, function(err){
        if(err){
            console.error(err);
            process.exit(1);
        }
        console.log("successfully written")
    })
    console.log("writing")
}
sort(argv)

