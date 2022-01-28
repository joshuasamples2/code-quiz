var questions = [
  {
    title: 'A very useful tool for used during development and debugging for printing content to the debugger is:',
    choices: ['Javascript', 'terminal', 'for loops', 'console log'],
    answer: 'console log'
},
  {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses'
  },
  {
      title: 'Arrays in Javascript can be used to store ____.',
      choices: ['numbers', 'strings', 'booleans', 'all of the above'],
      answer: 'all of the above'
  },
  {
      title: 'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
      answer: 'quotes'
  },
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts'
},
];
var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector('#currentTime');
var timer = document.querySelector('#startBtn');
var questionsDiv = document.querySelector('#questionsDiv');
var wrapper = document.querySelector('#wrapper');
var secondsLeft = 120;
var holdInterval = 0;
var penalty = 10;
var createUl = document.createElement('ul');

timer.addEventListener('click', function () {
  if (holdInterval === 0) {
      holdInterval = setInterval(function () {
          secondsLeft--;
          currentTime.textContent = 'Time: ' + secondsLeft;
          if (secondsLeft <= 0) {
              clearInterval(holdInterval);
              done();
              currentTime.textContent = `Time's up!`;
          }
      }, 1000);
  }
  render(questionIndex);
});

function render(questionIndex) {
  questionsDiv.innerHTML = '';
  createUl.innerHTML = '';
  for (var i = 0; i < questions.length; i++) {
      var userQuestion = questions[questionIndex].title;
      var userChoices = questions[questionIndex].choices;
      questionsDiv.textContent = userQuestion;
  }
  userChoices.forEach(function (newItem) {
      var listItem = document.createElement('li');
      listItem.textContent = newItem;
      questionsDiv.appendChild(createUl);
      createUl.appendChild(listItem);
      listItem.addEventListener('click', (compare));
  })
}
function compare(event) {
  var element = event.target;
  if (element.matches('li')) {
      var createDiv = document.createElement('div');
      createDiv.setAttribute('id', 'createDiv');
      if (element.textContent == questions[questionIndex].answer) {
          score++;
          createDiv.textContent = 'Correct!';
      } else {
          secondsLeft = secondsLeft - penalty;
          createDiv.textContent = 'Wrong. The correct answer was  ' + questions[questionIndex].answer;
      }
  }
  questionIndex++;
  if (questionIndex >= questions.length) {
    done();
      createDiv.textContent = 'You got  ' + score + ' out of ' + questions.length ;
  } else {
      render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);
}
function done() {
  questionsDiv.innerHTML = '';
  currentTime.innerHTML = '';
  var pTag = document.createElement('pTag');
  pTag.setAttribute('id', 'pTag');
  questionsDiv.appendChild(pTag);
  if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      clearInterval(holdInterval);
      pTag.textContent = 'Your final score is '+ score * 2 + timeRemaining;
  }
}