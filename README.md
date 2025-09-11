🚍 Fleet Manager

Version: 0.0.9
A lightweight fleet management system built with Flask and Pandas, designed for importing, editing, and monitoring vehicle spreadsheets (Excel files).
Originally developed for CTO department operations, but can be adapted to other organizations.

⚠️ The current version of the software has its UI in Brazilian Portuguese.
✨ Features

    📊 Import Excel files with fleet data
    📝 Edit fleet information directly in the web interface
    📥 Export updated data back to Excel
    🖼️ Upload and manage photos for each vehicle
    📌 Status management (e.g., Active, Accident, Sold, Scrap, etc.)
    🔎 Quick access to detailed information per fleet unit
    📋 Summary bar with Total, Active, Remaining, and Performance %

🛠️ Tech Stack

    Backend: Flask (Python 3)
    Data Handling: Pandas + Openpyxl
    Frontend: HTML, CSS, JavaScript (vanilla)
    Storage: JSON file (data/data.json) + Excel import/export
    Images: Stored in static/photos/

📖 Usage

    Import your Excel file with fleet data (.xlsx or .xls)
    Browse or edit records in the main table
    Update fleet status directly from the dashboard
    View detailed information (including photos) for each vehicle
    Export your updated fleet database back to Excel

⚡ Installation in (Example using Termux)
1. Update and Upgrade packages

pkg update && pkg upgrade

2. Instaling Resources

pkg install python3
pkg install git

3. Cloning repository

git clone https://github.com/Rian-Batista-Rx4n/fleet-manager/
cd fleet-manager

4. Install dependencies

pip install --break-system-packages -r requirements.txt

5. Run the application

python3 main.py

6. Access in your browser

Go to navigator local and acess: 127.0.0.1:5050
📜 License

    MIT License – free to use, modify, and distribute.

