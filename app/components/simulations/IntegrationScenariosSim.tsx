import React, { useState } from 'react';

const scenarios = [
  {
    id: 'onprem',
    title: 'On-Premise Integration',
    steps: [
      'SAP-System erzeugt Rechnung als IDoc',
      'Lokale Integrationsplattform (z.B. SEEBURGER BIC) empfängt und transformiert die Daten',
      'Versand an Geschäftspartner per EDI/XML',
      'Monitoring und Archivierung im eigenen Rechenzentrum'
    ],
    diagram: 'SAP (On-Premise) → BIC (On-Premise) → Geschäftspartner',
    hint: 'Hohe Kontrolle, aber eigener Infrastruktur- und Wartungsaufwand.'
  },
  {
    id: 'cloud',
    title: 'Cloud Integration',
    steps: [
      'SAP sendet Rechnung (z.B. via API oder IDoc) an Cloud-Plattform',
      'Cloud-Service (z.B. SEEBURGER Cloud) übernimmt Mapping, Validierung, Versand',
      'Empfang und Monitoring über Webportal',
      'Archivierung in der Cloud oder Rückübertragung ins eigene Archiv'
    ],
    diagram: 'SAP → Cloud Integration Platform → Geschäftspartner',
    hint: 'Schnelle Skalierung, weniger Eigenbetrieb, aber Abhängigkeit vom Provider.'
  },
  {
    id: 'hybrid',
    title: 'Hybride Integration',
    steps: [
      'Kombination aus On-Premise und Cloud: z.B. Vorverarbeitung lokal, Versand über Cloud',
      'Sensible Daten bleiben intern, Standardprozesse laufen über Cloud',
      'Monitoring und Fehlerhandling flexibel aufgeteilt',
      'Archivierung nach Compliance-Anforderungen'
    ],
    diagram: 'SAP → BIC (On-Premise) → Cloud → Geschäftspartner',
    hint: 'Flexibel, optimal für komplexe Compliance-Anforderungen.'
  }
];

const topics = [
  {
    id: 'compliance',
    title: 'Compliance-Anforderungen',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>GoBD (Deutschland): Ordnungsmäßigkeit, Nachvollziehbarkeit, Unveränderbarkeit</li>
          <li>EU-Norm EN16931 für elektronische Rechnungen</li>
          <li>Aufbewahrungsfristen (i.d.R. 10 Jahre)</li>
          <li>Revisionssichere Archivierung</li>
          <li>Datenschutz und Zugriffsrechte</li>
        </ul>
      </>
    )
  },
  {
    id: 'archiving',
    title: 'Archivierungslösungen',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Elektronische Archive (DMS/ECM-Systeme, z.B. SAP ArchiveLink, OpenText)</li>
          <li>Integrationslösungen: Übergabe aus E-Invoicing-Plattform an Archiv</li>
          <li>Prüfprotokolle, Audit-Trails, Zugriffskontrolle</li>
          <li>Cloud-Archivierung vs. On-Premise</li>
        </ul>
      </>
    )
  },
  {
    id: 'process',
    title: 'Beispielprozess: Archivierung einer Rechnung',
    content: (
      <>
        <ol className="list-decimal list-inside text-sm space-y-1 mb-3">
          <li>Rechnung wird elektronisch erzeugt und verarbeitet</li>
          <li>Rechnung und Metadaten werden an das Archivsystem übertragen</li>
          <li>Archiv prüft Integrität und speichert revisionssicher</li>
          <li>Zugriffsrechte und Aufbewahrungsfristen werden verwaltet</li>
          <li>Im Prüfungsfall: Nachweis der Unveränderbarkeit und Vollständigkeit</li>
        </ol>
        <pre className="bg-gray-800 text-white p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap mb-2">E-Invoicing Plattform → Archivsystem → Prüfer/Auditor</pre>
      </>
    )
  }
];

export function IntegrationScenariosSim() {
  const [selected, setSelected] = useState('onprem');
  const scenario = scenarios.find(s => s.id === selected)!;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Integrationsszenarien</h2>
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
        <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
        <ol className="list-decimal list-inside text-sm space-y-1 mb-3">
          {scenario.steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
        <pre className="bg-gray-800 text-white p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap mb-2">{scenario.diagram}</pre>
        <div className="bg-yellow-50 p-2 rounded text-sm">{scenario.hint}</div>
      </div>
      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">Lernhinweise:</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Die Wahl des Integrationsszenarios hängt von IT-Strategie, Compliance und Partneranforderungen ab.</li>
          <li>Cloud-Lösungen bieten Flexibilität, On-Premise maximale Kontrolle.</li>
          <li>Hybride Ansätze kombinieren Vorteile beider Welten.</li>
        </ul>
      </div>
    </div>
  );
}
