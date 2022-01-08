const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", ()=> {
  before(async () => {
    this.tasksContract = await TasksContract.deployed();
  });

  it('migrate desployed successfully', async () => {
    const address = this.tasksContract.address;
    assert.notEqual(address, null);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, undefined);
    assert.notEqual(address, "");
  });

  it('get Tasks List', async () => {
    const counter = await this.tasksContract.taskCounter();
    const task = await this.tasksContract.tasks(counter);
    assert.equal(task.id.toNumber(), counter);
    assert.equal(task.title, "mi primer tarea de ejemplo");
    assert.equal(task.description, "mi primer tarea de ejemplo");
    assert.equal(task.done, false);
  });

  it("task created successfully", async () => {
    const result = await this.tasksContract.createTask("mi segunta tarea", "mi segunta tarea");
    const taskEvent = result.logs[0].args;

    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "mi segunta tarea");
    assert.equal(taskEvent.description, "mi segunta tarea");
    assert.equal(taskEvent.done, false);
  });

  it("task toggle done", async () => {
    const result = await this.tasksContract.toggleDone(1);
    const taskEvent = result.logs[0].args;

    assert.equal(taskEvent.done, true);
    assert.equal(taskEvent.id, 1);
  });
});