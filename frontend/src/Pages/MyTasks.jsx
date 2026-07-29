import { useEffect, useState } from "react";
import axios from "axios";

const MyTasks = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {

  try {

    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.get(
      "http://localhost:5000/api/tasks",
      {
        params: {
          userId: user.id,
        },
      }
    );

    setTasks(res.data);

  } catch (err) {

    console.log(err);

  } finally {

    setLoading(false);

  }

};

  useEffect(() => {

    fetchTasks();

  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">

        My Tasks

      </h1>

      {loading ? (

        <p>Loading...</p>

      ) : tasks.length === 0 ? (

        <div className="bg-white rounded-xl p-8 text-center shadow">

          <h2 className="text-xl font-semibold">

            No Tasks Found

          </h2>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white rounded-2xl shadow p-6"
            >

              <h2 className="text-xl font-bold">

                {task.title}

              </h2>

              <p className="text-gray-500 mt-2">

                {task.description}

              </p>

              <div className="mt-5 space-y-2">

                <p>

                  <strong>Category:</strong> {task.category}

                </p>

                <p>

                  <strong>Priority:</strong> {task.priority}

                </p>

                <p>

                  <strong>Status:</strong> {task.status}

                </p>

                <p>

                  <strong>Due Date:</strong> {task.dueDate}

                </p>

              </div>

              <div className="flex flex-wrap gap-2 mt-5">

                {task.tags.map((tag, index) => (

                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default MyTasks;