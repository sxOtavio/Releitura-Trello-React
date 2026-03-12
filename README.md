 Kanban Productivity Dashboard (React)

Projeto de um sistema Kanban desenvolvido em **React.js**, criado com o objetivo de praticar organização de tarefas, gerenciamento de estado e visualização de produtividade através de gráficos.

A ideia foi construir algo inspirado em ferramentas reais de gestão, permitindo mover tarefas entre colunas, acompanhar métricas e visualizar o fluxo de trabalho de forma simples e interativa.

>  Futuramente o projeto será evoluído para utilizar uma **API RESTful** com backend em **Python**.

---

##  Demonstração

O sistema possui:

- Inbox para criação de tarefas
- Board Kanban (**To Do / Doing / Done**)
- Métricas de produtividade
- Gráficos analíticos
- Persistência automática usando LocalStorage

---

##  Funcionalidades

### Gerenciamento de tarefas
- Criar tarefas com título, descrição e data
- Marcar tarefas como concluídas
- Excluir tarefas
- Validação básica dos campos

### Kanban Board
- Colunas:
  - To Do
  - Doing
  - Done
- Movimentação de tarefas entre colunas
- Drag and Drop personalizado

### Métricas e Analytics
- Indicadores simples de produtividade
- Visualização gráfica do desempenho
- Dashboard integrado ao board

### Persistência de dados
Os dados são salvos automaticamente no navegador utilizando:


localStorage


Assim, as tarefas continuam disponíveis mesmo após recarregar a página.

*(Planejado: migração para API RESTful)*

---

##  Componentes principais

| Componente | Função |
|---|---|
| NavBar | Barra de navegação |
| AddTasks | Criação de tarefas |
| DraggableTask | Lista de tarefas arrastáveis |
| Board | Estrutura do Kanban |
| MetricContent | Métricas |
| GraphicContent | Gráficos |
| ProductivityBarChart | Gráfico de barras |
| Footer | Rodapé |

---

##  Tecnologias utilizadas

- React.js (Hooks)
- JavaScript (ES6+)
- CSS3
- Recharts (gráficos)
- LocalStorage API *(temporário)*

---

##  Estrutura do projeto


src/
│
├── components/
│ ├── AddTasks.jsx
│ ├── Board.jsx
│ ├── DraggableTask.jsx
│ ├── MetricContent.jsx
│ ├── BeLateChart.jsx
│ ├── ProductivityBarChart.jsx
│ ├── NavBar.jsx
│ └── Footer.jsx
│
├── App.jsx
└── App.css


---

##  Fluxo da aplicação

1. Usuário cria uma tarefa na Inbox  
2. A tarefa é armazenada no estado global (`useState`)  
3. Os dados são persistidos no `localStorage`  
4. A tarefa pode ser movida entre colunas via drag & drop  
5. Métricas e gráficos refletem o progresso

---
##  Este projeto foi criado para praticar:

Arquitetura baseada em componentes com React

Gerenciamento de estado

Drag & Drop

Conceitos de Kanban

Construção de dashboards com gráficos

 Melhorias futuras

API RESTful

Backend em Python

Autenticação de usuários

Banco de dados (MongoDB/PostgreSQL)

Métricas avançadas (CFD e Burn Down Chart)

Atualização em tempo real

##  Como executar

```bash
git clone <url-do-repositorio>
npm install
npm run dev

ou

npm start



 Autor

Projeto desenvolvido como parte dos meus estudos e portfólio em desenvolvimento web.
