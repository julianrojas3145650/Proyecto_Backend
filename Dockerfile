# 1. Usamos una imagen ligera de Node.js
FROM node:20-alpine

# 2. Creamos el directorio de trabajo dentro de Docker
WORKDIR /usr/src/app

# 3. Copiamos los archivos de dependencias primero (optimiza el cache)
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos todo el código de nuestro proyecto
COPY . .

# 6. Construimos la aplicación (genera la carpeta dist)
RUN npm run build

# 7. Exponemos el puerto que usa NestJS (por defecto 3000)
EXPOSE 3000

# 8. Comando para arrancar la app en modo desarrollo con watch
CMD ["npm", "run", "start:dev"]