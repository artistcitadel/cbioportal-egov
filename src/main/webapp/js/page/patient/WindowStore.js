var size;
function setWindowSize() {
    size = {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

window.addEventListener("resize", setWindowSize);
