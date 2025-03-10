//下拉選單
function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}
//聯絡我表單
function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("請輸入有效的電子郵件地址！");
        return false;
    }
    if (message.length < 10) {
        alert("訊息至少需包含10個字！");
        return false;
    }
    alert("表單已成功提交！");
    return true;
}
//回頂部按鈕
window.onscroll = function() {scrollFunction()};
 
function scrollFunction() {console.log(121);
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("Topbtn").style.display = "block";
    } else {
        document.getElementById("Topbtn").style.display = "none";
    }
}
function goTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}