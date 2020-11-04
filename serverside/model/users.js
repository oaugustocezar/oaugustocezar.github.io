<<<<<<< HEAD
const MongoClient = require ('mongodb').MongoClient;

module.exports = class Users{
    static async find(email){
        const conn = await  MongoClient.connect('mongodb://localhost:27017');
        const db =  conn.db('application');
        let result;       
        
        if(email){
            result = await db.collection('users').find({email:email}).toArray();

        }else{
            result = await db.collection('users').find().toArray();

        }      
            
       

        conn.close();
        return result;

    } 

    static async insert(email, senha){
        const conn = await  MongoClient.connect('mongodb://localhost:27017');
        const db =  conn.db('application');             
        
        const result = await db.collection('users').insertOne({email:email,senha:senha});  

        conn.close();

    }
=======
const MongoClient = require ('mongodb').MongoClient;

module.exports = class Users{
    static async find(email,senha){
        const conn = await  MongoClient.connect('mongodb://localhost:27017');
        const db =  conn.db('application');
        let result;       
        
        result = await db.collection('users').find({email:email}).toArray();
            
       

        conn.close();
        return result;

    } 

    static async insert(email, senha){
        const conn = await  MongoClient.connect('mongodb://localhost:27017');
        const db =  conn.db('application');             
        
        const result = await db.collection('users').insertOne({email:email,senha:senha});  

        conn.close();

    }
>>>>>>> 39cbe3c89d66703c101bcab072d5ecdff1ac52e7
}