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
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function LabTabs({ changestae ,counter}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changestae();
  };

  return (
<Box sx={{ width: '100%', typography: 'body1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="כל השאלות" value="1" onClick={changestae} />
            <Tab label={`${counter} שאלות שטעיתי`} value="2" onClick={changestae} />
          </TabList>
        </Box>

      </TabContext>
    </Box>
  );
}
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


const QuestionComponent = ({ questionData ,onNext,addSecond  }) => {
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
      } else if (selectedAnswer !== null) {
        setResult('Incorrect!');
        console.log(questionData);
        setCounter(0);
        addSecond(questionData);
        enqueueSnackbar('תשובה לא נכונה', {
          variant: 'error',
        });
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
      {selectedAnswer && <p className="answer-result">{result}</p>}
      <Button variant="contained" className="next-btn" onClick={onNext}>Next</Button>
      </div>

        
    );
  };

export default function QUESTIONS() {
  const [questionData, setQuestionData] = useState(null);
  const [dataOriginal, setDataOriginal] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [filterSubject, setFilterSubject] = useState('all');
  const [isSecond, setIsSecond] = useState(false);
  const [secondArray, setSecondArray] = useState([]);
  const [secondArrayIndex, setSecondArrayIndex] = useState(0);

  const shuffleQuestions = (questions) => {
    const shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    return shuffledQuestions;

};
const addObjectToEnd = (object) => {
  let isObjectAlreadyPresent = false;
console.log(secondArray);
  if (secondArray.length > 0) {
    isObjectAlreadyPresent = secondArray.some((item) =>
      JSON.stringify(item) === JSON.stringify(object)
    );
  }

  console.log(isObjectAlreadyPresent);

  if (!isObjectAlreadyPresent) {
    setSecondArray(prevArray => [...prevArray, object]);
    console.log(secondArray);
  }
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


  const habdleIssecond = () => {
setIsSecond(!isSecond);
  };
  const handleNextQuestion = () => {
    const jsConfetti = new JSConfetti()
    if (!isSecond) {
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
     });
      alert('End of questions')
      console.log('End of questions');
    }
  } else {
    if (secondArrayIndex < secondArray.length - 1) {
      setSecondArrayIndex(secondArrayIndex + 1);
    } else {
  
      alert('End of questions')
      jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
     });
;
      console.log('End of questions');
    }
    
  }};
  
  const handleChange = (event) => {
    const selectedSubject = event.target.value;
    setFilterSubject(selectedSubject);
  };
  if (!questionData) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    );
  }

  const currentQuestion = questionData[currentQuestionIndex];
  const currentQuestionSecond = secondArray[secondArrayIndex];
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
     <LabTabs changestae={habdleIssecond} counter={secondArray.length}/>

         {isSecond ? (
  <QuestionComponent questionData={currentQuestionSecond} onNext={handleNextQuestion} addSecond={addObjectToEnd}/>
) : (
  <QuestionComponent questionData={currentQuestion} onNext={handleNextQuestion} addSecond={addObjectToEnd} />
)}
    </div>
    </SnackbarProvider>
  );
}
