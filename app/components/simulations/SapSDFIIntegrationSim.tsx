import React, { useState } from 'react';

const sections = [
  {
    id: 'process',
    title: 'Rechnungsprozesse in SD/FI',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Rechnungserstellung (VF01) aus Fakturabelegen</li>
          <li>Kontierung und Übergabe an FI bzw. FI-CA</li>
          <li>Rechnungsprüfung eingehender Belege (MIRO)</li>
        </ul>
      </>
    )
  },
  {
    id: 'idocs',
    title: 'Wichtige IDoc-Typen',
    content: (
      <>
        <p className="mb-2">Für den Rechnungsaustausch werden häufig genutzt:</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>INVOIC01 / INVOIC02 für Ausgangsrechnungen</li>
          <li>ORDERS / DESADV im vorgelagerten Prozess</li>
          <li>Custom IDocs je nach Erweiterung</li>
        </ul>
      </>
    )
  },
  {
    id: 'output',
    title: 'Output Management',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>Klassisches NAST-Verfahren und moderne BRF+ Lösungen</li>
          <li>Steuerung von Format und Kanal (z.B. PDF, XML, EDI)</li>
          <li>Anbindung an Middleware wie SEEBURGER BIS</li>
        </ul>
      </>
    )
  }
];

export function SapSDFIIntegrationSim() {
  const [selected, setSelected] = useState('process');
  const sec = sections.find(s => s.id === selected)!;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">SAP SD/FI E-Invoicing Integration</h2>
      <div className="mb-4 flex gap-2 flex-wrap">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={`px-4 py-2 rounded ${selected === s.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">{sec.content}</div>
      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">Tipps:</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Kenntnis der SAP-Transaktionen erleichtert Troubleshooting</li>
          <li>IDoc-Strukturen lassen sich in der Middleware flexibel mappen</li>
          <li>BRF+ ermöglicht fachliche Steuerung ohne ABAP-Entwicklung</li>
        </ul>
      </div>
    </div>
  );
}

