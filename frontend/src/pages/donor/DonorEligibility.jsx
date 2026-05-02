import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw,
  User,
  Scale,
  Stethoscope,
  Thermometer,
  Plane,
  Activity,
  PenTool,
  Pill,
  Baby
} from 'lucide-react';
import './DonorEligibility.css';

const DonorEligibility = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 'age',
      question: 'Are you between 16 and 65 years old?',
      note: '16-17 year olds need parental consent.',
      icon: <User className="q-icon" />,
      type: 'choice',
      options: [
        { label: 'Yes, 18-65 years old', value: 'eligible' },
        { label: 'Yes, 16-17 years old', value: 'consent_needed' },
        { label: 'No, I am under 16 or over 65', value: 'ineligible' }
      ]
    },
    {
      id: 'weight',
      question: 'Do you weigh at least 45 kg (99 lbs)?',
      icon: <Scale className="q-icon" />,
      type: 'yesno'
    },
    {
      id: 'health',
      question: 'Are you feeling well and in good health today?',
      icon: <Stethoscope className="q-icon" />,
      type: 'yesno'
    },
    {
      id: 'infection',
      question: 'Have you had a fever, cough, cold, or diarrhea in the past 7 days?',
      icon: <Thermometer className="q-icon" />,
      type: 'yesno'
    },
    {
      id: 'travel',
      question: 'Have you travelled outside the country in the last 4 months?',
      icon: <Plane className="q-icon" />,
      type: 'yesno'
    },
    {
      id: 'dental',
      question: 'Have you had a tooth extraction or dental surgery in the last 3 days?',
      icon: <Activity className="q-icon" />,
      type: 'yesno'
    },
    {
      id: 'tattoos',
      question: 'Have you had a tattoo or piercing done in the last 3 months?',
      icon: <PenTool className="q-icon" />,
      type: 'yesno'
    },
    {
      id: 'medication',
      question: 'Are you currently taking antibiotics or any medication for high blood pressure/diabetes?',
      icon: <Pill className="q-icon" />,
      type: 'yesno'
    },
    {
      id: 'pregnancy',
      question: 'Are you currently pregnant or have you given birth in the last 6 months?',
      note: 'Only applicable for females.',
      icon: <Baby className="q-icon" />,
      type: 'yesno_optional'
    }
  ];

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // Check for immediate ineligibility
    const immediateIneligible = checkImmediateIneligibility(questionId, value);
    if (immediateIneligible) {
      setResult({
        status: 'ineligible',
        reasons: [immediateIneligible]
      });
      return;
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const checkImmediateIneligibility = (id, value) => {
    if (id === 'age' && value === 'ineligible') return 'Age must be between 16 and 65 years.';
    if (id === 'weight' && value === 'no') return 'Weight must be at least 45 kg.';
    if (id === 'health' && value === 'no') return 'You must be feeling well and in good health on the day of donation.';
    if (id === 'infection' && value === 'yes') return 'You must be free of infection symptoms for at least 7 days.';
    if (id === 'travel' && value === 'yes') return 'Travel history requires a 4-month deferral period.';
    if (id === 'dental' && value === 'yes') return 'Dental work requires a 3-day deferral period.';
    if (id === 'tattoos' && value === 'yes') return 'Tattoos or piercings require a 3-month deferral period.';
    if (id === 'medication' && value === 'yes') return 'Certain medications require a deferral period. Please consult a doctor.';
    if (id === 'pregnancy' && value === 'yes') return 'Pregnancy or recent childbirth (within 6 months) requires deferral.';
    return null;
  };

  const calculateResult = (finalAnswers) => {
    let needsConsent = finalAnswers.age === 'consent_needed';

    setResult({
      status: needsConsent ? 'consent' : 'eligible',
      reasons: []
    });
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const renderProgress = () => {
    const progress = ((step) / questions.length) * 100;
    return (
      <div className="quiz-progress-container">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };

  if (result) {
    return (
      <div className="eligibility-container">
        <div className="result-card animate-in">
          {result.status === 'eligible' && (
            <div className="result-content success">
              <CheckCircle size={64} className="result-icon" />
              <h2>You are Eligible!</h2>
              <p>Based on your answers, you are likely eligible to donate blood. Thank you for your willingness to save lives!</p>
              <div className="result-actions">
                <Link to="/signup" className="btn-primary">Register Now</Link>
                <button onClick={resetQuiz} className="btn-secondary"><RotateCcw size={18} /> Retake Quiz</button>
              </div>
            </div>
          )}

          {result.status === 'consent' && (
            <div className="result-content warning">
              <AlertCircle size={64} className="result-icon" />
              <h2>Parental Consent Required</h2>
              <p>You are almost there! Since you are 16-17 years old, you need a signed parental consent form to donate.</p>
              <div className="result-actions">
                <Link to="/signup" className="btn-primary">Register & Get Form</Link>
                <button onClick={resetQuiz} className="btn-secondary"><RotateCcw size={18} /> Retake Quiz</button>
              </div>
            </div>
          )}

          {result.status === 'ineligible' && (
            <div className="result-content failure">
              <XCircle size={64} className="result-icon" />
              <h2>Not Eligible Today</h2>
              <p>Unfortunately, you may not be able to donate blood at this time due to the following reason(s):</p>
              <ul className="reasons-list">
                {result.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
              <p className="note">Don't worry! This might be temporary. You can check back again later.</p>
              <div className="result-actions">
                <Link to="/" className="btn-primary">Back to Home</Link>
                <button onClick={resetQuiz} className="btn-secondary"><RotateCcw size={18} /> Retake Quiz</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div className="eligibility-container">
      <div className="quiz-card animate-in">
        <div className="quiz-header">
          <div className="quiz-info">
            <span className="step-indicator">Question {step + 1} of {questions.length}</span>
            <h1>Eligibility Check</h1>
          </div>
          <Heart size={32} color="var(--color-primary)" fill="var(--color-primary)" className="header-heart" />
        </div>
        
        {renderProgress()}

        <div className="question-section">
          <div className="question-icon-wrapper">
            {currentQuestion.icon}
          </div>
          <h2 className="question-text">{currentQuestion.question}</h2>
          {currentQuestion.note && <p className="question-note">{currentQuestion.note}</p>}
        </div>

        <div className="options-section">
          {currentQuestion.type === 'choice' ? (
            <div className="choice-options">
              {currentQuestion.options.map((opt, idx) => (
                <button 
                  key={idx} 
                  className="option-btn choice"
                  onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                >
                  {opt.label}
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          ) : (
            <div className="yesno-options">
              <button 
                className="option-btn yes"
                onClick={() => handleAnswer(currentQuestion.id, 'yes')}
              >
                Yes
              </button>
              <button 
                className="option-btn no"
                onClick={() => handleAnswer(currentQuestion.id, 'no')}
              >
                No
              </button>
              {currentQuestion.type === 'yesno_optional' && (
                <button 
                  className="option-btn na"
                  onClick={() => handleAnswer(currentQuestion.id, 'na')}
                >
                  Not Applicable
                </button>
              )}
            </div>
          )}
        </div>

        <div className="quiz-footer">
          {step > 0 && (
            <button className="back-btn" onClick={() => setStep(step - 1)}>
              <ChevronLeft size={18} /> Back
            </button>
          )}
          <div className="footer-note">Your answers are private and not stored.</div>
        </div>
      </div>
    </div>
  );
};

export default DonorEligibility;
