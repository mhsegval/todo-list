import React from 'react';
import todoIcon from '../pngs/pngwing.com.png';

function Form({ handleChange, value, handleSubmit, updateToDo }) {
  return (
    <section className="bg-dark">
      <div className="container">
        <div className="d-sm-flex align-items-center text-center justify-content-between">
          <img src={todoIcon} alt="" className="img-fluid w-50" />
          <div className="container">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new task"
                name="input"
                onChange={handleChange}
                value={value}
              />
              <button className="btn btn-primary btn-lg p-md-2 p-1" type="button" onClick={handleSubmit}>
                {updateToDo ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Form;
