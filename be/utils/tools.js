const bcrypt = require('bcrypt')

module.exports = {
    crypt(myPlaintextPassword){
        return new Promise((resolve) => {
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(myPlaintextPassword, salt, function(err, hash){
                    resolve(hash)
                })
            })
        })
    },
    compare(myPlaintextPassword,hash){
        return new Promise((resolve,reject)=>{
            bcrypt.compare(myPlaintextPassword,hash,function(err, res){
                resolve(res)
            })
        })
    }
}

// const bcrypt = require('bcrypt')

// module.exports = {
//   hash(password) {
//     let salt = bcrypt.genSaltSync(10)
//     let hash = bcrypt.hashSync(password, salt)
//     return hash
//   },

//   compare(originalPassword, hash) {
//     return bcrypt.compare(originalPassword, hash)
//   }
// }