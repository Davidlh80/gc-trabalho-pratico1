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
});
