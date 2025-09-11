const menu_button = document.getElementById("menu-button")

let upper = document.getElementById("uppercase-button")
let lower = document.getElementById("lowercase-button")

menu_button.addEventListener("click", menu_button_trigger)
upper.addEventListener("click", UpperCase)
lower.addEventListener("click", LowerCase)

let menuIsOpen = false

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

function menu_button_trigger() {
    let menu = document.getElementById("menu-box")
    let buttons = document.querySelectorAll(".tools-button")
    let salvar = document.getElementById("salvar")
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

        salvar.style.top = `364px`
        salvar.style.right = `86px`

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

        salvar.style.top = `-10px`
        salvar.style.right = `-10px`

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

// ===== ORDENAR TABELA =====
const sortDirections = {}; // guarda direção por índice

function sortTable(colIndex) {
    const table = document.querySelector(".tabela-box table tbody");
    const rows = Array.from(table.rows);

    let sortDirection = sortDirections[colIndex] ?? true; // true = asc

    rows.sort((a, b) => {
        let x = a.cells[colIndex].innerText.trim().toLowerCase();
        let y = b.cells[colIndex].innerText.trim().toLowerCase();

        let xNum = parseFloat(x.replace(/[^0-9.-]+/g,""));
        let yNum = parseFloat(y.replace(/[^0-9.-]+/g,""));
        if (!isNaN(xNum) && !isNaN(yNum)) {
            x = xNum;
            y = yNum;
        }

        if (x < y) return sortDirection ? -1 : 1;
        if (x > y) return sortDirection ? 1 : -1;
        return 0;
    });

    sortDirections[colIndex] = !sortDirection; // alterna direção
    rows.forEach(row => table.appendChild(row));
}


// ===== FILTRAR POR FROTA (otimizado com pré-indexação) =====
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Monta o índice de busca assim que a página carrega
// Monta o índice de busca assim que a página carrega
const filterRows = document.querySelectorAll("table tbody tr");
const index = Array.from(filterRows).map(row => ({
    element: row,
    text: row.innerText.toLowerCase()
}));


const filterInput = document.getElementById("filter");

filterInput.addEventListener("input", debounce(function () {
    const filter = this.value.toLowerCase();
    index.forEach(item => {
        item.element.style.display = item.text.includes(filter) ? "" : "none";
    });
}, 300));



// =====--- RESUME-PUSH ---=====
const resumePush = document.getElementById("resume-push");

resumePush.addEventListener("click", () => {
    if (resumePush.classList.contains("collapsed")) {
        resumePush.classList.remove("collapsed");
        resumePush.style.height = "90px"; // altura expandida
    } else {
        resumePush.classList.add("collapsed");
        resumePush.style.height = "28px";  // volta pro tamanho da aba
    }
});

