import express from "express";
import process from "process";
import path from "path";
import session from "express-session";
import autenticar from "./segurança/autenticar.js";

const host = '0.0.0.0';
const porta = 4000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "M1nH4Ch4v3S3cr3t4",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 1000 * 15,
    },
  })
);

app.post("/login", (requisicao, resposta) => {
  const usuario = requisicao.body.usuario;
  const senha = requisicao.body.senha;
  if (usuario && senha && usuario === "Jaum" && senha === "123") {
    requisicao.session.usuarioLogado = true;
    resposta.redirect("cadastroEvento.html");
  } else {
    resposta.redirect("/login.html");
  }
});

app.use(express.static(path.join(process.cwd(), "publico")));
app.use(autenticar, express.static(path.join(process.cwd(), "privado")));

app.listen(porta, host, () => {
  console.log(`Servidor escutando em http://localhost:${porta}`);
});
