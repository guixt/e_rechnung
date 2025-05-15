import React, { useState } from 'react';

const scenarios = [
  {
    id: 'overview',
    title: 'Was ist SEEBURGER BIC?',
    content: (
      <>
        <p className="mb-3">
          Die <b>SEEBURGER Business Integration Suite (BIC)</b> ist eine Integrationsplattform, die Unternehmen dabei unterstützt, Geschäftsprozesse und Datenflüsse zwischen SAP, Non-SAP-Systemen, Cloud-Services und Geschäftspartnern zu automatisieren.
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Unterstützt EDI, API, Datei- und Cloud-Integration</li>
          <li>Beinhaltet Module für E-Invoicing, Mapping, Monitoring, Compliance</li>
          <li>On-Premise, Cloud und Hybrid nutzbar</li>
        </ul>
      </>
    )
  },
  {
    id: 'einvoicing',
    title: 'E-Invoicing mit SEEBURGER BIC',
    content: (
      <>
        <p className="mb-3">
          Die BIC Suite bietet spezialisierte Adapter und Konnektoren für den elektronischen Rechnungsaustausch:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Peppol Access Point & XRechnung-Adapter</li>
          <li>ZUGFeRD/Factur-X Unterstützung</li>
          <li>Mapping-Designer für Konvertierung zwischen SAP-IDoc, EDIFACT, XML, PDF</li>
          <li>Integriertes Monitoring, Fehlerhandling und Compliance-Prüfung</li>
        </ul>
      </>
    )
  },
  {
    id: 'integration',
    title: 'Integrationsbeispiel: SAP zu Peppol',
    content: (
      <>
        <ol className="list-decimal list-inside text-sm space-y-1 mb-3">
          <li>SAP erzeugt eine Rechnung als IDoc (z.B. INVOIC02)</li>
          <li>BIC empfängt das IDoc, mappt es auf XRechnung (XML)</li>
          <li>BIC prüft und validiert das XML gegen EN16931</li>
          <li>BIC sendet die Rechnung via Peppol an den Empfänger</li>
          <li>Monitoring und Fehlerhandling im BIC Cockpit</li>
        </ol>
        <pre className="bg-gray-800 text-white p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap mb-2">IDoc (INVOIC02) → Mapping → XRechnung (XML) → Peppol-Sendung</pre>
      </>
    )
  }
];

export function SeeburgerBICSim() {
  const [selected, setSelected] = useState('overview');
  const scenario = scenarios.find(s => s.id === selected)!;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">SEEBURGER Business Integration Suite (BIC)</h2>
      <div className="mb-4 flex gap-2 flex-wrap">
        {scenarios.map(s => (
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
        {scenario.content}
      </div>
      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">Lernhinweise:</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>SEEBURGER BIC ist eine zentrale Plattform für Integrations- und E-Invoicing-Prozesse.</li>
          <li>Mapping, Validierung und Monitoring sind Kernfunktionen für Compliance und Effizienz.</li>
          <li>Die Plattform unterstützt zahlreiche Formate und Übertragungswege (z.B. Peppol, EDI, API).</li>
        </ul>
      </div>
    </div>
  );
}
