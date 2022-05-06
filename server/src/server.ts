import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "08bc49a63db01c",
    pass: "d88ce9e8a8f880"
  }
});

app.post("/feedbacks", async (req, res) => {
  const { comment, type, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      comment,
      type,
      screenshot
    }
  });

  await transport.sendMail({
    from: "Equipe Feedget <oi@feedget.com>",
    to: "João Vitor de Oliveira Lima <jvolima2004@gmail.com>",
    subject: "Novo feedback",
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join("\n")
  })

  return res.status(201).json({ data: feedback });
})

app.listen(3333, () => {
  console.log("HTTP server is running!");
});