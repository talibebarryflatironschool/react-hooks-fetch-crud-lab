// import React from "react";

// function QuestionList() {
//   return (
//     <section>
//       <h1>Quiz Questions</h1>
//       <ul>{/* display QuestionItem components here after fetching */}</ul>
//     </section>
//   );
// }

// export default QuestionList;





// import React from 'react';

// const QuestionList = ({ questions, onDelete, onUpdateCorrect }) => {
//   return (
//     <div className="question-list">
//       {questions.map((question, index) => (
//         <div key={question.id} className="question-item">
//           <h3>{question.prompt}</h3>
//           <ul>
//             {question.answers.map((answer, index) => (
//               <li key={index}>{answer}</li>
//             ))}
//           </ul>
//           <label>
//             Correct Answer
//             <select
//               value={question.correctIndex}
//               onChange={(e) => onUpdateCorrect(question.id, parseInt(e.target.value))}
//             >
//               {question.answers.map((_, index) => (
//                 <option key={index} value={index}>
//                   Answer {index + 1}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <button onClick={() => onDelete(question.id)}>Delete Question</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuestionList;


// In QuestionList.js





import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={onDeleteQuestion}
            onUpdateQuestion={onUpdateQuestion}
          />
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
