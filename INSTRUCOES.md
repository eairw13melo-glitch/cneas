# Instrumental CNEAS / Rede SUAS — Guia de Preenchimento e Devolução

Este formulário HTML foi desenvolvido com base nos instrumentais oficiais do **CNEAS (Cadastro Nacional de Entidades de Assistência Social)** e do **Sistema SUAS / MDS**.

---

## 📁 Localização do Arquivo
- **Arquivo principal:** `index.html`
- **Caminho absoluto:** `C:\Users\Rafael Melo\.gemini\antigravity\scratch\cneas-formulario\index.html`

---

## 🚀 Como Enviar para a Entidade Preencher

1. **Envio direto do arquivo:**
   - Você pode enviar o arquivo `index.html` anexado em um e-mail ou via WhatsApp.
   - A entidade só precisa dar dois cliques no arquivo: ele abre em qualquer navegador web (Google Chrome, Edge, Firefox, Safari) sem precisar de internet ou servidor instalado.

2. **Hospedagem em nuvem (opcional):**
   - Se preferir enviar como link, pode colocar o `index.html` no GitHub Pages, Vercel, Netlify ou no servidor da sua secretaria/órgão.

---

## 🔄 Fluxo de Preenchimento e Devolução

O formulário opera no modelo oficial de preenchimento, impressão e protocolo físico:

1. **Preenchimento Digital:**
   - A entidade acessa o formulário pelo link online (ou arquivo anexado) e digita todas as informações.
   - O formulário conta com salvamento automático local no navegador: a pessoa não perde o que digitou se fechar por engano.

2. **Impressão em PDF & Assinatura:**
   - Cada uma das abas possui o botão de destaque **"Imprimir Esta Aba (PDF)"**.
   - No final de cada seção, há **exclusivamente o campo de Assinatura do Representante Legal da Entidade**.
   - O documento já sai formatado em folha A4 com escala 100% (Tamanho Real), sem cortes.

3. **Entrega na Secretaria:**
   - O documento impresso e assinado pelo Presidente/Diretor da entidade deve ser **entregue na Secretaria de Assistência Social**.

2. **Devolução em Arquivo Digital (.JSON):**
   - A entidade clica em **"Exportar (.json)"**. Um arquivo com todos os dados preenchidos é baixado no computador dela.
   - A entidade te envia este arquivo `.json`.
   - Você abre o mesmo `index.html` na sua máquina, clica em **"Importar"** e seleciona o arquivo recebido: **todos os campos são preenchidos automaticamente na sua tela**.

---

## 📋 Estrutura dos Módulos Integrados

| Aba | Descrição | Base Legal / Fonte |
| :--- | :--- | :--- |
| **1. Cadastro Geral (CNEAS)** | Identificação, Presidente, Inscrições em Conselhos (CMDCA/CMDI/CMAS) e Dados Financeiros. | Tela do Sistema CNEAS / Rede SUAS |
| **2. Diagnóstico & Articulação** | Diagnóstico territorial (1.0, 1.1), Mecanismos de escuta (2.0), Normas (3.0, 3.1) e Matriz de Articulação da Rede (4.0). | Páginas 1 e 2 de todas as Seções II |
| **3. Benefícios Assistenciais** | Concessão por natalidade, morte, vulnerabilidade temporária ou calamidade, e recursos humanos. | Art. 22 Lei nº 8.742/93 e Lei 12.435/11 |
| **4. Assessoramento & Direitos** | Os 8 eixos de assessoramento e defesa de direitos, periodicidade, vagas e RH. | Resolução CNAS nº 27/2011 |
| **5. Programas & Projetos** | Objetivos, público, atividades, regulação governamental e RH. | Instrumental CNEAS Programas e Projetos |
| **6. Serviços Socioassistenciais** | Abrangência CRAS/CREAS, público por faixa etária, vulnerabilidades e riscos, atividades e custos. | Resolução CNAS nº 109/2009 (Tipificação Nacional) |

---

## ⚙️ Funcionalidades Especiais Adicionadas

- **Auto-salvamento no Navegador (LocalStorage):** Se o usuário fechar a página por engano ou faltar luz, ao reabrir os dados continuam preenchidos.
- **Sincronização Automática:** Ao preencher CNPJ, Razão Social, Município e UF na primeira aba, todas as abas das ofertas são atualizadas automaticamente.
- **Recursos Humanos Dinâmicos:** Permite adicionar e remover quantos colaboradores forem necessários, com todos os campos oficiais (CPF, Data Nasc, Nome, RG, Órgão/UF, Escolaridade, Profissão, E-mail, Telefone, Cargo e Tipo de Vínculo).
- **Máscaras Inteligentes:** Formatação instantânea de CNPJ, CPF, CEP, Telefone e Moeda (R$).
