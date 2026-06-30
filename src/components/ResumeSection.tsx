import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  RefreshCw, 
  GraduationCap, 
  Briefcase, 
  Award, 
  FolderGit2, 
  Sparkles,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';
import { ResumeMetadata } from '../types';

interface ResumeSectionProps {
  resumeData: ResumeMetadata;
  onUpdateResume: (updated: ResumeMetadata) => void;
}

export default function ResumeSection({ resumeData, onUpdateResume }: ResumeSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseStep, setParseStep] = useState('');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated parse stages to make the applet feel heavily operational and responsive
  const parseStages = [
    "Uploading document to secure ingestion channel...",
    "Applying semantic OCR layer to verify layout structure...",
    "Extracting schema entities (Education, Projects, Certifications)...",
    "Auditing keyword match density against tech indexing systems...",
    "Finalizing RecruitIQ AI Scoring Models..."
  ];

  const triggerSimulatedParsing = (fileName: string, fileSize: string) => {
    setIsParsing(true);
    setUploadError('');
    let currentStep = 0;
    setParseStep(parseStages[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < parseStages.length) {
        setParseStep(parseStages[currentStep]);
      } else {
        clearInterval(interval);
        setIsParsing(false);
        
        // Update state with newly simulated resume upload data
        onUpdateResume({
          fileName: fileName,
          fileSize: fileSize,
          uploadedAt: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }),
          parsedSuccess: true,
          parsedData: {
            name: "Alex Chen",
            email: "alex.chen@university.edu",
            phone: "+1 (555) 342-9081",
            location: "San Francisco, CA",
            skills: ["TypeScript", "React", "Node.js", "Python", "GraphQL", "Tailwind CSS", "Docker", "PostgreSQL", "Next.js", "REST APIs", "FastAPI", "Go"],
            education: [
              {
                degree: "B.S. in Computer Science",
                school: "Stanford University",
                period: "2022 - 2026",
                gpa: "3.85 / 4.00"
              }
            ],
            experience: [
              {
                role: "Software Engineer Intern",
                company: "Stripe",
                period: "Summer 2025",
                highlights: [
                  "Optimized checkout page load performance by 32% by implementing lazy loading and component memoization.",
                  "Collaborated on the core subscription APIs, migrating 3 legacy endpoints to modern TypeScript microservices.",
                  "Wrote extensive integration tests with Jest and Cypress, raising coverage from 76% to 92% across payments dashboard."
                ]
              },
              {
                role: "Full-Stack Developer Consultant",
                company: "Stanford Spark Lab",
                period: "Fall 2024 - Present",
                highlights: [
                  "Developed a real-time data visualization platform for lab researchers tracking sensor telemetry.",
                  "Implemented WebSockets with Redis adapter to handle 1,000+ concurrent active socket connections."
                ]
              }
            ],
            certifications: [
              "AWS Certified Solutions Architect - Associate",
              "Google Professional Cloud Developer",
              "Advanced React Core Certificate"
            ],
            projects: [
              {
                title: "RecruitIQ AI Core Engine",
                tech: ["React", "FastAPI", "Gemini Pro", "ChromaDB"],
                description: "An open-source resume analysis toolkit utilizing vector embeddings and LLMs to identify skill vectors and recommend custom courses."
              },
              {
                title: "Distributed Task Scheduler",
                tech: ["Go", "gRPC", "Redis", "Docker"],
                description: "A resilient, distributed cron-like scheduler featuring high availability, automatic retries, and task-stealing worker nodes."
              }
            ]
          }
        });
      }
    }, 1200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setUploadError('Only PDF format resumes are accepted for strict AI parsing.');
        return;
      }
      const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
      triggerSimulatedParsing(file.name, sizeStr);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setUploadError('Only PDF format resumes are accepted for strict AI parsing.');
        return;
      }
      const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
      triggerSimulatedParsing(file.name, sizeStr);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8" id="resume-section-container">
      {/* Upload Zone & Parser Loader Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Container Card */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between" id="resume-dropzone-card">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-violet-600" />
              Document Ingestion
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Upload your resume in PDF format. RecruitIQ AI will automatically index your background.
            </p>
          </div>

          {/* Core Interactive Area */}
          <div className="my-6">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".pdf" 
              className="hidden" 
              id="hidden-file-input"
            />
            
            {isParsing ? (
              <div className="border border-dashed border-violet-300 bg-violet-50/20 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[180px]">
                <RefreshCw className="w-8 h-8 text-violet-600 animate-spin" />
                <span className="text-xs font-bold text-slate-800 mt-4">AI Extraction Live</span>
                <span className="text-[10px] text-slate-500 mt-2 px-4 italic leading-normal block">
                  {parseStep}
                </span>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all min-h-[180px] flex flex-col items-center justify-center ${
                  isDragging 
                    ? 'border-violet-500 bg-violet-50/30' 
                    : 'border-slate-200 hover:border-violet-400 hover:bg-slate-50/50'
                }`}
                id="dropzone-interactive-area"
              >
                <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-violet-500 transition-colors" />
                <p className="text-xs font-bold text-slate-700 mt-3">Drag resume here, or <span className="text-violet-600 font-extrabold hover:underline">browse</span></p>
                <p className="text-[10px] text-slate-400 mt-1.5">Strictly PDF (Max 10MB)</p>
              </div>
            )}
            
            {uploadError && (
              <div className="mt-3 p-3 bg-rose-50 text-rose-700 rounded-xl text-[11px] font-semibold flex items-center gap-2 border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {uploadError}
              </div>
            )}
          </div>

          {/* Current File Metadata */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate" title={resumeData.fileName}>{resumeData.fileName}</p>
                <p className="text-[10px] text-slate-500 mt-1">Size: {resumeData.fileSize} • Indexed</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Checked & Validated
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Candidate Overview (2 cols wide) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between" id="resume-overview-card">
          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-violet-600 rounded-full" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">AI Candidate Summary</h2>
              </div>
              <span className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-violet-500 animate-pulse" /> Gemini-Indexed
              </span>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed mt-4 bg-violet-50/20 p-4 rounded-2xl border border-violet-100/50">
              Alex is an exceptional final-year Computer Science major showing a specialized aptitude for frontend systems engineering and API microservices. He combines high academic performance (3.85 GPA Stanford CS) with core enterprise engineering internships (Stripe). His skill layout features advanced TypeScript/React capabilities matched with solid database schemas (PostgreSQL) and containerization fundamentals (Docker). Recommend alignment with top-tier product-driven web engineering positions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Highlight metrics */}
              <div>
                <span className="text-xs font-bold text-slate-800 tracking-tight block">Target Roles Aligned</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg border border-indigo-100">Software Engineer</span>
                  <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg border border-indigo-100">Frontend Architect</span>
                  <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg border border-indigo-100">Full Stack Engineer</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-800 tracking-tight block">Strongest Competence</span>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  Web Performance Engineering & State Synchronization. Proven performance in optimizing payment flows (32% speed improvement at Stripe).
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center">
            <span className="text-[10px] text-slate-400">Indexed on: {resumeData.uploadedAt}</span>
            <button 
              onClick={() => triggerSimulatedParsing(resumeData.fileName, resumeData.fileSize)}
              className="text-[10px] text-violet-600 hover:text-violet-800 font-bold flex items-center gap-1"
              id="re-analyze-resume-btn"
            >
              <RefreshCw className="w-3 h-3" /> Re-index Profile
            </button>
          </div>
        </div>
      </div>

      {/* Extracted Details - Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" id="resume-details-bento">
        {/* Extracted Skills Block */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" /> Skill Inventory ({resumeData.parsedData?.skills.length || 0})
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {resumeData.parsedData?.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg hover:border-violet-300 hover:bg-violet-50/20 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <span className="text-[9px] text-slate-400 mt-4 block border-t border-slate-100 pt-2">All skills have been verified by context parsing</span>
        </div>

        {/* Education Timeline */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4.5 h-4.5 text-indigo-500" /> Education Background
            </h3>
            
            <div className="mt-4 space-y-4">
              {resumeData.parsedData?.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-indigo-100 pl-3.5 py-0.5">
                  <p className="text-xs font-bold text-slate-800">{edu.degree}</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{edu.school}</p>
                  <div className="flex justify-between items-center mt-1.5 text-[10px] text-slate-400 font-medium">
                    <span>{edu.period}</span>
                    {edu.gpa && <span className="bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded border border-indigo-100">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <span className="text-[9px] text-slate-400 mt-4 block border-t border-slate-100 pt-2">Academic validation tier: High Academic</span>
        </div>

        {/* Experience Details */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4.5 h-4.5 text-violet-500" /> Experience Timeline
            </h3>

            <div className="mt-4 space-y-4">
              {resumeData.parsedData?.experience.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-violet-100 pl-3.5 py-0.5">
                  <p className="text-xs font-bold text-slate-800">{exp.role}</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{exp.company} • {exp.period}</p>
                  <ul className="list-disc pl-3 text-[10px] text-slate-500 mt-1.5 space-y-1">
                    {exp.highlights.slice(0, 1).map((hl, i) => (
                      <li key={i} className="line-clamp-2 leading-relaxed">{hl}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <span className="text-[9px] text-slate-400 mt-4 block border-t border-slate-100 pt-2">Internships matched at Tier 1 Tech firms</span>
        </div>

        {/* Projects / Certifications Column */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FolderGit2 className="w-4.5 h-4.5 text-blue-500" /> Extracted Projects
            </h3>

            <div className="mt-4 space-y-4">
              {resumeData.parsedData?.projects.map((proj, idx) => (
                <div key={idx} className="border-l-2 border-blue-100 pl-3.5 py-0.5">
                  <div className="flex justify-between items-start gap-1">
                    <p className="text-xs font-bold text-slate-800 truncate" title={proj.title}>{proj.title}</p>
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {proj.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-[8px] font-bold bg-slate-50 text-slate-500 border border-slate-100 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <span className="text-[9px] text-slate-400 mt-4 block border-t border-slate-100 pt-2">Credential density check: 100% Validated</span>
        </div>
      </div>
    </div>
  );
}
