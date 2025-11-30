const request = require('supertest');
const app = require('../../src/app');
const tasksService = require('../../src/services/tasksService');

describe('TasksRoutes - Integration', () => {
  beforeEach(() => {
    tasksService._resetTasks();
  });

  test('POST /tasks deve criar uma task e depois GET /tasks deve listar', async () => {
    const responseCreate = await request(app)
      .post('/tasks')
      .send({ title: 'Tarefa integração', description: 'teste' });

    expect(responseCreate.status).toBe(201);
    expect(responseCreate.body.id).toBeDefined();

    const responseList = await request(app).get('/tasks');

    expect(responseList.status).toBe(200);
    expect(responseList.body).toHaveLength(1);
    expect(responseList.body[0].title).toBe('Tarefa integração');
  });

  test('GET /tasks/:id deve retornar 404 para task inexistente', async () => {
    const response = await request(app).get('/tasks/999');
    expect(response.status).toBe(404);
  });
});
