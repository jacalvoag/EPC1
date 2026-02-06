FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Iniciar en modo desarrollo (evita pre-rendering de páginas dinámicas)
CMD ["npm", "run", "dev"]
