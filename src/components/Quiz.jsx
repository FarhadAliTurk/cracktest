import React, { useState, useEffect, useCallback } from 'react';
import { quizData } from '../data/QuizData';
import './Quiz.css';
import {
  FaTimes,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaRedo,
  FaList,
  FaSpinner
} from 'react-icons/fa';

const Quiz = ({ category, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (category && quizData[category]) {
      setQuestions([...quizData[category]]);
    }
  }, [category]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimerActive(false);
  };

  const handleNextQuestion = useCallback(() => {
    if (selectedOption === questions[currentQuestionIndex]?.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(30);
      setTimerActive(true);
    } else {
      setQuizCompleted(true);
    }
  }, [selectedOption, currentQuestionIndex, questions]);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive, handleNextQuestion]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  if (questions.length === 0) {
    return (
      <div className="quiz-loading" role="status" aria-live="polite">
        <div className="loading-spinner">
          <FaSpinner aria-hidden="true" />
        </div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="quiz-container" role="main">
        <div className="quiz-header">
          <h2>Quiz Completed!</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close quiz">
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <div className="quiz-result">
          <div className="result-icon">
            {score >= questions.length / 2 ? <FaCheckCircle aria-hidden="true" /> : <FaTimesCircle aria-hidden="true" />}
          </div>
          <h3>Your Score: {score}/{questions.length}</h3>
          <p className="result-message">
            {score === questions.length
              ? "Perfect! You aced this quiz!"
              : score >= questions.length * 0.7
              ? "Great job! You're well prepared!"
              : score >= questions.length / 2
              ? "Good effort! Keep practicing!"
              : "Keep studying to improve your score!"}
          </p>

          <div className="quiz-actions">
            <button className="btn btn-primary" onClick={resetQuiz} aria-label="Retry this quiz">
              <FaRedo aria-hidden="true" /> Retry Quiz
            </button>
            <button className="btn btn-outline" onClick={onClose} aria-label="Choose another category">
              <FaList aria-hidden="true" /> Choose Another Category
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container" role="main">
      <div className="quiz-header">
        <h2>{category} Quiz</h2>
        <button className="btn-close" onClick={onClose} aria-label="Close quiz">
          <FaTimes aria-hidden="true" />
        </button>
      </div>

      <div className="quiz-progress">
        <div className="progress-bar" aria-label="Quiz progress">
          <div
            className="progress-fill"
            style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
          ></div>
        </div>
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
      </div>

      <div className="quiz-timer">
        <FaClock aria-hidden="true" /> Time Left: {timeLeft}s
      </div>

      <div className="quiz-question">
        <h3>{currentQuestion.question}</h3>
      </div>

      <div className="quiz-options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
            disabled={selectedOption !== null}
            aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>

      <div className="quiz-actions">
        {selectedOption !== null && (
          <div className={`feedback ${selectedOption === currentQuestion.correctAnswer ? 'correct' : 'incorrect'}`} role="alert">
            {selectedOption === currentQuestion.correctAnswer ? (
              <>
                <FaCheckCircle aria-hidden="true" />
                <p>Correct! Well done.</p>
              </>
            ) : (
              <>
                <FaTimesCircle aria-hidden="true" />
                <p>Correct answer: {currentQuestion.correctAnswer}</p>
              </>
            )}
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
          aria-label={currentQuestionIndex < questions.length - 1 ? 'Next question' : 'Finish quiz'}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
