# Imagen base liviana de Nginx
FROM nginx:alpine

# Copiar la aplicación web y assets al directorio de Nginx
COPY ./front /usr/share/nginx/html/front
COPY ./src /usr/share/nginx/html/src
COPY ./index.html /usr/share/nginx/html/index.html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
