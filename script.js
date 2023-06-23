class Funcionario {
  constructor(nomeCompleto, cpf, endereco, dataDeNascimento, rendaMensal, profissao, altura, peso, tipoSanguineo, banco, agencia, contaCorrente) {
    this.nomeCompleto = nomeCompleto;
    this.cpf = cpf;
    this.endereco = endereco;
    this.dataDeNascimento = dataDeNascimento;
    this.rendaMensal = rendaMensal;
    this.profissao = profissao;
    this.altura = altura;
    this.peso = peso;
    this.tipoSanguineo = tipoSanguineo;
    this.banco = banco;
    this.agencia = agencia;
    this.contaCorrente = contaCorrente;
  }
}

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtém os valores dos campos do formulário
  const nomeCompleto = document.getElementById('nomeCompleto').value;
  const cpf = document.getElementById('cpf').value;
  const endereco = document.getElementById('endereco').value;
  const dataDeNascimento = document.getElementById('dataDeNascimento').value;
  const rendaMensalInput = document.getElementById('rendaMensal');
  const rendaMensal = parseFloat(rendaMensalInput.value.replace(',', '.'));
  const profissao = document.getElementById('profissao').value;
  const altura = document.getElementById('altura').value;
  const peso = document.getElementById('peso').value;
  const tipoSanguineo = document.getElementById('tipoSanguineo').value;
  const banco = document.getElementById('banco').value;
  const agencia = document.getElementById('agencia').value;
  const contaCorrente = document.getElementById('contaCorrente').value;

  // Cria uma nova instância de Funcionario
  const funcionario = new Funcionario(nomeCompleto, cpf, endereco, dataDeNascimento, rendaMensal, profissao, altura, peso, tipoSanguineo, banco, agencia, contaCorrente);

  if (funcionario.tipoSanguineo === "O-" 	|| funcionario.tipoSanguineo === "o-") {
    alert("Você é doador universal. Considere realizar doações nos bancos de sangue.");
  }

  // Calcula o desconto de imposto de renda
  let desconto = 0;

  if (rendaMensal <= 1903.98) {
    desconto = 0; // Isenção
  } else if (rendaMensal <= 2826.65) {
    desconto = rendaMensal * 0.075;
  } else if (rendaMensal <= 3751.05) {
    desconto = rendaMensal * 0.15;
  } else if (rendaMensal <= 4664.68) {
    desconto = rendaMensal * 0.225;
  } else {
    desconto = rendaMensal * 0.275;
  }

  // Exibe o desconto na tela
  const descontoElement = document.getElementById('desconto');
  descontoElement.textContent = desconto.toFixed(2);

  // Armazena os dados dos funcionários em cache
  let cachedFuncionarios = [];
  const cachedFuncionariosData = localStorage.getItem('funcionariosData');

  if (cachedFuncionariosData) {
    cachedFuncionarios = JSON.parse(cachedFuncionariosData);
  }

  // Adiciona o funcionário ao array cachedFuncionarios
  cachedFuncionarios.push(funcionario);

  // Armazena os dados atualizados dos funcionários em cache
  localStorage.setItem('funcionariosData', JSON.stringify(cachedFuncionarios));

  // Limpa os campos do formulário
  document.getElementById('nomeCompleto').value = '';
  document.getElementById('cpf').value = '';
  document.getElementById('endereco').value = '';
  document.getElementById('dataDeNascimento').value = '';
  rendaMensalInput.value = '';
  document.getElementById('profissao').value = '';
  document.getElementById('altura').value = '';
  document.getElementById('peso').value = '';
  document.getElementById('tipoSanguineo').value = '';
  document.getElementById('banco').value = '';
  document.getElementById('agencia').value = '';
  document.getElementById('contaCorrente').value = '';

  // Exibe uma mensagem de sucesso
  alert('Funcionário cadastrado com sucesso!');
});

document.getElementById('btnPesquisar').addEventListener('click', function() {
  const cpfPesquisa = document.getElementById('cpfPesquisa').value;

  // Obtém os dados dos funcionários armazenados em cache
  const cachedFuncionariosData = localStorage.getItem('funcionariosData');

  if (cachedFuncionariosData) {
    const cachedFuncionarios = JSON.parse(cachedFuncionariosData);

    // Pesquisa pelo CPF
    const funcionarioEncontrado = cachedFuncionarios.find(function(funcionario) {
      return funcionario.cpf === cpfPesquisa;
    });

    // Exibe os dados do funcionário encontrado
    if (funcionarioEncontrado) {

      document.getElementById('resultadoNome').textContent = funcionarioEncontrado.nomeCompleto;

      document.getElementById('resultadoEndereco').textContent = funcionarioEncontrado.endereco;

      document.getElementById('resultadoData').textContent = funcionarioEncontrado.dataDeNascimento;

      document.getElementById('resultadoRendaMensal').textContent = funcionarioEncontrado.rendaMensal;

      document.getElementById('resultadoProfissao').textContent = funcionarioEncontrado.profissao;

      document.getElementById('resultadoAltura').textContent = funcionarioEncontrado.altura;

      document.getElementById('resultadoPeso').textContent = funcionarioEncontrado.peso;

      document.getElementById('resultadoTipoSanguineo').textContent = funcionarioEncontrado.tipoSanguineo;

      document.getElementById('resultadoBanco').textContent = funcionarioEncontrado.banco;

      document.getElementById('resultadoAgencia').textContent = funcionarioEncontrado.agencia;

      document.getElementById('resultadoContaCorrente').textContent = funcionarioEncontrado.contaCorrente;

    } else {
      document.getElementById('resultadoNome').textContent = 'Funcionário não encontrado';
      document.getElementById('resultadoEndereco').textContent = '';

    }
    
  }
});

