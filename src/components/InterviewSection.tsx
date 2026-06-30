import { useState } from 'react';
import { 
  Video, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  RefreshCw, 
  Play, 
  Send, 
  Mic, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { InterviewSession, InterviewQuestion } from '../types';
import { availableRoles, mockInterviews, mockEvaluations } from '../data/mockData';

interface InterviewSectionProps {
  onCompleteInterview: (roleId: string, evaluation: any) => void;
  onUpdateReadinessScore: (score: number) => void;
}

export default function InterviewSection({ 
  onCompleteInterview, 
  onUpdateReadinessScore 
}: InterviewSectionProps) {
  const [selectedRoleId, setSelectedRoleId] = useState('swe');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [activeSession, setActiveSession] = useState<InterviewSession | null>(null);
  const [userAnswerInput, setUserAnswerInput] = useState('');
  const [isAnalyzingQuestion, setIsAnalyzingQuestion] = useState(false);

  // Simulation steps for loading
  const generatorSteps = [
    "Spinning up sandboxed grading engine...",
    "Retrieving candidate resume context & credentials...",
    "Targeting role: " + (availableRoles.find(r => r.id === selectedRoleId)?.name || "Software Engineer"),
    "Synthesizing 4 highly personalized behavioral & system design questions...",
    "Connecting AI Voice & Speech Evaluation Layer..."
  ];

  const handleGenerateInterview = () => {
    setIsGenerating(true);
    let stepIdx = 0;
    setGenerationStep(generatorSteps[0]);

    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < generatorSteps.length) {
        setGenerationStep(generatorSteps[stepIdx]);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        
        // Deep clone preset interview to allow session mutations
        const preset = mockInterviews[selectedRoleId] || mockInterviews['swe'];
        const sessionClone: InterviewSession = JSON.parse(JSON.stringify(preset));
        
        setActiveSession(sessionClone);
        setUserAnswerInput(sessionClone.questions[0].userAnswer || '');
      }
    }, 1000);
  };

  const handleQuestionNavigation = (direction: 'next' | 'prev') => {
    if (!activeSession) return;
    
    let nextIdx = activeSession.currentQuestionIndex;
    if (direction === 'next' && nextIdx < activeSession.questions.length - 1) {
      nextIdx++;
    } else if (direction === 'prev' && nextIdx > 0) {
      nextIdx--;
    }

    setActiveSession({
      ...activeSession,
      currentQuestionIndex: nextIdx
    });
    setUserAnswerInput(activeSession.questions[nextIdx].userAnswer || '');
  };

  // Simulate dictation/StT with a preset high-quality answer
  const handleSimulateSpeech = () => {
    if (!activeSession) return;
    const currentQ = activeSession.questions[activeSession.currentQuestionIndex];
    
    // Select premium answer based on context or generate custom ones
    let prefilled = "We should ensure that database schemas have correct indexes on join foreign key columns. Then we inspect query metrics with EXPLAIN to avoid sequential full-table scans. Layering Redis or memcached as an auxiliary key-value store for recurring requests mitigates DB read pressure, and writing read replicas handles distributed scaling.";
    
    if (currentQ.id === 2) {
      prefilled = "I would migrate to a microservices architecture when scaling loads become extremely localized, such as needing compute-heavy microservices for processing payments and image storage separately from standard profile configs. It also benefits larger, cross-functional engineering teams to operate independently without deployment code blocks.";
    } else if (currentQ.id === 3) {
      prefilled = "REST communicates over JSON formatting with standard HTTP/1.1 protocols, making it extremely accessible but introducing transport overhead. gRPC operates over HTTP/2 with binary protocol buffers, enabling multiplexing and bidirectional client-server streaming with extremely low latency, ideal for internal microservice APIs.";
    } else if (currentQ.id === 4) {
      prefilled = "For client tabs, the BroadcastChannel API coordinates cross-context synchronization without servers. To scale across node.js backends, redis pub/sub adapters synchronize event queues in real-time, and client state updates use Conflict-Free Replicated Data Types (CRDTs) to reconcile divergent timestamps.";
    }

    setUserAnswerInput(prefilled);
  };

  const handleSubmitAnswer = () => {
    if (!activeSession || !userAnswerInput.trim()) return;

    setIsAnalyzingQuestion(true);
    
    setTimeout(() => {
      setIsAnalyzingQuestion(false);
      const currentIdx = activeSession.currentQuestionIndex;
      
      // Update question state in local session
      const updatedQuestions = [...activeSession.questions];
      updatedQuestions[currentIdx] = {
        ...updatedQuestions[currentIdx],
        userAnswer: userAnswerInput,
        feedback: {
          score: Math.floor(Math.random() * 15) + 81, // 81 to 95
          strength: "Clear, articulated grasp of core engineering requirements. Validates solutions with realistic implementation plans.",
          improvement: "Could elaborate slightly more on standard failover paths and recovery thresholds.",
          modelAnswer: "Standard premium engineering response involving metric alerts, partition pruning, custom indexing layers, and redis replication logs."
        }
      };

      const isLast = currentIdx === activeSession.questions.length - 1;

      const nextSession = {
        ...activeSession,
        questions: updatedQuestions,
        currentQuestionIndex: isLast ? currentIdx : currentIdx + 1,
        isCompleted: isLast
      };

      setActiveSession(nextSession);
      
      if (!isLast) {
        setUserAnswerInput(updatedQuestions[currentIdx + 1].userAnswer || '');
      } else {
        // Automatically complete the interview and send evaluation scores back
        const evalPreset = mockEvaluations[selectedRoleId] || mockEvaluations['swe'];
        onCompleteInterview(selectedRoleId, evalPreset);
        onUpdateReadinessScore(evalPreset.overallScore);
      }
    }, 1500);
  };

  return (
    <div className="space-y-8" id="interview-section-container">
      {/* Intro Selection Dashboard if no active session */}
      {!activeSession && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="interview-start-dashboard">
          {/* Welcome and Start selection */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-violet-50 text-violet-700 rounded-xl border border-violet-100">
                  <Video className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">AI Voice & Technical Interview Generator</h2>
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Experience a production-grade, conversational mock technical interview customized to your resume and aspirations. RecruitIQ AI will verbally prompts questions, evaluate sound quality, confidence levels, answer vocabulary, and technical architecture depth.
              </p>

              {/* Steps overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <span className="text-xs font-bold text-violet-700 bg-violet-50 h-6 w-6 rounded-full inline-flex items-center justify-center border border-violet-100">1</span>
                  <p className="text-xs font-bold text-slate-800 mt-3">Target Career Selection</p>
                  <p className="text-[10px] text-slate-400 mt-1">Select from our 4 core available technology paths.</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <span className="text-xs font-bold text-violet-700 bg-violet-50 h-6 w-6 rounded-full inline-flex items-center justify-center border border-violet-100">2</span>
                  <p className="text-xs font-bold text-slate-800 mt-3">Answer Behavioral Prompts</p>
                  <p className="text-[10px] text-slate-400 mt-1">Type in your thoughts or simulate real Speech-to-Text inputs.</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <span className="text-xs font-bold text-violet-700 bg-violet-50 h-6 w-6 rounded-full inline-flex items-center justify-center border border-violet-100">3</span>
                  <p className="text-xs font-bold text-slate-800 mt-3">Instant AI Evaluation</p>
                  <p className="text-[10px] text-slate-400 mt-1">Acquire multi-dimensional scores on confidence and logic.</p>
                </div>
              </div>
            </div>

            {/* Target Selector Action row */}
            <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide shrink-0">Role Target:</span>
                <select
                  value={selectedRoleId}
                  onChange={(e) => setSelectedRoleId(e.target.value)}
                  className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl px-3 py-2 outline-none cursor-pointer"
                  id="interview-role-select"
                >
                  {availableRoles.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              {isGenerating ? (
                <div className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-violet-600 animate-spin" />
                  {generationStep}
                </div>
              ) : (
                <button
                  onClick={handleGenerateInterview}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-900/15 flex items-center gap-2 group transition-all"
                  id="generate-interview-btn"
                >
                  <Play className="w-3.5 h-3.5" /> Generate AI Interview <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Right Info card: Guidelines */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 flex flex-col justify-between" id="interview-tips-card">
            <div>
              <span className="text-[10px] font-bold text-violet-300 bg-violet-950 px-2.5 py-1 rounded-full border border-violet-800 inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-violet-400" /> Interview Advice
              </span>
              <h3 className="text-sm font-bold mt-4">Demo Guide & Instructions</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                To test the candidate grading reports immediately, generate a Software Engineer session, click <span className="text-violet-400 font-bold">Simulate Speech-to-Text Input</span> on each question card to auto-populate high-performing responses, and click submit.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-4 mt-6">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle className="w-4.5 h-4.5 text-violet-400" />
                <span>Microphone status: Checked & Ready</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Active Interview Room */}
      {activeSession && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm" id="live-interview-room">
          {/* Header area */}
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                {activeSession.role} Mock Room
              </span>
              <p className="text-xs font-bold text-slate-800 mt-2">
                Question {activeSession.currentQuestionIndex + 1} of {activeSession.questions.length}
              </p>
            </div>

            {/* Quick status dots */}
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Session Recording Live</span>
            </div>
          </div>

          {/* Core Interactive Layout splits: Question display & response input */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Display Question details (Left) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-violet-700">
                    <HelpCircle className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold tracking-wider uppercase">{activeSession.questions[activeSession.currentQuestionIndex].category}</span>
                  </div>
                  
                  <p className="text-sm font-bold text-slate-800 mt-4 leading-relaxed">
                    "{activeSession.questions[activeSession.currentQuestionIndex].question}"
                  </p>
                </div>

                {/* Hints / grading points */}
                <div className="border-t border-slate-200/80 pt-4 mt-6">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2">Grading Benchmarks:</span>
                  <ul className="space-y-1.5">
                    {activeSession.questions[activeSession.currentQuestionIndex].suggestedPoints.map((point, idx) => (
                      <li key={idx} className="text-[10px] text-slate-500 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Ingestion & typing Response (Right) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Candidate Response Box</label>
                  
                  {/* Speech Simulation tool */}
                  <button
                    onClick={handleSimulateSpeech}
                    className="text-[10px] text-violet-600 hover:text-violet-800 font-extrabold flex items-center gap-1 hover:underline"
                    title="Pre-fills a highly specialized response to simulate verbal mic entry"
                    id="simulate-stt-btn"
                  >
                    <Mic className="w-3.5 h-3.5 text-violet-500 animate-pulse" /> Simulate Speech-to-Text Input
                  </button>
                </div>

                <textarea
                  placeholder="Type in your solution path or use the mock speech simulation above..."
                  value={userAnswerInput}
                  onChange={(e) => setUserAnswerInput(e.target.value)}
                  className="w-full h-44 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-violet-500 p-4 rounded-2xl text-slate-800 leading-relaxed outline-none transition-all resize-none shadow-inner"
                  id="candidate-response-textarea"
                />
              </div>

              {/* Action Buttons row */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuestionNavigation('prev')}
                    disabled={activeSession.currentQuestionIndex === 0}
                    className="p-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    id="prev-question-btn"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleQuestionNavigation('next')}
                    disabled={activeSession.currentQuestionIndex === activeSession.questions.length - 1}
                    className="p-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    id="next-question-btn"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {isAnalyzingQuestion ? (
                  <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-violet-600 animate-spin" />
                    AI Analyzing response metrics...
                  </div>
                ) : (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswerInput.trim()}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-indigo-900/10 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    id="submit-answer-btn"
                  >
                    <Send className="w-3 h-3" /> 
                    {activeSession.currentQuestionIndex === activeSession.questions.length - 1 
                      ? "Finish & View Full Evaluation" 
                      : "Submit Response & Next"
                    }
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Quick instructions indicator */}
          <div className="bg-violet-50/50 border border-violet-100 p-3.5 rounded-2xl flex items-start gap-2.5 mt-6">
            <AlertCircle className="w-4.5 h-4.5 text-violet-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-500 leading-normal">
              Once submitted, our model validates syntax grammar, keyword similarity, and conceptual execution depth against the job benchmarks. This is instantly reflected on the <span className="font-bold text-slate-800">Evaluation Report</span> tab.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
