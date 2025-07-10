# 🏢 cadastro-controladores-api

Microsserviço responsável pela gestão dos Controladores e Encarregados de Dados Pessoais no contexto da Lei Geral de Proteção de Dados (LGPD), bem como das suas estruturas societárias e agrupamentos econômicos.

---

## 📌 Objetivo

Centralizar o cadastro, manutenção e exposição dos dados relacionados aos **Controladores de Dados**, seus respectivos **Encarregados (DPOs)**, **Grupos Econômicos** e **Quadros Societários**, permitindo a reutilização por múltiplos sistemas internos da ANPD.

---

## ⚖️ Fundamentação Legal

O serviço se baseia nos conceitos definidos pela **LGPD (Lei nº 13.709/2018)**, em especial:

- **Art. 5º, VI e VIII** – Definição de Controlador e Encarregado.
- **Art. 7º, §5º** – Compartilhamento de dados dentro de grupo econômico.
- **Art. 41** – Atribuições do Encarregado.
- Jurisprudência complementar sobre **Grupo Econômico** e **Quadro Societário**.

---

## 🧭 Escopo funcional do MVP

### Entidades Principais

| Entidade           | Descrição                                                                   |
| ------------------ | --------------------------------------------------------------------------- |
| `Controlador`      | Pessoa natural ou jurídica que toma decisões sobre o tratamento de dados.   |
| `Encarregado`      | Ponto de contato com titulares e com a ANPD (DPO), interno ou terceirizado. |
| `GrupoEconomico`   | Conjunto de controladores com vínculo estratégico e econômico comum.        |
| `Socio`            | Sócio ou acionista, com CPF/CNPJ, tipo de participação e nacionalidade.     |
| `SocioControlador` | Relação N:N entre sócios e controladores, com percentual de participação.   |
| `Setor`, `CNAE`    | Metadados para categorização do controlador.                                |

---

## 🏗️ Arquitetura e Stack

| Camada         | Tecnologia                                                   |
| -------------- | ------------------------------------------------------------ |
| Linguagem      | TypeScript                                                   |
| Framework      | [NestJS](https://nestjs.com/)                                |
| ORM            | [Prisma](https://www.prisma.io/)                             |
| Banco de Dados | PostgreSQL                                                   |
| API            | RESTful (padrão HTTP)                                        |
| Autenticação   | JWT com chave secreta interna (rede segura)                  |
| Segurança      | Acesso por sistemas internos (VPN/infra ANPD)                |
| Auditoria      | Soft delete + campos de rastreio (`active`, `exclusionDate`) |

---

## 📡 Integrações e Consumo

- API HTTP REST interna
- Padrão de busca por CNPJ, CPF ou nome
- Foco na **interoperabilidade entre sistemas da ANPD**
- Estrutura pensada para futura integração com gateways, eventos e enriquecimento externo

---

## ✅ Benefícios esperados

- Redução de retrabalho entre sistemas que usam dados semelhantes
- Padronização na gestão de controladores e DPOs
- Base técnica para fiscalização, relatórios e auditoria
- Alinhamento direto com os princípios da LGPD

---

## 🚧 Status

📍 Etapa atual: **CRUDs completos implementados para entidades principais**  
🔜 Próximos passos:

- Validação de regras específicas de negócio
- Testes automatizados (unitários e e2e)
- Definição da camada de autenticação (integração futura com AD/LDAP/Entra ID)
- Implementação de versionamento e integração com sistemas consumidores

---

## 👥 Autoria e responsabilidade

Este microsserviço foi idealizado, desenvolvido e é mantido pela:

> **DDSS – Divisão de Desenvolvimento e Sustentação de Sistemas**  
> **CGTI/ANPD – Coordenação-Geral de Tecnologia da Informação**  
> **Autoridade Nacional de Proteção de Dados (ANPD)**
