import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Simple health
app.get('/ping', (req, res) => res.json({ ok: true }))

// create a transporter once and verify connection on startup to surface errors early
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

transporter.verify()
  .then(() => console.log('SMTP transporter verified'))
  .catch(err => console.error('SMTP transporter verification failed:', err))

app.post('/api/send-order', async (req, res) => {
  try {
    const { name, email, phone, address, items, total } = req.body

    if (!name || !email || !phone) return res.status(400).json({ error: 'Faltan campos requeridos' })

    // build order text
    const lines = []
    lines.push(`Nombre: ${name}`)
    lines.push(`Email: ${email}`)
    lines.push(`Teléfono: ${phone}`)
    lines.push(`Dirección: ${address || '-'}\n`)
    lines.push('Pedido:')
    items.forEach(it => {
      lines.push(`- ${it.name} x${it.quantity} — $${(it.price * it.quantity).toFixed(2)}`)
    })
    lines.push('\n')
    lines.push(`Total: $${Number(total).toFixed(2)}`)

    const textBody = lines.join('\n')

    // use the pre-created transporter
    // transporter already configured at app startup

    const mailOptions = {
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.EMAIL_TO,
      subject: `Nueva orden de cocteles - ${name}`,
      text: textBody
    }

    const info = await transporter.sendMail(mailOptions)

    return res.json({ ok: true, messageId: info.messageId })
  } catch (err) {
    console.error('Error sending order email:', err)
    return res.status(500).json({ error: 'Error interno al enviar el correo' })
  }
})

app.listen(PORT, () => {
  console.log(`Mail server listening on http://localhost:${PORT}`)
})
