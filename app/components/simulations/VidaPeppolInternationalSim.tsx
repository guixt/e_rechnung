import React, { useState } from 'react';

const topics = [
  {
    id: 'vida',
    title: 'EU ViDA – VAT in the Digital Age',
    content: (
      <>
        <p className="mb-3">
          Die ViDA-Initiative der EU soll die Umsatzsteuerprozesse weiter digitalisieren.
          Geplant sind unter anderem Echtzeit-Meldungen, ein EU-weiter Meldestandard
          und ein verpflichtender elektronischer Rechnungsaustausch im innergemeinschaftlichen B2B-Bereich.
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Start voraussichtlich ab 2028 mit stufenweiser Einführung</li>
          <li>Ersetzt in vielen Fällen die bisherige Zusammenfassende Meldung</li>
          <li>Setzt auf ein einheitliches Datenmodell für Meldungen</li>
        </ul>
      </>
    )
  },
  {
    id: 'peppol',
    title: 'Peppol-Netzwerk',
    content: (
      <>
        <p className="mb-3">
          Peppol ermöglicht den sicheren Austausch elektronischer Rechnungen über ein
          Vier-Ecken-Modell. Access Points und ein Service Metadata Publisher (SMP)
          sorgen für die Adressierung und den Transport.
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Zertifizierte Access Points vermitteln zwischen Sender und Empfänger</li>
          <li>SMP speichert Empfangsadressen und unterstützte Dokumenttypen</li>
          <li>Weit verbreitet in Europa, aber auch global auf dem Vormarsch</li>
        </ul>
      </>
    )
  },
  {
    id: 'intl',
    title: 'Internationale Anforderungen',
    content: (
      <>
        <p className="mb-3">Viele Länder setzen bereits heute auf obligatorisches E-Invoicing:</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Italien: SdI-Plattform für alle B2B- und B2C-Rechnungen</li>
          <li>Frankreich: Chorus Pro und demnächst flächendeckende B2B-Pflicht</li>
          <li>Mexiko: CFDI mit XML-Struktur und behördlicher Freigabe</li>
          <li>Polen: KSeF als zentrales Rechnungssystem ab 2024/25</li>
        </ul>
      </>
    )
  }
];

export function VidaPeppolInternationalSim() {
  const [selected, setSelected] = useState('vida');
  const topic = topics.find(t => t.id === selected)!;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">ViDA, Peppol &amp; internationale Vorgaben</h2>
      <div className="mb-4 flex gap-2 flex-wrap">
        {topics.map(t => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`px-4 py-2 rounded ${selected === t.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {t.title}
          </button>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">{topic.content}</div>
      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">Lesehinweise:</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>BMF-Schreiben zur elektronischen Rechnung</li>
          <li>EU-Kommission: Übersicht zu ViDA</li>
          <li>Bitkom Whitepaper E-Invoicing</li>
        </ul>
      </div>
    </div>
  );
}

