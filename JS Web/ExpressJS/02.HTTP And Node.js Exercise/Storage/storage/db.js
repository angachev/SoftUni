let db={};
const fs = require('fs');

let isKey=key=>{
    if(typeof key!=='string'){
        throw new Error('This key is not a string =>'+key)
    }
}

let keyExists=key=>{
    if(!db.hasOwnProperty(key)){
        throw new Error('This key does not exist =>'+key)
    }
}


let put =(key, value)=>{
    isKey(key)
    if(db.hasOwnProperty(key)){
        throw new Error('Key already exists =>'+key)
    }

    db[key]=value;


}


let get = (key)=>{
    isKey(key)
    keyExists(key)

    return db[key];
}

let getAll=()=>{
    if(Object.values(db).length===0){
        return 'There are no items in the storage'
    }
    return db;
}


let update = (key, newValue)=>{
    isKey(key)
    keyExists(key)
    db[key]=newValue;
}

let deleteItem = (key)=>{
    isKey(key)
    keyExists(key)
    delete db[key];
}
let clear=()=>{
    db={};
}
// let save=()=>{
//     fs.writeFileSync('./storage.json',JSON.stringify(db),'utf8')
// }

let save=()=>{
    let jsonData=JSON.stringify(db);
    fs.writeFileSync("./storage.json", jsonData,'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
    });
}


// let load=()=>{
//     return new Promise((resolve,reject)=>{
//         fs.readFile('./storage.json','utf8',(err,data)=>{
//             if(err){
//                 return
//             }
//             storage=JSON.parse(data)
//             resolve()
//         })
//     })
// }

/////////////////////////////////////////////////////////////////////////////
let load=()=>{
    try{
    let json = fs.readFileSync('./storage.json','utf8');
    db=JSON.parse(json);
    }catch(err){

    }finally{

    }
}


// let load = (callback)=>{
//     fs.readFile('./storage.json', 'utf8',((err,data)=>{
//         if(err){
//             return
//         }
//         db=JSON.parse(data);

//         callback()

//     }))
// }




module.exports={
    put:put,
    get:get,
    getAll:getAll,
    update:update,
    delete:deleteItem,
    clear:clear,
    save:save,
    load:load
}