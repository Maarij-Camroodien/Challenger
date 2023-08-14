const db = require("../config")
const {hash, compare,hashSync} = require('bycrypt')
const {createToken} = require ("../middleware/AuthenticateUser")

class Users{
    login(req, res) {

    }

    async register(req, res) {
        const data = req.body
        // Encrypt password
        data.userPass = await hash(data.userPass, 15)
        // Payload
        const user = {
            emailAdd: data.emailAdd,
            userPass: data.userPass
        }
        // Query
        const query = `
        INSERT INTO Users
        SET ?;
        `
        db.query(query, [data], (err)=>{
            if(err) throw err
            // CREATE TOKEN
            let token = createToken(user)
            res.cookie("TheLastUchiha", token,
            {
                maxAge: 3600000,
                httpOnly: true
            })
            res.json({
                status: res.statusCode,
                meg: "You are now registered"
            })
        })
    }

    updateUser(req, res) {
        
    }
 
    fetchUsers(req, res) {
        const query = `
        Select userID, firstName, LastName,
        gender, userDOB, emailAdd, profileURL
        FROM Users;
        `
        db.query(query, 
            (err, result)=> {
                if(err) throw err
                res.json({
                    status: res.statusCode,
                    results
                })
        })
    }
    fetchUser(req, res) {
        const query = `
        Select userID, firstName, LastName,
        gender, userDOB, emailAdd, profileURL
        FROM Users
        WHERE userID = ?;
        `
        //WHERE userID = ${req.params.id};
        db.query(query,
            (err, result)=>{
                if(err) throw err
                res.json({
                    status: res.statusCode,
                    result
                })
            })
    }
    deleteUser(req, res) {
        const query = `
        DELETE FROM Userid
        WHERE userID = ${req.params.id}
        `
        db.query(query, (err)=>{
            if(err) throw err
        })
    }
}

module.exports = Users