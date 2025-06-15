import React, { useState } from 'react';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function IntlFormatsRoadmapSim() {
  const sections: Section[] = [
    {
      id: 'pflichten',
      title: 'Pflichten in Deutschland',
      content: (
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Ab 2025 m\u00fcssen Unternehmen E-Rechnungen empfangen k\u00f6nnen.</li>
          <li>Ab 2027 (voraussichtlich) wird auch der Versand verpflichtend.</li>
          <li>Rechnungen m\u00fcssen dem EN-16931 Standard entsprechen (XRechnung oder ZUGFeRD).</li>
        </ul>
      )
    },
    {
      id: 'formate',
      title: 'Senden & Empfangen international',
      content: (
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Deutschland: XRechnung oder ZUGFeRD.</li>
          <li>EU-Partner: h\u00e4ufig Peppol/UBL.</li>
          <li>Italien: FatturaPA \u00fcber SDI.</li>
          <li>Frankreich: Factur-X / Chorus Pro.</li>
          <li>Weitere Formate nur nach Absprache mit dem Gesch\u00e4ftspartner.</li>
        </ul>
      )
    },
    {
      id: 'roadmap-js',
      title: 'Roadmap JavaScript/Node.js',
      content: (
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Anforderungen und Ziel-Formate festlegen.</li>
          <li>Rechnungsdaten aus dem System extrahieren (z.\u00a0B. via API).</li>
          <li>XML/JSON mit passenden Bibliotheken erzeugen und validieren.</li>
          <li>Optional Peppol-Anbindung \u00fcber zertifizierten Access Point.</li>
          <li>Eingehende Dateien einlesen, pr\u00fcfen und archivieren.</li>
        </ol>
      )
    },
    {
      id: 'roadmap-vb',
      title: 'Roadmap VB.NET',
      content: (
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Analyse der gesetzlichen Anforderungen f\u00fcr die Zielm\u00e4rkte.</li>
          <li>Aufbau einer Klassenstruktur f\u00fcr Rechnungsdaten (XML-Serializer).</li>
          <li>Mapping zu Formaten wie XRechnung oder ZUGFeRD umsetzen.</li>
          <li>Validierung gegen Schemas und Versand per Webservice oder Peppol.</li>
          <li>Rechnungen und Pr\u00fcfprotokolle mindestens 10 Jahre speichern.</li>
        </ol>
      )
    }
  ];

  const [active, setActive] = useState('pflichten');
  const current = sections.find(s => s.id === active)!;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Internationale E-Rechnung &amp; Roadmap</h2>
      <div className="mb-4 flex gap-2 flex-wrap">
        {sections.map(sec => (
          <button
            key={sec.id}
            onClick={() => setActive(sec.id)}
            className={`px-4 py-2 rounded ${active === sec.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {sec.title}
          </button>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">
        {current.content}
      </div>
      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">Lernhinweise:</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Nicht jedes Land hat dieselben Regeln &ndash; w\u00e4hle Kernformate und erweitere nur bei Bedarf.</li>
          <li>Standardformate wie XRechnung, ZUGFeRD und UBL decken die meisten Szenarien ab.</li>
          <li>Eine klare technische Roadmap vereinfacht die Einf\u00fchrung und spart langfristig Kosten.</li>
        </ul>
      </div>
    </div>
  );
}
