const path = require("path");
const fs = require("fs");
const userPath = path.resolve(__dirname, '../data/users.json');
let usersData = JSON.parse(fs.readFileSync(userPath, 'utf-8'))

const User = {
    fileName: path.resolve(__dirname, '../data/users.json'),

    getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

    findByPK: (bodyId)=>{
        let user = usersData.find(user => user.id == bodyId)
        return user
    },

    findByField: (campo, bodyCampo)=>{
        let userAll = User.getData();
        let userFound = userAll.find(user => user[campo] === bodyCampo)
        return userFound
    },

    createUser : (body, img)=>{
        let newUser = {
            id : Date.now() ,
            ...body
        };

        usersData.push(newUser);
        fs.writeFileSync(userPath, JSON.stringify(usersData, null, ' '))
        return usersData
    },

    deleteUser : (bodyId)=>{
        
        let userDelete = usersData.find(user => user.id == bodyId)
        let indexDelete = usersData.indexOf(userDelete)

        usersData.splice(indexDelete, 1);
        
        fs.writeFileSync(userPath, JSON.stringify(usersData, null, ' '))
        return usersData
    }
}

module.exports = User