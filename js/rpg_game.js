// 遊戲狀態的初始變數
let xp = 0; // 經驗值
let health = 100; // 血量
let gold = 50; // 金幣
let currentWeapon = 0; // 當前武器的索引
let fighting; // 當前戰鬥的怪物索引
let monsterHealth; // 怪物血量
let inventory = ["木棍"]; // 背包內的武器
let dodgeTimes = 0;
let monsters = generateMonsters();

window.onload =function(){
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const difficultySelect = document.getElementById("difficulty");
const musicControlBtn =document.querySelector("#musicControlBtn")
// 初始化首頁按鈕
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
update(locations[0]); // 初始化場景
return
}
// 抓取 HTML 元素

const text = document.querySelector("#RPGtext");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const musicControlBtn = document.querySelector("#musicControlBtn");
//監聽難度設定表單
const difficultySelect = document.getElementById("difficulty");
if (difficultySelect) {
  difficultySelect.addEventListener("change", () => {
    monsters = generateMonsters();
    alert("難度已變更");
  });
}

 // 傳給主 JS 使用：讀取當前難度倍率
 function getDifficultyMultiplier() {
  const select = document.getElementById('difficulty');
  const value = select ? parseInt(select.value) : 2;
  return isNaN(value) ? 2 : value;
 }


// 怪物資料，每隻怪物有名稱、等級、血量
function generateMonsters(){
const difficulty =getDifficultyMultiplier();
return [
  { name: "史萊姆", level: 2, health: 15*difficulty },
  { name: "野獸", level: 8, health: 60*difficulty },
  { name: "惡龍", level: 20*difficulty, health: 300*difficulty }
];
}

// 武器清單，每個武器有名稱與攻擊力
const weapons = [
  { name: '木棍', power: 5 },
  { name: '匕首', power: 30 },
  { name: '釘錘', power: 50 },
  { name: '劍', power: 100 }
];


// 場景資料，定義不同場景的按鈕文字、動作與描述
const locations = [
  {//場景0城鎮廣場
    name: "town square",
    "button text": ["前往商店", "前往洞窟", "挑戰惡龍"],
    "button functions": [goStore, goCave, fightDragon],
    text: "您現在位於城鎮廣場。你看到一個寫著「商店」的標誌."
  },
  {//場景1商店
    name: "store",
    "button text": ["增加10點生命(10金幣)", "購買武器(30金幣)", "返回城鎮廣場"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "你進入了商店"
  },
  {//場景2洞窟
    name: "cave",
    "button text": ["攻擊史萊姆", "攻擊野獸", "返回城鎮廣場"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "你來到了洞窟，這裡有許多怪物"
  },
  {//場景3戰鬥
    name: "fight",
    "button text": ["攻擊", "閃避", "逃跑"],
    "button functions": [attack, dodge, goTown],
    text: "進入了戰鬥!請選擇動作"
  },
  {//場景4戰勝怪獸
    name: "kill monster",
    "button text": ["返回城鎮廣場", "返回城鎮廣場", "返回城鎮廣場"],
    "button functions": [goTown, easterEgg, goTown],
    text: '怪物尖叫一聲「啊！」當它死去的時候。您將獲得經驗值並找到金幣。\n'
  },
  {//場景5失敗
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠"
  },
  {//場景6勝利
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "你成功擊敗了惡龍，你贏了! 🎉"
  },
  {//場景7彩蛋
    name: "easter egg",
    "button text": ["2", "8", "返回城鎮廣場?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "你觸發了隱藏彩蛋!從上方選擇一個數字。將從 0 到 10 之間隨機生成十個數字。如果您選擇的數字與其中一個隨機數字匹配，您就贏了!"
  },//場景8逃離
  { name: "Escape monster",
    "button text": ["返回城鎮廣場", "返回城鎮廣場", "返回城鎮廣場"],
    "button functions": [goTown, goTown, goTown],
    text: '"\n你逃離了怪物，雖然在閃避時受了點傷，但也學到了一點經驗..."'}
];




// 更新場景畫面與按鈕功能
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

// 各場景轉換函式
function goTown() {
  update(locations[0]);
  stopSound('bgm');
  musicControlBtn.style.display = "none";
  difficultySelect.disabled = false; // 離開戰鬥後解除難度鎖定
}
function goStore() {
  update(locations[1]);
}
function goCave() {
  update(locations[2]);
}

// 購買血量
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "你沒有足夠的金幣";
  }
}
//購買武器
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon].name;
      inventory.push(newWeapon);
      text.innerText = "你獲得了 " + newWeapon + "。武器清單: " + inventory;
      goldText.innerText = gold;
    } else {
      text.innerText = "你沒有足夠的金幣購買新武器";
    }
  } else {
    text.innerText = "你已經買走最好的武器了!";
    button2.innerText = "賣掉多餘武器獲得15金幣";
    button2.onclick = sellWeapon;
  }
}
//賣掉多餘武器
function sellWeapon() {
  if (inventory.length > 1) {
    let sold = inventory.shift();
    gold += 15;
    text.innerText = "你賣掉了 " + sold + "。武器清單: " + inventory;
    goldText.innerText = gold;
  } else {
    text.innerText = "你不能賣掉你唯一的武器!";
  }
}

// 和不同怪物戰鬥
function fightSlime() {
  fighting = 0;
  goFight();
}
function fightBeast() {
  fighting = 1;
  goFight();
}
function fightDragon() {
  fighting = 2;
  goFight();
  playSound('bgm')
  musicControlBtn.style.display = "block"
}
//進入戰鬥並顯示怪物資料
function goFight() {
  update(locations[3]);
  monsterStats.style.display = "block";
  monsterHealth = monsters[fighting].health;
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  dodgeTimes = 0;
  difficultySelect.disabled = true; //戰鬥中鎖定難度
}
//攻擊怪物
function attack() {
  text.innerText = "和" + monsters[fighting].name + "展開戰鬥 \n";
  text.innerText += "你使用 " + weapons[currentWeapon].name + " 發動攻擊 ";
  if (isMonsterHit()) {
   const weaponPower = weapons[currentWeapon].power;
  const damage = weaponPower + Math.floor(Math.random() * xp)+1;
  monsterHealth -= damage;
  monsterHealthText.innerText = monsterHealth;
  text.innerText = `你使用${weapons[currentWeapon].name}造成了${damage}點傷害。`;
  } else {
    text.innerText = " 你的攻擊落空了!";
  }

  // 更新畫面
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  // 判斷勝敗
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }else{
    monsterAttack();
  }

  // 武器有機率損壞
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " 你的 " + inventory.pop() + " 在戰鬥中損壞了!";
    currentWeapon--;
  }
}

// 怪物反擊
function monsterAttack() {
  let injuried = getMonsterAttackValue(monsters[fighting].level);
  health -= injuried;
  text.innerText += "\n你受到了 " + injuried + " 點傷害。";
  if (health <= 0) {
    update(locations[5]);
  }
}
//怪物攻擊邏輯
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  dodgeTimes++ ;
  text.innerText = "你躲開了 " + monsters[fighting].name + " 的攻擊";
  if(dodgeTimes >5 ){
    const difficulty = getDifficultyMultiplier();
    health -= (1+difficulty);
    xp += (5-difficulty);

    healthText.innerText = health;
    xpText.innerText = xp;

    
    update(locations[8]);
  }
  
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  monsterStats.style.display = "none";
  difficultySelect.disabled = false; // ✅ 離開戰鬥後解除鎖定
  update(locations[5]);
}

function winGame() {
  stopSound("bgm");
  monsterStats.style.display = "none";
  difficultySelect.disabled = false; // ✅ 離開戰鬥後解除鎖定
  update(locations[6]);
  const difficulty = getDifficultyMultiplier();
  if(difficulty ==  1 || difficulty ==2 ){
    text.innerText += "\n 嘗試挑戰更高難度吧!"
  }else{
    text.innerText += "\n 太強了!恭喜通過困難模式!\n (想體驗彩蛋可以玩看看簡單模式) "
  }
  
}

function restart() {
  // 重設初始值
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["木棍"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
  
}

// 彩蛋小遊戲
function easterEgg() {
  const difficulty = getDifficultyMultiplier();
  if (difficulty === 1) {
    update(locations[7]);
  } else {
    goTown();
  }
}
function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "你選擇了 " + guess + " 隨機產生10個數字:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += "  <"+numbers[i] +">  ";
  }
  if (numbers.includes(guess)) {
    text.innerText += "\n恭喜猜對了! 獲得了20金幣!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "\n你猜錯了! 扣除10點生命!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
function saveGame() {
  const data = {
    xp,
    health,
    gold,
    difficulty: document.getElementById('difficulty').value,
    inventory
  };
    localStorage.setItem('rpgGameSave', JSON.stringify(data));
    alert('遊戲進度已儲存');
}

function loadGame() {
  const saved = localStorage.getItem('rpgGameSave');

  // 檢查是否真的有資料
  if (!saved) {
    alert('⚠ 沒有可用的儲存進度');
    return;
  }

  try {
    const data = JSON.parse(saved);

    // 檢查必要欄位是否存在且有效
    if (
      typeof data.xp !== 'number' ||
      typeof data.health !== 'number' ||
      typeof data.gold !== 'number' ||
      !Array.isArray(data.inventory) ||
      !data.difficulty
    ) {
      throw new Error("儲存資料格式錯誤或遺失欄位");
    }

    // 更新變數與畫面
    xp = data.xp;
    health = data.health;
    gold = data.gold;
    inventory = data.inventory;
    currentWeapon = inventory.length - 1;

    document.getElementById('xpText').textContent = xp;
    document.getElementById('healthText').textContent = health;
    document.getElementById('goldText').textContent = gold;
    document.getElementById('difficulty').value = data.difficulty;

    alert('✅ 已成功載入儲存進度');
  } catch (e) {
    alert('❌ 載入失敗：儲存資料損毀或不完整');
    console.error(e);
  }
}

function deleteGame(){
  localStorage.clear();
}

  // 音效播放
  function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) sound.play();
  }
  //音樂停止
  function stopSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
      sound.pause();
      sound.currentTime = 0; // 回到開頭
    }
  }

  musicControlBtn.onclick = controlMusic;
  //控制音樂停止/播放按鈕
  function controlMusic(){
  const bgm = document.getElementById("bgm");
  if (bgm.paused) {
    bgm.play();
    musicControlBtn.src = "media/sound.png";
  } else {
    bgm.pause();
    musicControlBtn.src = "media/mute.png"
  }
  };
