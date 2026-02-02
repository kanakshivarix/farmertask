import bcrypt from 'bcryptjs'
const hashpass=async(password)=>{
    return await bcrypt.hash(password,10)

}
const comparepass=async(password,hashpass)=>{
    return await bcrypt.compare(password,hashpass)
}
export {
    hashpass,
    comparepass
}