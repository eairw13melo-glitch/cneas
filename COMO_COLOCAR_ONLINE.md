# 🌐 Como Colocar o Sistema CNEAS Online na Web

Este guia explica como hospedar o sistema gratuitamente na internet para que **qualquer entidade acesse o link de qualquer lugar**, preencha os dados e você acompanhe tudo em tempo real pelo **Painel Administrativo**.

---

## 🖥️ Opção 1: Testar ou Rodar no seu Computador / Rede Local

Se você quiser testar imediatamente no seu computador ou disponibilizar para outros computadores da mesma rede:

1. Abra o terminal (PowerShell ou CMD) na pasta do projeto:
   ```bash
   cd "C:\Users\Rafael Melo\.gemini\antigravity\scratch\cneas-formulario"
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse no seu navegador:
   - **Formulário das Entidades:** `http://localhost:3000`
   - **Painel Administrativo do Gestor:** `http://localhost:3000/admin`
   - **Senha inicial do Admin:** `admin123`

---

## ☁️ Opção 2: Publicar Gratuitamente na Nuvem (Render.com) — *Recomendado*

O **Render** oferece hospedagem web gratuita para aplicações Node.js:

1. Crie uma conta gratuita em [render.com](https://render.com).
2. Suba a pasta do projeto para um repositório no seu GitHub (ou crie um novo repositório chamado `cneas-formulario`).
3. No painel do Render, clique em **"New +"** ➔ **"Web Service"**.
4. Conecte com o seu repositório do GitHub.
5. Configure os campos básicos:
   - **Name:** `cneas-formulario` (ou o nome que desejar)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free` (Gratuito)
6. Na seção **Environment Variables** (Variáveis de Ambiente), adicione:
   - `ADMIN_PASSWORD` = `SuaSenhaSeguraAqui` (para trocar a senha padrão)
7. Clique em **"Deploy Web Service"**.
8. Pronto! Em instantes você terá um link público seguro com HTTPS (exemplo: `https://cneas-formulario.onrender.com`).
   - O link direto você envia para as entidades preencherem.
   - O link `/admin` (ex: `https://cneas-formulario.onrender.com/admin`) é o seu painel de gestão com senha.

---

## ⚡ Opção 3: Publicar em 2 Minutos no Glitch (Sem Git / Direto pelo Navegador)

1. Acesse [glitch.com](https://glitch.com) e faça login.
2. Clique em **"New Project"** ➔ **"glitch-hello-node"**.
3. No menu lateral do Glitch, substitua os arquivos pelos arquivos da sua pasta:
   - `package.json`
   - `server.js`
   - Crie a pasta `public/` e coloque `index.html` e `admin.html`.
4. O Glitch já gera na hora uma URL pública ativa (ex: `https://nome-aleatorio.glitch.me`).

---

## 🔒 Segurança e Gestão de Dados

* **Acesso Livre:** O formulário principal (`/`) é acessível para qualquer entidade preencher e enviar sem necessidade de criar conta.
* **Painel Protegido (`/admin`):** Somente você acessa com a senha de administrador.
* **Visualização & Impressão:** Ao clicar em **"Abrir & Imprimir"** ao lado de qualquer entidade no painel, o formulário completo daquela entidade é carregado com todos os dados preenchidos e com o botão de impressão em tamanho real (A4) pronto para uso.
* **Exportação para Excel:** O botão **"Exportar para Excel (.csv)"** no painel baixa instantaneamente a planilha consolidada de todas as entidades que já preencheram.
