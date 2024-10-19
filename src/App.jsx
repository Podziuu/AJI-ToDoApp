import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TodoTable from "./components/TodoTable";
import Search from "./components/Search";
import TodoForm from "./components/TodoForm";
import { createCategory, updateBin } from "./utils";
const binId = import.meta.env.VITE_BIN_ID;
const binApiKey = import.meta.env.VITE_BIN_API_KEY;

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.elements.inputTitle.value;
    const description = e.target.elements.inputDescription.value;
    const place = e.target.elements.inputPlace.value;
    const dueDate = e.target.elements.inputDate.value;

    const category = await createCategory({title, description});

    const newTask = { title, description, place, dueDate, category };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    await updateBin([...tasks, newTask]);
  };

  const deleteTodo = async (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    await updateBin(newTasks);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `https://api.jsonbin.io/v3/b/${binId}/latest`,
          {
            headers: {
              "X-Master-Key":
                `$2a$10$${binApiKey}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data.record.record);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearchTerm = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const taskDueDate = new Date(task.dueDate);
    const isWithinDateRange =
      (!startDate || taskDueDate >= new Date(startDate)) &&
      (!endDate || taskDueDate <= new Date(endDate));

    return matchesSearchTerm && isWithinDateRange;
  });

  return (
    <Container>
      <h1 className="my-4">MyNotes</h1>

      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <TodoTable tasks={filteredTasks} deleteTodo={deleteTodo} />

      <TodoForm submitHandler={submitHandler} />
    </Container>
  );
}

export default App;
