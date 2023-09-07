FROM node:18

# Cria e defina o diretório de trabalho
WORKDIR /api

# Copia o arquivo package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN yarn

# Copia o restante dos arquivos da aplicação
COPY . .

EXPOSE 3010

# Cria e roda a aplicação
RUN yarn build
RUN yarn start
