const MongoClient = require ('mongodb').MongoClient;

module.exports = class News{
    static async find(autor){
        const conn = await  MongoClient.connect('mongodb://localhost:27017');
        const db =  conn.db('application');
        let result;       
        
        result = await db.collection('news').find({autor:autor}).toArray();          
       

        conn.close();
        return result;

    } 

    static async insert(autor,title, content){  
        const conn = await  MongoClient.connect('mongodb://localhost:27017');
        const db =  conn.db('application');   
          
        const result = await db.collection('news').insertOne({autor:autor,title:title,content:content});  

        conn.close();

    }
}