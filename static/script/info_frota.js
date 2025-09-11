const menu_button = document.getElementById("menu-button")
menu_button.addEventListener("click", menu_button_trigger)

let menuIsOpen = false

function menu_button_trigger(){
    let menu = document.getElementById("menu-box")
    if (!menuIsOpen) {
        menu.style.width = `300px`
        menu.style.height = `450px`
        menu.style.fontSize = `18px`
        menuIsOpen = true
    } else {
        menu.style.width = `0px`
        menu.style.height = `0px`
        menu.style.fontSize = `0px`
        menuIsOpen = false
    }
}
