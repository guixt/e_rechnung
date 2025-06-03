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
    id: 'demo',
    title: 'Demo-Vorbereitung',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Klare Agenda und Zielsetzung definieren</li>
          <li>Daten und Systeme vorher testen</li>
          <li>Skript oder Leitfaden bereithalten</li>
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
  }
];

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
    </div>
  );
}

