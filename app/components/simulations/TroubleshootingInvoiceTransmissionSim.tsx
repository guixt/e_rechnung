import React, { useState } from 'react';

const troubleshootingCase = {
  title: 'Troubleshooting: Rechnungsübermittlung',
  description: 'Eine Rechnung wird nicht korrekt übermittelt. Der Empfänger meldet, dass keine oder eine fehlerhafte Rechnung angekommen ist. Finden Sie heraus, woran es liegt und wie Sie das Problem lösen können.',
  steps: [
    {
      question: '1. Schritt: Was prüfen Sie als erstes?',
      options: [
        'Ich prüfe das Übertragungsprotokoll auf Fehlermeldungen.',
        'Ich frage den Empfänger, ob er die Rechnung wirklich braucht.',
        'Ich sende die Rechnung einfach nochmal.'
      ],
      correct: 0,
      feedback: [
        'Richtig! Das Übertragungsprotokoll gibt oft Hinweise auf technische Fehler.',
        'Das klärt nicht die Ursache. Erst technische Prüfung, dann Kommunikation.',
        'Ohne Analyse könnten Sie denselben Fehler wiederholen.'
      ]
    },
    {
      question: '2. Schritt: Im Protokoll steht: "XML-Validierung fehlgeschlagen: Pflichtfeld Leitweg-ID fehlt". Was tun Sie?',
      options: [
        'Ich ergänze die Leitweg-ID im SAP-System und lasse die Rechnung neu erzeugen.',
        'Ich ignoriere die Meldung und versuche es erneut.',
        'Ich frage beim Empfänger nach, ob das Feld wirklich nötig ist.'
      ],
      correct: 0,
      feedback: [
        'Korrekt! Die Leitweg-ID ist für XRechnung Pflicht. Nachtragen und neu erzeugen.',
        'Das Problem wird erneut auftreten, solange das Pflichtfeld fehlt.',
        'Das ist eine gesetzliche Anforderung, also immer notwendig.'
      ]
    },
    {
      question: '3. Schritt: Die Rechnung wurde erneut gesendet, aber der Empfänger meldet weiterhin Fehler. Was prüfen Sie jetzt?',
      options: [
        'Ich prüfe, ob die neue Datei wirklich an den Empfänger übertragen wurde und ob das Übertragungsprotokoll jetzt fehlerfrei ist.',
        'Ich gebe auf.',
        'Ich warte einfach ab.'
      ],
      correct: 0,
      feedback: [
        'Sehr gut! Nach Korrektur muss die Übertragung und das Protokoll erneut geprüft werden.',
        'Nicht aufgeben – systematische Fehlersuche ist gefragt.',
        'Abwarten löst das Problem nicht.'
      ]
    }
  ],
  solution: 'Typische Ursachen für Übertragungsfehler sind fehlende Pflichtfelder (z.B. Leitweg-ID), falsche Dateiformate oder technische Übertragungsprobleme. Systematische Analyse von Protokollen und Validierungsreports hilft, die Fehlerursache zu finden und nachhaltig zu beheben.'
};

export function TroubleshootingInvoiceTransmissionSim() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const s = troubleshootingCase.steps[step];

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
      <h2 className="text-2xl font-semibold mb-4">{troubleshootingCase.title}</h2>
      <p className="mb-6 text-gray-700">{troubleshootingCase.description}</p>
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
        {showFeedback && step < troubleshootingCase.steps.length - 1 && (
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={nextStep}>
            Nächster Schritt
          </button>
        )}
        {showFeedback && step === troubleshootingCase.steps.length - 1 && (
          <button className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700" onClick={restart}>
            Noch einmal üben
          </button>
        )}
      </div>
      <div className="p-4 bg-emerald-50 rounded">
        <h4 className="font-bold mb-2">Praxis-Tipp:</h4>
        <p className="text-sm mb-1">{troubleshootingCase.solution}</p>
        <ul className="list-disc list-inside space-y-1 text-sm mt-2">
          <li>Arbeite immer mit Validierungsreports und Übertragungsprotokollen.</li>
          <li>Viele Fehler lassen sich mit strukturiertem Troubleshooting schnell beheben.</li>
        </ul>
      </div>
    </div>
  );
}
