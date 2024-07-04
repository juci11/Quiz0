let score = 0;
let gameOver = false;
let currTiles = [];
let intervalId;
let usedIndexes = [];
const maxScore = 100; // Pontuação máxima para mostrar o botão de próxima fase

const palavras = [
    ["paralisado", "paralizado"], ["descanso", "descanço"], ["cansaço", "cançaço"], 
    ["incomodar", "encomodar"], ["estender", "extender"], ["com certeza", "concerteza"], 
    ["de repente", "derrepente"], ["por isso", "porisso"], ["a partir de", "apartir de"], 
    ["jeito", "geito"]
];

window.onload = function() {
  setGame();
  setupPlayButton(); // Configurar botão para iniciar música
}

function setGame() {
  const board = document.getElementById("board");
  board.innerHTML = ''; // Limpar o tabuleiro
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.className = "tile";
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    board.appendChild(tile);
  }
  setWords();
  intervalId = setInterval(setWords, 4000); // A cada 4 segundos
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function setWords() {
  if (gameOver) {
    return;
  }

  // Limpar quadrados anteriores
  currTiles.forEach(tile => {
    tile.innerHTML = "";
    tile.removeEventListener("click", selectTile); // Remover evento de clique anterior
  });
  currTiles = [];

  // Verificar se todas as palavras foram usadas
  if (usedIndexes.length === palavras.length) {
    usedIndexes = [];
  }

  let index;
  do {
    index = getRandomIndex(palavras.length);
  } while (usedIndexes.includes(index));
  
  usedIndexes.push(index);

  let [correta, incorreta] = palavras[index];

  // Escolher aleatoriamente um quadrado para a palavra correta
  let corretaIndex = getRandomIndex(9).toString();

  // Escolher aleatoriamente outro quadrado para a palavra incorreta
  let incorretaIndex;
  do {
    incorretaIndex = getRandomIndex(9).toString();
  } while (incorretaIndex === corretaIndex);

  // Definir a palavra correta no quadrado correto
  let divCorreta = document.createElement("div");
  divCorreta.className = "palavra-correta";
  divCorreta.textContent = correta;
  document.getElementById(corretaIndex).appendChild(divCorreta);
  currTiles.push(document.getElementById(corretaIndex));
  document.getElementById(corretaIndex).addEventListener("click", selectTile); // Adicionar evento de clique

  // Definir a palavra incorreta no quadrado incorreto
  let divIncorreta = document.createElement("div");
  divIncorreta.className = "palavra-incorreta";
  divIncorreta.textContent = incorreta;
  document.getElementById(incorretaIndex).appendChild(divIncorreta);
  currTiles.push(document.getElementById(incorretaIndex));
  document.getElementById(incorretaIndex).addEventListener("click", selectTile); // Adicionar evento de clique
}

function selectTile() {
  if (gameOver) {
    return;
  }

  // Desabilitar o evento de clique para evitar múltiplas contagens
  this.removeEventListener("click", selectTile);

  // Verificar se o quadrado clicado contém a palavra correta
  if (this.querySelector(".palavra-correta")) {
    score += 10;
    document.getElementById("score").innerText = score.toString();
    if (score >= maxScore) {
      showNextPhaseButton();
      clearInterval(intervalId);
      audio.pause(); // Pausa a música quando o jogo é ganho
    }
  } else {
    document.getElementById("score").innerText = "FIM DE JOGO: " + score.toString();
    gameOver = true;
    clearInterval(intervalId);
    audio.pause(); // Pausa a música quando o jogo termina
    // Remover eventos de clique restantes
    currTiles.forEach(tile => {
      tile.removeEventListener("click", selectTile);
    });
  }
}

function resetGame() {
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = score.toString();
  hideNextPhaseButton();
  usedIndexes = [];
  setGame();
}

function setupPlayButton() {
  let playButton = document.createElement("button");
  playButton.innerText = "Iniciar Música";
  playButton.addEventListener("click", playMusic);
  playButton.style.position = "absolute";
  playButton.style.top = "10px"; // Posição no topo
  playButton.style.left = "10px"; // Posição à esquerda
  playButton.style.fontSize = "18px"; // Tamanho da fonte maior
  playButton.style.padding = "10px 20px"; // Maior espaçamento interno
  document.body.appendChild(playButton);
}

let audio; // Declarar a variável audio fora da função playMusic para ser acessível globalmente

function playMusic() {
  audio = new Audio('music.mp3');
  audio.loop = true;
  audio.play().then(() => {
    console.log('Música iniciada com sucesso.');
  }).catch(error => {
    console.error('Erro ao reproduzir música:', error);
  });
}

function showNextPhaseButton() {
  let nextPhaseButton = document.createElement("button");
  nextPhaseButton.id = "nextPhaseButton";
  nextPhaseButton.innerText = "Próxima Fase";
  nextPhaseButton.style.backgroundColor = "#ffffff"; // Cor de fundo branca
  nextPhaseButton.style.color = "#000000"; // Cor do texto preto
  nextPhaseButton.style.padding = "15px 30px"; // Espaçamento interno
  nextPhaseButton.style.borderRadius = "8px"; // Borda arredondada
  nextPhaseButton.style.position = "absolute";
  nextPhaseButton.style.top = "10px"; // Posição no topo
  nextPhaseButton.style.left = "10px"; // Posição à esquerda
  nextPhaseButton.addEventListener("click", goToNextPhase);
  document.body.appendChild(nextPhaseButton);
}

function hideNextPhaseButton() {
  let nextPhaseButton = document.getElementById("nextPhaseButton");
  if (nextPhaseButton) {
    nextPhaseButton.remove();
  }
}

function goToNextPhase() {
  // Salvar o progresso no localStorage
  localStorage.setItem('fase1Completa', true);
  localStorage.setItem('fase2Desbloqueada', true);
  
  // Redirecionar para a página de entrada
  window.location.href = "fase2.html"; // Corrigido para redirecionar para a página correta
  
}