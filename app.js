// Seleção de elementos usando seletores de consulta avançados
const form = document.querySelector('#meuForm');
const submitBtn = document.querySelector('#submitBtn');
const cardsContainer = document.querySelector('#cardsContainer');

// Uso de arrow functions e desestruturação de objetos para obter os valores dos campos do formulário
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const { value: titulo } = document.querySelector('#titulo');
  const { value: descricao } = document.querySelector('#descricao');
  const { value: urlImagem } = document.querySelector('#urlImagem');
  const { value: assinatura } = document.querySelector('#assinatura');

  // Criação de um novo card apenas se todos os campos estiverem preenchidos
  if (titulo && descricao && urlImagem && assinatura) {
    const card = document.createElement('div');
    card.classList.add('card');

    const imagem = document.createElement('img');
    imagem.src = urlImagem;

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');

    const tituloElement = document.createElement('h2');
    tituloElement.textContent = titulo;

    const descricaoElement = document.createElement('p');
    descricaoElement.textContent = descricao;

    const assinaturaElement = document.createElement('p');
    assinaturaElement.classList.add('assinatura');
    assinaturaElement.textContent = assinatura;

    cardInfo.appendChild(tituloElement);
    cardInfo.appendChild(descricaoElement);

    card.appendChild(imagem);
    card.appendChild(cardInfo);
    card.appendChild(assinaturaElement);

    cardsContainer.appendChild(card);

    form.reset();
    submitBtn.disabled = true;
  }
});

// Função para criar objetos representando os campos de entrada
const criarCampoInput = (id, errorId, errorMessage) => ({
  input: document.querySelector(`#${id}`),
  error: document.querySelector(`#${errorId}`),
  errorMessage,
});

// Criação dos objetos representando os campos de entrada usando a função criarCampoInput
const camposInput = [
  criarCampoInput('titulo', 'tituloError', 'O título deve ter pelo menos 4 caracteres.'),
  criarCampoInput('descricao', 'descricaoError', 'A descrição deve ter pelo menos 4 caracteres.'),
  criarCampoInput('urlImagem', 'urlImagemError', 'A URL da imagem é inválida.'),
  criarCampoInput('assinatura', 'assinaturaError', 'Por favor, preencha o campo de assinatura.'),
];

// Função para realizar a validação de um campo de entrada
const validacao = (inputElement, errorElement, errorMessage) => {
  if (!inputElement.validity.valid) {
    errorElement.textContent = errorMessage;
  } else {
    errorElement.textContent = '';
  }
};

// Função para associar a validação a um campo de entrada e habilitar/desabilitar o botão de envio
const validacaoLabel = (inputElement, errorElement, errorMessage) => {
  inputElement.addEventListener('input', () => {
    validacao(inputElement, errorElement, errorMessage);

    // Verifica se todos os campos do formulário estão preenchidos
    const isFormValid = camposInput.every(({ input }) => input.value);

    submitBtn.disabled = !isFormValid;
  });
};

// Aplica a validação a todos os campos de entrada usando forEach e as funções validacaoLabel e criarCampoInput
camposInput.forEach(({ input, error, errorMessage }) => {
  validacaoLabel(input, error, errorMessage);
});

// Desabilita o botão de envio inicialmente
submitBtn.disabled = true;

// Seleção do elemento do switch de alternância de modo escuro usando o seletor de consulta de ID
const darkModeToggle = document.querySelector('#darkModeToggle');

// Alterna o tema escuro ao mudar o estado do switch de alternância e salva a preferência do usuário no armazenamento local
darkModeToggle.addEventListener('change', () => {
  const body = document.body;
  body.classList.toggle('dark-mode');

  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Verifica a preferência do usuário ao carregar a página e aplica o tema escuro se necessário
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }
});
