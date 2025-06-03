import React, { useState } from 'react';

const aspects = [
  {
    id: 'storytelling',
    title: 'Storytelling',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Struktur: Problem – Lösung – Nutzen</li>
          <li>Anschauliche Beispiele und klare Botschaften</li>
          <li>Präsentationen mit rotem Faden</li>
        </ul>
      </>
    )
  },
  {
    id: 'demo-prep',
    title: 'Demo-Vorbereitung',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Klare Agenda und Zielsetzung definieren</li>
          <li>Daten und Systeme vor dem Termin testen</li>
          <li>Skript oder Leitfaden bereithalten</li>
          <li>Backup-Pläne für den Ernstfall erstellen</li>
        </ul>
      </>
    )
  },
  {
    id: 'demo-execution',
    title: 'Demo-Durchführung',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Auf Zielgruppe eingehen und Relevanz herstellen</li>
          <li>Weniger ist mehr: Kernnutzen klar demonstrieren</li>
          <li>Interaktiven Dialog mit dem Kunden suchen</li>
        </ul>
      </>
    )
  },
  {
    id: 'discovery',
    title: 'Bedarfsanalyse',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Hintergründe und Herausforderungen des Kunden verstehen</li>
          <li>Entscheider und Stakeholder identifizieren</li>
          <li>Ziele und Erfolgskriterien dokumentieren</li>
        </ul>
      </>
    )
  },
  {
    id: 'consulting',
    title: 'Consulting-Techniken',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Aktives Zuhören und gezielte Fragetechniken</li>
          <li>Umgang mit Einwänden und schwierigen Situationen</li>
          <li>Effizientes Zeit- und Erwartungsmanagement</li>
        </ul>
      </>
    )
  },
  {
    id: 'negotiation',
    title: 'Verhandlung & Abschluss',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Mehrwert argumentieren statt Preis diskutieren</li>
          <li>Vorgehen zur Einwandbehandlung nutzen</li>
          <li>Klare Abschluss-Signale erkennen und nutzen</li>
        </ul>
      </>
    )
  },
  {
    id: 'selfmgmt',
    title: 'Soft Skills & Selbstmanagement',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Persönliches Zeitmanagement und Priorisierung</li>
          <li>Stressresistenz und souveränes Auftreten</li>
          <li>Konstruktives Feedback einholen und umsetzen</li>
        </ul>
      </>
    )
  }
];

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  feedback: string[];
}

const quiz: QuizQuestion[] = [
  {
    question: 'Was ist das Hauptziel einer guten Bedarfsanalyse?',
    options: [
      'Dem Kunden so früh wie möglich ein Angebot zu präsentieren',
      'Die Herausforderungen und Ziele des Kunden vollständig zu verstehen',
      'Möglichst viele Produkte vorzustellen'
    ],
    correct: 1,
    feedback: [
      'Zu früh im Prozess kann das Angebot noch am Bedarf vorbeigehen.',
      'Richtig! Nur wer die Situation des Kunden kennt, kann passgenau beraten.',
      'Produktpräsentationen ohne Bezug bringen selten einen Mehrwert.'
    ]
  },
  {
    question: 'Wie reagieren Sie am besten auf einen Einwand während der Demo?',
    options: [
      'Den Einwand ignorieren und später fortfahren',
      'Dankend aufnehmen, Rückfragen stellen und anschließend adressieren',
      'Sofort einen Rabatt anbieten'
    ],
    correct: 1,
    feedback: [
      'Einwände zu ignorieren wirkt unprofessionell und erschwert Vertrauen.',
      'Genau! Erst verstehen, dann gezielt beantworten.',
      'Rabatte sollten nicht voreilig vergeben werden und lösen den Einwand selten.'
    ]
  },
  {
    question: 'Welcher Faktor macht Demos besonders überzeugend?',
    options: [
      'Viele Funktionen in kurzer Zeit zeigen',
      'Relevante Use-Cases des Kunden in den Fokus stellen',
      'Möglichst schnell durchklicken ohne Fragen zuzulassen'
    ],
    correct: 1,
    feedback: [
      'Zu viele Funktionen überfrachten die Demo und verwirren.',
      'Richtig! Kundenspezifische Szenarien zeigen den echten Nutzen.',
      'Dialog und Tempo müssen ausgewogen sein, sonst wirkt es gehetzt.'
    ]
  }
];

function Quiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const q = quiz[step];

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setShowFeedback(true);
  };

  const next = () => {
    setStep(step + 1);
    setSelected(null);
    setShowFeedback(false);
  };

  const restart = () => {
    setStep(0);
    setSelected(null);
    setShowFeedback(false);
  };

  return (
    <div className="mt-8">
      <h4 className="font-bold mb-2">Mini-Quiz</h4>
      <div className="bg-white p-4 rounded shadow">
        <p className="font-medium mb-3">{q.question}</p>
        <ul className="space-y-2">
          {q.options.map((opt, idx) => (
            <li key={idx}>
              <button
                className={`w-full text-left px-3 py-2 rounded border transition-colors ${selected === idx ? (idx === q.correct ? 'bg-emerald-200 border-emerald-400' : 'bg-red-100 border-red-300') : 'bg-gray-100 border-gray-200 hover:bg-blue-50'}`}
                disabled={showFeedback}
                onClick={() => handleSelect(idx)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
        {showFeedback && (
          <div className={`mt-4 p-3 rounded ${selected === q.correct ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>{q.feedback[selected ?? 0]}</div>
        )}
        {showFeedback && step < quiz.length - 1 && (
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={next}>
            Nächste Frage
          </button>
        )}
        {showFeedback && step === quiz.length - 1 && (
          <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700" onClick={restart}>
            Quiz erneut starten
          </button>
        )}
      </div>
    </div>
  );
}

export function PresalesConsultingSim() {
  const [selected, setSelected] = useState('storytelling');
  const asp = aspects.find(a => a.id === selected)!;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Presales &amp; Consulting Skills</h2>
      <div className="mb-4 flex gap-2 flex-wrap">
        {aspects.map(a => (
          <button
            key={a.id}
            onClick={() => setSelected(a.id)}
            className={`px-4 py-2 rounded ${selected === a.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {a.title}
          </button>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">{asp.content}</div>
      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">Empfehlungen:</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>"The Trusted Advisor" als Literaturtipp</li>
          <li>YouTube: Presales Demo Techniques</li>
          <li>LinkedIn Learning: Tech Sales Fundamentals</li>
        </ul>
      </div>
      <Quiz />
    </div>
  );
}

