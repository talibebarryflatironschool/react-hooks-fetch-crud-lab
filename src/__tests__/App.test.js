// import React from "react";
// import "whatwg-fetch";
// import {
//   fireEvent,
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import { server } from "../mocks/server";

// import App from "../components/App";

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test("displays question prompts after fetching", async () => {
//   render(<App />);

//   fireEvent.click(screen.queryByText(/View Questions/));

//   expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
//   expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
// });

// test("creates a new question when the form is submitted", async () => {
//   render(<App />);

//   // wait for first render of list (otherwise we get a React state warning)
//   await screen.findByText(/lorem testum 1/g);

//   // click form page
//   fireEvent.click(screen.queryByText("New Question"));

//   // fill out form
//   fireEvent.change(screen.queryByLabelText(/Prompt/), {
//     target: { value: "Test Prompt" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Answer 1/), {
//     target: { value: "Test Answer 1" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Answer 2/), {
//     target: { value: "Test Answer 2" },
//   });
//   fireEvent.change(screen.queryByLabelText(/Correct Answer/), {
//     target: { value: "1" },
//   });

//   // submit form
//   fireEvent.submit(screen.queryByText(/Add Question/));

//   // view questions
//   fireEvent.click(screen.queryByText(/View Questions/));

//   expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
//   expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
// });

// test("deletes the question when the delete button is clicked", async () => {
//   const { rerender } = render(<App />);

//   fireEvent.click(screen.queryByText(/View Questions/));

//   await screen.findByText(/lorem testum 1/g);

//   fireEvent.click(screen.queryAllByText("Delete Question")[0]);

//   await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/g));

//   rerender(<App />);

//   await screen.findByText(/lorem testum 2/g);

//   expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument();
// });

// test("updates the answer when the dropdown is changed", async () => {
//   const { rerender } = render(<App />);

//   fireEvent.click(screen.queryByText(/View Questions/));

//   await screen.findByText(/lorem testum 2/g);

//   fireEvent.change(screen.queryAllByLabelText(/Correct Answer/)[0], {
//     target: { value: "3" },
//   });

//   expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");

//   rerender(<App />);

//   expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
// });



import React from "react";
import "whatwg-fetch";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";

import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);

  // Click 'View Questions' button
  fireEvent.click(screen.getByText(/View Questions/));

  // Wait until questions appear
  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  // Click 'View Questions' and wait for initial questions
  fireEvent.click(screen.getByText(/View Questions/));
  await screen.findByText(/lorem testum 1/g);

  // Click 'New Question' button
  fireEvent.click(screen.getByText("New Question"));

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Prompt/), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1/), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer/), {
    target: { value: "1" },
  });

  // Submit form
  fireEvent.submit(screen.getByText(/Add Question/));

  // Ensure form submission is processed before checking state
  await waitFor(() => expect(screen.queryByLabelText(/Prompt/)).toBeNull());

  // Click 'View Questions' again to check the new entry
  fireEvent.click(screen.getByText(/View Questions/));

  // Check if the new question appears
  expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  const { rerender } = render(<App />);

  fireEvent.click(screen.getByText(/View Questions/));

  await screen.findByText(/lorem testum 1/g);

  // Click the first 'Delete Question' button
  fireEvent.click(screen.getAllByText("Delete Question")[0]);

  // Wait until the question is removed from the document
  await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/g));

  // Re-render to ensure state consistency
  rerender(<App />);

  await screen.findByText(/lorem testum 2/g);

  // Ensure the deleted question is not in the document
  expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  const { rerender } = render(<App />);

  fireEvent.click(screen.getByText(/View Questions/));

  await screen.findByText(/lorem testum 2/g);

  // Select dropdown for correct answer update
  const dropdown = screen.getAllByLabelText(/Correct Answer/)[0];

  fireEvent.change(dropdown, { target: { value: "3" } });

  // Wait for the UI to reflect the change
  await waitFor(() => expect(dropdown.value).toBe("3"));

  // Re-render and ensure the change persists
  rerender(<App />);

  expect(screen.getAllByLabelText(/Correct Answer/)[0].value).toBe("3");
});
