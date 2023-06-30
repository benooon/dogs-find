"use client"
import React, { useState, useEffect } from 'react';

const QuestionComponent = ({ questionData, onNext }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const { subject, question, options, correctAnswer } = questionData;
  
    const handleAnswerSelection = (answer) => {
      setSelectedAnswer(answer);
    };
  
    const checkAnswer = () => {
      if (selectedAnswer === correctAnswer) {
        return 'Correct!';
      }
      return 'Incorrect!';
    };
  
    return (
      <div>
        <h2>{subject}</h2>
        <p>{question}</p>
        <ul>
          {options.map((option) => (
            <li key={option}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  onChange={() => handleAnswerSelection(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={checkAnswer}>Check Answer</button>
        {selectedAnswer && <p>{checkAnswer()}</p>}
        <button onClick={onNext}>Next</button>
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
        console.log('End of questions');
      }
    };
  
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

