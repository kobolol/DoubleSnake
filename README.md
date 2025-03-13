# 🐍 DoubleSnake

Ein kooperatives Snake-Spiel für zwei Spieler, bei dem Sie gemeinsam spielen, um die höchste Punktzahl zu erreichen!

## 📋 Projektbeschreibung

DoubleSnake ist eine moderne Interpretation des klassischen Snake-Spiels, bei dem zwei Spieler gleichzeitig spielen können. Spieler erstellen oder treten Lobbys bei, um gemeinsam zu spielen und Punkte zu sammeln. Das Spiel wurde mit Node.js, Express und Socket.IO entwickelt, um Echtzeit-Multiplayer-Funktionalität zu bieten.

## 🚀 Funktionen

- **Benutzerkonten**: Registrierung und Anmeldung
- **Lobby-System**: Erstellen und Beitreten von Spielen mit eindeutigen Codes
- **Echtzeit-Multiplayer**: Spielen Sie gleichzeitig mit einem Freund
- **Reaktionsschnelles Design**: Funktioniert auf Desktop und mobilen Geräten

## 🔧 Technologien

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Echtzeit-Kommunikation**: Socket.IO
- **Datenbank**: MySQL

## 💻 Installation

Folgen Sie diesen Schritten, um DoubleSnake auf Ihrem lokalen Computer einzurichten:

1. Repository klonen:
   ```bash
   git clone https://github.com/yourusername/doubleSnake.git
   cd doubleSnake
   ```

2. Backend-Abhängigkeiten installieren:
   ```bash
   cd backend
   npm install
   ```

3. MySQL-Datenbank einrichten:
   - Erstellen Sie eine Datenbank mit dem Namen "doublesnake"
   - Importieren Sie die SQL-Struktur aus dem "database"-Ordner (falls vorhanden)
   - Oder erstellen Sie eine "users"-Tabelle mit den Feldern id, username, email, password, fullName, createdAt

4. Umgebungsvariablen konfigurieren:
   Erstellen Sie eine `.env`-Datei im Backend-Verzeichnis mit folgendem Inhalt:
   ```
   SESSION_KEY=IhrGeheimesSessionKey
   PORT=3000
   ```

5. Server starten:
   ```bash
   npm run dev
   ```

6. Öffnen Sie Ihren Browser und navigieren Sie zu `http://localhost:3000`

## 🎮 Spielanleitung

1. Registrieren Sie sich für ein neues Konto oder melden Sie sich an
2. Navigieren Sie zum Dashboard und wählen Sie "Lobby"
3. Erstellen Sie eine neue Lobby oder treten Sie einer bestehenden bei
4. Teilen Sie den 6-stelligen Code mit einem Freund
5. Sobald zwei Spieler verbunden sind, beginnt das Spiel automatisch
6. Steuern Sie Ihre Schlange mit den Pfeiltasten und vermeiden Sie Kollisionen
