"use client"
import React, { useState, useEffect } from 'react';
import './page.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import CommentForm from '../compoments/CommentForm';
import CommentList from '../compoments/CommentList';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function BasicSelect({filterOptions,handleChange}) {
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value="all"
            onChange={handleChange}
          >
      <MenuItem value="all">All</MenuItem>
          {filterOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
const QuestionComponent = ({ questionData ,onNext  }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const { subject, qestion, A, B, C, D } = questionData;
    const [answers, setAnswers] = useState([]);
    const [comments, setComments] = useState([]);
  
  
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
        <div className="question-container" dir='rtl'>
    <Typography variant="h5" gutterBottom>
    {qestion}
      </Typography>
      <Typography  dir="rtl" variant="subtitle2" gutterBottom> {subject}    </Typography>
             <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
  >
     {answers.map((answer,index) => (
     <FormControlLabel
     key={index} 
           label={answer}
                  control={<Radio />} 
                  value={answer}
                  onChange={() => handleAnswerSelection(answer)}
                />

          ))}
  </RadioGroup>

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
  const shuffleQuestions = (questions) => {
    const shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    return shuffledQuestions;
  };
 useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch('https://dogs-find-production.up.railway.app/api/qestions');
        const data = await response.json();
        const shuffledData = shuffleQuestions(data);
        setQuestionData(shuffledData);
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    fetchQuestionData();
  }, []);

//   useEffect(() => {
//     const fetchQuestionData = async () => {
//       try {
//      const questionData = [
//             {
//                 "_id": "60f7b1c9e6b6f40015a1a0a1",
//               "subject": "OOAD, מבוא ל-UML וכלי CASE",
//               "qestion": "מה מהתשובות הבאות הינו יתרון מרכזי של ניתוח ועיצוב מונחה עצמים? OOAD",
//               "A": "שימוש חוזר בשורות של קוד גובר",
//               "B": "מורכבות קוד גוברת",
//               "C": "שגיאות זמן הריצה מוגברות",
//               "D": "הפשטה מוגבלת"
//             }
//           ];

//         setQuestionData(questionData);
//       } catch (error) {
//         console.error('Error fetching question data:', error);
//       }
//     };

//     fetchQuestionData();
//   }, []);



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
  const handleChange = (selectedSubject) => {
    let filteredQuestions;

    if (selectedSubject === 'all') {
      filteredQuestions = questionData;
    } else {
      filteredQuestions = questionData.filter(
        (question) => question.subject === selectedSubject
      );
    }
    setQuestionData(filteredQuestions);
  }

  const currentQuestion = questionData[currentQuestionIndex];
  function getUniqueSubjects(questionData) {
    const subjects = questionData.map((qestion) => qestion.subject);
    const uniqueSubjects = [...new Set(subjects)];
    return uniqueSubjects;
  }
  const uniqueSubjects = getUniqueSubjects(questionData);
  return (
    <div>
     <div className='drop-down'> 
     filer by subject
         <BasicSelect filterOptions={uniqueSubjects} handleChange={handleChange} />
         </div>
        {/* {console.log(currentQuestion._id)}
        <CommentForm qestionId={currentQuestion._id} />
        <CommentList    comments={comments}/> */}
         <QuestionComponent questionData={currentQuestion} onNext={handleNextQuestion} />

    </div>

  );
}
