import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem,deleteItem } from './storeSlice'; 
// in this todo list we just simple add store2 instead of store . if store work product if add store2 add todolist
const TodoList = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
//   const [tableData,settableData]=useState([])
  const dispatch = useDispatch();

  const tableData = useSelector((state) => state.todo?.addTodo || []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // settableData((prevData)=>[...prevData,formData])
    dispatch(addItem(formData)); // Dispatch the addItem action
    // setFormData({ name: '', email: '' }); // Clear form after submit
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id)); // Dispatch the deleteItem action
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {tableData.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TodoList;
