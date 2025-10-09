const menu_button = document.getElementById("menu-button")
menu_button.addEventListener("click", menu_button_trigger)

let menuIsOpen = false

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

        salvar.style.top = `86px`
        salvar.style.right = `86px`

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

    // ===== ORDENAR =====
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

    // Alterna direção
    sortDirections[colIndex] = !sortDirection; 

    // Atualiza tabela
    rows.forEach(row => table.appendChild(row));

    // ===== ATUALIZAR SETAS =====
    // Remove setas anteriores
    document.querySelectorAll(".th-table").forEach(th => {
        th.querySelector(".sort-arrow")?.remove();
    });

    // Adiciona seta no cabeçalho clicado
    const th = document.querySelectorAll(".thead-table .th-table")[colIndex];
    const arrow = document.createElement("span");
    arrow.classList.add("sort-arrow");
    arrow.textContent = sortDirection ? "▲" : "▼"; 
    th.appendChild(arrow);
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
let resume_text = document.querySelectorAll(".resume-text")
let arrow_resume1 = document.getElementById("arrows1")
let arrow_resume2 = document.getElementById("arrows2")

resumePush.addEventListener("click", () => {
    if (resumePush.classList.contains("collapsed")) {
        resumePush.classList.remove("collapsed");
        resumePush.style.height = "316px";
        resume_text.forEach(texto => {
            texto.style.fontSize = `15px`
        })

        arrow_resume1.innerHTML = "▲▲"
        arrow_resume2.innerHTML = "▲▲"
    } else {
        resumePush.classList.add("collapsed");
        resumePush.style.height = "28px";
        resume_text.forEach(texto => {
            texto.style.fontSize = `0px`
        })

        arrow_resume1.innerHTML = "▼▼"
        arrow_resume2.innerHTML = "▼▼"
    }
});

