const add_row_button = document.getElementById("add-row")
add_row_button.addEventListener("click", add_row_trigger)

function add_row_trigger(){
    let add_row = document.getElementById("row")
    add_row.innerHTML += `<tr>
        <td><input type="text" name="id" value=""></td>
        <td><input type="text" name="nome" value=""></td>
        <td><input type="text" name="tipo" value=""></td>
        <td><input type="text" name="descricao" value=""></td>
        <td><input type="text" name="ultima_modificacao" value=""></td>
        <td><input type="text" name="atualizado" value=""></td>
        <td class="delete-row">X</td>
    </tr>
    `
}

document.getElementById("row").addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-row")) {
        e.target.closest("tr").remove();
    }
});

// =====--- MENU ---=====
let upper = document.getElementById("uppercase-button")
let lower = document.getElementById("lowercase-button")

upper.addEventListener("click", UpperCase)
lower.addEventListener("click", LowerCase)

var font_size = `18`

function UpperCase() {
    let font_size_ajust = document.querySelectorAll(".input-table")
    font_size += 1
    font_size_ajust.forEach(font => {
        font.style.fontSize = `${font_size}px`
    })
}

function LowerCase() {
    let font_size_ajust = document.querySelectorAll(".input-table")
    font_size -= 1
    font_size_ajust.forEach(font => {
        font.style.fontSize = `${font_size}px`
    })
}
const menu_button = document.getElementById("menu-button")
menu_button.addEventListener("click", menu_button_trigger)

let menuIsOpen = false

function menu_button_trigger() {
    let menu = document.getElementById("menu-box")
    let buttons = document.querySelectorAll(".tools-button")
    let line_1 = document.getElementById("line-1")
    let line_2 = document.getElementById("line-2")
    let line_3 = document.getElementById("line-3")

    if (!menuIsOpen) {
        line_1.style.transform = `rotate(45deg)`
        line_1.style.marginTop = `50%`
        line_3.style.transform = `rotate(135deg)`
        line_3.style.marginTop = `-30%`
        line_2.style.background = `none`
        line_2.style.marginTop = `-25%`

        menu.style.width = `300px`
        menu.style.height = `450px`
        menu.style.fontSize = `18px`
        menuIsOpen = true

        upper.style.width = `64px`
        upper.style.height = `64px`
        lower.style.width = `64px`
        lower.style.height = `64px`
        upper.style.background = `var(--cor-terceira)`
        lower.style.background = `var(--cor-terceira)`

        buttons.forEach(btn => {
            btn.style.fontSize = `24px`
            btn.style.width = `128px`
            btn.style.height = `64px`
        })
    } else {
        line_1.style.transform = ``
        line_1.style.marginTop = ``
        line_3.style.transform = ``
        line_3.style.marginTop = ``
        line_2.style.background = `var(--cor-primaria)`
        line_2.style.marginTop = ``

        menu.style.width = `0px`
        menu.style.height = `0px`
        menu.style.fontSize = `0px`
        menuIsOpen = false

        upper.style.width = `0px`
        upper.style.height = `0px`
        lower.style.width = `0px`
        lower.style.height = `0px`
        upper.style.background = `none`
        lower.style.background = `none`

        buttons.forEach(btn => {
            btn.style.fontSize = `0px`
            btn.style.width = `0px`
            btn.style.height = `0px`
        })
    }
}

// Filtro/Ordenar
// ===== ORDENAR TABELA =====
let sortDirection = true; // true = asc, false = desc

function sortTable(colIndex) {
    const table = document.querySelector("table tbody");
    const rows = Array.from(table.rows);

    rows.sort((a, b) => {
        let x, y;

        if (colIndex === 5) { // coluna do Status (select)
            x = a.cells[colIndex].querySelector("select").value.toLowerCase();
            y = b.cells[colIndex].querySelector("select").value.toLowerCase();
        } else { // outras colunas (input)
            x = a.cells[colIndex].querySelector("input").value.toLowerCase();
            y = b.cells[colIndex].querySelector("input").value.toLowerCase();
        }

        if (!isNaN(x) && !isNaN(y)) {
            x = Number(x);
            y = Number(y);
        }

        if (x < y) return sortDirection ? -1 : 1;
        if (x > y) return sortDirection ? 1 : -1;
        return 0;
    });

    sortDirection = !sortDirection;

    rows.forEach(row => table.appendChild(row));
}

