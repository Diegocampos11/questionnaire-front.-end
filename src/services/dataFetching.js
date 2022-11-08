const getQuestions = async () => {
  const data = await fetch("/api/questions");
  return await data.json();
};

const saveData = async (jsonBody) => {
  const data = await fetch(`/api/save`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  });
  return await data.json();
};

export { getQuestions, saveData };
