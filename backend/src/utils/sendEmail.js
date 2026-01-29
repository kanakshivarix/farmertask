import nodemailer from 'nodemailer'
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const createTransporter=async()=>{
    const host=process.env.SMTP_HOST
    const user=process.env.SMTP_USER
    const pass=process.env.SMTP_PASS
    const port=process.env.SMTP_PORT
    if(!host || !user || !pass)
    {
        const ethereal=await nodemailer.createTestAccount()
        return nodemailer.createTransport({
            host:'smtp.ethereal.email',
            port:587,
            auth:{user:ethereal.user,pass:ethereal.pass}
        })
    }
    return nodemailer.createTransport({
         host,
        port: Number(port) || 587,
        secure: false,
        auth: { user, pass }

    })
}



const sendMail = async ({ to, subject, template, data, text }) => {
  try {
    const transporter = await createTransporter()

    // ✅ ABSOLUTE & SAFE PATH
    const templatePath = path.join(
      __dirname,
      "..",        // utils
      "emails",    // emails folder
      `${template}.ejs`
    )

    console.log("USING TEMPLATE 👉", templatePath)

    const html = await ejs.renderFile(templatePath, data)

    return await transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        process.env.SMTP_USER ||
        "noreply@example.email",
      to,
      subject,
      text,
      html
    })
  } catch (error) {
    console.log("Email error:", error)
  }
}

export default sendMail
