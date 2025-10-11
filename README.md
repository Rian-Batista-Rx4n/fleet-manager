# 🚍 Fleet Manager

**Version:** 1.0.0
A lightweight fleet management system built with **Flask** and **Pandas**, designed for importing, editing, and monitoring vehicle spreadsheets (Excel files).  
Originally developed for CTO department operations, but can be adapted to other organizations.  

⚠️ The current version of the software has its UI in **Brazilian Portuguese**.

---

## ✨ Features
- 📊 Import Excel files with fleet data
- 📥 Export updated data back to Excel  
- 🖼️ Upload and manage photos for each vehicle  
- 📌 Status management (e.g., Active, Accident, Sold, Scrap, etc.)  
- 🔎 Quick access to detailed information per fleet unit  
- 📋 Summary bar with **Total**, **Active**, **Remaining**, and **Performance %**  

---

## 🛠️ Tech Stack
- **Backend:** Flask (Python 3)  
- **Data Handling:** Pandas + Openpyxl  
- **Frontend:** HTML, CSS, JavaScript (vanilla)  
- **Storage:** JSON file (`data/data.json`) + Excel import/export  
- **Images:** Stored in `static/photos/`  

---

## 📖 Usage
1. Import your Excel file with fleet data (`.xlsx` or `.xls`)  
2. Browse or edit records in the main table  
3. Update fleet status directly from the dashboard  
4. View detailed information (including photos) for each vehicle  
5. Export your updated fleet database back to Excel 

---

## ⚡ Installation in (Debian)

### 1. Update and Upgrade packages
```
apt update && pkg upgrade
```
### 2. Instaling Resources
```
apt install python3
apt install git
```
### 3. Cloning repository
```
git clone https://github.com/Rian-Batista-Rx4n/fleet-manager/
cd fleet-manager
```
### 4. Install dependencies
```
pip install -r requirements.txt
```
### 5. Run the application
```
python3 main.py
```
### 6. Access in your browser
Go to navigator local and acess: `127.0.0.1:5050`

---

## 📜 License
- MIT License – free to use, modify, and distribute.