// import React, { useState } from "react";

// function QuestionForm(props) {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     answer1: "",
//     answer2: "",
//     answer3: "",
//     answer4: "",
//     correctIndex: 0,
//   });

//   function handleChange(event) {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     console.log(formData);
//   }

//   return (
//     <section>
//       <h1>New Question</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Prompt:
//           <input
//             type="text"
//             name="prompt"
//             value={formData.prompt}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Answer 1:
//           <input
//             type="text"
//             name="answer1"
//             value={formData.answer1}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Answer 2:
//           <input
//             type="text"
//             name="answer2"
//             value={formData.answer2}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Answer 3:
//           <input
//             type="text"
//             name="answer3"
//             value={formData.answer3}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Answer 4:
//           <input
//             type="text"
//             name="answer4"
//             value={formData.answer4}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Correct Answer:
//           <select
//             name="correctIndex"
//             value={formData.correctIndex}
//             onChange={handleChange}
//           >
//             <option value="0">{formData.answer1}</option>
//             <option value="1">{formData.answer2}</option>
//             <option value="2">{formData.answer3}</option>
//             <option value="3">{formData.answer4}</option>
//           </select>
//         </label>
//         <button type="submit">Add Question</button>
//       </form>
//     </section>
//   );
// }

// export default QuestionForm;




import React, { useState } from 'react';

function QuestionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    prompt: '',
    answers: ['', '', '', ''],
    correctIndex: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Prompt:
          <input
            type="text"
            value={formData.prompt}
            onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
            required
          />
        </label>
      </div>
      
      {formData.answers.map((answer, index) => (
        <div key={index}>
          <label>
            Answer {index + 1}:
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                const newAnswers = [...formData.answers];
                newAnswers[index] = e.target.value;
                setFormData({ ...formData, answers: newAnswers });
              }}
              required
            />
          </label>
        </div>
      ))}
      
      <div>
        <label>
          Correct Answer:
          <select
            value={formData.correctIndex}
            onChange={(e) => setFormData({ ...formData, correctIndex: parseInt(e.target.value, 10) })}
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index}>Answer {index + 1}</option>
            ))}
          </select>
        </label>
      </div>
      
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;