//Initial Data
let currentQuestions = 0;
let correctAnswer = 0;

showQuestions();



//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);



//Functions
function showQuestions(){
    if(questions[currentQuestions]){
        let q = questions[currentQuestions];

        progress = Math.floor((currentQuestions / questions.length) * 100);


        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        document.querySelector('.progress--bar').style.width = `${progress}%`;

        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op='${i}' class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickedEvent);
        })
    }
    else{
        finishQuiz();
    }
}

function optionClickedEvent(e) {
    let valueOption = parseInt(e.target.getAttribute('data-op')); 

    if(questions[currentQuestions].answer === valueOption){
        correctAnswer++;
    }
    currentQuestions ++;
    showQuestions();
}


function finishQuiz() {

    let scoreFinal = Math.floor((correctAnswer / questions.length) * 100);

    if(scoreFinal <= 30){
        document.querySelector('.scoreText1').innerHTML = "Tá ruim hein?!";
        document.querySelector('.scorePct').style.color = "#FF0000";
    }
    else if(scoreFinal > 30 && scoreFinal < 70){
        document.querySelector('.scoreText1').innerHTML = "Muito bom!";
        document.querySelector('.scorePct').style.color = "#FFFF00";
    }
    else{
        document.querySelector('.scoreText1').innerHTML = "Parabéns!!!";
        document.querySelector('.scorePct').style.color = "#0D630D";
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${scoreFinal}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}.`;


    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}


function resetEvent() {
    currentQuestions = 0;
    correctAnswer = 0;
    showQuestions();
}