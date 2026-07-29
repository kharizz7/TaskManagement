import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Flag,
  Folder,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
    tags: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    "Work",
    "Personal",
    "Study",
    "Health",
    "Finance",
    "Shopping",
    "Other",
  ];

  const priorities = [
    "Low",
    "Medium",
    "High",
    "Urgent",
  ];

  const statusList = [
    "Pending",
    "In Progress",
    "Completed",
  ];

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validate = () => {
    let temp = {};

    if (!task.title.trim())
      temp.title = "Task title is required";

    if (!task.description.trim())
      temp.description = "Description is required";

    if (!task.category)
      temp.category = "Please select category";

    if (!task.dueDate)
      temp.dueDate = "Select due date";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          ...task,
          userId: user.id,
          tags: task.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== ""),
        }
      );

      alert("Task Created Successfully");

      setTask({
        title: "",
        description: "",
        category: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
        tags: "",
      });

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto w-full">

        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

          <div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
              Create New Task
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Organize your work efficiently
            </p>

          </div>

          <Link
            to="/"
            className="
              w-full
              sm:w-auto
              flex
              items-center
              justify-center
              gap-2
              bg-white
              px-5
              py-3
              rounded-xl
              shadow
              hover:bg-gray-50
              transition
            "
          >
            <ArrowLeft size={18} />
            Back
          </Link>

        </div>

        {/* Main Card */}

        <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-7 max-w-2xl mx-auto"
          >
          {/* ================= Title ================= */}

<div>
  <label className="block mb-2 font-semibold text-slate-700">
    Task Title
  </label>

  <input
    type="text"
    name="title"
    value={task.title}
    onChange={handleChange}
    placeholder="Enter task title..."
    className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      text-sm
      sm:text-base
      outline-none
      focus:ring-2
      focus:ring-indigo-500
    "
  />

  {errors.title && (
    <p className="text-red-500 text-sm mt-2">
      {errors.title}
    </p>
  )}
</div>

{/* ================= Description ================= */}

<div>
  <label className="block mb-2 font-semibold text-slate-700">
    Description
  </label>

  <textarea
    rows={4}
    name="description"
    value={task.description}
    onChange={handleChange}
    placeholder="Write task description..."
    className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      text-sm
      sm:text-base
      resize-none
      outline-none
      focus:ring-2
      focus:ring-indigo-500
    "
  />

  {errors.description && (
    <p className="text-red-500 text-sm mt-2">
      {errors.description}
    </p>
  )}
</div>

{/* ================= Grid ================= */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

  {/* Category */}

  <div>
    <label className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
      <Folder size={18} />
      Category
    </label>

    <select
      name="category"
      value={task.category}
      onChange={handleChange}
      className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-indigo-500
      "
    >
      <option value="">
        Select Category
      </option>

      {categories.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>

    {errors.category && (
      <p className="text-red-500 text-sm mt-2">
        {errors.category}
      </p>
    )}
  </div>

  {/* Priority */}

  <div>
    <label className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
      <Flag size={18} />
      Priority
    </label>

    <select
      name="priority"
      value={task.priority}
      onChange={handleChange}
      className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-indigo-500
      "
    >
      {priorities.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>

  {/* Status */}

  <div>
    <label className="font-semibold text-slate-700 mb-2 block">
      Status
    </label>

    <select
      name="status"
      value={task.status}
      onChange={handleChange}
      className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-indigo-500
      "
    >
      {statusList.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>

  {/* Due Date */}

  <div>
    <label className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
      <Calendar size={18} />
      Due Date
    </label>

    <input
      type="date"
      name="dueDate"
      value={task.dueDate}
      onChange={handleChange}
      className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-indigo-500
      "
    />

    {errors.dueDate && (
      <p className="text-red-500 text-sm mt-2">
        {errors.dueDate}
      </p>
    )}
  </div>

</div>

{/* ================= Tags ================= */}

<div>
  <label className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
    <Tag size={18} />
    Tags
  </label>

  <input
    type="text"
    name="tags"
    value={task.tags}
    onChange={handleChange}
    placeholder="office, react, urgent..."
    className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      outline-none
      focus:ring-2
      focus:ring-indigo-500
    "
  />

  <p className="text-sm text-gray-500 mt-2">
    Separate multiple tags using commas.
  </p>
</div>

{/* ================= Preview ================= */}

<div className="hidden lg:block bg-slate-50 border rounded-2xl p-6">

  <h3 className="text-xl font-bold text-slate-800 mb-5">
    Task Preview
  </h3>

  <div className="space-y-3 text-gray-700">

    <div className="flex justify-between border-b pb-2">
      <span className="font-semibold">Title</span>
      <span>{task.title || "-"}</span>
    </div>

    <div className="flex justify-between border-b pb-2">
      <span className="font-semibold">Category</span>
      <span>{task.category || "-"}</span>
    </div>

    <div className="flex justify-between border-b pb-2">
      <span className="font-semibold">Priority</span>

      <span
        className={`px-3 py-1 rounded-full text-sm font-medium
        ${
          task.priority === "High"
            ? "bg-red-100 text-red-600"
            : task.priority === "Urgent"
            ? "bg-red-600 text-white"
            : task.priority === "Medium"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {task.priority}
      </span>
    </div>

    <div className="flex justify-between border-b pb-2">
      <span className="font-semibold">Status</span>
      <span>{task.status}</span>
    </div>

    <div className="flex justify-between border-b pb-2">
      <span className="font-semibold">Due Date</span>
      <span>{task.dueDate || "-"}</span>
    </div>

    <div className="flex justify-between">
      <span className="font-semibold">Tags</span>
      <span>{task.tags || "-"}</span>
    </div>

  </div>

</div>

{/* ================= Buttons ================= */}

<div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3">

  <button
    type="reset"
    onClick={() =>
      setTask({
        title: "",
        description: "",
        category: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
        tags: "",
      })
    }
    className="
      w-full
      sm:w-auto
      px-6
      py-3
      rounded-xl
      border
      font-medium
      hover:bg-gray-100
      transition
    "
  >
    Reset
  </button>

  <button
    type="submit"
    disabled={loading}
    className={`
      w-full
      sm:w-auto
      px-8
      py-3
      rounded-xl
      text-white
      font-semibold
      transition

      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }
    `}
  >
    {loading ? "Creating..." : "Create Task"}
  </button>

</div>

</form>

</div>

</div>

</div>
  );
};

export default CreateTask;