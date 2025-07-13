<p align="center">
  <a href="https://www.anpd.gov.br/">
    <img src="https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-lanca-sua-nova-marca/anpd-vertical-cor.png" width="200" alt="ANPD Logo">
  </a>
</p>

<h1 align="center">API de Cadastro de Controladores</h1>
<h3 align="center">Visão de Negócio e Arquitetura</h3>

---

## 📌 Objetivo Estratégico

Centralizar e padronizar o cadastro de **agentes de tratamento de dados pessoais**, em especial **controladores**, seus respectivos **encarregados (DPOs)**, **grupos econômicos** e **quadros societários**. O objetivo é criar uma fonte única de verdade (Single Source of Truth) para ser consumida de forma segura e eficiente pelos sistemas internos da Autoridade Nacional de Proteção de Dados (ANPD), garantindo consistência e agilidade nos processos de fiscalização, regulação e conformidade.

---

## ⚖️ Fundamentação Legal e Contexto

Este microsserviço foi concebido para dar suporte direto às competências da ANPD, conforme a **Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)**.

- **Art. 5º, VI e VIII:** Define os papéis de **Controlador** e **Encarregado**.
- **Art. 41:** Estabelece a obrigatoriedade da indicação do Encarregado e suas atribuições.
- **Art. 7º, §5º e jurisprudência:** Reconhecem a figura do **grupo econômico** para fins de tratamento de dados.
- **Governança de Dados:** A iniciativa promove a governança ao centralizar informações críticas, evitando redundância e inconsistência de dados entre os sistemas da Autoridade.

---

## 🧭 Escopo Funcional

O serviço gerencia as seguintes entidades e seus relacionamentos:

| Entidade           | Descrição Detalhada                                                                                                | Atributos Chave                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `Controlador`      | Pessoa natural ou jurídica, de direito público ou privado, a quem competem as decisões sobre o tratamento de dados.   | CNPJ/CPF, Razão Social, Nome Fantasia, Setor, CNAE |
| `Encarregado`      | Pessoa (DPO) indicada pelo controlador para atuar como canal de comunicação com os titulares e a ANPD.                | Nome, CPF, E-mail, Telefone                        |
| `GrupoEconomico`   | Agrupamento de controladores que atuam de forma coordenada, compartilhando estratégias e recursos.                     | Nome do Grupo, Descrição                           |
| `Socio`            | Pessoa física ou jurídica que compõe o quadro societário de um controlador.                                         | Nome, CPF/CNPJ, Nacionalidade, Tipo de Participação|
| `SocioControlador` | Tabela de ligação que formaliza a relação N:N entre `Socio` e `Controlador`, especificando o percentual de participação. | Percentual de Participação, Data de Início         |
| `Setor` / `CNAE`   | Metadados para classificação e categorização econômica e setorial dos controladores.                                 | Código, Descrição                                  |

---

## 🏗️ Arquitetura e Tecnologias

A solução foi desenvolvida como um microsserviço, seguindo as melhores práticas de arquitetura de software para garantir escalabilidade, manutenibilidade e segurança.

| Componente     | Tecnologia / Padrão                                                              |
| -------------- | -------------------------------------------------------------------------------- | 
| **Linguagem**      | TypeScript 5.8.3                                                                 |
| **Framework**    | [NestJS](https://nestjs.com/) 11.1.3 – Framework Node.js para aplicações eficientes e escaláveis. |
| **Acesso a Dados** | [Prisma](https://www.prisma.io/) 6.11.1 – ORM moderno para Node.js e TypeScript. |
| **Banco de Dados** | PostgreSQL – Sistema de gerenciamento de banco de dados relacional.              |
| **API**            | RESTful com documentação automática via [Swagger (OpenAPI)](https://swagger.io/). |
| **Segurança**      | Acesso restrito à rede interna da ANPD. Planejamento para autenticação via JWT.  |
| **Auditoria**      | Implementação de *soft delete* e campos de rastreabilidade (`createdAt`, `updatedAt`). |

---

## 📡 Integrações e Consumo

A API foi projetada para ser o núcleo de informações sobre agentes de tratamento, sendo consumida por outros sistemas da ANPD, como:

- **Sistema de Fiscalização:** Para obter dados atualizados de controladores e seus responsáveis.
- **Portal de Serviços:** Para permitir que os próprios agentes atualizem seus dados cadastrais.
- **Plataforma de Análise de Dados:** Para gerar relatórios e insights sobre o ecossistema de proteção de dados no Brasil.

---

## ✅ Benefícios para a ANPD

- **Consistência e Confiabilidade:** Garante que todos os sistemas utilizem a mesma base de dados para informações de controladores.
- **Eficiência Operacional:** Reduz o retrabalho e a necessidade de múltiplas atualizações cadastrais.
- **Suporte à Decisão:** Fornece uma base de dados estruturada para análises e tomada de decisões estratégicas.
- **Conformidade:** Facilita a gestão e a fiscalização do cumprimento da LGPD.

---

## 🗺️ Roadmap e Próximos Passos

- **[CONCLUÍDO]** Implementação dos CRUDs para todas as entidades principais.
- **[EM ANDAMENTO]** Validação de regras de negócio complexas e testes automatizados (unitários e E2E).
- **[PLANEJADO]** Definição e implementação da camada de autenticação e autorização (JWT).
- **[FUTURO]** Integração com sistemas legados e novas plataformas da ANPD.
- **[FUTURO]** Implementação de um sistema de versionamento de registros (histórico de alterações).

---

## 👥 Autoria e Responsabilidade

Este microsserviço é uma iniciativa da **Coordenação-Geral de Tecnologia da Informação (CGTI)** e mantido pela **Divisão de Desenvolvimento e Sustentação de Sistemas (DDSS)** da **Autoridade Nacional de Proteção de Dados (ANPD)**.