const openMenuBtn = document.getElementById("open-menu");
const closeMenuBtn = document.getElementById("close-menu");
const asideMenu = document.querySelector("aside");

if (openMenuBtn && closeMenuBtn && asideMenu) {
    openMenuBtn.addEventListener("click", () => {
        asideMenu.classList.add("aside-visible");
    });

    closeMenuBtn.addEventListener("click", () => {
        asideMenu.classList.remove("aside-visible");
    });
}