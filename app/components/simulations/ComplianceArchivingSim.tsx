import React, { useState } from 'react';

const complianceSteps = [
  {
    question: 'Welche gesetzlichen Anforderungen gelten für die Archivierung elektronischer Rechnungen in Deutschland?',
    options: [
      'GoBD, HGB, AO',
      'DSGVO, BGB, IfSG',
      'EN16931, ISO27001, MiFID'
    ],
    correct: 0,
    feedback: [
      'Richtig! GoBD, HGB und AO regeln Aufbewahrung, Unveränderbarkeit und Nachvollziehbarkeit.',
      'Nicht korrekt – DSGVO & Co. sind wichtig, betreffen aber nicht die Archivierungspflichten für Rechnungen direkt.',
      'EN16931 ist ein Rechnungsformat, ISO27001 & MiFID betreffen andere Bereiche.'
    ]
  },
  {
    question: 'Wie lange müssen elektronische Rechnungen in Deutschland mindestens aufbewahrt werden?',
    options: [
      '2 Jahre',
      '6 Jahre',
      '10 Jahre'
    ],
    correct: 2,
    feedback: [
      'Zu kurz. Die Aufbewahrungsfrist beträgt 10 Jahre.',
      '6 Jahre gilt für manche Geschäftsunterlagen, aber Rechnungen müssen 10 Jahre archiviert werden.',
      'Korrekt! 10 Jahre sind gesetzlich vorgeschrieben.'
    ]
  },
  {
    question: 'Was ist bei der Archivierung elektronischer Rechnungen besonders wichtig?',
    options: [
      'Die Rechnung muss jederzeit maschinell auswertbar und unveränderbar sein.',
      'Es reicht, ein PDF auszudrucken und abzuheften.',
      'Die Rechnung kann nach dem Versand gelöscht werden.'
    ],
    correct: 0,
    feedback: [
      'Richtig! Unveränderbarkeit und maschinelle Auswertbarkeit sind zentrale GoBD-Anforderungen.',
      'Nicht ausreichend – das Original muss digital, unveränderbar und maschinell auswertbar archiviert werden.',
      'Falsch – Rechnungen müssen 10 Jahre aufbewahrt werden.'
    ]
  },
  {
    question: 'Welche Archivierungslösung ist für E-Invoicing besonders geeignet?',
    options: [
      'Ein zertifiziertes elektronisches Archivsystem mit GoBD-Konformität',
      'Ein lokaler Ordner auf dem PC',
      'Papierarchiv im Keller'
    ],
    correct: 0,
    feedback: [
      'Richtig! Nur zertifizierte, elektronische Archivsysteme erfüllen alle Anforderungen.',
      'Nicht GoBD-konform und zu unsicher.',
      'Papierarchive sind für elektronische Rechnungen nicht zulässig.'
    ]
  }
];

export function ComplianceArchivingSim() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const s = complianceSteps[step];

  function handleOption(idx: number) {
    setSelected(idx);
    setShowFeedback(true);
  }
  function nextStep() {
    setStep(step+1);
    setSelected(null);
    setShowFeedback(false);
  }
  function restart() {
    setStep(0);
    setSelected(null);
    setShowFeedback(false);
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Compliance & Archivierung</h2>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h3 className="font-semibold mb-3">{s.question}</h3>
        <ul className="space-y-2">
          {s.options.map((opt, idx) => (
            <li key={idx}>
              <button
                className={`w-full text-left px-4 py-2 rounded border transition-colors ${selected === idx ? (idx === s.correct ? 'bg-emerald-200 border-emerald-400' : 'bg-red-100 border-red-300') : 'bg-gray-100 border-gray-200 hover:bg-blue-50'}`}
                disabled={showFeedback}
                onClick={() => handleOption(idx)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
        {showFeedback && (
          <div className={`mt-4 p-3 rounded ${selected === s.correct ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>{s.feedback[selected ?? 0]}</div>
        )}
        {showFeedback && step < complianceSteps.length - 1 && (
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={nextStep}>
            Nächste Frage
          </button>
        )}
        {showFeedback && step === complianceSteps.length - 1 && (
          <button className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700" onClick={restart}>
            Noch einmal üben
          </button>
        )}
      </div>
      <div className="p-4 bg-emerald-50 rounded">
        <h4 className="font-bold mb-2">Lernhinweise & Praxis-Tipps:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm mt-2">
          <li>Elektronische Rechnungen müssen 10 Jahre GoBD-konform archiviert werden.</li>
          <li>Unveränderbarkeit, Nachvollziehbarkeit und maschinelle Auswertbarkeit sind Pflicht.</li>
          <li>Nur zertifizierte elektronische Archivsysteme bieten volle Rechtssicherheit.</li>
          <li>Regelmäßige interne Kontrollen und Testabrufe sichern Compliance.</li>
        </ul>
      </div>
    </div>
  );
}
