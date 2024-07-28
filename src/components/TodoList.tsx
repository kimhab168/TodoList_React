import React from "react";

interface Tasks {
  id: number;
  text: string;
  isCompleted: boolean;
  getID: (id: number) => void;
  editID: (id: number, newText: string) => void;
}

const TodoList: React.FC<Tasks> = ({
  id,
  text,
  isCompleted,
  getID,
  editID,
}) => {
  const [isCheck, setCheck] = React.useState(isCompleted);
  const [isEdit, setEdit] = React.useState(false);
  const [lastText, setText] = React.useState(text);

  const handleCheck = () => {
    setCheck(!isCheck);
  };

  const handleEditToggle = () => {
    setEdit(!isEdit);
    if (isEdit) {
      setText(text); // Reset text to original if edit is cancelled
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    editID(id, lastText);
    setEdit(false);
  };

  const handleRemove = () => {
    getID(id);
  };

  return (
    <article className="flex items-center justify-between w-full max-w-lg bg-white shadow-md p-4 rounded-lg mb-4 ring-8 hover:scale-105">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isCheck}
          onChange={handleCheck}
          className="mr-4 h-6 w-6"
        />
        {isEdit ? (
          <input
            onChange={handleTextChange}
            value={lastText}
            type="text"
            className="w-full p-2 border rounded mb-2"
          />
        ) : (
          <h3
            className={`${isCheck ? "line-through text-gray-500" : ""} text-lg`}
          >
            {lastText}
          </h3>
        )}
      </div>

      {isEdit ? (
        <>
          <button
            onClick={handleEditToggle}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg">{isCheck ? "Completed" : "Pending"}</h3>
          <button
            onClick={handleEditToggle}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        </>
      )}

      <button
        onClick={handleRemove}
        className="p-2 bg-red-500 text-white rounded"
      >
        Remove
      </button>
    </article>
  );
};

export default TodoList;
