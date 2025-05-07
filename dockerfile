# Estágio de construção
FROM node:22.15-alpine AS builder

WORKDIR /app

RUN touch /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["sh", "/entrypoint.sh"]

# Copiar arquivos de configuração
COPY package*.json ./
COPY prisma ./prisma

# Instalar dependências
RUN npx prisma generate
RUN npm install

# Copiar o resto dos arquivos
COPY . .

# Construir a aplicação
RUN npm run build

# Estágio de produção
FROM node:22.15-alpine

WORKDIR /app

RUN touch /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copiar apenas o necessário da etapa de construção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Expor a porta que sua aplicação usa (normalmente 3000 para NestJS)
EXPOSE 3000

# Comando para executar a aplicação
ENTRYPOINT ["npm", "run", "start:prod"]