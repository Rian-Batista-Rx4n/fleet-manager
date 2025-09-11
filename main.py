from flask import Flask, render_template, request, redirect, flash, session, send_from_directory, url_for, abort
from datetime import datetime
import pandas as pd
import getpass
import os
import json
from werkzeug.utils import secure_filename

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

if not os.path.exists("data/data.json"):
    with open("data/data.json", "w", encoding="utf-8") as f:
        json.dump([], f, indent=4)


UPLOAD_FOLDER = "static/photos"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
app.secret_key = "Rx4n@Rx4n"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

#=====--- INDEX.HTML ---=====
@app.route("/")
def home():
    try:
        with open("data/data.json", "r", encoding="utf-8") as f:
            dados = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        dados = []

    total = len(dados)
    ativo = sum(1 for d in dados if d.get("STATUS", "").strip() != "")
    restante = total - ativo
    rendimento = round((ativo / total * 100), 2) if total > 0 else 0

    return render_template("index.html", 
                           dados=dados,
                           total=total,
                           ativo=ativo,
                           restante=restante,
                           rendimento=rendimento)

# =====--- IMPORT EXCEL ---===== 
@app.route("/importar_excel", methods=["POST"])
def importar_excel():
    file = request.files["file"]

    if file.filename == "":
        return redirect(url_for("home"))

    df = pd.read_excel(file)

    # 🔹 Renomeia coluna FOTO para STATUS (caso venha do Excel)
    if "FOTO" in df.columns:
        df.rename(columns={"FOTO": "STATUS"}, inplace=True)


    # Converte datas para string
    for col in df.select_dtypes(include=["datetime64[ns]", "datetime64"]).columns:
        df[col] = df[col].dt.strftime("%d/%m/%Y")

    # 🔹 Substitui NaN, None ou float('nan') por string vazia
    df = df.fillna("")

    # 🔹 Converte tudo para string e remove "nan" literais que vieram do Excel
    df = df.astype(str).replace("nan", "")

    dados = df.to_dict(orient="records")

    with open("data/data.json", "w", encoding="utf-8") as f:
        json.dump(dados, f, indent=4, ensure_ascii=False)

    return redirect(url_for("home"))

# =====--- Atualizando Index.html
@app.route("/atualizar_status", methods=["POST"])
def atualizar_status():
    try:
        with open("data/data.json", "r", encoding="utf-8") as f:
            dados = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        dados = []

    # request.form chega assim:
    # {"FROTA_72": "Novo", "OBS_72": "Precisa revisão", ...}
    for key, value in request.form.items():
        if key.startswith("FROTA_"):
            frota_id = key.replace("FROTA_", "")
            for d in dados:
                if str(d["FROTA"]) == frota_id:
                    d["STATUS"] = value

        elif key.startswith("OBS_"):
            frota_id = key.replace("OBS_", "")
            for d in dados:
                if str(d["FROTA"]) == frota_id:
                    d["OBSERVAÇÃO"] = value

    with open("data/data.json", "w", encoding="utf-8") as f:
        json.dump(dados, f, indent=4, ensure_ascii=False)

    return redirect(url_for("home"))


# =====--- EDITAR JSON ---=====
@app.route("/editar", methods=["GET", "POST"])
def editar():
    if request.method == "POST":
        dados_editados = request.form.to_dict(flat=False)

        with open("data/data.json", "r", encoding="utf-8") as f:
            dados_originais = json.load(f)

        num_registros = len(dados_editados["FROTA"])
        dados = []
        for i in range(num_registros):

            id_atual = dados_editados["FROTA"][i]
            original = next((d for d in dados_originais if d["FROTA"] == id_atual), {})

            item = {
                "UNIDADE": dados_editados["UNIDADE"][i],
                "FROTA": dados_editados["FROTA"][i],
                "DESCRICAO": dados_editados["DESCRICAO"][i],
                "ANO": dados_editados["ANO"][i],
                "CHASSIS": dados_editados["CHASSIS"][i],
                "SERIE": dados_editados["SERIE"][i],
                "PLACA": dados_editados["PLACA"][i],
                "AGREGADO": dados_editados["AGREGADO"][i],
                "TELEMETRIA": dados_editados["TELEMETRIA"][i],
                "RASTREAMENTO": dados_editados["RASTREAMENTO"][i],
                "SENSOR FADIGA": dados_editados["SENSOR FADIGA"][i],
                "STATUS": dados_editados["STATUS"][i],
                "OBSERVAÇÃO": dados_editados["OBSERVAÇÃO"][i],
            }
            dados.append(item)

        with open("data/data.json", "w", encoding="utf-8") as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

        return redirect(url_for("home"))

    with open("data/data.json", "r", encoding="utf-8") as f:
        dados = json.load(f)

    return render_template("editar_planilha.html", dados=dados)


# =====--- DOWNLOAD EXCEL ---=====
@app.route("/baixar")
def baixar():
    try:
        with open("data/data.json", "r", encoding="utf-8") as f:
            dados = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        dados = []


    df = pd.DataFrame(dados)

    caminho_excel = "data/dados_exportados.xlsx"
    df.to_excel(caminho_excel, index=False)

    return send_from_directory("data", "dados_exportados.xlsx", as_attachment=True)

# =====--- INFO FROTA ---=====
@app.route("/detalhes/<id>")
def detalhes(id):
    try:
        with open("data/data.json", "r", encoding="utf-8") as f:
            dados = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        dados = []

    frota = next((item for item in dados if str(item["FROTA"]) == str(id)), None)
    if not frota:
        abort(404, description="Frota não encontrada")

    # foto principal da frota
    foto_path = None
    for ext in ["jpg", "jpeg", "png", "gif"]:
        tentativa = os.path.join(app.config["UPLOAD_FOLDER"], f"{id}.{ext}")
        if os.path.exists(tentativa):
            foto_path = url_for("static", filename=f"photos/{id}.{ext}")
            break
    if not foto_path:
        foto_path = url_for("static", filename="images/sem_foto.png")
    frota["foto_path"] = foto_path

    # listar fotos de agregados
    fotos_agregado = []
    folder = app.config["UPLOAD_FOLDER"]
    for f in os.listdir(folder):
        if f.startswith(f"{id}-") and f.lower().endswith(("jpg","jpeg","png","gif")):
            fotos_agregado.append(url_for("static", filename=f"photos/{f}"))
    fotos_agregado.sort()  # garante ordem 1,2,3


    return render_template("info_frota.html", frota=frota, fotos_agregado=fotos_agregado)

# =====--- Agregados Fotos ---=====
@app.route("/upload_agregado/<id>", methods=["POST"])
def upload_agregado(id):
    if "foto_agregado" not in request.files:
        flash("Nenhum arquivo enviado")
        return redirect(url_for("detalhes", id=id))

    file = request.files["foto_agregado"]
    folder = app.config["UPLOAD_FOLDER"]
    os.makedirs(folder, exist_ok=True)

    # contar quantas fotos de agregado já existem
    existentes = [f for f in os.listdir(folder) if f.startswith(f"{id}-") and f.lower().endswith(("jpg","jpeg","png","gif"))]
    existentes.sort()

    # definir número do agregado automaticamente
    next_num = len(existentes) + 1

    # manter extensão original
    ext = file.filename.rsplit(".", 1)[1].lower()
    filename = f"{id}-{next_num}.{ext}"
    caminho = os.path.join(folder, filename)

    if file and allowed_file(file.filename):
        file.save(caminho)
        flash(f"Foto do agregado {next_num} salva com sucesso!")
    else:
        flash("Arquivo inválido")

    return redirect(url_for("detalhes", id=id))


# =====--- SALVAR FOTO ---=====
@app.route("/upload_foto/<id>", methods=["POST"])
def upload_foto(id):
    if "foto" not in request.files:
        return redirect(url_for("detalhes", id=id))

    file = request.files["foto"]

    if file and allowed_file(file.filename):
        ext = file.filename.rsplit(".", 1)[1].lower()
        filename = f"{id}.jpeg"  # salva como 3131.jpeg, por exemplo
        caminho = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(caminho)
        flash("Foto atualizada com sucesso!")
    else:
        flash("Arquivo inválido")

    return redirect(url_for("detalhes", id=id))

# =====--- Deletar Agregado ---=====
@app.route("/delete_agregado/<frota_id>/<int:index>", methods=["POST"])
def delete_agregado(frota_id, index):
    folder = app.config["UPLOAD_FOLDER"]

    # lista fotos da frota
    fotos = sorted([f for f in os.listdir(folder) if f.startswith(f"{frota_id}-") and f.lower().endswith(("jpg","jpeg","png","gif"))])
    
    if 0 <= index < len(fotos):
        caminho = os.path.join(folder, fotos[index])
        os.remove(caminho)
        flash(f"Foto {fotos[index]} deletada com sucesso!")
    else:
        flash("Foto não encontrada.")

    return redirect(url_for("detalhes", id=frota_id))

# =====--- FIN ---=====
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5050)
