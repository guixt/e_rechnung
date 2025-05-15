import React, { useState } from 'react';

const steps = [
  {
    id: 'analyse',
    title: '1. Analyse der Anforderungen',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Gesetzliche Vorgaben (z.B. XRechnung, ZUGFeRD, Peppol)</li>
          <li>Branchen- und Kundenanforderungen</li>
          <li>Systemlandschaft: SAP, Non-SAP, Cloud?</li>
        </ul>
      </>
    )
  },
  {
    id: 'mapping',
    title: '2. Mapping & Integration',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Mapping von SAP-IDoc/SD/MM auf Zielformate (z.B. XRechnung, EDIFACT)</li>
          <li>Integration mit SEEBURGER BIC oder anderen Plattformen</li>
          <li>Testen der Konvertierung und Validierung</li>
        </ul>
      </>
    )
  },
  {
    id: 'prozess',
    title: '3. Prozessgestaltung & Rollout',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Definition der Workflows für Rechnungserstellung, Versand, Monitoring</li>
          <li>Schulung der Anwender und Key-User</li>
          <li>Go-Live und Supportphase</li>
        </ul>
      </>
    )
  },
  {
    id: 'troubleshooting',
    title: '4. Troubleshooting & Lessons Learned',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Typische Fehlerquellen: Mapping, Validierung, Übertragung</li>
          <li>Monitoring- und Reporting-Tools nutzen</li>
          <li>Lessons Learned dokumentieren und Prozesse optimieren</li>
        </ul>
      </>
    )
  }
];

export function EInvoiceImplementationMission() {
  const [selected, setSelected] = useState('analyse');
  const step = steps.find(s => s.id === selected)!;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Consulting Mission: E-Invoicing Implementierung</h2>
      <div className="mb-4 flex gap-2 flex-wrap">
        {steps.map(s => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={`px-4 py-2 rounded ${selected === s.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">
        {step.content}
      </div>
      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">Praxis-Tipp:</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Ein strukturiertes Vorgehen reduziert Fehler und erhöht die Akzeptanz im Unternehmen.</li>
          <li>Frühzeitige Einbindung aller Stakeholder (IT, Fachbereich, Compliance) ist entscheidend.</li>
          <li>Dokumentation und kontinuierliche Optimierung sichern nachhaltigen Projekterfolg.</li>
        </ul>
      </div>
    </div>
  );
}
