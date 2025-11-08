import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { generateQuiz } from './services/geminiService.ts';
import { GameState, Difficulty, Question } from './types.ts';
import AdSense from './components/AdSense.tsx';

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}

// --- Utility Functions (defined outside components to prevent re-creation) ---

const getFeedbackMessage = (percentage: number): string => {
    if (percentage < 50) return "Every mistake is a lesson learned. Keep trying!";
    if (percentage < 80) return "Great job! You're on the right track.";
    return "Excellent work! You've mastered this topic.";
};

const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    const lines: string[] = [];

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    
    const totalHeight = (lines.length -1) * lineHeight;
    const startY = y - totalHeight / 2;

    lines.forEach((l, i) => {
        context.fillText(l.trim(), x, startY + i * lineHeight);
    });
};


// --- Reusable Components (defined outside App to prevent re-creation) ---

const Button: React.FC<{ onClick?: () => void; children: React.ReactNode; className?: string; disabled?: boolean; type?: 'submit' | 'button' | 'reset' }> = ({ onClick, children, className, disabled, type = 'button' }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.05, boxShadow: "0px 0px 12px rgb(59 130 246 / 0.5)" } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
    onClick={onClick}
    disabled={disabled}
    aria-disabled={disabled}
    type={type}
    className={`bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 flex items-center justify-center min-w-[200px] min-h-[56px] ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-500'} ${className}`}
  >
    {children}
  </motion.button>
);

const Loader: React.FC<{ message: string }> = ({ message }) => (
    <div role="status" className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
        <p className="text-lg text-slate-300">{message}</p>
    </div>
);

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => (
    <div className="w-full bg-slate-700 rounded-full h-2.5">
        <motion.div
            className="bg-blue-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(current / total) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />
    </div>
);

const SocialIcon: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-slate-500 hover:text-slate-300 transition-colors">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      {children}
    </svg>
  </a>
);

// --- Share Modal Component ---

interface ShareModalProps {
    score: number;
    totalQuestions: number;
    topic: string;
    onClose: () => void;
    shareButtonRef: React.RefObject<HTMLButtonElement>;
}

const ShareModal: React.FC<ShareModalProps> = ({ score, totalQuestions, topic, onClose, shareButtonRef }) => {
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const shareText = `I scored ${percentage}% on the "${topic}" quiz on CrackTest.xyz! Think you can beat me? 🧠 #CrackTest #AIQuiz`;
    const shareUrl = window.location.href;
    const modalRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

    useEffect(() => {
        const modalNode = modalRef.current;
        if (!modalNode) return;

        const focusableElements = modalNode.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        firstElement.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            shareButtonRef.current?.focus();
        };
    }, [onClose, shareButtonRef]);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        const width = 1080;
        const height = 1080;
        canvas.width = width;
        canvas.height = height;

        // Background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#1e293b'); // slate-800
        gradient.addColorStop(1, '#0f172a'); // slate-900
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Title
        ctx.fillStyle = '#f1f5f9'; // slate-100
        ctx.font = 'bold 50px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('My Quiz Result', width / 2, 80);

        // Topic - with wrapping
        ctx.fillStyle = '#94a3b8'; // slate-400
        ctx.font = '45px sans-serif';
        wrapText(ctx, `Topic: ${topic}`, width / 2, 220, width - 150, 55);

        // Score Percentage
        const scoreGradient = ctx.createLinearGradient(width * 0.2, 0, width * 0.8, 0);
        scoreGradient.addColorStop(0, '#38bdf8'); // sky-400
        scoreGradient.addColorStop(1, '#2563eb'); // blue-600
        ctx.fillStyle = scoreGradient;
        ctx.font = 'bold 280px sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${percentage}%`, width / 2, height / 2 - 20);

        // Feedback Message
        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'italic 45px sans-serif';
        ctx.textBaseline = 'top';
        wrapText(ctx, `“${getFeedbackMessage(percentage)}”`, width / 2, height / 2 + 180, width - 150, 60);

        // Branding
        ctx.fillStyle = '#64748b'; // slate-500
        ctx.font = 'bold 60px sans-serif';
        ctx.fillText('CrackTest.xyz', width / 2, height - 100);
    }, [percentage, topic]);

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            const safeTopic = topic.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
            link.download = `CrackTest_Results_${safeTopic}.png`;
            link.href = image;
            link.click();
        }
    };

    const copyResultsText = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert("Failed to copy results text.");
        }
    };
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-slate-800 rounded-2xl p-6 md:p-8 w-full max-w-lg relative border border-slate-700 shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-slate-500 hover:text-white" aria-label="Close">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <h3 className="text-2xl font-bold text-center mb-4">Share Your Achievement!</h3>
                
                <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    <canvas ref={canvasRef} className="w-full h-auto" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <button onClick={downloadImage} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download
                    </button>
                    <button onClick={copyResultsText} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        {copyStatus === 'copied' ? 'Copied!' : 'Copy Text'}
                    </button>
                </div>

                <div className="flex items-center justify-center space-x-4 mt-4">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white" aria-label="Share on Facebook">
                       <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
                    </a>
                     <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} data-action="share/whatsapp/share" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white" aria-label="Share on WhatsApp">
                       <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.166l-.215.324-1.113 4.046 4.152-1.082.333-.215z"/></svg>
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};


// --- Main Application Component ---

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(GameState.HOME);
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<'a' | 'b' | 'c' | 'd' | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const nextQuestionTimeoutRef = useRef<number | null>(null);
    const shareButtonRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    
    useEffect(() => {
        // Reset answer state for each new question
        setIsAnswered(false);
        setSelectedAnswer(null);
        // Clear any pending timeout when question changes
        if (nextQuestionTimeoutRef.current) {
            clearTimeout(nextQuestionTimeoutRef.current);
        }
    }, [currentQuestionIndex]);
    
    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => {
            if (nextQuestionTimeoutRef.current) {
                clearTimeout(nextQuestionTimeoutRef.current);
            }
        };
    }, []);

    const initializeAudio = () => {
        if (audioContextRef.current) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioContextRef.current = new AudioContext();
            } else {
                console.warn("Web Audio API is not supported in this browser.");
            }
        } catch (e) {
            console.error("Failed to create AudioContext", e);
        }
    };

    const playSound = useCallback((type: 'correct' | 'incorrect') => {
        const audioCtx = audioContextRef.current;
        if (!audioCtx) return;

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        const now = audioCtx.currentTime;

        if (type === 'correct') {
            // A pleasant, ascending "power-up" arpeggio
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(0.1, now);
            oscillator.frequency.setValueAtTime(523.25, now); // C5
            oscillator.frequency.setValueAtTime(659.25, now + 0.05); // E5
            oscillator.frequency.setValueAtTime(783.99, now + 0.1); // G5
            gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.2);
            oscillator.start(now);
            oscillator.stop(now + 0.2);
        } else { // incorrect
            // A classic, low "fail" buzz
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.15, now);
            oscillator.frequency.setValueAtTime(220, now); // A3
            oscillator.frequency.exponentialRampToValueAtTime(110, now + 0.2); // A2
            gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.3);
            oscillator.start(now);
            oscillator.stop(now + 0.3);
        }
    }, []);

    const startQuizSetup = () => {
        initializeAudio();
        setGameState(GameState.SETUP);
    };

    const showAboutPage = () => setGameState(GameState.ABOUT);
    const showPrivacyPolicy = () => setGameState(GameState.PRIVACY);
    const showTermsOfService = () => setGameState(GameState.TERMS);
    const showContactPage = () => setGameState(GameState.CONTACT);

    const goHome = () => {
        setTopic('');
        setDifficulty(Difficulty.MEDIUM);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setError(null);
        setIsGenerating(false);
        setIsShareModalOpen(false);
        setIsAnswered(false);
        setSelectedAnswer(null);
        setGameState(GameState.HOME);
    };

    const handleStartQuiz = useCallback(async () => {
        if (!topic.trim()) {
            setError("Please enter a topic.");
            return;
        }
        setError(null);
        setIsGenerating(true);
        setGameState(GameState.LOADING);
        try {
            const quizQuestions = await generateQuiz(topic, difficulty);
            setQuestions(quizQuestions);
            setCurrentQuestionIndex(0);
            setScore(0);
            setGameState(GameState.QUIZZING);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
            setGameState(GameState.ERROR);
        } finally {
            setIsGenerating(false);
        }
    }, [topic, difficulty]);

    const handleAnswer = (selectedOption: 'a' | 'b' | 'c' | 'd') => {
        if (isAnswered) return; // Guard against multiple answers
        
        setIsAnswered(true);
        setSelectedAnswer(selectedOption);

        if (questions[currentQuestionIndex].correct === selectedOption) {
            setScore(prev => prev + 1);
            playSound('correct');
        } else {
            playSound('incorrect');
        }
        
        // Use a longer timeout to let the user see the feedback
        nextQuestionTimeoutRef.current = window.setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                setGameState(GameState.RESULTS);
            }
        }, 1200);
    };

    const handleShare = () => {
        if (questions.length === 0) return;
        setIsShareModalOpen(true);
    };
    
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 },
    };

    const pageTransition: Transition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };

    const renderContent = () => {
        switch (gameState) {
            case GameState.HOME:
                return (
                    <motion.div key="home" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="text-center flex flex-col items-center">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter">CrackTest</h1>
                        <p className="text-xl md:text-2xl text-slate-400 mt-2 mb-12">Crack Your Limits.</p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Button onClick={startQuizSetup}>Start Quiz</Button>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(100 116 139 / 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={showAboutPage}
                                className="bg-slate-800 text-slate-300 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 hover:bg-slate-700 border-2 border-slate-700"
                            >
                                About Us
                            </motion.button>
                        </div>
                    </motion.div>
                );
            case GameState.SETUP:
                return (
                    <motion.div key="setup" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="w-full max-w-md mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Quiz Setup</h2>
                        <form onSubmit={(e) => { e.preventDefault(); if (!isGenerating) handleStartQuiz(); }} className="flex flex-col items-center w-full">
                            {error && <p className="text-red-400 mb-4">{error}</p>}
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Enter any topic..."
                                className="w-full bg-slate-800 border-2 border-slate-700 rounded-full px-6 py-3 text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Quiz Topic"
                            />
                            <div className="flex justify-center space-x-2 mb-6">
                                {Object.values(Difficulty).map(d => (
                                    <button
                                        key={d}
                                        type="button" // Prevent form submission
                                        onClick={() => setDifficulty(d)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${difficulty === d ? 'bg-blue-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                            <Button type="submit" disabled={isGenerating}>
                                {isGenerating ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating...
                                    </>
                                ) : (
                                    'Generate Quiz'
                                )}
                            </Button>
                        </form>
                        <button onClick={goHome} className="block mx-auto mt-4 text-slate-400 hover:text-white">Back</button>
                    </motion.div>
                );
            case GameState.LOADING:
                return (
                    <motion.div key="loading" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}>
                        <Loader message="Crafting your challenge..." />
                    </motion.div>
                );
            case GameState.QUIZZING:
                const q = questions[currentQuestionIndex];

                const getButtonClass = (opt: 'a' | 'b' | 'c' | 'd'): string => {
                    const baseClass = "p-4 rounded-lg text-left text-lg transition-all duration-300 w-full flex items-center";

                    if (!isAnswered) {
                        return `${baseClass} bg-slate-800 hover:bg-slate-700 border-2 border-transparent focus:outline-none focus:border-blue-500`;
                    }

                    const isCorrect = q.correct === opt;
                    const isSelected = selectedAnswer === opt;

                    if (isCorrect) {
                        return `${baseClass} bg-green-800 border-2 border-green-500 scale-105`;
                    }
                    if (isSelected && !isCorrect) {
                        return `${baseClass} bg-red-800 border-2 border-red-500`;
                    }
                    return `${baseClass} bg-slate-800 opacity-50`;
                };

                return (
                    <motion.div key={`question-${currentQuestionIndex}`} variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="w-full max-w-2xl mx-auto">
                        <div className="relative text-center mb-6">
                            <p className="text-slate-400">{currentQuestionIndex + 1} of {questions.length}</p>
                            <h2 className="text-2xl md:text-3xl font-semibold mt-2 min-h-[3em] flex items-center justify-center">{q.q}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(['a', 'b', 'c', 'd'] as const).map(opt => (
                                <motion.button
                                    key={opt}
                                    onClick={() => handleAnswer(opt)}
                                    disabled={isAnswered}
                                    aria-disabled={isAnswered}
                                    className={getButtonClass(opt)}
                                    whileHover={isAnswered ? {} : { scale: 1.03 }}
                                >
                                   <span className="font-bold text-blue-400 mr-3">{opt.toUpperCase()}.</span> {q[opt]}
                                </motion.button>
                            ))}
                        </div>
                        <div className="mt-8">
                            <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
                        </div>
                    </motion.div>
                );
            case GameState.RESULTS:
                const percentage = Math.round((score / questions.length) * 100);

                 return (
                    <motion.div key="results" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="text-center">
                        <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
                        <p className="text-6xl font-black text-blue-400 my-4">{percentage}%</p>
                        <p className="text-xl text-slate-300">You answered {score} out of {questions.length} questions correctly.</p>
                        <p className="text-lg text-slate-400 mt-4 italic">“{getFeedbackMessage(percentage)}”</p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button onClick={goHome}>Take Another Quiz</Button>
                            <motion.button
                                ref={shareButtonRef}
                                whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(100 116 139 / 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleShare}
                                className="bg-slate-800 text-slate-300 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 hover:bg-slate-700 border-2 border-slate-700 flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                Share Results
                            </motion.button>
                        </div>
                        <AdSense className="mt-8" />
                    </motion.div>
                );
            case GameState.ERROR:
                return (
                    <motion.div key="error" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="text-center w-full max-w-md mx-auto">
                        <h2 className="text-3xl font-bold text-red-400 mb-4">An Error Occurred</h2>
                        <p className="text-slate-300 mb-6">{error}</p>
                        <Button onClick={goHome}>Try Again</Button>
                    </motion.div>
                );
            case GameState.ABOUT:
                return (
                    <motion.div key="about" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="text-center w-full max-w-3xl mx-auto">
                        <h2 className="text-5xl font-black tracking-tighter mb-4">Beyond the Test.</h2>
                        <p className="text-xl text-slate-400 mb-10">Our mission is to unlock human potential through the power of intelligent practice.</p>
            
                        <div className="text-left space-y-6 text-slate-300 max-w-2xl mx-auto">
                            <p>
                                CrackTest.xyz was born from a simple idea: learning should be limitless, engaging, and deeply personal. We believe that the right questions at the right time can ignite curiosity and solidify knowledge like nothing else. In a world of passive consumption, we're building a platform for active mastery.
                            </p>
                            <p>
                                At our core is Google's Gemini, one of the most advanced AI models in the world. This allows us to generate unique, high-quality quizzes on virtually any topic imaginable, from quantum physics to ancient history. It's not just about getting the right answer; it's about understanding the 'why' and building a stronger mental framework.
                            </p>
                            <p>
                                Our vision is a future where anyone, anywhere, can instantly challenge themselves and "crack their limits." Whether you're a student preparing for an exam, a professional brushing up on new skills, or a lifelong learner with an insatiable curiosity, CrackTest is your partner in growth.
                            </p>
                        </div>
            
                        <div className="mt-12 flex justify-center">
                            <Button onClick={goHome}>Back</Button>
                        </div>
                    </motion.div>
                );
            case GameState.PRIVACY:
                return (
                    <motion.div key="privacy" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="text-center w-full max-w-3xl mx-auto">
                        <h2 className="text-5xl font-black tracking-tighter mb-4">Privacy Policy</h2>
                        <p className="text-xl text-slate-400 mb-10">Last updated: {new Date().toLocaleDateString()}</p>
                        <div className="text-left space-y-4 text-slate-300 max-w-2xl mx-auto">
                            <p>Your privacy is important to us. It is CrackTest.xyz's policy to respect your privacy regarding any information we may collect from you across our website.</p>
                            <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
                            <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law. Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
                            <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
                        </div>
                        <div className="mt-12 flex justify-center">
                            <Button onClick={goHome}>Back</Button>
                        </div>
                    </motion.div>
                );
            case GameState.TERMS:
                 return (
                    <motion.div key="terms" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="text-center w-full max-w-3xl mx-auto">
                        <h2 className="text-5xl font-black tracking-tighter mb-4">Terms of Service</h2>
                        <p className="text-xl text-slate-400 mb-10">Please read these terms carefully.</p>
                        <div className="text-left space-y-4 text-slate-300 max-w-2xl mx-auto">
                           <p>By accessing the website at CrackTest.xyz, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
                           <p>Permission is granted to temporarily download one copy of the materials on CrackTest.xyz's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose; or attempt to decompile or reverse engineer any software contained on this website.</p>
                           <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by CrackTest.xyz at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>
                        </div>
                        <div className="mt-12 flex justify-center">
                            <Button onClick={goHome}>Back</Button>
                        </div>
                    </motion.div>
                );
            case GameState.CONTACT:
                return (
                    <motion.div key="contact" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="text-center w-full max-w-3xl mx-auto">
                        <h2 className="text-5xl font-black tracking-tighter mb-4">Contact Us</h2>
                        <p className="text-xl text-slate-400 mb-10">We'd love to hear from you!</p>
                        <div className="text-left space-y-4 text-slate-300 max-w-2xl mx-auto">
                           <p>For any questions, feedback, or inquiries, please reach out to us. We are always looking for ways to improve and your input is invaluable.</p>
                           <p>You can email us at: <a href="mailto:cracktest.official@gmail.com" className="text-blue-400 hover:underline">cracktest.official@gmail.com</a></p>
                           <p>We'll do our best to get back to you as soon as possible.</p>
                        </div>
                        <div className="mt-12 flex justify-center">
                            <Button onClick={goHome}>Back</Button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {isOffline && (
                <div className="bg-yellow-500 text-black text-center p-2 font-semibold fixed top-0 left-0 right-0 z-50">
                    You are currently offline. Some features may be unavailable.
                </div>
            )}
            <main className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden ${isOffline ? 'pt-10' : ''}`}>
                <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]"></div>
                <div className="relative z-10 w-full flex flex-col items-center justify-center flex-grow">
                   <AnimatePresence mode="wait">
                       {renderContent()}
                   </AnimatePresence>
                </div>
                <footer className="relative z-10 text-center text-slate-500 py-4 mt-8 flex flex-col items-center">
                    {/* DEVELOPER NOTE: Replace '#' with your actual social media profile links below */}
                    <div className="flex justify-center items-center space-x-6 mb-4">
                        <SocialIcon href="https://www.linkedin.com" label="LinkedIn">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </SocialIcon>
                        <SocialIcon href="https://www.facebook.com" label="Facebook">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/>
                        </SocialIcon>
                         <SocialIcon href="https://www.instagram.com" label="Instagram">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/>
                        </SocialIcon>
                        <SocialIcon href="https://www.whatsapp.com" label="WhatsApp">
                            <path d="M12 2.037c-5.49 0-9.954 4.464-9.954 9.954s4.464 9.954 9.954 9.954c1.783 0 3.464-.473 4.93-1.32L22 22l-1.32-4.93c.847-1.466 1.32-3.147 1.32-4.93 0-5.49-4.464-9.954-9.954-9.954zm4.888 12.133c-.242.485-.882.775-1.524.823-.526.038-1.127.001-1.748-.198-1.137-.367-2.14-1.137-2.92-2.14s-1.37-2.12-1.737-3.257c-.198-.621-.237-1.222-.198-1.748.048-.642.338-1.282.823-1.524.485-.242.966-.255 1.353-.255.31 0 .584.053.792.31.255.31.87 2.062 1.005 2.21.135.148.187.338.038.584s-.367.57-.526.753c-.158.187-.31.367-.446.485-.122.109-.27.24-.135.485.405.738 1.096 1.428 1.834 1.834.246.135.376-.013.512-.148.135-.135.597-.702.753-.91s.338-.112.584-.013c.246.148 1.897.896 2.187 1.044s.485.228.547.367c.062.135.062.775-.18 1.26z"/>
                        </SocialIcon>
                        
                    </div>
                    <div className="flex justify-center items-center space-x-4 text-sm mb-2">
                        <button onClick={showPrivacyPolicy} className="hover:text-slate-300 transition-colors" aria-label="Privacy Policy">Privacy Policy</button>
                        <span className="text-slate-600">|</span>
                        <button onClick={showTermsOfService} className="hover:text-slate-300 transition-colors" aria-label="Terms of Service">Terms of Service</button>
                        <span className="text-slate-600">|</span>
                        <button onClick={showContactPage} className="hover:text-slate-300 transition-colors" aria-label="Contact Us">Contact Us</button>
                    </div>
                    <p className="text-sm">&copy; {new Date().getFullYear()} CrackTest.xyz. All Rights Reserved.</p>
                </footer>
            </main>
            <AnimatePresence>
                {isShareModalOpen && (
                    <ShareModal 
                        score={score}
                        totalQuestions={questions.length}
                        topic={topic}
                        onClose={() => setIsShareModalOpen(false)}
                        shareButtonRef={shareButtonRef}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default App;