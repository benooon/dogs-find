"use client"
import React, { useState, useEffect } from 'react';
import './page.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
// import CommentForm from '../compoments/CommentForm';
// import CommentList from '../compoments/CommentList';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import JSConfetti from 'js-confetti'
import { SnackbarProvider, useSnackbar } from 'notistack';



function BasicSelect({filterOptions,handleChange,value}) {

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">filer by subject</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="category"
            value={value}
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
  const { enqueueSnackbar } = useSnackbar();
  const jsConfetti = new JSConfetti()
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [counter, setCounter] = useState(0);
    const [result, setResult] = useState(null);
    const { subject, qestion, A, B, C, D } = questionData;
    const [answers, setAnswers] = useState([]);


    useEffect(() => {
      const scrambledAnswers = [A, B, C, D].sort(() => Math.random() - 0.5);
      setAnswers(scrambledAnswers);

      return () => {
        // Cleanup logic, if needed
      };
    }, [questionData]);
  
    const handleAnswerSelection = (answer) => {
      setSelectedAnswer(answer);
    };
    const handleClickVariant = (variant) => () => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar('This is a success message!', { variant });
    };
  
    useEffect(() => {
      if (selectedAnswer === A) {
        setCounter(counter + 1);
        console.log(counter);
        if (counter % 9 === 0 && counter !== 0)   {
          jsConfetti.addConfetti({
            emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
         });
        }
        enqueueSnackbar('תשובה נכונה', {
          variant: 'success',
        })
        //setResult('Correct!')
      } else {
        enqueueSnackbar('תשובה לא נכונה',{
          variant: 'error',
        })
        //setResult('Incorrect!')
        setCounter(0);
      }
    }, [selectedAnswer]);
    if (!questionData) {
      return null;
    }
    return (
        <div className="question-container" dir='rtl'>
            
                <Typography  dir="rtl" variant="subtitle2" gutterBottom>strike:{counter}  </Typography>
    <Typography variant="h5" gutterBottom>
    {qestion}
      </Typography>
      <Typography  dir="rtl" variant="subtitle2" gutterBottom>נושא- {subject}    </Typography>
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
  {/* {selectedAnswer && <p className="answer-result">{checkAnswer()}</p>} */}

      {selectedAnswer && <p className="answer-result">{result}</p>}
      <button className="next-btn" onClick={onNext}>
        Next
      </button>

      </div>

        
    );
  };

export default function QUESTIONS() {
  const [questionData, setQuestionData] = useState(null);
  const [dataOriginal, setDataOriginal] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filterSubject, setFilterSubject] = useState('all');

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
        setDataOriginal(shuffledData);

        setQuestionData(shuffledData);
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    fetchQuestionData();
  }, []);

  useEffect(() => {
    if (filterSubject === 'all') {
      // No filter, use all questions
      setQuestionData(dataOriginal);
    } else {
      // Filter questions by subject
      const filteredQuestions = dataOriginal.filter((question) => question.subject === filterSubject);
      setQuestionData(filteredQuestions);
    }
    setCurrentQuestionIndex(0); // Reset current question index
  }, [filterSubject]);




  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('End of questions')
      console.log('End of questions');
    }
  };

  const handleChange = (event) => {
    const selectedSubject = event.target.value;
    setFilterSubject(selectedSubject);
  };
  if (!questionData) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questionData[currentQuestionIndex];
  const uniqueSubjects = [...new Set(dataOriginal.map((question) => question.subject))];


  return (
    <SnackbarProvider  anchorOrigin={{horizontal: 'center', vertical: 'bottom'} } iconVariant={{
      success: '✅',
      error: '✖️',
      warning: '⚠️',
      info: 'ℹ️',
    }}
  >
    <div>
     <div className='drop-down'> 
           <Typography  dir="rtl" variant="subtitle2" gutterBottom>{currentQuestionIndex}/{questionData.length}  </Typography>
         <BasicSelect filterOptions={uniqueSubjects} handleChange={handleChange} value={filterSubject} />
         </div>

         <QuestionComponent questionData={currentQuestion} onNext={handleNextQuestion}    /> 

    </div>
    </SnackbarProvider>
  );
}
