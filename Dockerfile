# Stage 1: Construir la aplicación
FROM node:18-slim AS builder

WORKDIR /app

COPY . .

# Instalar dependencias y construir la aplicación
RUN npm install --production
RUN npm run build

# Stage 2: Crear la imagen final
FROM node:18-slim

# Instalar serve globalmente
RUN npm install -g serve

WORKDIR /app

# Copiar solo los archivos necesarios del stage anterior
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Instalar solo las dependencias de producción
RUN npm install --only=production

# Exponer el puerto en el que serve va a escuchar
EXPOSE 5000

# Ejecutar serve para servir la aplicación
CMD ["serve", "-s", "build", "-l", "5000"]
