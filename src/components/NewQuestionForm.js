import React, { useState } from "react";

function NewQuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleChangeAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newQuestion = { prompt, answers, correctIndex };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddQuestion(data);
        setPrompt(""); // Reset form
        setAnswers(["", "", "", ""]);
        setCorrectIndex(0);
      })
      .catch((error) => console.error("Error adding question:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question</h2>
      <label>
        Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
      </label>
      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            value={answer}
            onChange={(e) => handleChangeAnswer(index, e.target.value)}
            required
          />
        </label>
      ))}
      <label>
        Correct Answer:
        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(parseInt(e.target.value, 10))}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;
