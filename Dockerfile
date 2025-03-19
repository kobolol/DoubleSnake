# Node.js als Basis-Image verwenden
FROM node:18-alpine

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Kopiere package.json und package-lock.json aus dem Backend
COPY backend/package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Backend-Code
COPY backend ./

# Kopiere den Frontend-Ordner in den Backend-Ordner
# Dies ist wichtig, da ExpressManager den Frontend-Ordner als statische Ressource verwendet
COPY frontend ./frontend

# Port verfügbar machen
# Der Port sollte mit dem in der .env-Datei oder dem Standardport 3000 übereinstimmen
EXPOSE 3000

# Umgebungsvariable für DB-Host setzen
# Kann beim Starten des Containers überschrieben werden
ENV DB_HOST="localhost"
ENV DB_PORT=3306
ENV PORT=3000

# Server starten
CMD ["npm", "run", "dev"]
