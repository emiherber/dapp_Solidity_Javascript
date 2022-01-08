// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TasksContract {
  uint public taskCounter = 0;

  constructor() {
    createTask("mi primer tarea de ejemplo", "mi primer tarea de ejemplo");
  }

  event TaskCreated(
    uint id,
    string title,
    string description,
    bool done,
    uint256 createAt
  );

  event TaskToggleDone(
    uint id,
    bool done
  );

  struct Task {
    uint id;
    string title;
    string description;
    bool done;
    uint256 createAt;
  }

  mapping(uint256 => Task) public tasks;

  function createTask(string memory _title,string memory _description) public {
    taskCounter++;
    tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
    emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
  }

  function toggleDone(uint _id) public {
    Task memory _task = tasks[_id];
    _task.done = !_task.done;
    tasks[_id] = _task;
    emit TaskToggleDone(_id, _task.done);
  }
}
