let low = 1 ;
let upper =100;
let times =0; //計數器
let userans =0;
let btn = document.getElementById("ansbtn") 
const result = document.querySelector("#result")

randomAnswer();
function randomAnswer(){
 answer = Math.floor(Math.random()*100)+1;
 console.log(answer);
}


window.addEventListener("keyup",function(e){
    if(e.key === "Enter" && !btn.disabled){
        guessStar();
    }
})//Enter鍵開始

function guessStar(){    
    const guess = document.getElementById("guessnum");
    console.log(Number(guess.value));
    userans = Number(guess.value);  
    if (userans==""||userans<low || userans > upper){
        result.textContent="請重新輸入"+low+"~"+upper+"的整數";        
    }else if(guess.value < answer){
            low = userans;
           result.textContent="請輸入"+low+"~"+upper+"的整數";
           times+=1;               
    }else if(guess.value > answer){       
            upper = userans;
            result.textContent="請輸入"+low+"~"+upper+"的整數";
            times+=1;           
    }else{
            times+=1
            result.textContent="答對了!答案是:"+answer+"共猜了"+times+"次";
            document.getElementById("reBtn").disabled = false;
            document.getElementById("ansbtn").disabled = true;
            guessnum.disabled = true;
            if(times==1){
                result.textContent="答對了!答案是:"+answer+"只猜了"+times+"次\r你偷看答案吧!?";
            }
    }
        
    guess.value = "";   
}
function restar(){
    low = 1;
    upper = 100;
    times = 0;
    userans = 0;
    randomAnswer();
    
    result.textContent = "請輸入 1 ~ 100 的整數";
    console.log(answer);
    guessnum.disabled = false;
    document.getElementById("reBtn").disabled =true;
    document.getElementById("ansbtn").disabled = false;
    document.getElementById("guessnum").disabled = false;
}