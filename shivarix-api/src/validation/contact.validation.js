import {z} from 'zod'
const createcontactschmea=z.object(
    {
     fullname:z.string().trim().min(3,'full name must be atleast 3 chrachters').max(20,'full name is too much long'),
     email:z.string().trim().email('invalid email'),
     phone:z.string().trim(),
     company:z.string().trim().min(3,'compnay name too must short').max(100,'compnay name too much long'),
     service:z.string().trim().min(1,'atleast 1 service reqired'),
     projectDetails:z.string().trim().min(10,'project details to much short').max(1000,'project details too much long'),

    }
).strict()
const registerschema=z.object({
     username:z.string().min(7,'username should be 7 chachters'),
        email:z.string().email('invalid email'),
        password:z.string().min(6,'password must be in 6 digits'),
        role:z.enum(['Farmer','Admin','User'])

}).strict()
const loginSchema=z.object({
    email:z.string().trim().email('invalid email'),
     password:z.string().min(6,'password must be in 6 digits')
}).strict()
export {
    createcontactschmea,
    loginSchema,
    registerschema
}
