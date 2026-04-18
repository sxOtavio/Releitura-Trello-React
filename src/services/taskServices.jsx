import axios from "axios";

const API_BASE_URL =
  "https://releitura-trello-react-api-node.onrender.com/tasks";

export function parseTask(task) {
  return {
    ...task,
    isCompleted:
      task.isCompleted ?? task.iscompleted ?? task.is_completed ?? false,
  };
}

export function loadTasksFromStorage(useApiKey = false) {
  const key = useApiKey ? "tasks_api" : "tasks";
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function saveTasksToStorage(tasks, useApiKey = false) {
  const key = useApiKey ? "tasks_api" : "tasks";
  localStorage.setItem(key, JSON.stringify(tasks));
}

export function loadColumnsFromStorage(useApiKey = false) {
  const key = useApiKey ? "columns_api" : "columns";
  return (
    JSON.parse(localStorage.getItem(key)) || [
      { id: 1, title: "To Do", tasks: [] },
      { id: 2, title: "Doing", tasks: [] },
      { id: 3, title: "Done", tasks: [] },
    ]
  );
}

export async function loadColumnsFromApi() {
  try {
    const response = await axios.get(
      "https://releitura-trello-react-api-node.onrender.com/columns",
    );
    return (response.data.rows || []).map((col) => ({
      id: col.column_id || col.id,
      title: col.title,
      position: col.position,
      board_id: col.board_id,
      tasks: [],
    }));
  } catch (error) {
    console.error("Erro ao carregar colunas da API:", error);
    return loadColumnsFromStorage(true);
  }
}

export function saveColumnsToStorage(columns, useApiKey = false) {
  const key = useApiKey ? "columns_api" : "columns";
  localStorage.setItem(key, JSON.stringify(columns));
}

export async function fetchTasks() {
  const response = await axios.get(API_BASE_URL);
  return (response.data.rows || []).map(parseTask);
}

export async function createTask(task) {
  const response = await axios.post(API_BASE_URL, {
    newTask: task,
    title: task.title,
    description: task.description,
    due_date: task.due_date,
    column_id: task.column_id,
    isCompleted: task.isCompleted,
  });

  return {
    ...task,
    id: response.data.taskId || response.data.id,
  };
}

export async function updateTaskColumn(taskId, column_id) {
  await axios.put(`${API_BASE_URL}/${taskId}`, { column_id });
}

export async function deleteTask(taskId) {
  await axios.delete(`${API_BASE_URL}/${taskId}`);
}
