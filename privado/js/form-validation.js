


//---------------------------- 1 - Primeira Validação e uso de máscara  (RG) -------------------------------



// Função para formatar o RG enquanto o usuário digita
    function formatarRG(rg) {
        rg = rg.replace(/\D/g, ''); // Remove caracteres não numéricos

        // Máscara do RG (##.###.###-#)
        rg = rg.replace(/(\d{2})(\d)/, '$1.$2');
        rg = rg.replace(/(\d{3})(\d)/, '$1.$2');
        rg = rg.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        // Limita o tamanho máximo do RG para 12 caracteres
        rg = rg.substring(0, 12);

        return rg;
    }

    // Função para validar o formato do RG
    function validarRGFormato(rg) {
        var regex = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
        return regex.test(rg);
    }

    // Aplica a máscara enquanto o usuário digita no campo de input
    document.getElementById('band-rg').addEventListener('input', function (event) {
        var inputValue = event.target.value;
        event.target.value = formatarRG(inputValue);
    });

    // Adiciona evento para verificar e exibir mensagem de erro se o formato do RG estiver incorreto
    document.getElementById('band-rg').addEventListener('blur', function (event) {
        var inputValue = event.target.value;

        if (!validarRGFormato(inputValue) && inputValue !== '') {
            document.getElementById('error-band-rg').innerText = "Por favor, insira um RG válido (formato: ##.###.###-#).";
        } else {
            document.getElementById('error-band-rg').innerText = "";
        }
    });

    // Adiciona evento para permitir somente a digitação de números no campo de RG
    document.getElementById('band-rg').addEventListener('keydown', function (event) {
        // Permitir apenas a digitação de números e alguns caracteres especiais
        var allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
        if (!/[\d.-]/.test(event.key) && !allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    });



//------------------------------- 2 - Validação e uso de máscara (CPF)--------------------------------------




    // Função para formatar o CPF
    function formatarCPF(cpf) {
        // Remove qualquer caractere que não seja número
        cpf = cpf.replace(/\D/g, '');

        // Adiciona a máscara do CPF (###.###.###-##)
        cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');

        // Limita o tamanho máximo do CPF para 14 caracteres
        cpf = cpf.substring(0, 14);

        return cpf;
    }

    // Função para validar o formato do CPF
    function validarCPFFormato(cpf) {
        var regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return regex.test(cpf);
    }

    // Aplicar a máscara enquanto o usuário digita no campo de input
    document.getElementById('band-cpf').addEventListener('input', function (event) {
        var inputValue = event.target.value;
        event.target.value = formatarCPF(inputValue);
    });

    // Adicionar evento para verificar e exibir mensagem de erro se o formato do CPF estiver incorreto
    document.getElementById('band-cpf').addEventListener('blur', function (event) {
        var inputValue = event.target.value;

        if (!validarCPFFormato(inputValue) && inputValue !== '') {
            document.getElementById('error-band-cpf').innerText = "Por favor, insira um CPF válido (formato: XXX.XXX.XXX-XX).";
        } else {
            document.getElementById('error-band-cpf').innerText = "";
        }
    });

    // Adicionar evento para permitir somente a digitação de números e caracteres especiais no campo de CPF
    document.getElementById('band-cpf').addEventListener('keydown', function (event) {
        // Permitir apenas a digitação de números e alguns caracteres especiais
        var allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
        if (!/[\d.-]/.test(event.key) && !allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    });



//--------------------------- 3 - Terceira validação e uso de máscara - (e-mail)--------------------------------




    // Função para validar o formato do e-mail
    function validarEmail(email) {
        // Expressão regular para verificar o formato do e-mail
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Aplicar validação quando o usuário sair do campo de input
    document.getElementById('band-email').addEventListener('blur', function (event) {
        var inputValue = event.target.value;

        if (!validarEmail(inputValue)) {
            // Se o e-mail não estiver em um formato válido, exibir mensagem de erro
            document.getElementById('error-band-email').innerText = "Por favor, insira um e-mail válido.";
        } else {
            // Se o e-mail estiver em um formato válido, limpar a mensagem de erro
            document.getElementById('error-band-email').innerText = "";
        }
    });




//--------------------------------- 4 - Validação e uso de máscara (Telefone)-------------------------------------





      // Função para formatar o número de telefone enquanto o usuário digita
      function formatarTelefone(telefone) {
        telefone = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos

        // Adiciona a máscara de telefone (XX-XXXXX-XXXX)
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '$1-$2-$3');

        // Limita o tamanho máximo do telefone para 13 caracteres
        telefone = telefone.substring(0, 13);

        return telefone;
    }

    // Função para validar o formato do telefone
    function validarTelefoneFormato(telefone) {
        var regex = /^\d{2}-\d{5}-\d{4}$/;
        return regex.test(telefone);
    }

    // Aplicar a máscara enquanto o usuário digita no campo de input
    document.getElementById('band-phone').addEventListener('input', function (event) {
        var inputValue = event.target.value;
        event.target.value = formatarTelefone(inputValue);
    });

    // Adicionar evento para verificar e exibir mensagem de erro se o formato do telefone estiver incorreto
    document.getElementById('band-phone').addEventListener('blur', function (event) {
        var inputValue = event.target.value;

        if (!validarTelefoneFormato(inputValue) && inputValue !== '') {
            document.getElementById('error-band-phone').innerText = "Por favor, insira um telefone válido (formato: XX-XXXXX-XXXX).";
        } else {
            document.getElementById('error-band-phone').innerText = "";
        }
    });

    // Adicionar evento para permitir somente a digitação de números e caracteres especiais no campo de telefone
    document.getElementById('band-phone').addEventListener('keydown', function (event) {
        // Permitir apenas a digitação de números e alguns caracteres especiais
        var allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
        if (!/[\d-]/.test(event.key) && !allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    });



//  --------------------------------------------------X------------------------------------------------------



    document.addEventListener('DOMContentLoaded', function() {
        var botaoCadastrar = document.querySelector('#band-registration-form button[type="button"]');
        var mensagemSucesso = document.getElementById('mensagemSucesso');
        var mensagemErro = document.getElementById('mensagemErro');

        botaoCadastrar.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Aqui você pode realizar a validação dos campos
            var inputs = document.querySelectorAll('#band-registration-form input[required]');
            var todosPreenchidos = true;

            inputs.forEach(function(input) {
                if (input.value === '') {
                    todosPreenchidos = false;
                }
            });

            if (todosPreenchidos) {
                exibirMensagemSucesso();
            } else {
                exibirMensagemErro();
            }
        });

        function exibirMensagemSucesso() {
            mensagemSucesso.style.display = 'block';

            // Exibir alerta para informar sobre o sucesso
            alert('Cadastro realizado com Sucesso');

            // Oculta a mensagem após 5 segundos
            setTimeout(function() {
                mensagemSucesso.style.display = 'none';
            }, 5000);
        }

        function exibirMensagemErro() {
            mensagemErro.style.display = 'block';

            // Exibir alerta informando sobre campos não preenchidos
            alert('Por favor, preencha todos os campos corretamente.');

            // Oculta a mensagem de erro após 5 segundos
            setTimeout(function() {
                mensagemErro.style.display = 'none';
            }, 5000);
        }
    });







