 Kanban Productivity Dashboard (React) (Futuramente vai mudar api para RESTful e rodar o backand em python)

Aplicação web desenvolvida em React.js baseada no método Kanban, com foco em organização de tarefas e análise de produtividade através de métricas e gráficos.

O projeto simula um sistema moderno de gerenciamento de tarefas inspirado em ferramentas profissionais, adicionando funcionalidades de drag & drop, persistência local e visualização de desempenho.

 Demonstração

Sistema composto por:

Inbox de tarefas

Board Kanban (To Do / Doing / Done)

Métricas de produtividade

Gráficos analíticos

Persistência automática com LocalStorage

 Funcionalidades
 Gerenciamento de Tarefas

Criar tarefas com título, descrição e data

Marcar tarefa como concluída

Excluir tarefas

Validação de campos obrigatórios

 Kanban Board

Colunas:

To Do

Doing

Done

Movimentação de tarefas entre colunas

Drag and Drop personalizado

 Métricas e Analytics

Indicadores de produtividade

Visualização gráfica de desempenho

Dashboard integrado

 Persistência de Dados

Os dados são armazenados automaticamente usando:

localStorage (Futuramente vai mudar para RESTful)

Assim, as tarefas permanecem mesmo após recarregar a página.

 Componentes Principais
Componente	Função
NavBar	Barra de navegação
AddTasks	Formulário para criação de tarefas
DraggableTask	Lista de tarefas arrastáveis
Board	Estrutura do Kanban
MetricContent	Métricas de produtividade
GraphicContent	Gráfico de desempenho
ProductivityBarChart	Gráfico de barras
Footer	Rodapé da aplicação
⚙️ Tecnologias Utilizadas

 React.js (Hooks)

JavaScript (ES6+)

CSS3

LocalStorage API (Futuramente vai mudar para RESTful)

Recharts (gráficos)

 Estrutura do Projeto
src/
│
├── components/
│   ├── AddTasks.jsx
│   ├── Board.jsx
│   ├── DraggableTask.jsx
│   ├── MetricContent.jsx
│   ├── BeLateChart.jsx
│   ├── ProductivityBarChart.jsx
│   ├── NavBar.jsx
│   └── Footer.jsx
│
├── App.jsx
└── App.css
 Fluxo da Aplicação

Usuário cria tarefa na Inbox

Tarefa é salva no estado global (useState)

Dados persistem no localStorage

Usuário arrasta tarefa para colunas do Kanban

Métricas e gráficos refletem a produtividade


 Como executar o projeto
 Clonar repositório
git clone <url-do-repositorio>
 Instalar dependências
npm install
 Rodar aplicação
npm run dev

ou

npm start
 Objetivo do Projeto

Este projeto foi desenvolvido para:

Praticar arquitetura em React

Implementar gerenciamento de estado

Trabalhar com drag & drop

Aplicar conceitos de metodologias ágeis (Kanban)

Criar dashboards analíticos de produtividade

🔮 Melhorias Futuras

 Backend com Node.js

 Autenticação de usuários

 Banco de dados (MongoDB/PostgreSQL)

 Métricas avançadas (CFD e Burn Down Chart)

 Atualização em tempo real

 Autor

Desenvolvido como projeto de estudo e portfólio em desenvolvimento Front-End.
