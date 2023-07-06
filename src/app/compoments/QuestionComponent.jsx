import React, { useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import JSConfetti from 'js-confetti'
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

export default function QuestionComponent({ questionData, onNext, addSecond }) {
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
            if (counter % 9 === 0 && counter !== 0) {
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

            <Typography dir="rtl" variant="subtitle2" gutterBottom>strike:{counter}  </Typography>
            <Typography variant="h5" gutterBottom>
                {qestion}
            </Typography>
            <Typography dir="rtl" variant="subtitle2" gutterBottom>נושא- {subject}    </Typography>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                {answers.map((answer, index) => (
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
