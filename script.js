// Selecionando todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Se o botão startQuiz for clicado
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // mostrar info box
}

// Se o botão exitQuiz for clicado
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // esconder info box
}

// Se o botão continueQuiz for clicado
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // esconder info box
    quiz_box.classList.add("activeQuiz"); // mostrar quiz box
    showQuetions(0); // chamando a função showQestions
    queCounter(1); // passando o parâmetro 1 para queCounter
    startTimer(15); // chamando a função startTimer
    startTimerLine(0); // chamando a função startTimerLine
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Se o botão restartQuiz for clicado
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); // mostrar quiz box
    result_box.classList.remove("activeResult"); // esconder result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // chamando a função showQestions
    queCounter(que_numb); // passando o valor que_numb para queCounter
    clearInterval(counter); // limpar contador
    clearInterval(counterLine); // limpar counterLine
    startTimer(timeValue); // chamando a função startTimer
    startTimerLine(widthValue); // chamando a função startTimerLine
    timeText.textContent = "Tempo restante"; // mudar o texto de timeText para Tempo restante
    next_btn.classList.remove("show"); // esconder o botão next
}

// Se o botão quitQuiz for clicado
quit_quiz.onclick = ()=>{
    window.location.reload(); // recarregar a janela atual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Se o botão Next Que for clicado
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ // se o contador de questões for menor que o comprimento total das questões
        que_count++; // incrementar o valor de que_count
        que_numb++; // incrementar o valor de que_numb
        showQuetions(que_count); // chamando a função showQestions
        queCounter(que_numb); // passando o valor que_numb para queCounter
        clearInterval(counter); // limpar contador
        clearInterval(counterLine); // limpar counterLine
        startTimer(timeValue); // chamando a função startTimer
        startTimerLine(widthValue); // chamando a função startTimerLine
        timeText.textContent = "Tempo restante"; // mudar o texto de timeText para Tempo restante
        next_btn.classList.remove("show"); // esconder o botão next
    }else{
        clearInterval(counter); // limpar contador
        clearInterval(counterLine); // limpar counterLine
        showResult(); // chamando a função showResult
    }
}

// Pegando questões e opções do array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    // Criando uma nova tag span e div para questão e opção e passando o valor usando o índice do array
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>';
    que_text.innerHTML = que_tag; // adicionando a nova tag span dentro de que_tag
    option_list.innerHTML = option_tag; // adicionando a nova tag div dentro de option_tag
    
    const option = option_list.querySelectorAll(".option");

    // Adicionar atributo onclick a todas as opções disponíveis
    for(let i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// Criando novas tags div para os ícones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// Se o usuário clicar em uma opção
function optionSelected(answer){
    clearInterval(counter); // limpar contador
    clearInterval(counterLine); // limpar counterLine
    let userAns = answer.textContent; // pegando a opção selecionada pelo usuário
    let correcAns = questions[que_count].answer; // pegando a resposta correta do array
    const allOptions = option_list.children.length; // pegando todos os itens de opção
    
    if(userAns == correcAns){ // se a opção selecionada pelo usuário for igual à resposta correta do array
        userScore += 1; // aumentar o valor da pontuação com 1
        answer.classList.add("correct"); // adicionar cor verde à opção selecionada correta
        answer.insertAdjacentHTML("beforeend", tickIconTag); // adicionar ícone de tique à opção selecionada correta
        console.log("Resposta correta");
        console.log("Suas respostas corretas = " + userScore);
    }else{
        answer.classList.add("incorrect"); // adicionar cor vermelha à opção selecionada incorreta
        answer.insertAdjacentHTML("beforeend", crossIconTag); // adicionar ícone de cruz à opção selecionada incorreta
        console.log("Resposta errada");

        for(let i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ // se houver uma opção que corresponda à resposta do array
                option_list.children[i].setAttribute("class", "option correct"); // adicionar cor verde à opção correspondente
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // adicionar ícone de tique à opção correspondente
                console.log("Resposta correta selecionada automaticamente.");
            }
        }
    }
    for(let i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); // uma vez que o usuário seleciona uma opção, desabilitar todas as opções
    }
    next_btn.classList.add("show"); // mostrar o botão next se o usuário selecionou qualquer opção
}

function showResult(){
    info_box.classList.remove("activeInfo"); // esconder info box
    quiz_box.classList.remove("activeQuiz"); // esconder quiz box
    result_box.classList.add("activeResult"); // mostrar result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // se o usuário marcou mais de 3
        // Criando uma nova tag span e passando o número da pontuação do usuário e o número total de questões
        let scoreTag = '<span>Parabéns! , Você tem <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  // adicionando nova tag span dentro de score_Text
    }
    else if(userScore > 1){ // se o usuário marcou mais de 1
        let scoreTag = '<span>Parabéns , Você tem <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // se o usuário marcou menos de 1
        let scoreTag = '<span>Desculpe, você só tem <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; // mudar o valor de timeCount com o valor de time
        time--; // decrementar o valor de time
        if(time < 9){ // se o tempo for menor que 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; // adicionar 0 antes do valor de time
        }
        if(time < 0){ // se o tempo for menor que 0
            clearInterval(counter); // limpar contador
            timeText.textContent = "Tempo esgotado"; // mudar o texto de timeText para Tempo esgotado
            const allOptions = option_list.children.length; // pegando todos os itens de opção
            let correcAns = questions[que_count].answer; // pegando a resposta correta do array
            for(let i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ // se houver uma opção que corresponda à resposta do array
                    option_list.children[i].setAttribute("class", "option correct"); // adicionar cor verde à opção correspondente
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // adicionar ícone de tique à opção correspondente
                    console.log("Tempo esgotado: resposta correta selecionada automaticamente.");
                }
            }
            for(let i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); // uma vez que o tempo se esgota, desabilitar todas as opções
            }
            next_btn.classList.add("show"); // mostrar o botão next se o usuário selecionou qualquer opção
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; // incrementar o valor de time
        time_line.style.width = time + "px"; // aumentar a largura da time_line com o valor de time
        if(time > 549){ // se o valor de time for maior que 549
            clearInterval(counterLine); // limpar counterLine
        }
    }
}

function queCounter(index){
    // criando uma nova tag span e passando o número da questão e o total de questões
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions.length +'</p> Questões</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  // adicionando nova tag span dentro de bottom_ques_counter
}
