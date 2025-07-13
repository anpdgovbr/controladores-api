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
- **Relacionamentos** entre sócios e controladores.
- **Paginação e filtros** em listagens.
- **Documentação da API** gerada automaticamente com Swagger.

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

- [Node.js](https://nodejs.org/en/) (v24.x ou superior)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (para o banco de dados)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/cadastro-controladores-api.git
   cd cadastro-controladores-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Renomeie o arquivo `.env.example` para `.env`.
   - Preencha as variáveis, especialmente a `DATABASE_URL`.

4. **Inicie o banco de dados com Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Aplique as migrações do Prisma:**
   ```bash
   npx prisma migrate dev
   ```

---

## ▶️ Executando a Aplicação

```bash
# Modo de desenvolvimento (com hot-reload)
npm run start:dev

# Modo de produção
npm run start:prod
```

A API estará disponível em `http://localhost:3000`.

---

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes end-to-end (E2E)
npm run test:e2e

# Relatório de cobertura de testes
npm run test:cov
```

---

## 📄 Documentação da API

A documentação completa dos endpoints está disponível via Swagger UI:

- **Swagger UI:** [http://localhost:3000/api](http://localhost:3000/api)
- **Swagger JSON:** [http://localhost:3000/swagger-json](http://localhost:3000/swagger-json)

---

## 📁 Estrutura do Projeto

```
/
├── prisma/             # Schema, migrações e seeds do banco
├── src/                # Código-fonte da aplicação
│   ├── common/         # Módulos e utilitários comuns
│   ├── modules/        # Módulos de cada entidade (controlador, socio, etc.)
│   └── main.ts         # Arquivo de entrada da aplicação
├── test/               # Testes E2E
└── package.json        # Dependências e scripts
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Faça um **fork** do projeto.
2. Crie uma nova **branch** (`git checkout -b feature/nova-funcionalidade`).
3. Faça **commit** das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Faça **push** para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um **Pull Request**.

---

## 🏢 Autoria Institucional

> Este microsserviço é mantido pela:
> **DDSS – Divisão de Desenvolvimento e Sustentação de Sistemas**
> **CGTI/ANPD – Coordenação-Geral de Tecnologia da Informação**
> **Autoridade Nacional de Proteção de Dados (ANPD)**

---

## 🛡️ Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
