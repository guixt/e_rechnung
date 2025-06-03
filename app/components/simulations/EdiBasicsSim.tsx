import React, { useState } from 'react';

const tabs = [
  {
    id: 'edifact',
    title: 'UN/EDIFACT',
    content: (
      <>
        <p className="mb-2">EDIFACT ist ein internationaler EDI-Standard mit Segment-Struktur.</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Nachrichtenarten wie INVOIC, ORDERS oder DESADV</li>
          <li>Verbreitet in Industrie, Handel und Logistik</li>
          <li>Benötigt spezialisierte Konverter bzw. Mapping-Tools</li>
        </ul>
      </>
    )
  },
  {
    id: 'protocols',
    title: 'Übertragungsprotokolle',
    content: (
      <>
        <ul className="list-disc list-inside text-sm space-y-1 mb-3">
          <li>AS2 – HTTP-basierter Standard mit Signatur und Verschlüsselung</li>
          <li>OFTP2 – Vor allem in der Automobilindustrie im Einsatz</li>
          <li>SFTP – Sicherer Dateiübertragungsweg</li>
          <li>REST/SOAP – Für API-basierte Integrationen</li>
        </ul>
      </>
    )
  },
  {
    id: 'mapping',
    title: 'Mapping-Beispiel',
    content: (
      <>
        <p className="mb-2">EDIFACT &lt;-&gt; XML (XSLT-Auszug)</p>
        <pre className="bg-gray-800 text-white p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap mb-2">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"&gt;
  &lt;xsl:template match="INVOIC"&gt;
    &lt;Invoice&gt;
      &lt;xsl:value-of select="BGM/02" /&gt;
    &lt;/Invoice&gt;
  &lt;/xsl:template&gt;
&lt;/xsl:stylesheet&gt;</pre>
      </>
    )
  }
];

export function EdiBasicsSim() {
  const [selected, setSelected] = useState('edifact');
  const tab = tabs.find(t => t.id === selected)!;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">EDI Basics &amp; Protokolle</h2>
      <div className="mb-4 flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`px-4 py-2 rounded ${selected === t.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {t.title}
          </button>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">{tab.content}</div>
      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">Lernhinweise:</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Grundlagen zu EDI erleichtern das Verständnis von Integrationsprojekten</li>
          <li>Protokolle wie AS2 oder OFTP2 regeln den sicheren Transport</li>
          <li>Mapping-Tools transformieren zwischen den Formaten</li>
        </ul>
      </div>
    </div>
  );
}

