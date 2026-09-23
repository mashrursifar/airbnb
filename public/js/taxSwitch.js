let taxSwitch = document.querySelector(".tax-switch");
taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-display");

    for (info of taxInfo) {
        if (info.style.display != "inline") {
            info.style.display = "inline";
        } else {
            info.style.display = "none";
        }
    }
});
 