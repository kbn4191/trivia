'use client'
import { useState } from "react";
import { Modal, Box, Button, Typography, Snackbar, Slide } from '@mui/material';

import Image from "next/image";
const initialQuestions = [
    {
      question: "Who played at His Majesty’s The King’s Coronation in 2023?",
      options: [
        { id: 1, text: "Ayra Starr", indicate: "A" },
        { id: 2, text: "Tiwa Savage ", indicate: "B" },
        { id: 3, text: "Tems", indicate: "C" },
        { id: 4, text: "Niniola", indicate: "D" },
      ],
      correctAnswerId: 2,
      description: `
            On May 7, 2023, award-winning Nigerian musician, Tiwa Savage, performed at the coronation concert of King Charles III and Queen Camilla at Windsor Castle.
            <br></br>

 

Tiwatope Savage relocated to London when she was 11 years old. In 2006, Savage participated in the UK edition of The X Factor and advanced to the final 24 but ended up being the 12th person to be evicted.
            `,
    },
    {
      question:
        "Who was the first African woman to earn a degree from Oxford University?",
      options: [
        { id: 1, text: "Chimamanda Ngozi Adichie", indicate: "A" },
        { id: 2, text: "Ladi Kwali ", indicate: "B" },
        { id: 3, text: "Kofoworola Aina Ademola", indicate: "C" },
        { id: 4, text: "Bibi Bakare-Yusuf", indicate: "D" },
      ],
      correctAnswerId: 3,
      description: `
        Oloori Kofoworola "Kofo" Aina Ademola, Lady Ademola MBE, MFR, OFR was a Nigerian educationist who was the first president of the National Council of Women's Societies in Nigeria and was the head of the women's organization from 1958 to 1964.
        <br></br>

 

She was also the first black African woman to earn a degree from Oxford University studying at St Hugh's College, and an author of children's books.

 
            `,
    },
    {
      question:
        "Who scored the winning goal for England during England vs Nigeria World Cup warm-up match in 2018?",
      options: [
        { id: 1, text: "Harry Kane", indicate: "A" },
        { id: 2, text: "Danny Rose ", indicate: "B" },
        { id: 3, text: "Marcus Rashford", indicate: "C" },
        { id: 4, text: "Ruben Loftus-Cheek", indicate: "D" },
      ],
      correctAnswerId: 1,
      description: `Gary Cahill and Harry Kane scored the goals as England warmed up for the World Cup by beating Nigeria 2-1 in their friendly at Wembley.
            <br></br>

 

Alex Iwobi pulled a goal back for Nigeria right at the start of the second half, but it was not enough as England – In front of a crowd over 70,000 people – extended their unbeaten run to nine matches at the time.

 
            `,
    },
    {
      question:
        "Which Nigerian woman broke the British Guinness Book of Records for the longest cook-a-thon in 2023?",
      options: [
        { id: 1, text: "Soliat", indicate: "A" },
        { id: 2, text: "Moyosore Odunfa-Akinbo ", indicate: "B" },
        { id: 3, text: "Winifred Nwaniad", indicate: "C" },
        { id: 4, text: "Hilda Effiong Baci", indicate: "D" },
      ],
      correctAnswerId: 4,
      description: ` 
            Hilda Baci is a Nigerian professional chef, television personality, restaurateur and social media personality.
            <br></br>

 

She was the Guinness World Record holder for the longest cooking marathon at 96 official hours completed.
 <br></br>

 

She cooked in a makeshift kitchen for four days, starting on Thursday, May 11, and finishing on Monday, May 15, producing almost 100 pots of food.
 <br></br>

 
            `,
    },
    {
      question:
        "Which Nigerian city hosted Her Majesty The Queen’s baton relay in 2022?",
      options: [
        { id: 1, text: "Abuja", indicate: "A" },
        { id: 2, text: "Lagos ", indicate: "B" },
        { id: 3, text: "Port Harcourt", indicate: "C" },
        { id: 4, text: "Uyo", indicate: "D" },
      ],
      correctAnswerId: 1,
      description: ` 
           The 2022 Queen’s Baton Relay is a tradition that celebrates, connects, and excites communities from across the world during the build up to the Commonwealth Games.
           <br></br>

 

After arriving in Nigeria, the Baton toured the capital city of Abuja with a visit to Aduvie International School, the partner institution to the University of Birmingham.
 <br></br>

 

It then returned to the UK for the Opening Ceremony in Birmingham on 28 July 2022.
 
            `,
    },
    {
      question: "What year was His Majesty The King’s last visit to Nigeria?",
      options: [
        { id: 1, text: "2011", indicate: "A" },
        { id: 2, text: "2004", indicate: "B" },
        { id: 3, text: "2021", indicate: "C" },
        { id: 4, text: "2018", indicate: "D" },
      ],
      correctAnswerId: 4,
      description: ` 
           King Charles III, Prince of Wales, has visited Nigeria four times, in 1990, 1999, 2006, and 2018.
 
            `,
    },
  ];
  type Option = {
    id: number;
    text: string;
    indicate: string;
  };
  
  type Question = {
    question: string;
    options: Option[];
    correctAnswerId: number;
    description: string;
  };
const shuffleQuestions = (questions: Question[]): Question[]=> {
    return [...questions].sort(() => Math.random() - 0.5);
  };

export default function Question() {
    const [questions, setQuestions] = useState(shuffleQuestions(initialQuestions));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
 
    const [isSubmitted, setIsSubmitted] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (optionId:number) => {
    setSelectedAnswer(optionId);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return; // Prevent submission if no answer is selected
    
    const isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswerId;
    setIsCorrect(isAnswerCorrect);
    
    // Update score if the answer is correct
    if (isAnswerCorrect) {
        setScore((prevScore) => prevScore + 1);
        setSnackbarMessage("Correct!");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Wrong answer!");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    setIsSubmitted(true);
    // Show the modal for both correct and incorrect answers
    setShowModal(true);
  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const goToNextQuestion = () => {
   
    setShowModal(false);
    setSelectedAnswer(null);
    setIsSubmitted(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizEnded(true); // End quiz when no questions are left
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    goToNextQuestion();
  };
  const handleRestartQuiz = () => {
    setQuestions(shuffleQuestions(initialQuestions)); // Reshuffle questions
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizEnded(false);
  };
  return (
    <Box
      className="question backdrop-blur-sm bg-white/30"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}>
      <Box
       bgcolor={"rgba(0, 0, 0, 0.62)"}
        width={{md:"70%", xs:"95"}}
        height={{md:"70%", xs:"95"}}
        p={"50px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"24px"}>
            <div>
      {quizEnded ? (
        <div>
            <Box display={"flex"} justifyContent={"center"}>
                <Image src={"/thumbs.gif"} width={70} height={"70"} alt="thumbs up" style={{borderRadius:"100px"}}/>
                </Box>   
          <Typography textAlign={"center"} fontSize={{md:50, xs:30}} fontWeight={"700"} color="white">Thanks for playing!</Typography>
          <Typography textAlign={"center"} fontSize={{md:30, xs:20}} fontWeight={"700"} color="white" >Your score: {score} / {questions.length}</Typography >
         
                <Typography  textAlign={"center"} color="white"> #JollofandTea</Typography>
              
          <Box display={"flex"} justifyContent={"center"}>
          <Button variant="contained" onClick={handleRestartQuiz}>
            Start Again
          </Button>
          </Box>
       
          
        </div>
      ) : (
        <div>
        <Typography fontSize={{md:40, sx:16}} fontWeight={"700"} color="white">{currentQuestion.question}</Typography>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {currentQuestion.options.map(option => {
       let optionStyle = { fontWeight: "500", color: "white" };

       if (isSubmitted) {
           // Change color based on selection after submission
           if (selectedAnswer === option.id) {
               optionStyle = selectedAnswer === currentQuestion.correctAnswerId
                   ? { ...optionStyle, color: "green" } // Correct answer
                   : { ...optionStyle, color: "red" }; // Wrong answer
           } else if (option.id === currentQuestion.correctAnswerId) {
               optionStyle = { ...optionStyle, color: "green" }; // Highlight correct answer if not selected
           }
       }
      
            return (
              <li key={option.id}>
                <Box mt={{md:0, xs:2}}  fontSize={{md:30, xs:"16px"}} style={optionStyle}  >
                  <input
                    type="checkbox"
                    checked={selectedAnswer === option.id}
                    onChange={() =>{
                        handleAnswerSelect(option.id)
                       
                    } }
                  />
                  {`${option.indicate}. ${option.text}`}
                </Box>
              </li>
            );
          })}
        </ul>
        <Box display={"flex"} gap={2} mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
          >
            Submit Answer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={goToNextQuestion}
          >
            Next
          </Button>
        </Box>

        {/* Modal for answer explanation */}
        <Modal open={showModal} onClose={handleCloseModal}>
            <Box width={"10%"} px={2}>
               
       < Snackbar
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      open={snackbarOpen}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      ContentProps={{
        sx: {
          backgroundColor: snackbarSeverity === "success" ? "green" : "red",
          color: "white",
          borderRadius: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      }}
    />
          <Box width={{md:500, xs:"100%"}}   p={{md:4, xs:4}} sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
           
            bgcolor: 'background.paper',
            boxShadow: 24,
           
            borderRadius: 2,
          }}>
            

            <Typography  fontSize={30} fontWeight={600}>Did You Know?</Typography>
            <h4>{isCorrect ? "Correct Answer Explanation" : "Wrong Answer Explanation"}</h4>
            <p dangerouslySetInnerHTML={{ __html: currentQuestion.description }} />
            <Button onClick={handleCloseModal} variant="contained">Next Question</Button>
          </Box>
          </Box>
        </Modal>

       
      </div>
      )}
    </div>
        </Box>
    </Box>
  );
}
