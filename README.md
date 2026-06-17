# ToDo List PWI

Uma aplicação web simples e intuitiva de Lista de Tarefas (ToDo List). O projeto permite criar, editar, excluir, pesquisar, filtrar e acompanhar o progresso das tarefas, contando também com persistência de dados local.

## Funcionalidades

* **Criar Tarefas**: Adicione novas tarefas à lista rapidamente.
* **Editar Tarefas**: Altere o texto de uma tarefa já existente.
* **Marcar como Concluída**: Alterne o status da tarefa entre "a fazer" e "concluída" (com feedback visual).
* **Remover Tarefas**: Exclua tarefas da listagem de forma definitiva.
* **Filtros Avançados**: Filtre a visualização entre "Todos", "Feitos" e "A fazer".
* **Busca em Tempo Real**: Pesquise tarefas específicas digitando no campo de busca.
* **Contador Estatístico**: Exibe dinamicamente a quantidade de tarefas feitas e pendentes.
* **Persistência com LocalStorage**: Suas tarefas ficam salvas no navegador e não somem ao atualizar a página.

---

## Tecnologias Utilizadas

* **HTML5**: Estruturação semântica da página.
* **CSS3**: Estilização personalizada (incluindo imagens de fundo e efeitos de transição).
* **Bootstrap 5**: Componentes e utilitários para agilizar o layout.
* **Font Awesome 7**: Ícones modernos para os botões de ação.
* **JavaScript**: Lógica de manipulação do DOM e armazenamento local.

---

## Estrutura de Funções do JavaScript (`script.js`)

A parte principal do projeto é estruturado através de funções modulares focadas em reutilização e organização do código:

### Manipulação e Criação do DOM
* `saveTodo(text, done, save)`: Cria dinamicamente a estrutura HTML de uma tarefa (`div.todo`), injeta o título (`h3`) e os botões de ação (concluir, editar e excluir). Também gerencia se o estado inicial é concluído e se a tarefa deve ser salva imediatamente.
* `toggleForms()`: Alterna a exibição (`display: none` via classe `.hide`) entre o formulário de criação principal e o formulário de edição de tarefas.
* `updateTodo(text)`: Atualiza o texto da tarefa selecionada no momento da edição e salva a alteração no banco local.

### Busca e Filtragem
* `getSearchTodos(search)`: Varre todas as tarefas existentes e oculta (`display: none`) aquelas cujo título não corresponde ao termo digitado no campo de pesquisa.
* `filterTodos(filterValue)`: Avalia o select de filtros e exibe/oculta as tarefas baseando-se na presença ou ausência da classe CSS `.done`.

### Estatísticas e Dados (LocalStorage)
* `updateCounters()`: Conta dinamicamente o número total de elementos `.todo` e quantos possuem a classe `.done`, atualizando os valores de tarefas concluídas e pendentes na tela.
* `saveAllTodosToLocalStorage()`: Mapeia todas as tarefas da tela em um array de objetos `[{ text, done }]` e o salva no `localStorage` em formato JSON. Dispara automaticamente o atualizador de contadores.
* `getTodosLocalStorage()`: Busca a string de tarefas salva no navegador, converte-a de volta para um objeto JavaScript e retorna um array vazio caso não existam dados.
* `loadTodos()`: Função executada ao iniciar a página. Ela busca os dados salvos no `localStorage` e recria cada tarefa na tela utilizando a função `saveTodo`.

---

## Eventos Mapeados

O script gerencia a interatividade através dos seguintes ouvintes de eventos:

1. **`todoForm -> submit`**: Captura o envio do texto e cria uma nova tarefa.
2. **`document -> click`**: Utiliza delegação de eventos para identificar cliques nos botões de **Concluir**, **Remover** e **Editar** de cada tarefa de forma otimizada.
3. **`cancelEditBtn -> click`**: Cancela a edição atual e retorna ao menu de criação.
4. **`editForm -> submit`**: Confirma e salva a alteração efetuada no texto da tarefa.
5. **`searchInput -> keyup`**: Dispara a busca em tempo real a cada tecla pressionada.
6. **`eraseBtn -> click`**: Limpa o campo de busca e redefine a lista para exibir todas as tarefas novamente.
7. **`filterBtn -> change`**: Atualiza a listagem visual assim que uma nova opção de filtro é selecionada.

---

## Como Executar o Projeto

1. Certifique-se de manter a estrutura de pastas correta:
   ```text
   ├── index.html
   ├── CSS/
   │   └── style.css
   ├── JS/
   │   └── script.js
   └── img/
       ├── Logo.jpg
       └── fundo.jpg

2. Abra o arquivo index.html diretamente em qualquer navegador web de sua preferência.
