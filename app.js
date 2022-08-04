const fs =require('fs')
const file="./vscode.exe"
const copyFile='./vscode-copy.exe'

async function  getInfo(file){
    let size=0
    return myPromise= new Promise((resolve, reject)=>{
        fs.stat(file,(err,stat)=>{
            if(err) reject(err)
            console.log(stat.size)
            size=stat.size            
            resolve(size)
        })

    })

    
}


// start streamin read
let readedData=0
getInfo(file).then(size=>{
    const readingFile=fs.createReadStream(file)
    readingFile.on("data", chunk=>{
        readedData+=chunk.length
        console.log(`${chunk.length} readed ======> ${Math.round(100 * readedData/size)} %`)
    })
    const writingFile = fs.createWriteStream(copyFile)
    readingFile.pipe(writingFile)

    readingFile.on('end',()=>console.log('file copied succefuly'))
})


// start write stream
