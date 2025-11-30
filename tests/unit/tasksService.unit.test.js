const tasksService = require('../../src/services/tasksService');

describe('TasksService - Unit', () => {
  beforeEach(() => {
    tasksService._resetTasks();
  });

  test('deve criar uma task corretamente', () => {
    const task = tasksService.createTask('Estudar GC', 'Ler slides da disciplina');

    expect(task.id).toBe(1);
    expect(task.title).toBe('Estudar GC');
    expect(task.done).toBe(false);

    const all = tasksService.listTasks();
    expect(all).toHaveLength(1);
  });

  test('deve atualizar uma task existente', () => {
    const task = tasksService.createTask('Tarefa', 'desc');
    const updated = tasksService.updateTask(task.id, { done: true });

    expect(updated.done).toBe(true);
  });

  test('deve retornar null ao atualizar task inexistente', () => {
    const updated = tasksService.updateTask(999, { done: true });
    expect(updated).toBeNull();
  });

  test('deve listar tasks concluídas e pendentes separadamente', () => {
    const t1 = tasksService.createTask('Tarefa 1', 'a');
    const t2 = tasksService.createTask('Tarefa 2', 'b');
    const t3 = tasksService.createTask('Tarefa 3', 'c');

    tasksService.updateTask(t2.id, { done: true });

    const done = tasksService.listDoneTasks();
    const pending = tasksService.listPendingTasks();

    expect(done).toHaveLength(1);
    expect(done[0].id).toBe(t2.id);

    expect(pending).toHaveLength(2);
    expect(pending.map((t) => t.id)).toEqual([t1.id, t3.id]);
  });

  test('deve buscar tasks pelo título', () => {
    tasksService.createTask('Estudar GC', '');
    tasksService.createTask('Fazer trabalho de GC', '');
    tasksService.createTask('Jogar bola', '');

    const result = tasksService.searchTasksByTitle('gc');

    expect(result).toHaveLength(2);
  });

  test('deve retornar resumo de tasks', () => {
    const t1 = tasksService.createTask('Tarefa 1', '');
    const t2 = tasksService.createTask('Tarefa 2', '');
    tasksService.updateTask(t2.id, { done: true });

    const summary = tasksService.getTasksSummary();

    expect(summary.total).toBe(2);
    expect(summary.done).toBe(1);
    expect(summary.pending).toBe(1);
  });
});
