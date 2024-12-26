
var codes = [
    "Dm7", "G7", "Cmaj7", 
    "Gm7", "C7", "Fmaj7",
    "Cm7", "F7", "B♭maj7",
    "Fm7", "B♭7", "E♭maj7",
    "Bbm7", "E♭7", "A♭maj7",
    "E♭m7", "A♭7", "D♭maj7",
    "A♭m7", "D♭b7", "G♭maj7",
    "C#m7", "F#7", "Bmaj7",
    "F#m7", "B7", "Emaj7",
    "Bm7", "E7", "Amaj7",
    "Em7", "A7", "Dmaj7",
    "Am7", "D7", "Gmaj7"
];

var index = 0;
var time_check = 0;
var time_end = false;
var input_value = 3;


var option = "1";
var code_index = 0;


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
    var temp = getRandomNumber(option)

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
    const barLength = 30; // 막대의 총 길이
    if(!time_end){
        var temp = time_check%input_value;
        const filledLength = Math.round((temp / input_value) * barLength); // 채워진 부분의 길이 계산
        const emptyLength = barLength - filledLength; // 빈 부분의 길이 계산
    
        const filledBar = "◼︎".repeat(filledLength); // 채워진 부분
        const emptyBar = "◻︎".repeat(emptyLength); // 빈 부분
    
        document.getElementById("time_show").innerHTML = filledBar+emptyBar;
    }
    else{
        document.getElementById("time_show").innerHTML = "❤︎︎".repeat(barLength)
    }
}

function readRadioValue(){
    const selected = document.querySelector('input[name="option"]:checked').value;
    console.log(`${selected}, ${typeof(selected)}`);
    option = selected; 
}

function start_time() {
  console.log("start 버튼이 클릭되었습니다!");
  time_check = 0;
  time_end = false;
  intervalTimer(1000);
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