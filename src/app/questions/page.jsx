"use client"
import React, { useState, useEffect } from 'react';

const QuestionComponent = ({ questionData }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { subject, question, A, B, C, D } = questionData;
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Scramble the answers
    const scrambledAnswers = [A, B, C, D].sort(() => Math.random() - 0.5);
    setAnswers(scrambledAnswers);

    return () => {
        };
  }, [questionData]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (selectedAnswer === A) {
      return 'Correct!';
    }
    return 'Incorrect!';
  };

  return (
    <div>
      <h2>{subject}</h2>
      <p>{question}</p>
      <ul>
        {answers.map((answer) => (
          <li key={answer}>
            <label>
              <input
                type="radio"
                name="answer"
                value={answer}
                onChange={() => handleAnswerSelection(answer)}
              />
              {answer}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={checkAnswer}>Check Answer</button>
      {console.log(selectedAnswer)}
      {selectedAnswer && <p>{checkAnswer()}</p>}
    </div>
  );
};

export default function QESTIONS() {
  const questionData = [
    {
      "subject": "OOAD, מבוא ל-UML וכלי CASE",
      "question": "מה מהתשובות הבאות הינו יתרון מרכזי של ניתוח ועיצוב מונחה עצמים? OOAD",
      "A": "שימוש חוזר בשורות של קוד גובר",
      "B": "מורכבות קוד גוברת",
      "C": "שגיאות זמן הריצה מוגברות",
      "D": "הפשטה מוגבלת"
    }
  ];

  return (
    <div>
      <QuestionComponent questionData={questionData[0]} />
    </div>
  );
}