const formularioEvento = document.getElementById("formEvento");
//cuidado para não chamar a função/ e sim atribuí-la ao método onsubmit
formularioEvento.onsubmit = validarFormulario;
window.onload = buscarEventos; //função não está sendo chamada e sim atribuída


function validarFormulario(evento) {
  evento.preventDefault();
  if (formularioEvento.checkValidity()) {
    formularioEvento.classList.remove('was-validated');
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const rg = document.getElementById('rg').value;
    const cpf = document.getElementById('cpf').value;
    const endereco = document.getElementById('endereco').value;
    const ingressos = document.getElementById('ingressos').value;
    const valor = document.getElementById('valor').value;

    const evento = {
      nome,
      email,
      telefone,
      rg,
      cpf,
      endereco,
      ingressos,
      valor,
    };

    cadastrarEvento(evento);

  } else {
    formularioEvento.classList.add('was-validated');
  }
  evento.preventDefault();
  evento.stopPropagation();
}

function cadastrarEvento(evento) {
  fetch('http://localhost:3000/eventos', {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(evento),
  })
    .then((resposta) => {
      return resposta.json();
    })
    .then((dados) => {
      if (dados.status) {
        mostrarMensagem(dados.mensagem, true);
        buscarEventos(); //atualiza a tabela


      } else {
        mostrarMensagem(dados.mensagem, false);
      }
    })
    .catch((erro) => {
      mostrarMensagem(erro.message, false);
    });
}

function buscarEventos(){
  fetch('http://localhost:3000/eventos', {method: 'GET'}).then((resposta)=>{
    return resposta.json();
  }).then((dados)=>{
      if (Array.isArray(dados)){
          exibirTabelaEventos(dados);
      }
      else{
        mostrarMensagem(dados.mensagem, false);
      }
  })
  .catch((erro)=>{
        mostrarMensagem(erro.message, false);
  });
}



function mostrarMensagem(mensagem, sucesso = false) {
  const divMensagem = document.getElementById("mensagem");
  if (sucesso) {
    divMensagem.innerHTML = `
        <div class="alert alert-success" role="alert">
            ${mensagem}
        </div>`;
  } else {
    divMensagem.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${mensagem}
        </div>`;
  }
  setTimeout(() => {
    divMensagem.innerHTML = "";
  }, 5000);
}

function exibirTabelaEventos(listaEventos) {
  const espacoTabela = document.getElementById('espacoTabela');
  espacoTabela.innerHTML = '';
  if (listaEventos.length > 0) {
    //constroi a tabela
    const tabela = document.createElement('table');
    tabela.className ='table table-striped table-hover';
    const cabecalho = document.createElement('thead');
    cabecalho.innerHTML = `
            <tr>
                <th>Codigo</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>RG</th>
                <th>CPF</th>
                <th>Endereço</th>
                <th>Ingressos</th>
                <th>Valor</th>
                <th>Ações</th>
            </tr>
        `;
    tabela.appendChild(cabecalho);
    const corpo = document.createElement('tbody');
    for (let i = 0; i < listaEventos.length; i++) {
      const evento = listaEventos[i];
      const linha = document.createElement("tr");
      linha.innerHTML = `
                <td>${evento.codigo}</td>
                <td>${evento.nome}</td>
                <td>${evento.email}</td>
                <td>${evento.telefone}</td>
                <td>${evento.rg}</td>
                <td>${evento.cpf}</td>
                <td>${evento.endereco}</td>
                <td>${evento.ingressos}</td>
                <td>${evento.valor}</td>
                <td>
                    <button onclick = "selecionarEvento('${evento.codigo}',
                                                         '${evento.nome}',
                                                         '${evento.email}',
                                                         '${evento.telefone}',
                                                         '${evento.rg}',
                                                         '${evento.cpf}',
                                                         '${evento.endereco}',
                                                         '${evento.ingressos}',
                                                         '${evento.valor}',)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                    </svg>
                
                    </button>
             </td>`;
      corpo.appendChild(linha);
     }
     tabela.appendChild(corpo);
     espacoTabela.appendChild(tabela);
  } else {
    espacoTabela.innerHTML = '<p>Nenhum evento encontrado!</p>';
  }
}

function selecionarEvento(codigo, nome, email, telefone, rg, cpf, endereco, ingressos, valor){
  document.getElementById('codigo').value = codigo;
  document.getElementById('nome').value = nome;
  document.getElementById('email').value = email;
  document.getElementById('telefone').value = telefone;
  document.getElementById('rg').value = rg;
  document.getElementById('cpf').value = cpf;
  document.getElementById('endereco').value = endereco;
  document.getElementById('ingressos').value = ingressos;
  document.getElementById('valor').value = valor;

}

function prepararFormulario(nome, email, telefone, rg, cpf, endereco, ingressos, valor, acao){
  let botaoCadastrar = document.getElementById('cadastrar');
  let botaoAtualizar = document.getElementById('atualizar');
  let botaoExcluir = document.getElementById('excluir');

  document.getElementById('nome').value = nome;
  document.getElementById('email').value = email;
  document.getElementById('telefone').value = telefone;
  document.getElementById('rg').value = rg;
  document.getElementById('cpf').value = cpf;
  document.getElementById('endereco').value = endereco;
  document.getElementById('ingressos').value = ingressos;
  document.getElementById('valor').value = valor;


  if (acao ==="exclusao"){

      botaoCadastrar.disabled = true;
      botaoAtualizar.disabled = true;
      botaoExcluir.disabled = false;
  }

else if (acao === "atualizacao"){

     botaoCadastrar.disabled = true;
     botaoAtualizar.disabled = false;
     botaoExcluir.disabled = true;

}
else { //ação cadastrar

     botaoCadastrar.disabled = false;
     botaoAtualizar.disabled = true;
     botaoExcluir.disabled = true;

}


}











//////////////////////////  validação ingressos   //////    valor   ////////////////
document.getElementById("ingressos").addEventListener("input", function () {
  var ticketQuantity = parseInt(this.value);
  var ticketPrice = 10;
  var totalPrice = ticketQuantity * ticketPrice;
  document.getElementById("valor").value = totalPrice.toFixed(2);
});
