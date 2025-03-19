    // 定義作品資料，每個作品包含標題和多張圖片
    const projects = [
        {
            title: "PhotoShop網頁切版",
            images: ["img/wireframe.png", "img/webbyph.jpg","img/buymeweb.png"],
            caption: "練習先使用PS排版出網頁版面，匯出成網頁後參造切版樣式製作網頁內容"
        },
        {
            title: "Figma網頁製作練習",
            images: ["img/screenFigma.PNG", "img/figmaPrototype.PNG", "img/byfigma.gif"],
            caption: "練習用figma繪製網站及簡易UI設計，並加入互動功能，做出簡易版網頁"
        },
        {
            title: "WordPress網站製作",
            images: ["img/buymebake-home.png", "img/buymebake-shop.png", "img/buymebake-cart.png"],
            caption: "練習用wordPress架構網站，並用WooCommerce建立商店"
        },
        {
            title: "作品標題 4",
            images: ["project2-1.jpg", "project2-2.jpg", "project2-3.jpg"],
            caption: "作品說明4"
        }
        ];
    let currentProjectIndex = 0;
    let currentImageIndex = 0;
    // 開啟模態視窗，載入作品的圖片與標題
    function openModal(projectIndex) {
        currentProjectIndex = projectIndex;
        currentImageIndex = 0;
        
        const modal = document.getElementById("modal");
        const mainImage = document.getElementById("main-image");
        const thumbnailsContainer = document.querySelector(".thumbnails");
        
        document.getElementById("modal-title").textContent = projects[projectIndex].title;
        mainImage.src = projects[projectIndex].images[0];
        document.getElementById("caption").textContent = projects[projectIndex].caption;    

        // 清空舊縮圖
        thumbnailsContainer.innerHTML = "";
        
        // 產生縮圖
        projects[projectIndex].images.forEach((imgSrc, index) => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.onclick = () => updateMainImage(index);
            thumbnailsContainer.appendChild(img);
        });
        modal.style.display = "flex";
    }
    // 更新主要顯示圖片
    function updateMainImage(index) {
        currentImageIndex = index;
        document.getElementById("main-image").src = projects[currentProjectIndex].images[index];
    }
    // 關閉模態視窗（點擊背景或按下 ESC）
    function closeModal(event) {
        if (event?.target === document.getElementById("modal") || event === undefined) {
            document.getElementById("modal").style.display = "none";
        }
        }
    // 鍵盤控制 (左右鍵換圖, ESC關閉)
    document.addEventListener("keydown", function(event) {
        if (document.getElementById("modal").style.display === "flex") {
            if (event.key === "ArrowRight") {
                currentImageIndex = (currentImageIndex + 1) % projects[currentProjectIndex].images.length;
                updateMainImage(currentImageIndex);
            } else if (event.key === "ArrowLeft") {
                currentImageIndex = (currentImageIndex - 1 + projects[currentProjectIndex].images.length) % projects[currentProjectIndex].images.length;
                 updateMainImage(currentImageIndex);
            } else if (event.key === "Escape") {
                closeModal();
            }
        }
    });