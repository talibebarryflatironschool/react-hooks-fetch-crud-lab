// import React from "react";

// function QuestionItem({ question }) {
//   const { id, prompt, answers, correctIndex } = question;

//   const options = answers.map((answer, index) => (
//     <option key={index} value={index}>
//       {answer}
//     </option>
//   ));

//   return (
//     <li>
//       <h4>Question {id}</h4>
//       <h5>Prompt: {prompt}</h5>
//       <label>
//         Correct Answer:
//         <select defaultValue={correctIndex}>{options}</select>
//       </label>
//       <button>Delete Question</button>
//     </li>
//   );
// }

// export default QuestionItem;





import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDelete = () => {
    onDeleteQuestion(id);
  };

  const handleChangeCorrectIndex = (event) => {
    const newCorrectIndex = parseInt(event.target.value, 10);
    onUpdateQuestion(id, newCorrectIndex);
  };

  return (
    <li>
      <h3>{prompt}</h3>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <label htmlFor={`correct-answer-${id}`}>Correct Answer: </label>
      <select
        id={`correct-answer-${id}`}
        value={correctIndex}
        onChange={handleChangeCorrectIndex}
      >
        {answers.map((answer, index) => (
          <option key={index} value={index}>
            {answer}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
