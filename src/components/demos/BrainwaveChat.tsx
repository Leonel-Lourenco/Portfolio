import { useState, useRef, useEffect } from 'react';
import responsesData from '../../data/brainwave-responses.json';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface TestQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface GradeStats {
  testsCompleted: number;
  totalCorrect: number;
  totalQuestions: number;
  currentStreak: number;
}

type ViewMode = 'chat' | 'test' | 'results';

export default function BrainwaveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: responsesData.welcomeMessage
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Test mode state
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [testAnswers, setTestAnswers] = useState<boolean[]>([]);
  
  // Grade tracking (in-memory, clears on page reload)
  const [gradeStats, setGradeStats] = useState<GradeStats>({
    testsCompleted: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    currentStreak: 0
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // COPPA guardrails - check for blocked patterns
  const checkGuardrails = (query: string): string | null => {
    const normalizedQuery = query.toLowerCase().trim();
    const guardrails = (responsesData as any).guardrails;
    
    if (guardrails && guardrails.blockedPatterns) {
      for (const pattern of guardrails.blockedPatterns) {
        if (normalizedQuery.includes(pattern.toLowerCase())) {
          return guardrails.blockedResponse;
        }
      }
    }
    return null;
  };

  const findResponse = (query: string): string => {
    // Check guardrails first
    const guardrailResponse = checkGuardrails(query);
    if (guardrailResponse) return guardrailResponse;
    
    const normalizedQuery = query.toLowerCase().trim();
    
    for (const entry of responsesData.responses) {
      for (const pattern of entry.patterns) {
        if (normalizedQuery.includes(pattern.toLowerCase())) {
          return entry.response;
        }
      }
    }
    
    return responsesData.fallbackResponse;
  };
  
  // Start a new test with 5 random questions
  const startTest = () => {
    const allQuestions = (responsesData as any).testQuestions as TestQuestion[];
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    
    setTestQuestions(selected);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTestAnswers([]);
    setViewMode('test');
  };
  
  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return; // Already answered
    setSelectedAnswer(index);
  };
  
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const currentQuestion = testQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    
    setTestAnswers([...testAnswers, isCorrect]);
    setShowExplanation(true);
    
    // Update streak
    if (isCorrect) {
      setGradeStats(prev => ({
        ...prev,
        currentStreak: prev.currentStreak + 1
      }));
    } else {
      setGradeStats(prev => ({
        ...prev,
        currentStreak: 0
      }));
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Test complete - testAnswers already includes all 5 answers
      const correctCount = testAnswers.filter(Boolean).length;
      setGradeStats(prev => ({
        ...prev,
        testsCompleted: prev.testsCompleted + 1,
        totalCorrect: prev.totalCorrect + correctCount,
        totalQuestions: prev.totalQuestions + 5
      }));
      setViewMode('results');
    }
  };
  
  const handleBackToChat = () => {
    setViewMode('chat');
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const response = findResponse(userMessage.content);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => {
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // List items
        if (line.startsWith('- ')) {
          return `<li key=${i} class="ml-4">${line.slice(2)}</li>`;
        }
        // Numbered list
        if (/^\d+\.\s/.test(line)) {
          return `<li key=${i} class="ml-4">${line.replace(/^\d+\.\s/, '')}</li>`;
        }
        return line;
      })
      .join('<br/>');
  };

  // Test Mode UI
  if (viewMode === 'test' && testQuestions.length > 0) {
    const currentQuestion = testQuestions[currentQuestionIndex];
    
    return (
      <div className="flex flex-col h-[500px]">
        {/* Progress Bar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {testQuestions.length}
            </span>
            <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full capitalize">
              {currentQuestion.category}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / testQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Question */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-xl font-bold text-primary mb-6">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showExplanation
                    ? index === currentQuestion.correctIndex
                      ? 'border-green-500 bg-green-50'
                      : index === selectedAnswer
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-white opacity-50'
                    : selectedAnswer === index
                      ? 'border-accent bg-accent/10'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showExplanation
                      ? index === currentQuestion.correctIndex
                        ? 'bg-green-500 text-white'
                        : index === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      : selectedAnswer === index
                        ? 'bg-accent text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-primary">{option}</span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Explanation */}
          {showExplanation && (
            <div className={`mt-6 p-4 rounded-lg ${
              selectedAnswer === currentQuestion.correctIndex
                ? 'bg-green-50 border border-green-200'
                : 'bg-amber-50 border border-amber-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === currentQuestion.correctIndex ? (
                  <>
                    <span className="text-green-600 text-lg">🎉</span>
                    <span className="font-bold text-green-700">Correct!</span>
                  </>
                ) : (
                  <>
                    <span className="text-amber-600 text-lg">💡</span>
                    <span className="font-bold text-amber-700">Not quite!</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="p-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleBackToChat}
            className="px-4 py-2 text-gray-600 hover:text-primary transition-colors"
          >
            ← Back to Chat
          </button>
          <div className="flex-1" />
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors"
            >
              {currentQuestionIndex < testQuestions.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    );
  }
  
  // Results View
  if (viewMode === 'results') {
    const correctCount = testAnswers.filter(Boolean).length;
    const percentage = Math.round((correctCount / 5) * 100);
    
    return (
      <div className="flex flex-col h-[500px] items-center justify-center p-6">
        <div className="text-center max-w-sm">
          {/* Score Circle */}
          <div className="w-32 h-32 mx-auto mb-6 rounded-full border-8 border-accent flex items-center justify-center">
            <div>
              <div className="text-3xl font-bold text-primary">{correctCount}/5</div>
              <div className="text-sm text-gray-500">{percentage}%</div>
            </div>
          </div>
          
          {/* Message */}
          <h2 className="text-2xl font-bold text-primary mb-2">
            {percentage === 100 ? '🌟 Perfect Score!' : 
             percentage >= 80 ? '🎉 Great Job!' : 
             percentage >= 60 ? '👍 Good Effort!' : 
             '💪 Keep Practicing!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {percentage === 100 ? "You're a superstar learner!" : 
             percentage >= 80 ? "You really know your stuff!" : 
             percentage >= 60 ? "You're on the right track!" : 
             "Every question helps you learn something new!"}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xl font-bold text-accent">{gradeStats.testsCompleted}</div>
              <div className="text-xs text-gray-500">Tests Done</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xl font-bold text-accent">
                {gradeStats.totalQuestions > 0 
                  ? Math.round((gradeStats.totalCorrect / gradeStats.totalQuestions) * 100) 
                  : 0}%
              </div>
              <div className="text-xs text-gray-500">Overall</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xl font-bold text-accent">{gradeStats.currentStreak}🔥</div>
              <div className="text-xs text-gray-500">Streak</div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleBackToChat}
              className="px-6 py-3 border border-gray-300 text-primary rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Chat
            </button>
            <button
              onClick={startTest}
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Chat View (default)
  return (
    <div className="flex flex-col h-[500px]">
      {/* Stats Bar */}
      {gradeStats.testsCompleted > 0 && (
        <div className="px-4 py-2 bg-accent/10 border-b border-accent/20 flex items-center justify-between text-sm">
          <span className="text-accent font-medium">
            📊 Tests: {gradeStats.testsCompleted} | Score: {gradeStats.totalQuestions > 0 ? Math.round((gradeStats.totalCorrect / gradeStats.totalQuestions) * 100) : 0}%
          </span>
          {gradeStats.currentStreak > 0 && (
            <span className="text-accent">🔥 {gradeStats.currentStreak} streak!</span>
          )}
        </div>
      )}
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-primary'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">
                    B
                  </span>
                  <span>BrainWave</span>
                </div>
              )}
              <div 
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
              />
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">
                  B
                </span>
                <span>BrainWave</span>
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about math, science, or reading..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-sm"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-400">
            Try: "What is 7 times 8?" or "Tell me about the solar system"
          </p>
          <button
            onClick={startTest}
            className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-colors font-medium"
          >
            📝 Take a Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
