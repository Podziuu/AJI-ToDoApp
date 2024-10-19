import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const binId = import.meta.env.VITE_BIN_ID;
const binApiKey = import.meta.env.VITE_BIN_API_KEY;

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export const updateBin = async (tasks) => {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": `$2a$10$${binApiKey}`,
      },
      body: JSON.stringify({ record: tasks }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Tasks updated successfully");
  } catch (error) {
    console.error("Error updating tasks:", error);
  }
};

export const fetchTasks = async () => {
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
    return data.record.record;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const createCategory = async ({ title, description }) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a task management assistant. Based on the title and description provided, assign the task to one of the following categories: 
            Praca, Szkoła/Studia, Zakupy, Zdrowie i Fitness, Rodzina i Przyjaciele, Dom, Projekty osobiste, Podróże, Rachunki i Finanse, Rozrywka i Czas wolny, Cele i Rozwój osobisty, Ważne Terminy, Inne.
            
            You will be provided with a task title and description, and you should return the most appropriate category.`,
      },
      {
        role: "user",
        content: `Task title: ${title}\nTask description: ${description}`,
      },
    ],
  });

  const category = completion.choices[0].message.content;
  console.log("Assigned category:", category);
  return category;
};
