"use client";

import { FormEvent, useState } from "react";

interface ITask {
  id: number;
  title: string;
  description: string;
  category: string;
  date: Date;
}

export default function TodoTask() {
  const [todoList, SetTodoList] = useState<ITask[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, SetDescription] = useState<string>("");
  const [selectedCategory, SetSelectedCategory] = useState<string>("");
  const [providedcategory, setProvidedCategory] = useState([
    "work",
    "personal",
    "fitness",
  ]);

  function onSubmitFormData(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    const temp = {
      id: todoList.length + 1,
      title: title,
      description: description,
      category: selectedCategory,
      date: new Date(),
    };
    SetTodoList((prev) => [...prev, temp]);
    setTitle("");
    SetDescription("");
    SetSelectedCategory("");
  }


  return (
    <>
      <center className="ring-2 justify-center">
        <div className="text-4xl my-2">Task Form</div>
        <form className="w-fit text-2xl justify-center py-3">
          <label>Task Title</label>
          <input
            name="tasktitle"
            className="ring-1 my-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
          />
          <label>Task Description</label>
          <input
            name="taskDescription"
            value={description}
            className="ring-1"
            onChange={(e) => SetDescription(e.target.value)}
            placeholder="Enter Description"
          />
          <select
            name="category"
            onChange={(e) => SetSelectedCategory(e.target.value)}
            className="ring-1 mx-6"
          >
            <option id="category" value="work">
              Work
            </option>
            <option id="category" value="personal" selected>
              Personal
            </option>
            <option id="category" value="fitness">
              Fitness
            </option>
          </select>
          <button
            type="button"
            onClick={(e) => onSubmitFormData(e)}
            className="ring-1 rounded-md"
          >
            Add Task
          </button>
        </form>
        <div className="text-2xl">
          <div className="grid grid-rows-1 grid-cols-3">
            {providedcategory.map((item) => (
              <>
                <table className="ring-2">
                  <tr>
                    <th>{item}</th>
                  </tr>

                  {todoList
                    .filter((todo) => todo.category === item)
                    .map((list) => (
                      <>
                        <tr>
                          <td>{list.title}</td>
                          <td>{list.description}</td>
                          <td>{list.date.getDate()}</td>
                          <td>Edit</td>
                          <td>Delete</td>
                        </tr>
                      </>
                    ))}
                </table>
              </>
            ))}
          </div>
        </div>
      </center>
    </>
  );
}
