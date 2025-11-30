# Usa Node LTS oficial
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas arquivos de dependências
COPY package*.json ./

# Instala dependências sem dev (produção)
RUN npm install --omit=dev

# Copia o restante do código para o container
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
