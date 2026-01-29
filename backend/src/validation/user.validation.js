import {z} from 'zod'
const registerschema=z.object({
    username:z.string().min(7,'username should be 7 chachters'),
    email:z.string().email('invalid email'),
    password:z.string().min(6,'password must be in 6 digits'),
    role:z.enum(['Farmer','Admin','User'])

})
const loginSchema=z.object({
    email:z.string().email('invalid email addres'),
    password:z.string().min(6,'password must be in 6 digits'),
})

export {
    registerschema,
    loginSchema,
  
}