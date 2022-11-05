import React from 'react';

function List(props) {
  const tasks = props.toDo;
  if (tasks.length >= 1) {
    return (
      <section>
        <div className="scrollspy-example bg-dark p-3 rounded-2 text-light">
          <div className="container">
            {tasks
              .sort((a, b) => b.timeStamp - a.timeStamp)
              .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
              .map(task => {
                return (
                  <div className="row bg-info p-2 my-2">
                    <div className="col-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => props.handleCompleted(task.id)}
                        name="isCompleted"
                      />
                    </div>
                    <div className="col">
                      <span key={task.id} className={`ml-2 ${task.isCompleted ? 'task-completed' : ''}`}>
                        {' '}
                        {task.task}
                      </span>
                    </div>
                    <div className="col-1">
                      <span title="Edit">
                        <i className="bi bi-pencil-square fs-4" onClick={() => props.handleEdit(task.id)}></i>
                      </span>
                    </div>
                    <div className="col-1">
                      <span title="Delete">
                        <i className="bi bi-trash-fill fs-4" onClick={() => props.handleDelete(task.id)}></i>
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="container text-center no-task">
        <span className="text-info">No new tasks...</span>
      </div>
    );
  }
}

export default List;
