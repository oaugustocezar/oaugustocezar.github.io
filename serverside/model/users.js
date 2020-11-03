<<<<<<< HEAD
const MongoClient = require ('mongodb').MongoClient;

module.exports = class Users{
    static async find(email,senha){
        const conn = await  MongoClient.connect('mongodb://localhost:27017');
        const db =  conn.db('application');
        let result;
        if(email){
            result = await db.collection('users').find({email:email,senha:senha}).toArray();
            
        }else{    

            result = await db.collection('users').find().toArray();
        }

        conn.close();
        return result;

    } 

    static async insert(email, senha){
        const conn = await  MongoClient.connect('mongodb://localhost:27017');
        const db =  conn.db('application');
        
        db.collection('users').insertOne({email:email,senha:senha});
        conn.close();

    }
=======
const MongoClient = require ('mongodb').MongoClient;

module.exports = class Users{
    static async find(busca){
        const conn = await  MongoClient.connect('mongodb://localhost:27017');
        const db =  conn.db('application');
        let result;
        if(busca){
            result = await db.collection('users').find({email: new RegExp(busca)}).toArray();
            
        }else{    

            result = await db.collection('users').find().toArray();
        }

        conn.close();
        return result;

    } 

    static async insert(email, senha){
        const conn = await  MongoClient.connect('mongodb://localhost:27017');
        const db =  conn.db('application');
        
        db.collection('users').insertOne({email:email,senha:senha});
        conn.close();

    }
>>>>>>> 585325a30617a7367c40680cbc9b01b3fd1ba5f6
}