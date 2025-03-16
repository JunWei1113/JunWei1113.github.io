    // 定義作品資料，每個作品包含標題和多張圖片
    const projects = [
        {
            title: "PhotoShop網頁切版",
            images: ["img/webbyph.jpg", "img/dog.gif","project1-3.jpg"]
        },
        {
            title: "作品標題 2",
            images: ["project2-1.jpg", "project2-2.jpg", "project2-3.jpg"]
        },
        {
            title: "作品標題 3",
            images: ["project2-1.jpg", "project2-2.jpg", "project2-3.jpg"]
        },
        {
            title: "作品標題 4",
            images: ["project2-1.jpg", "project2-2.jpg", "project2-3.jpg"]
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