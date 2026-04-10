const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

function normalizeDate(date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

function getPendingTasks(tasks) {
  return tasks.filter((task) => !task.isCompleted && task.due_date);
}

export function getRiskChartData(tasks) {
  const today = normalizeDate(new Date());
  const pendingTasks = getPendingTasks(tasks);
  const totalPending = pendingTasks.length;

  return WEEK_DAYS.map((dayLabel, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() + index);

    const pendingByDay = pendingTasks.filter((task) => {
      const dueDate = normalizeDate(new Date(task.due_date));
      return !Number.isNaN(dueDate.valueOf()) && dueDate <= day;
    }).length;

    const risk = totalPending
      ? Math.min(100, Math.round((pendingByDay / totalPending) * 100))
      : 0;

    return {
      day: dayLabel,
      risk,
      pendingTasks: pendingByDay,
    };
  });
}

export function getBurndownData(tasks) {
  const today = normalizeDate(new Date());
  const pendingTasks = getPendingTasks(tasks);

  return WEEK_DAYS.map((dayLabel, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() + index);

    const remaining = pendingTasks.filter((task) => {
      const dueDate = normalizeDate(new Date(task.due_date));
      return !Number.isNaN(dueDate.valueOf()) && dueDate >= day;
    }).length;

    return {
      day: dayLabel,
      remaining,
    };
  });
}
