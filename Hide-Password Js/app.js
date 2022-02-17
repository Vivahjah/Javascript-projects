//getting all the DOM element
const iconEye = document.getElementById("input-see");
const input = document.getElementById("input-password");
const overlay = document.getElementById("input-overlay");



iconEye.addEventListener("click", () => {
    //change the password to text
    if (input.type == "password") {
        //Switch to text
        input.type = "text"

        iconEye.classList.add("bx-show")
        overlay.classList.add("overlay-content");

    } else {
        input.type = "password";
        iconEye.classList.remove("bx-show")
        overlay.classList.remove("overlay-content");

    }

})