"use client"
import React, { useState, useEffect } from 'react';
import './page.css';

const QuestionComponent = ({ questionData ,onNext  }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const { subject, qestion, A, B, C, D } = questionData;
    const [answers, setAnswers] = useState([]);
  
    useEffect(() => {
      // Scramble the answers
      const scrambledAnswers = [A, B, C, D].sort(() => Math.random() - 0.5);
      setAnswers(scrambledAnswers);
  
      return () => {
        // Cleanup logic, if needed
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
        <div className="question-container">
        <h2>{subject}</h2>
        <p>{qestion}</p>
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
        <button className="check-answer-btn" onClick={checkAnswer}>
        Check Answer
      </button>
      {selectedAnswer && <p className="answer-result">{checkAnswer()}</p>}
      <button className="next-btn" onClick={onNext}>
        Next
      </button>
      </div>
    );
  };

export default function QUESTIONS() {
  const [questionData, setQuestionData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

 useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch('https://dogs-find-production.up.railway.app/api/qestions');
        const data = await response.json();
        setQuestionData(data);
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    fetchQuestionData();
  }, []);
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle end of questions
      // You can show a summary or perform any other actions
      console.log('End of questions');
    }
  }
  if (!questionData) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questionData[currentQuestionIndex];

  return (
    <div>
      <QuestionComponent questionData={currentQuestion} onNext={handleNextQuestion} />
    </div>
  );
}
