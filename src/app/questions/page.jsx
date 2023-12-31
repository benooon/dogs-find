"use client"
import React, { useState, useEffect } from 'react';
import './page.css';
import Typography from '@mui/material/Typography';
import JSConfetti from 'js-confetti'
import { SnackbarProvider, useSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LabTabs from '../compoments/LabTabs';
import BasicSelect from '../compoments/BasicSelect';
import QuestionComponent from '../compoments/QuestionComponent';
import AlertDialogSlide from '../compoments/Dialog';

export default function QUESTIONS() {
  const [questionData, setQuestionData] = useState(null);
  const [dataOriginal, setDataOriginal] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [filterSubject, setFilterSubject] = useState('all');
  const [isSecond, setIsSecond] = useState(false);
  const [secondArray, setSecondArray] = useState([]);
  const [secondArrayIndex, setSecondArrayIndex] = useState(0);
  const [value, setValue] = React.useState('1');
  const [open, setOpen] = React.useState(false);

  const handleClosePopUp = () => {
    setOpen(false);
  };
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    habdleIssecond();
  };

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
        setOpen(true);
        console.log('End of questions');
      }
    } else {
      if (secondArrayIndex < secondArray.length - 1) {
        setSecondArrayIndex(secondArrayIndex + 1);
      } else {

        setOpen(true);
        jsConfetti.addConfetti({
          emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
        });
        setSecondArrayIndex(0);
        setSecondArray([])
        setIsSecond(false);
        handleChangeTab(null, '1');
        console.log('End of questions');
      }

    }
  };
  const handleBackQuestion = () => {
    const jsConfetti = new JSConfetti()
    if (!isSecond) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);

    } else {
      setSecondArrayIndex(secondArrayIndex - 1);


    }

  }


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
  <SnackbarProvider anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} iconVariant={{
    success: '✅',
    error: '✖️',
    warning: '⚠️',
    info: 'ℹ️',
  }}
  >
    <div>
      <AlertDialogSlide open={open} handleClose={handleClosePopUp} content='😥נגמר השאלות' />
      <div className='drop-down'>
        <Typography dir="rtl" variant="subtitle2" gutterBottom>{currentQuestionIndex}/{questionData.length}  </Typography>

        <BasicSelect filterOptions={uniqueSubjects} handleChange={handleChange} value={filterSubject} />

      </div>
      <LabTabs changestae={habdleIssecond} counter={secondArray.length} label1={secondArray.length === 0} handleChangeTab={handleChangeTab} value={value} />

      {isSecond ? (
        <QuestionComponent questionData={currentQuestionSecond} onNext={handleNextQuestion} addSecond={addObjectToEnd} onBack={ handleBackQuestion} isFirst={secondArrayIndex===0}/>
      ) : (
        <QuestionComponent questionData={currentQuestion} onNext={handleNextQuestion} addSecond={addObjectToEnd} onBack={ handleBackQuestion}  isFirst={currentQuestionIndex===0}/>
      )}
    </div>
  </SnackbarProvider>
);
}
