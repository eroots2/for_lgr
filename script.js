
var codes = [
    "Dm7", "G7", "Cmaj7", 
    "Gm7", "C7", "Fmaj7",
    "Cm7", "F7", "B♭maj7",
    "Fm7", "B♭7", "E♭maj7",
    "Bbm7", "E♭7", "A♭maj7",
    "E♭m7", "A♭7", "D♭maj7",
    "A♭m7", "D♭7", "G♭maj7",
    "C#m7", "F#7", "Bmaj7",
    "F#m7", "B7", "Emaj7",
    "Bm7", "E7", "Amaj7",
    "Em7", "A7", "Dmaj7",
    "Am7", "D7", "Gmaj7"
];

var index = 0;
var time_check = 0;
var time_end = true;
var input_value = 3;

var prev_index = 0;

var option = "1";
var code_index = 0;

    const clickSound = new Audio('https://www.soundjay.com/button/beep-07.wav');

function getRandomNumber(opt) {
    if (opt === "1"){
        return Math.floor(Math.random() * 36); // 0~35 중 랜덤
    } else if (opt === "3") {
        const multiples = Array.from({ length: 36 }, (_, i) => i).filter(n => n % 6 === 0);
        return multiples[Math.floor(Math.random() * multiples.length)]; // 36보다 작은 배수 중 랜덤
    }
    return null;
}

function CodeIndexSet(){
    const selected = document.querySelector('input[name="option"]:checked').value;
    console.log(`${selected}, ${typeof(selected)}`);
    option = selected; 


    var temp = getRandomNumber(option)
    while(temp == prev_index){
        temp = getRandomNumber(option)
    }

    const output = document.getElementById('output');
    if (option === "1") {
        output.className = ''; // 기존 스타일 제거
        const text = codes[temp];
        output.innerHTML = text; // 하나의 큰 텍스트
    } else if (option === "3") {
        output.className = 'split';
        const text = [ codes[temp], codes[temp+1], codes[temp+2] ]
        output.innerHTML = `<div>${text[0]}</div><div>${text[1]}</div><div>${text[2]}</div>`; // 3등분
    }
    prev_index = temp
}


function InputCheck(){
    var inputValue = document.getElementById('inputValue').value;
    if(inputValue <= 3 || inputValue > 1000000) {
        inputValue = 3;
        document.getElementById('inputValue').value = 3;
    }
    input_value = inputValue;
    console.log(`input : ${input_value}`);
}

function CountTime() {
    const barLength = 100; // 막대의 총 길이
    const progressBar = document.getElementById('progressBar');
    if(!time_end){
        var temp = time_check%(input_value)+1;
        const filledLength = Math.round((temp / (input_value)) * barLength); // 채워진 부분의 길이 계산
        const emptyLength = barLength - filledLength; // 빈 부분의 길이 계산
    
        const filledBar = "◼︎".repeat(filledLength); // 채워진 부분
        const emptyBar = "◻︎".repeat(emptyLength); // 빈 부분
        const progress = Math.max(0, Math.floor(emptyLength)+1);
        progressBar.style.height =`${progress}%`;
    
        // document.getElementById("time_show").innerHTML = filledBar+emptyBar;
    }
}

function readRadioValue(){
}

function start_time() {
    const progressBar = document.getElementById('progressBar');
  if(time_end) { 
     console.log("start 버튼이 클릭되었습니다!");
     time_check = 0;
     time_end = false;
     CodeIndexSet();
     intervalTimer(1000);
  }
  progressBar.style.height ='100%';

}

function next_btn() {
     console.log("next  버튼이 클릭되었습니다!");
    CodeIndexSet();
}

function end_time() {
    console.log("end 버튼이 클릭되었습니다!");
    time_end = true;
  }


function intervalTimer(timeout) {
    const timerId = setInterval(() => {
      const now = Date.now();
      time_check++;

      if(!time_end){
        console.log(`${time_check}sec`);
        if(time_check > 1000000){
            time_check = 0;
        }

        if(time_check%input_value === 0){
            CodeIndexSet();
        }
      }
      CountTime();

  
      if (time_end) {
        console.log('타이머 종료');
        clearInterval(timerId);
      }
    }, timeout);
  }




  let interval;

  function startMetronome() {
    const bpmInput = document.getElementById('bpm');
    const arm = document.getElementById('arm');
    const bpm = parseInt(bpmInput.value, 10);

    if (isNaN(bpm) || bpm < 30 || bpm > 300) {
      alert('Please enter a BPM value between 30 and 300.');
      return;
    }

    const intervalTime = 60000 / bpm;
    let isLeft = true;

    clearInterval(interval);
    interval = setInterval(() => {
      arm.style.transform = isLeft ? 'rotate(-45deg)' : 'rotate(45deg)';
      isLeft = !isLeft;
      clickSound.currentTime = 0; // Reset sound to start
      clickSound.play();
    }, intervalTime / 2);
  }

  function stopMetronome() {
    clearInterval(interval);
  }