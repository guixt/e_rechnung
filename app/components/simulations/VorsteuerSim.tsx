import React, { useState } from 'react';

interface CheckCase {
  id: string;
  question: string;
  correct: boolean; // true if Vorsteuerabzug möglich
  explanation: string;
}

const checkCases: CheckCase[] = [
  {
    id: 'buero19',
    question: 'Eingangsrechnung über Büromaterial mit 19% USt. Alle Pflichtangaben sind vorhanden.',
    correct: true,
    explanation: 'Der Vorsteuerabzug ist möglich, da die Leistung betrieblich veranlasst ist und eine ordnungsgemäße Rechnung vorliegt.'
  },
  {
    id: 'mittag',
    question: 'Bewirtungsbeleg für ein Geschäftsessen (inkl. 19% USt), jedoch ohne Angabe der Teilnehmer.',
    correct: false,
    explanation: 'Fehlen Pflichtangaben wie die Namen der Teilnehmenden, ist der Vorsteuerabzug ausgeschlossen.'
  },
  {
    id: 'reverse',
    question: 'Rechnung eines EU-Lieferanten ohne Umsatzsteuer. Ihr Unternehmen schuldet die Steuer im Reverse-Charge-Verfahren.',
    correct: true,
    explanation: 'Bei korrekter Anwendung des Reverse Charge kann die zugleich geschuldete Steuer als Vorsteuer abgezogen werden.'
  },
];

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  feedback: string[];
}

const quiz: QuizQuestion[] = [
  {
    question: 'Welche Voraussetzung muss für den Vorsteuerabzug immer erfüllt sein?',
    options: [
      'Die Zahlung muss bereits erfolgt sein.',
      'Es muss eine ordnungsgemäße Rechnung vorliegen.',
      'Die Ware muss bereits verkauft sein.'
    ],
    correct: 1,
    feedback: [
      'Die Zahlung ist keine Voraussetzung – es reicht das Vorliegen der Rechnung.',
      'Richtig! Ohne ordnungsgemäße Rechnung kein Vorsteuerabzug.',
      'Der Weiterverkauf ist irrelevant für den Vorsteuerabzug.'
    ]
  },
  {
    question: 'Wie lautet der Buchungssatz für eine Eingangsrechnung über 1.000 € netto zuzüglich 19% USt?',
    options: [
      'Aufwand 1.190 € an Kreditor 1.190 €',
      'Kreditor 1.190 € an Bank 1.190 €',
      'Aufwand 1.000 € / Vorsteuer 190 € an Kreditor 1.190 €'
    ],
    correct: 2,
    feedback: [
      'Die Aufteilung in Netto und Vorsteuer fehlt.',
      'Das ist die Zahlung, nicht die Rechnungserfassung.',
      'Genau! Aufwand und Vorsteuer werden getrennt auf der Sollseite gebucht.'
    ]
  },
];

export function VorsteuerSim() {
  const [caseIdx, setCaseIdx] = useState(0);
  const [caseAnswer, setCaseAnswer] = useState<boolean | null>(null);
  const [showCaseFeedback, setShowCaseFeedback] = useState(false);

  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSel, setQuizSel] = useState<number | null>(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);

  const currentCase = checkCases[caseIdx];
  const currentQuiz = quiz[quizIdx];

  const handleCase = (ans: boolean) => {
    setCaseAnswer(ans);
    setShowCaseFeedback(true);
  };

  const nextCase = () => {
    setCaseIdx(caseIdx + 1);
    setCaseAnswer(null);
    setShowCaseFeedback(false);
  };

  const restartCases = () => {
    setCaseIdx(0);
    setCaseAnswer(null);
    setShowCaseFeedback(false);
  };

  const handleQuiz = (opt: number) => {
    setQuizSel(opt);
    setShowQuizFeedback(true);
  };

  const nextQuiz = () => {
    setQuizIdx(quizIdx + 1);
    setQuizSel(null);
    setShowQuizFeedback(false);
  };

  const restartQuiz = () => {
    setQuizIdx(0);
    setQuizSel(null);
    setShowQuizFeedback(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Vorsteuer verstehen und anwenden</h2>
      <div className="mb-6 space-y-4">
        <p>Vorsteuer ist die von anderen Unternehmen in Rechnung gestellte Umsatzsteuer. Sie kann unter bestimmten Voraussetzungen nach §15 UStG als Abzug geltend gemacht werden.</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Umsatzsteuer wird auf Ausgangsleistungen erhoben, Vorsteuer auf Eingangsleistungen.</li>
          <li>Voraussetzung ist eine ordnungsgemäße Rechnung und eine Leistung für das Unternehmen.</li>
          <li>Typische Ausschlüsse: fehlende Pflichtangaben, private oder nicht abzugsfähige Aufwendungen.</li>
        </ul>
      </div>

      <div className="bg-white rounded shadow p-4 mb-8">
        <h3 className="font-semibold mb-3">Übung: Ist der Vorsteuerabzug möglich?</h3>
        <p className="mb-4">{currentCase.question}</p>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => handleCase(true)}
            disabled={showCaseFeedback}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >Ja</button>
          <button
            onClick={() => handleCase(false)}
            disabled={showCaseFeedback}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >Nein</button>
        </div>
        {showCaseFeedback && (
          <div className={`p-3 rounded mb-4 ${caseAnswer === currentCase.correct ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>{currentCase.explanation}</div>
        )}
        {showCaseFeedback && caseIdx < checkCases.length - 1 && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={nextCase}>Nächster Fall</button>
        )}
        {showCaseFeedback && caseIdx === checkCases.length - 1 && (
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700" onClick={restartCases}>Erneut üben</button>
        )}
      </div>

      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-3">Quiz</h3>
        <p className="mb-3">{currentQuiz.question}</p>
        <ul className="space-y-2">
          {currentQuiz.options.map((opt, idx) => (
            <li key={idx}>
              <button
                className={`w-full text-left px-3 py-2 rounded border transition-colors ${quizSel === idx ? (idx === currentQuiz.correct ? 'bg-emerald-200 border-emerald-400' : 'bg-red-100 border-red-300') : 'bg-gray-100 border-gray-200 hover:bg-blue-50'}`}
                disabled={showQuizFeedback}
                onClick={() => handleQuiz(idx)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
        {showQuizFeedback && (
          <div className={`mt-4 p-3 rounded ${quizSel === currentQuiz.correct ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>{currentQuiz.feedback[quizSel ?? 0]}</div>
        )}
        {showQuizFeedback && quizIdx < quiz.length - 1 && (
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={nextQuiz}>Nächste Frage</button>
        )}
        {showQuizFeedback && quizIdx === quiz.length - 1 && (
          <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700" onClick={restartQuiz}>Quiz neu starten</button>
        )}
      </div>
    </div>
  );
}

export default VorsteuerSim;
