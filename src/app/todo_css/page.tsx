// app/todos/page.tsx
import './todos.css';
import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from './actions';

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <div className="container">
      <h1>Todo List</h1>

      <form action={addTodo} className="add-form">
        <input type="text" name="title" placeholder="New todo..." required />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <form action={editTodo} className="edit-form">
              <input type="hidden" name="id" value={todo.id} />
              <input type="text" name="title" defaultValue={todo.title} required />
              <button type="submit">Update</button>
            </form>

            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit" className="delete-btn">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
