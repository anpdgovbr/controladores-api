<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS" />
</p>

<h1 align="center">API de Cadastro de Controladores</h1>

<p align="center">
  <a href="https://www.anpd.gov.br/"><img src="https://img.shields.io/badge/ANPD-Autoridade_Nacional_de_Proteção_de_Dados-blue" alt="ANPD"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11.1.3-red?logo=nestjs" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Node.js-24.0.13-green?logo=nodedotjs" alt="Node.js">
</p>

<p align="center">
  Microsserviço robusto para gerenciar controladores, encarregados (DPOs), grupos econômicos e quadros societários, em conformidade com a LGPD.
</p>

---

## 🌟 Funcionalidades

- **CRUD completo** para todas as entidades:
  - Controladores (empresas)
  - Encarregados (DPOs)
  - Grupos Econômicos
  - Sócios
  - CNAEs e Setores
- **Relacionamentos** entre sócios e controladores
- **Paginação e filtros** em listagens
- **Documentação da API** gerada automaticamente com Swagger
- **Autenticação JWT** para endpoints protegidos
- **Soft delete** para preservação de dados históricos

---

## 📦 Tecnologias Utilizadas

- **Framework:** [NestJS](https://nestjs.com/) (v11.1.3)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (v5.8.3)
- **ORM:** [Prisma](https://www.prisma.io/) (v6.11.1)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Documentação:** [Swagger](https://swagger.io/)

---

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18.x ou superior)
- [NPM](https://www.npmjs.com/) (v9.x ou superior)
- [PostgreSQL](https://www.postgresql.org/) (v14.x ou superior)
- [Docker](https://www.docker.com/) (opcional, para containerização)

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/anpdgovbr/cadastro-controladores-api.git
   cd cadastro-controladores-api
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto
   - Configure as seguintes variáveis:

   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/controladores_db"
   JWT_SECRET="seu_jwt_secret_super_secreto"
   ```

4. **Configure o banco de dados:**

   ```bash
   # Aplique as migrações
   npx prisma migrate deploy

   # Execute o seed (opcional)
   npx prisma db seed
   ```

---

## ▶️ Executando a Aplicação

```bash
# Modo de desenvolvimento (com hot-reload)
npm run start:dev

# Modo de produção
npm run start:prod

# Build da aplicação
npm run build
```

A API estará disponível em `http://localhost:3000`.

---

## 📄 Documentação da API

A documentação completa dos endpoints está disponível via Swagger UI:

- **Swagger UI:** [http://localhost:3000/api](http://localhost:3000/api)
- **OpenAPI JSON:** [http://localhost:3000/api-json](http://localhost:3000/api-json)

### Principais Endpoints

- `GET /controladores` - Lista controladores com paginação
- `POST /controladores` - Cria novo controlador
- `GET /controladores/:id` - Busca controlador por ID
- `PUT /controladores/:id` - Atualiza controlador
- `DELETE /controladores/:id` - Remove controlador (soft delete)

---

## 📁 Estrutura do Projeto

```
/
├── prisma/             # Schema, migrações e seeds do banco
│   ├── schema.prisma   # Definição do schema do banco
│   ├── migrations/     # Migrações do banco
│   └── seed/           # Scripts de população inicial
├── src/                # Código-fonte da aplicação
│   ├── controlador/    # Módulo de controladores
│   ├── encarregado/    # Módulo de encarregados (DPOs)
│   ├── grupo-economico/# Módulo de grupos econômicos
│   ├── socio/          # Módulo de sócios
│   ├── cnae/           # Módulo de CNAEs
│   ├── setor/          # Módulo de setores
│   ├── prisma/         # Serviços do Prisma
│   ├── common/         # Utilitários e filtros comuns
│   ├── types/          # Tipos TypeScript customizados
│   ├── utils/          # Utilitários gerais
│   └── main.ts         # Arquivo de entrada da aplicação
├── scripts/            # Scripts auxiliares
└── package.json        # Dependências e scripts
```

---

## 🗄️ Modelo de Dados

O sistema gerencia as seguintes entidades principais:

- **Controlador**: Empresas que processam dados pessoais
- **Encarregado**: DPOs (Data Protection Officers)
- **Sócio**: Pessoas físicas ou jurídicas que participam do quadro societário
- **GrupoEconomico**: Agrupamento de controladores
- **CNAE**: Códigos de atividade econômica
- **Setor**: Setores de atuação

---

## 🔒 Autenticação

A API utiliza autenticação JWT. Para acessar endpoints protegidos:

1. Obtenha um token JWT válido
2. Inclua o token no header `Authorization: Bearer <token>`
3. Endpoints públicos não requerem autenticação

---

## 🚀 Deploy

### Docker

```bash
# Build da imagem
docker build -t controladores-api .

# Executar com docker-compose
docker-compose up -d
```

### PM2 (Produção)

```bash
# Instalar PM2
npm install -g pm2

# Executar com PM2
pm2 start ecosystem.config.cjs --env production
```

---

## 🤝 Contribuindo

1. Faça um **fork** do projeto
2. Crie uma nova **branch** (`git checkout -b feature/nova-funcionalidade`)
3. Faça **commit** das suas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Faça **push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

### Padrões de Código

- Use **ESLint** e **Prettier** para formatação
- Siga os padrões do **NestJS**
- Use **Conventional Commits** para mensagens de commit

---

## 🏢 Autoria Institucional

> Este microsserviço é mantido pela:
> **DDSS – Divisão de Desenvolvimento e Sustentação de Sistemas**  
> **CGTI/ANPD – Coordenação-Geral de Tecnologia da Informação**  
> **Autoridade Nacional de Proteção de Dados (ANPD)**

---

## 🛡️ Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
