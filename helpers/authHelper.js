import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try{
        const hashedp = await bcrypt.hash(password, 10)
        return hashedp;
    }catch(error){
        console.log(error)
    }
}

export const comparePassword = async (password, hashedp) => {
    return await bcrypt.compare(password, hashedp)
}