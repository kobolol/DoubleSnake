# Verwenden Sie ein Node.js-Image als Basis
FROM node:16

# Setzen Sie das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopieren Sie die package.json und package-lock.json Dateien
COPY backend/package*.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

# Kopieren Sie den Rest des Anwendungsquellcodes
COPY backend/ ./

# Exponieren Sie den Port, auf dem die Anwendung läuft
EXPOSE 3000

# Starten Sie die Anwendung
CMD ["npm", "run", "dev"]