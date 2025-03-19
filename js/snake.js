let gameLoop;
function startGame() {
    canChangeDirection = true;// 設定可以改變方向
    snakePosition();//管理與調整snake的位置
    let lose = isOver();//判斷遊戲結束沒
    if(lose){
        document.body.addEventListener('keydown', playAgain);//確認是否再玩一次
        clearInterval(gameLoop); // 停止遊戲迴圈
        return;
    }

    clearScreen();//初始化遊戲畫面
    checkColli();//確認蛇和蘋果的碰撞
    let win = isWin();//確認勝利條件
    if(win){
        clearInterval(gameLoop); // 停止遊戲迴圈
        return;
    }
    drawApple();//生產蘋果方塊
    drawSnake();//生產蛇方塊
    drawScore();//顯示分數
}

const canvas = document.getElementById('gamesnake');// 取得畫布元素
const ctx = canvas.getContext('2d');// 取得 2D 繪圖上下文
// 蛇的身體部件類別
class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
// 阻止方向鍵滾動畫面
const onkeydown = (e) => {
      const keyCodes = [40, 39, 38, 37, 32];
      if (keyCodes.includes(e.keyCode)) { 
        e.preventDefault(); 
      }
}

window.addEventListener('keydown', onkeydown);
document.body.addEventListener('keydown', keyDown);// 監聽鍵盤事件控制蛇的移動

//設定變數
let speed = 5;// 初始速度
let canChangeDirection = true; //防止方向輸入過快產生bug
let tileCount = 20; //格子數量
let tileSize = canvas.width / tileCount - 2; //格子大小
//蛇頭初始位置
let headX = 10; 
let headY = 10;
const snakePart = [];// 存放蛇身體的陣列
let tailLen = 0;// 蛇的初始長度
//蘋果初始位置
let appleX = 5;
let appleY = 5;
//向量
let xV = 0;
let yV = 0;
let score = 0;//分數
let move_dir = 0; 
//控制蛇頭位置
function snakePosition() {
    headX = headX + xV;
    headY = headY + yV;
}

function isOver() {
    let Over = false;
    //判斷是否撞牆
    if(headX < 0 || headX == tileCount || headY < 0 || headY == tileCount){
        Over = true;
    }
    //判斷是否撞到自己
    for(let i = 0; i < snakePart.length; i++){
        if(headX == snakePart[i].x && headY == snakePart[i].y){
            Over = true;
        }
    }
    //結束畫面
    if(Over){
        ctx.fillStyle = "white";
        ctx.font = "50px Poppins";
        ctx.fillText("Game Over!", canvas.width/6.5, canvas.height /2);
        ctx.font = "40px Poppins";
        ctx.fillText("再玩一次?", canvas.width/3.5, canvas.height /2 + 50 );
        ctx.font = "25px Poppins";
        ctx.fillText("按空白鍵", canvas.width/2.7, canvas.height /2 +100 );
    }
    return Over;
}
//按下空白鍵重新開始
function playAgain(event) {
    if(event.keyCode == 32){
        location.reload();
    }
}
//畫面初始化
function clearScreen() {
    ctx.fillStyle= 'black';
    ctx.fillRect(0, 0, 400, 400);
}
//檢查是否吃到蘋果
function checkColli() {
    if (appleX === headX && appleY === headY) {
        let newApplePosition = false;
        while (!newApplePosition) {
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            // 確保蘋果不會與蛇重疊
            newApplePosition = !snakePart.some(part => part.x === appleX && part.y === appleY);
        }
        tailLen++; //蛇長度增加
        score++; //分數增加
        //每得2分提高速度
        if (score % 2 == 0) { 
            speed += 1;
            updateSpeed();
        }
    }
}
//判斷是否勝利
function isWin() {
    let win = false;
    if(score == 25){
        win = true;
    }
    if(win){
        ctx.fillStyle = "white";
        ctx.font = "50px Poppins";
        ctx.fillText("你贏了!", canvas.width/3.3, canvas.height /2)
    }
    return win;
}
//生成蘋果
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
//生成蛇
function drawSnake() {
    
    ctx.fillStyle = "green";
    for(let i = 0; i< snakePart.length; i++){
        let part = snakePart[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakePart.push( new SnakePart(headX, headY));
    if(snakePart.length > tailLen){
        snakePart.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY *tileCount, tileSize, tileSize);
}
//生成分數
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Poppins";
    ctx.fillText("Score: " + score, canvas.width-50, 10);
}
//控制蛇移動方向
function keyDown(event) {
   if(!canChangeDirection) return;
    //go up
    if(event.keyCode== 38){
        if(yV == 1) 
            return;
        yV = -1;
        xV = 0;
        canChangeDirection = false;
    }

    //go down
    if(event.keyCode == 40){
        if(yV == -1) 
            return;
        yV = 1;
        xV = 0;
        canChangeDirection = false;
    }

    //go left
    if(event.keyCode == 37){
        if(xV == 1) 
            return;
        yV = 0;
        xV = -1;
        canChangeDirection = false;
    }

    //go right
    if(event.keyCode == 39){
        if(xV == -1) 
            return;
        yV = 0;
        xV = 1;
        canChangeDirection = false;
    }
    
}
//更新速度
function updateSpeed() {
    clearInterval(gameLoop);
    gameLoop = setInterval(startGame, 1000 / speed);
}
updateSpeed();