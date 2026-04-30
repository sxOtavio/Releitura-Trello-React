import { useEffect, useState, useCallback, useMemo } from "react";
import {
  fetchTasks,
  createTask,
  updateTaskColumn,
  deleteTask,
  loadColumnsFromApi,
  saveColumnsToStorage,
} from "../services/taskServices";
import { fetchBoards } from "../services/boardServices";
import { getRiskChartData, getBurndownData } from "../services/chartServices";


export function useBoard() {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carregar todos os boards do usuário
  const loadBoards = useCallback(async () => {
    try {
      const data = await fetchBoards();
      setBoards(data);
      if (data.length > 0) {
        setSelectedBoardId(data[0].id);
      }
    } catch (error) {
      console.error("Erro ao carregar boards:", error);
    }
  }, []);

  // Carregar tasks e columns de um board específico
  const loadBoardData = useCallback(async (boardId) => {
    if (!boardId) return;
    setLoading(true);
    try {
      const [tasksData, columnsData] = await Promise.all([
        fetchTasks(boardId),
        loadColumnsFromApi(boardId),
      ]);
      setTasks(tasksData);
      setColumns(columnsData);
      // Opcional: salvar no localStorage para fallback
      saveColumnsToStorage(columnsData, true);
    } catch (error) {
      console.error("Erro ao carregar dados do board:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Quando o board selecionado muda, recarrega os dados
  useEffect(() => {
    loadBoardData(selectedBoardId);
  }, [selectedBoardId, loadBoardData]);

  // Carregar boards ao montar
  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  // Ações
  const addTask = useCallback(async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (error) {
      console.error("Erro ao criar task:", error);
      throw error;
    }
  }, []);

  const moveTask = useCallback(async (taskId, targetColumnId) => {
    // Otimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, column_id: targetColumnId } : t
      )
    );
    try {
      await updateTaskColumn(taskId, targetColumnId);
    } catch (error) {
      // Reverter em caso de erro?
      console.error("Erro ao mover task:", error);
      // Recarrega os dados para garantir consistência
      await loadBoardData(selectedBoardId);
    }
  }, [selectedBoardId, loadBoardData]);

  const removeTask = useCallback(async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar task:", error);
      throw error;
    }
  }, []);

  const reload = useCallback(() => {
    loadBoardData(selectedBoardId);
  }, [selectedBoardId, loadBoardData]);

  // Dados derivados (para gráficos, inbox, etc.)
  const inboxTasks = useMemo(
    () => tasks.filter((task) => task.column_id == null),
    [tasks]
  );

  // Filtra colunas do board selecionado
  const filteredColumns = useMemo(
    () => columns.filter((col) => col.board_id === selectedBoardId),
    [columns, selectedBoardId]
  );

  const boardTasks = useMemo(() => {
    if (!selectedBoardId) return tasks;
    const boardColumnIds = new Set(filteredColumns.map((col) => col.id));
    return tasks.filter(
      (task) => boardColumnIds.has(task.column_id) || task.column_id === null
    );
  }, [tasks, filteredColumns, selectedBoardId]);

  const riskChartData = useMemo(
    () => getRiskChartData(boardTasks),
    [boardTasks]
  );
  const burndownData = useMemo(
    () => getBurndownData(boardTasks),
    [boardTasks]
  );

  return {
    // Estados
    boards,
    selectedBoardId,
    setSelectedBoardId,
    tasks: boardTasks,        // tasks do board atual + inbox
    columns: filteredColumns,
    inboxTasks,
    loading,
    // Dados para gráficos
    riskChartData,
    burndownData,
    // Ações
    addTask,
    moveTask,
    removeTask,
    reload,
  };
}