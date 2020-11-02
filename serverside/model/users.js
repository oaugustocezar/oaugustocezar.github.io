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
}