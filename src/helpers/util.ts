const bcrypt = require('bcrypt') ;
const SALT_ROUNDS = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
    try{
        const h = await bcrypt.hash(plainPassword, SALT_ROUNDS);
        return h;
    }
    catch(error){
        console.log(error);
    }
}