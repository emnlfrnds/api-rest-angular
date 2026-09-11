# 🛠️ Gerenciador de Materiais (Angular CRUD)

> Aplicação web desenvolvida para consolidação prática de consumo de APIs REST no ecossistema Angular moderno, integrando reatividade via Signals e RxJS com uma Fake API local.

---

## 💻 Tecnologias & Conceitos Utilizados

* **Angular** (Standalone Architecture & Control Flow `@for` / `@if`)
* **Angular Signals** (Gerenciamento de estado reativo)
* **RxJS** (Requisições assíncronas com `HttpClient` e `Observable`)
* **TypeScript** (Tipagem estrita com Interfaces)
* **JSON Server v0.17.4** (Simulação de backend RESTful com IDs numéricos)
* **SCSS** (Estilização customizada)

---

## 📌 Funcionalidades (CRUD Completo)

- [x] **Listar Todos:** Busca e exibe todos os materiais cadastrados (`GET /materiais`).
- [x] **Buscar por ID:** Filtra e exibe os detalhes de um item específico com tratamento de erro 404 (`GET /materiais/:id`).
- [x] **Cadastrar:** Adiciona novos produtos com geração automática de ID no servidor (`POST /materiais`).
- [x] **Atualizar:** Modifica dados de materiais existentes e atualiza a interface dinamicamente (`PUT /materiais/:id`).
- [x] **Excluir:** Remove registros do banco de dados fake e reflete na lista local (`DELETE /materiais/:id`).

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório e acessar a pasta
```bash
git clone https://github.com/emnlfrnds/api-rest-angular.git
cd api-rest-angular
```

### 2. Instalar as dependências
```bash
npm install
```

> ⚠️ **Nota Importante de Compatibilidade:**
> Este projeto foi desenvolvido utilizando o **`json-server` na versão `0.17.4`**, garantindo que os IDs dos registros sejam tratados como **numéricos (`number`)**. Versões mais recentes (v1.0+) tratam IDs obrigatoriamente como `string`, o que pode causar falhas nas requisições do Angular.

> Por isso, caso precise reinstalar ou garantir a versão correta no projeto, use o comando abaixo para instalar a versão 17 do `json-server`:

  ```bash
  npm install -D json-server@0.17.4
  ```

### 3. Executar a aplicação
Abra **2 terminais** simultaneamente na raiz do projeto e execute os comandos:
* **Terminal 1 (Fake API):**
  ```bash
  npm run api
  ```

* **Terminal 2 (Aplicação Angular):**
  ```bash
  ng serve
  ```

> 💡 Após inicializar os serviços, acesse **[http://localhost:4200](http://localhost:4200)** no navegador.
