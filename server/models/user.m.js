const db = require('../config/connectDB')
const bcrypt = require('bcrypt');

// CONFIG SPACE
const saltRounds = 10

 
module.exports = {
    // retrieve user from the database 
    getUserByUsername: async (username) => {
        try {
            console.log(username);
            const result = await db.Query(`SELECT * FROM User WHERE username='${username}'`);
            return result; // Return the result here
        } catch (error) {
            console.log(error);
            throw error; // Throw the error to be caught by the caller
        } /// )
    },

    // create a new user
    createUser: async (username, email, password) => {
        try {
            // Encrypt user password
            console.log(username, email, password)
            const encryptedPassword = await bcrypt.hashSync(password, saltRounds)
            const insertInfo = await db.Query(`
                INSERT INTO User (username, email, password)
                SELECT
                    *
                FROM (SELECT 
                        '${username}' AS username, 
                        '${email}' AS email , 
                        '${encryptedPassword}' AS password) 
                AS tmp
                WHERE NOT EXISTS (
                    SELECT 1 FROM User
                    WHERE username = '${username}' OR email = '${email}'
                );
            `)            
            console.log(insertInfo)
            if(!insertInfo.insertId) {// don't allow users create new account
                throw new Error('User already exists.')
            }
            return true;
        } catch (err) {
            throw err;
        }
    },

    // authen 
    authenUser: async (username, password) => {
        try {
            //Encrypt user password
            const userInfo = await db.Query(`
                	SELECT UserID, Password 
                    FROM User
                    WHERE username='${username}'
                    LIMIT 1
            `)
            if (userInfo.length) { // has a matching
                if (bcrypt.compareSync(password, userInfo[0]['Password'])) {
                    return {
                        userID: userInfo[0]['UserID'],
                        isAuthen: true,
                    };
                }
                else {
                    throw new Error ('Wrong password');
                }
            }
            return {
                isAuthen: false,
            };
            

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    // 
}