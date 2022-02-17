//getting all the DOM element
const iconEye = document.getElementById("input-see");
const input = document.getElementById("input-password");
const overlay = document.getElementById("input-overlay");



iconEye.addEventListener("click", () => {
    //change the password to text
    if (input.type == "password") {
        //Switch to text
        input.type = "text"

        iconEye.classList.add("bx-show") //add the class of bx-show
        overlay.classList.add("overlay-content"); //add class overlay-content

    } else {
        input.type = "password";
        iconEye.classList.remove("bx-show") //removes the class of bx-show
        overlay.classList.remove("overlay-content"); //removes class overlay-content

    }

})