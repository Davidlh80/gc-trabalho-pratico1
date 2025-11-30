const request = require('supertest');
const app = require('../src/app');
const tasksService = require('../src/services/tasksService');

describe('Fluxo de aceitação - Tasks', () => {
  beforeEach(() => {
    tasksService._resetTasks();
  });

  test('usuário cria uma task, marca como concluída e consulta', async () => {
    // Cria
    const createRes = await request(app)
      .post('/tasks')
      .send({ title: 'Entrega trabalho GC', description: 'subir no Canvas' });

    expect(createRes.status).toBe(201);
    const id = createRes.body.id;

    // Atualiza como concluída
    const updateRes = await request(app)
      .put(`/tasks/${id}`)
      .send({ done: true });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.done).toBe(true);

    // Consulta
    const getRes = await request(app).get(`/tasks/${id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.done).toBe(true);
  });
});
