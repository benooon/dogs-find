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

function BasicSelect({filterOptions,handleChange,value}) {
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    if (!questionData) {
        return null;
      }
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
        
//         {
//             "_id": "649ebe0626f66070975bc7aa",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מה מהתשובות הבאות הינו יתרון מרכזי של ניתוח ועיצוב מונחה עצמים? OOAD",
//             "A": "שימוש חוזר בשורות של קוד גובר",
//             "B": "מורכבות קוד גוברת",
//             "C": "שגיאות זמן הריצה מוגברות",
//             "D": "הפשטה מוגבלת"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7ab",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מהי המטרה של דיאגרמת use case ב - UML?",
//             "A": "לתאר את האינטראקציות של המשתמש עם המערכת",
//             "B": "לתאר את הקשרים בין האובייקטים",
//             "C": "לייצג את מבנה המערכת והתנהגותה",
//             "D": "למדל את האובייקטים של המערכת ואת הקשרים ביניהם"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7ac",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מהי גישת התכנות הנפוצה ביותר לפיתוח מערכת מידע?",
//             "A": "תכנות מונחה עצמים",
//             "B": "תכנות מודולרי",
//             "C": "תכנות פרוצדולרי",
//             "D": "כל שיטות התכנות רלוונטיות"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7ad",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מה היתרון של OOAD?",
//             "A": "כל התשובות נכונות",
//             "B": "שימוש חוזר",
//             "C": "קל לתחזוק",
//             "D": "פיתוח מהיר"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7ae",
//             "subject": "תרשים USE CASE",
//             "qestion": "מהו תרשים USE CASE?",
//             "A": "תרשים סטטי המרחיב את ה-USER STORY",
//             "B": "תרשים דינאמי המרחיב את ה-USER STORY",
//             "C": "תרשים סטטי המבוסס על תכנות מודולרי",
//             "D": "תרשים דינאמי המבוסס על תכנות מודולרי"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7af",
//             "subject": "תרשים USE CASE",
//             "qestion": "מהו קשר המתאר תת תרחיש המתרחש לעיתים רחוקות?",
//             "A": "קשר EXTENDS",
//             "B": "קשר INCLUDES",
//             "C": "שני הקשרים הנ\"ל",
//             "D": "אף תשובה לא נכונה"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7b0",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מה זה אובייקט?\n",
//             "A": "כל דבר שניתן לשייך לו קונספט מסוים",
//             "B": "ישות שמקבלת תכונות",
//             "C": "ישות בעלת תכונות והתנהגויות",
//             "D": "אף תשובה לא נכונה"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7b1",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מה המרכיבים ל-OOAD?\n",
//             "A": "תשובה ב'+ג' נכונות",
//             "B": "מחוללי קוד, כלי ניתוח, מחוללי תיעוד",
//             "C": "כלי תרשימים, מחוללי דוחות, מאגר מרכזי",
//             "D": "מאגר מרכזי,מחוללי דוחות, מחוללי חשמל,מחוללי תיעוד"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7b2",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מה מבין הטענות נכונה? (טענה אחת או יותר מבין ה5)\n1. בהיבט של ניתוח מערכות מידע לרוב נעסוק בהבנת בעיות\n2. בהיבט של ניתוח מערכות מידע לרוב נעסוק בהבנת הפתרונות\n3. בהיבט של עיצוב מערכות מידע לרוב נעסוק בהבנת הפתרונות\n4. בניתוח מערכות מידע מבינים את מבנה האובייקטים ובעיצוב מערכות מידע תהא חשיבה על מבנה האובייקטים בהשמת דגש על הגדרתם לרבות תכונות והתנהגות האובייקטים\n5. בניתוח מערכות מידע תהא חשיבה על הגדרת האובייקטים ובעיצוב מערכות מידע תהא חשיבה על מבנה האובייקטים",
//             "A": "1,3,4",
//             "B": "כל התשובות נכונות",
//             "C": "כל התשובות שגויות",
//             "D": "2,4,5"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7b3",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מה המשפט הנכון ביותר?",
//             "A": "ב ANALYSIS אנחנו רוצים להבין את הבעיות בארגון",
//             "B": "ב ANALYSIS נגדיר בצורה מדויקת מיהם האובייקטים",
//             "C": "ב ANALYSIS אי אפשר עוד להבין את מבנה האובייקטים במערכת",
//             "D": "ב ANALYSIS איכות המערכת לא עוברת שיפור"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7b4",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מה הם רמות החלוקה של כלי CASE?",
//             "A": "Upper case tools | Lower case tools | Integrated case tools",
//             "B": "Upper case tools | Medium case tools | Lower case tools",
//             "C": "United case tools | Ununited case tools",
//             "D": "In Organization case tools | Out Organization case tools | Integrated case tools"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7b5",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מה הוא אחד ההבדלים בין תרשים UML סטטי לדינמי?",
//             "A": "תרשים סטטי מתאר את המערכת בעוד תרשים דינמי מתאר את התנהגות המערכת על ציר הזמן",
//             "B": "תרשים סטטי הוא תרשים שחל איסור לשנות אותו לאחר שנכתב בעוד תרשים דינמי הוא תרשים שניתן לערוך בתנאי שמוסיפים תיאור לעריכה",
//             "C": "תרשים סטטי הוא תרשים המקובל בגישת פיתוח מפל המים בעוד תרשים דינמי מקובל בגישות פיתוח אג'יליות",
//             "D": "תרשים סטטי מתאר את התנהגות המערכת בעוד תרשים דינמי מתאר את המבנה של המערכת"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7b6",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מהם היתרונות בפיתוח OOAD?",
//             "A": "כל התשובות נכונות",
//             "B": "פיתוח מהיר",
//             "C": "התאמה מהירה לשינויים בדרישות",
//             "D": "מאפשר עיצוב איכותי יותר"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7b7",
//             "subject": "תרשים USE CASE",
//             "qestion": "מהי המטרה העיקרית של דיאגרמת use case ?",
//             "A": "להציג את אופן פעולת המערכת מנקודת מבטו של המשתמש.",
//             "B": "להראות את הפעולות הפנימיות של המערכת.",
//             "C": "להראות את מבנה החבילות בפרויקט ואת הקשרים ביניהם.",
//             "D": "להראות את ההתנהגות של המערכת על ציר הזמן."
//         },
//         {
//             "_id": "649ebe0626f66070975bc7b8",
//             "subject": "תרשים USE CASE",
//             "qestion": "מהו use case?",
//             "A": "מוצגת כאליפסה המתארת את תרחישי המערכת, הדרישות.",
//             "B": "ייצוג גרפי של המערכת.",
//             "C": "מוצגת כאליפסה המתארת מי משתמש במערכת המידע.",
//             "D": "ייצוג גרפי של \"איך\" המערכת תבצע את הדרישה."
//         },
//         {
//             "_id": "649ebe0626f66070975bc7b9",
//             "subject": "תרשים USE CASE",
//             "qestion": "באיזה שלב במחזור החיים של מערכת המידע נפגוש את דיאגרמת הuse case?",
//             "A": "שלב איסוף הדרישות/ ניתוח",
//             "B": "שלב הקידוד",
//             "C": "שלב העיצוב",
//             "D": "שלב הבדיקות"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7ba",
//             "subject": "תרשים מחלקות",
//             "qestion": "מהו Package Diagram?",
//             "A": "תרשים סטטי ניהולי הנותן צפייה כוללת על מבנה הפרויקט.",
//             "B": "תרשים דינאמי ניהולי הנותן צפייה כוללת על ההתרחשות הדינמית בפרויקט.",
//             "C": "רשים סטטי ניהולי הנותן צפייה חלקית על מבנה הפרויקט.",
//             "D": "תרשים דינאמי ניהולי הנותן צפייה חלקית על ההתרחשות הדינמית בפרויקט."
//         },
//         {
//             "_id": "649ebe0626f66070975bc7bb",
//             "subject": "תרשים מחלקות",
//             "qestion": "מה מתאר תרשים מחלקה?",
//             "A": "תרשים מחלקה מתאר את מבנה החבילות (אוסף של מחלקות פונקציות ושיטות) ואת הקשרים בניהן.",
//             "B": "תרשים מחלקה מתאר את מבנה החבילות הפונקציות ואת הקשרים בניהן.",
//             "C": "תשובות א' וב' נכונות",
//             "D": "אף תשובה אינה נכונה"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7bc",
//             "subject": "תרשים USE CASE",
//             "qestion": "בהקשר של USE CASE DIAGRAM ההגדרה של שחקן (ACTOR) הטובה ביותר מבין התשובות הבאות היא:",
//             "A": "מתאר תפקיד של משתמש או מערכת אחרת כאשר הם משתמשים במערכת המידע והם אקטיביים ויוזמים פעולות (בעלי השפעה)",
//             "B": "שחקן הוא כל אחד אשר קשור באופן אקטיבי וגם פסיבי לתרחיש ולוקח חלק בהליך",
//             "C": "שחקן הוא האיש שאוסף את הדרישות ואחראי עליהן ועל מתן ביטוי הולם לדרישות האלו בתרשים",
//             "D": "שחקן הוא דמות אחת ויחידה בתרשים שהינה בעלת התפקיד החשוב ביותר והאקטיבי ביותר בתרשים ומוגבלת לאחת בלבד במסגרת תרשים USE CASE"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7bd",
//             "subject": "תרשים USE CASE",
//             "qestion": "מה ההבדל בין UC ל-UCD?\n",
//             "A": "UC זה תיאור של תרחיב שימוש במערכת ו-UCD הוא שם המודל הויזואלי",
//             "B": "UC זה מודל ויזאולי",
//             "C": "UCD זה תיאור תרחיש",
//             "D": "אף תשובה לא נכונה"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7be",
//             "subject": "תרשים USE CASE",
//             "qestion": "מה המטרות של ה-UCD ?",
//             "A": "כל התשובות נכונות",
//             "B": "הגדרה של המבנה או ההתנהגות של המערכת",
//             "C": "מתודולוגיה לניתוח ועיצוב מערכת",
//             "D": "תיעוד החלטות שמתקבלות"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7bf",
//             "subject": "תרשים USE CASE",
//             "qestion": "לאיזה שלבים תרשים USECASE רלוונטי?",
//             "A": "תשובה ב+ד",
//             "B": "שלב איסוף הדרישות",
//             "C": "שלב בניית מסד הנתונים",
//             "D": "שלב הבדיקות"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7c0",
//             "subject": "תרשים USE CASE",
//             "qestion": "כיצד נתאר תת תרחיש של תרחיש מסוים שקורה לעיתים?",
//             "A": "נייצר תרחיש extend שיחובר בקו מקוקו מתת התרחיש לתרחיש",
//             "B": "נייצר תרחיש include שיחובר בקו מקוקו מתת התרחיש לתרחיש",
//             "C": "נייצר תרחיש include שיחובר בקו מקוקו מהתרחיש לתת התרחיש",
//             "D": "נרשום בשלב post-condition בתיעוד התרחיש"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7c1",
//             "subject": "תרשים USE CASE",
//             "qestion": "סמן את המשט הלא נכון לגבי USE CASE:",
//             "A": "השחקן לא חייב להיות זה שמאתחל את הUSE CASE.",
//             "B": "זהו תרחיש שימוש במערכת ומתואר בתור אליפסה עם שם.",
//             "C": "זה משהו ששחקן יכול לבצע בתוך המערכת.",
//             "D": "ה-USE CASE צריך לתת ערך."
//         },
//         {
//             "_id": "649ebe0626f66070975bc7c2",
//             "subject": "תרשים USE CASE",
//             "qestion": "מהי המטרה של תרשים USE CASE?\n",
//             "A": "לתאר את היחסים בין השחקנים לבין מקרי השימוש",
//             "B": "להציג את רצף האירועים בתרחיש מסוים",
//             "C": "להמחיש את המבנה המעמדי של המערכת"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7c3",
//             "subject": "תרשים מחלקות",
//             "qestion": "מהו class בclass diagram?",
//             "A": "תבנית ליצירת אובייקטים במערכת",
//             "B": "אובייקט במערכת",
//             "C": "תכונה במערכת",
//             "D": "התנהגות במערכת"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7c4",
//             "subject": "תרשים מחלקות",
//             "qestion": "מה אינו נכון בהקשר לתרשים class diagram?",
//             "A": "תרשים דינאמי המתאר את מבנה המערכת ע\"י הצגת המחלקות במערכת.",
//             "B": "תרשים סטטי המתאר את מבנה המערכת ע\"י הצגת המחלקות במערכת.",
//             "C": "חלק מתרשימי UML",
//             "D": "דומה לתרשים ERD אשר מתאר מבנה של טבלאות, השדות והקשרים ביניהם."
//         },
//         {
//             "_id": "649ebe0626f66070975bc7c5",
//             "subject": "תרשים USE CASE",
//             "qestion": "באיזה שלב בפיתוח מערכת המידע, נבנה תרשים Use Case?",
//             "A": "בשלב איסוף הדרישות",
//             "B": "בשלב העיצוב",
//             "C": "בשלב הקידוד",
//             "D": "באף שלב לא נבנה תרשים Use Case"
//         },
//         {
//             "_id": "649ebe0626f66070975bc7c6",
//             "subject": "OOAD, מבוא ל-UML וכלי CASE",
//             "qestion": "מהם כלי CASE?",
//             "A": "כלים ממוחשבים שתומכים בהליך המלא של פיתוח מערכת המידע",
//             "B": "אלמנטים מורכבים לבניית תרשים BPMN",
//             "C": "טכניקות לאיסוף דרישות",
//             "D": "כל התשובות לא נכונות"
//         }
//           ];

//         setQuestionData(questionData);
//         setDataOriginal(questionData);
//         console.log('questionData', DataOriginal);
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
alert('End of questions');
      console.log('End of questions');
    }
  }
  if (!questionData) {
    return <p>Loading...</p>;
  }
  const handleChange = (event) => {
    const selectedSubject = event.target.value;
    setFilterSubject(selectedSubject);
    setCurrentQuestionIndex(0); // Reset current question index
  };

  useEffect(() => {
    if (questionData) {
      let filteredQuestions = questionData;

      if (filterSubject !== 'all') {
        filteredQuestions = questionData.filter(
          (question) => question.subject === filterSubject
        );
      }

      setQuestionData(shuffleQuestions(filteredQuestions));
    }
  }, [questionData, filterSubject]);


  const currentQuestion = questionData[currentQuestionIndex];
  const uniqueSubjects = [...new Set(questionData.map((question) => question.subject))];


  return (
    <div>
     <div className='drop-down'> 
     filer by subject
         <BasicSelect filterOptions={uniqueSubjects} handleChange={handleChange} value={filterSubject} />
         </div>

         <QuestionComponent questionData={currentQuestion} onNext={handleNextQuestion} />

    </div>

  );
}
