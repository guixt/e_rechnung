import React, { useState } from 'react';

const sampleMappings = [
  {
    id: 'idoc-edifact',
    from: 'SAP IDoc (DEBMAS)',
    to: 'EDIFACT (ORDERS)',
    example: {
      idoc: `E1KNA1M (Kundenstamm):
  KUNNR: 4711
  NAME1: Beispiel GmbH
  ORT01: Berlin
  LAND1: DE`,
      edifact: `UNH+1+ORDERS:D:96A:UN'
NAD+BY+4711::91++Beispiel GmbH+Berlin++DE'`
    },
    rules: [
      'KUNNR → NAD+BY+<Kundennummer>',
      'NAME1 → NAD+BY+<Name>',
      'ORT01 → NAD+BY+<Ort>',
      'LAND1 → NAD+BY+<Land>'
    ]
  },
  {
    id: 'edifact-xml',
    from: 'EDIFACT (INVOIC)',
    to: 'XML (UBL)',
    example: {
      edifact: `UNH+1+INVOIC:D:96A:UN'
BGM+380+INV-2023-0001+9'
NAD+BY+4711::91++Beispiel GmbH+Berlin++DE'`,
      xml: `<Invoice>
  <ID>INV-2023-0001</ID>
  <BuyerParty>
    <ID>4711</ID>
    <Name>Beispiel GmbH</Name>
    <City>Berlin</City>
    <Country>DE</Country>
  </BuyerParty>
</Invoice>`
    },
    rules: [
      'NAD+BY+<Kundennummer> → BuyerParty/ID',
      'NAD+BY+<Name> → BuyerParty/Name',
      'NAD+BY+<Ort> → BuyerParty/City',
      'NAD+BY+<Land> → BuyerParty/Country'
    ]
  },
  {
    id: 'xml-zugferd',
    from: 'XML (UBL)',
    to: 'ZUGFeRD (PDF/A-3 + XML)',
    example: {
      xml: `<Invoice>
  <ID>INV-2023-0001</ID>
  <BuyerParty>
    <ID>4711</ID>
    <Name>Beispiel GmbH</Name>
    <City>Berlin</City>
    <Country>DE</Country>
  </BuyerParty>
</Invoice>`,
      zugferd: 'PDF/A-3 mit eingebettetem XML gemäß ZUGFeRD/Factur-X-Standard'
    },
    rules: [
      'UBL-Elemente werden in das ZUGFeRD-XML übernommen',
      'Das XML wird als Datei in das PDF/A-3 eingebettet',
      'Metadaten werden entsprechend ergänzt'
    ]
  }
];

export function MappingConceptsSim() {
  const [selected, setSelected] = useState('idoc-edifact');
  const mapping = sampleMappings.find(m => m.id === selected)!;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Mapping & Transformation</h2>
      <div className="mb-4 flex gap-2 flex-wrap">
        {sampleMappings.map(m => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`px-4 py-2 rounded ${selected === m.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {m.from} → {m.to}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Beispiel: {mapping.from} → {mapping.to}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-1">Quellformat</h4>
            <pre className="bg-gray-800 text-white p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap">
              {Object.values(mapping.example)[0]}
            </pre>
          </div>
          <div>
            <h4 className="font-medium mb-1">Zielformat</h4>
            <pre className="bg-gray-800 text-white p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap">
              {Object.values(mapping.example)[1]}
            </pre>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-medium mb-1">Mapping-Regeln</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {mapping.rules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">Lernhinweise:</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Mapping ist die Zuordnung von Datenfeldern zwischen unterschiedlichen Formaten.</li>
          <li>Transformation ist die technische Umsetzung, z.B. mit XSLT, Mapping-Tools oder Integrationsplattformen wie SEEBURGER BIC.</li>
          <li>Typische Herausforderungen: Semantische Unterschiede, Pflichtfelder, Datenformate, Validierung.</li>
          <li>Mapping-Tabellen und visuelle Mapping-Designer helfen bei der Umsetzung in der Praxis.</li>
        </ul>
      </div>
    </div>
  );
}
