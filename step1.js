const argv = process.argv[2];
const fs = require("fs")


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

cat(argv)

