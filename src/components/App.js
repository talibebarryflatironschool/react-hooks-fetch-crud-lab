// // import React, { useState } from "react";
// // import AdminNavBar from "./AdminNavBar";
// // import QuestionForm from "./QuestionForm";
// // import QuestionList from "./QuestionList";

// // function App() {
// //   const [page, setPage] = useState("List");

// //   return (
// //     <main>
// //       <AdminNavBar onChangePage={setPage} />
// //       {page === "Form" ? <QuestionForm /> : <QuestionList />}
// //     </main>
// //   );
// // }

// // export default App;




// import React, { useState, useEffect } from "react";
// import QuestionList from "./QuestionList";
// import NewQuestionForm from "./NewQuestionForm";

// function App() {
//   const [questions, setQuestions] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showQuestions, setShowQuestions] = useState(false);

//   // Fetch questions on mount
//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = () => {
//     fetch("http://localhost:4000/questions")
//       .then((response) => response.json())
//       .then((data) => setQuestions(data))
//       .catch((error) => console.error("Error fetching questions:", error));
//   };

//   // Add new question
//   const handleAddQuestion = (newQuestion) => {
//     setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
//     setShowForm(false);
//     setShowQuestions(true);
//   };

//   // Delete a question
//   const handleDeleteQuestion = (id) => {
//     fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
//       .then(() => {
//         setQuestions((prevQuestions) =>
//           prevQuestions.filter((question) => question.id !== id)
//         );
//       })
//       .catch((error) => console.error("Error deleting question:", error));
//   };

//   // Update question correct answer
//   const handleUpdateQuestion = (id, correctIndex) => {
//     await fetch(`http://localhost:4000/questions/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ correctIndex }),
//     });
//       //.then(() => {
//         setQuestions((prevQuestions) =>
//           prevQuestions.map((q) =>
//             q.id === id ? { ...q, correctIndex } : q
//           )
//         );
//       //})
//       //.catch((error) => console.error("Error updating question:", error));
//   };

//   return (
//     <div>
//       <h1>Quiz Admin Panel</h1>
//       <button onClick={() => setShowQuestions(true)}>View Questions</button>
//       <button onClick={() => setShowForm(true)}>New Question</button>

//       {showForm && <NewQuestionForm onAddQuestion={handleAddQuestion} />}
//       {showQuestions && (
//         <QuestionList
//           questions={questions}
//           onDeleteQuestion={handleDeleteQuestion}
//           onUpdateQuestion={handleUpdateQuestion}
//         />
//       )}
//     </div>
//   );
// }

// export default App;






import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionList from "./QuestionList";
import NewQuestionForm from "./NewQuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List"); // Handle navigation

  // Fetch questions on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Add new question
  const handleAddQuestion = async (newQuestion) => {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });
      const data = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, data]);
      setPage("List"); // Navigate back to the list after submission
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Delete a question
  const handleDeleteQuestion = async (id) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" });
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // Update question correct answer
  const handleUpdateQuestion = async (id, correctIndex) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correctIndex }),
      });

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === id ? { ...q, correctIndex } : q
        )
      );
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <NewQuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
