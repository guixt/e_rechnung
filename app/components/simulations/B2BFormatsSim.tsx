import React, { useState } from 'react';

interface FormatExample {
  id: string;
  name: string;
  description: string;
  example: string;
  useCases: string[];
  advantages: string[];
  limitations: string[];
}

export function B2BFormatsSim() {
  const [selectedFormat, setSelectedFormat] = useState<string | null>('xml');
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const formatExamples: FormatExample[] = [
    {
      id: 'xml',
      name: 'XML (UBL/CII)',
      description: 'XML (Extensible Markup Language) ist ein flexibles, menschenlesbares Textformat. UBL (Universal Business Language) und CII (Cross Industry Invoice) sind spezifische XML-Standards für Geschäftsdokumente.',
      example: `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
  <ID>INV-2023-0001</ID>
  <IssueDate>2023-05-15</IssueDate>
  <InvoiceTypeCode>380</InvoiceTypeCode>
  <DocumentCurrencyCode>EUR</DocumentCurrencyCode>
  <AccountingSupplierParty>
    <Party>
      <PartyName>
        <Name>Lieferant GmbH</Name>
      </PartyName>
      <PostalAddress>
        <StreetName>Hauptstraße</StreetName>
        <BuildingNumber>1</BuildingNumber>
        <CityName>Berlin</CityName>
        <PostalZone>10115</PostalZone>
        <CountrySubentity>Berlin</CountrySubentity>
        <Country>
          <IdentificationCode>DE</IdentificationCode>
        </Country>
      </PostalAddress>
      <PartyTaxScheme>
        <CompanyID>DE123456789</CompanyID>
        <TaxScheme>
          <ID>VAT</ID>
        </TaxScheme>
      </PartyTaxScheme>
    </Party>
  </AccountingSupplierParty>
  <!-- Weitere Elemente... -->
</Invoice>`,
      useCases: [
        'XRechnung (Deutschland)',
        'Peppol BIS Billing',
        'ZUGFeRD (XML-Teil)',
        'FatturaPA (Italien)'
      ],
      advantages: [
        'Menschenlesbar und maschinenverarbeitbar',
        'Flexible Struktur für komplexe Daten',
        'Breite Unterstützung in Softwaresystemen',
        'Validierbar gegen Schemas (XSD)'
      ],
      limitations: [
        'Relativ verbose (größere Dateien als binäre Formate)',
        'Komplexe Strukturen können schwer zu verstehen sein',
        'Performance-Overhead bei der Verarbeitung'
      ]
    },
    {
      id: 'edifact',
      name: 'EDIFACT',
      description: 'EDIFACT (Electronic Data Interchange For Administration, Commerce and Transport) ist ein internationaler Standard für den elektronischen Datenaustausch im Geschäftsverkehr, entwickelt von den Vereinten Nationen.',
      example: `UNH+1+INVOIC:D:96A:UN'
BGM+380+INV-2023-0001+9'
DTM+137:20230515:102'
NAD+SU+123456789::91++Lieferant GmbH+Hauptstraße 1+Berlin++10115+DE'
RFF+VA:DE123456789'
NAD+BY+987654321::91++Kunde AG+Kundenweg 5+München++80331+DE'
RFF+VA:DE987654321'
CUX+2:EUR:4'
LIN+1++4000862141404:EN'
IMD+F++:::Produkt A'
QTY+47:10:PCE'
MOA+203:1000'
PRI+AAA:100'
TAX+7+VAT+++:::19+S'
MOA+124:190'
UNS+S'
MOA+86:1190'
TAX+7+VAT+++:::19+S'
MOA+176:190'
MOA+139:1000'
UNT+22+1'`,
      useCases: [
        'Automobilindustrie',
        'Handel und Logistik',
        'Etablierte B2B-Beziehungen',
        'EDI-basierte Lieferketten'
      ],
      advantages: [
        'Kompaktes Format (geringer Speicherbedarf)',
        'Etablierter Standard in vielen Branchen',
        'Hohe Verarbeitungsgeschwindigkeit',
        'Unterstützung für komplexe Geschäftsprozesse'
      ],
      limitations: [
        'Schwer lesbar für Menschen',
        'Steile Lernkurve',
        'Erfordert spezielle EDI-Konverter',
        'Weniger flexibel als moderne Formate'
      ]
    },
    {
      id: 'json',
      name: 'JSON',
      description: 'JSON (JavaScript Object Notation) ist ein leichtgewichtiges Datenaustauschformat, das einfach zu lesen und zu schreiben ist. Es wird zunehmend für APIs und moderne Integrationen verwendet.',
      example: `{
  "invoice": {
    "id": "INV-2023-0001",
    "issueDate": "2023-05-15",
    "invoiceTypeCode": "380",
    "documentCurrencyCode": "EUR",
    "supplier": {
      "name": "Lieferant GmbH",
      "address": {
        "street": "Hauptstraße",
        "number": "1",
        "city": "Berlin",
        "postalCode": "10115",
        "country": "DE"
      },
      "taxId": "DE123456789"
    },
    "customer": {
      "name": "Kunde AG",
      "address": {
        "street": "Kundenweg",
        "number": "5",
        "city": "München",
        "postalCode": "80331",
        "country": "DE"
      },
      "taxId": "DE987654321"
    },
    "items": [
      {
        "lineNumber": 1,
        "productCode": "4000862141404",
        "description": "Produkt A",
        "quantity": 10,
        "unitCode": "PCE",
        "unitPrice": 100.00,
        "lineAmount": 1000.00,
        "tax": {
          "rate": 19.00,
          "amount": 190.00
        }
      }
    ],
    "totalAmount": 1190.00,
    "totalTaxAmount": 190.00,
    "totalNetAmount": 1000.00
  }
}`,
      useCases: [
        'API-basierte Integrationen',
        'Cloud-Dienste',
        'Mobile Anwendungen',
        'Moderne Microservices'
      ],
      advantages: [
        'Einfach zu lesen und zu schreiben',
        'Geringerer Overhead als XML',
        'Natürliche Integration mit JavaScript',
        'Breite Unterstützung in modernen Programmiersprachen'
      ],
      limitations: [
        'Weniger strukturierte Validierungsmöglichkeiten',
        'Keine eingebaute Unterstützung für Namensräume',
        'Weniger etabliert für formale B2B-Standards',
        'Begrenzte Unterstützung für Kommentare'
      ]
    },
    {
      id: 'zugferd',
      name: 'ZUGFeRD/Factur-X',
      description: 'ZUGFeRD (Zentraler User Guide des Forums elektronische Rechnung Deutschland) und Factur-X sind hybride Formate, die ein PDF/A-3 Dokument mit eingebetteten strukturierten XML-Daten kombinieren.',
      example: `<!-- ZUGFeRD/Factur-X ist ein Hybridformat -->
<!-- Es besteht aus einem PDF/A-3 Dokument mit eingebetteten XML-Daten -->
<!-- Hier ein Auszug aus dem eingebetteten XML (basierend auf UN/CEFACT CII): -->

<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100">
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:extended</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>INV-2023-0001</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">20230515</udt:DateTimeString>
    </ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <!-- Weitere Elemente... -->
</rsm:CrossIndustryInvoice>`,
      useCases: [
        'B2B-Rechnungen in Deutschland und Frankreich',
        'Schrittweise Migration zu strukturierten Formaten',
        'Branchen mit Bedarf an visueller und strukturierter Darstellung',
        'Mittelständische Unternehmen'
      ],
      advantages: [
        'Kombination aus visueller (PDF) und strukturierter (XML) Darstellung',
        'Schrittweise Implementierung möglich',
        'Verschiedene Profile für unterschiedliche Anforderungen',
        'Konform mit EU-Norm EN16931'
      ],
      limitations: [
        'Größere Dateien durch PDF-Einbettung',
        'Komplexere Verarbeitung als reine XML-Formate',
        'Potenzielle Inkonsistenzen zwischen PDF und XML',
        'Nicht für alle B2G-Szenarien geeignet'
      ]
    },
    {
      id: 'xrechnung',
      name: 'XRechnung',
      description: 'XRechnung ist der deutsche Standard für elektronische Rechnungen an öffentliche Auftraggeber (B2G). Es ist ein reines XML-Format, das der europäischen Norm EN16931 entspricht.',
      example: `<?xml version="1.0" encoding="UTF-8"?>
<ubl:Invoice xmlns:ubl="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
             xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
             xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:xoev-de:kosit:standard:xrechnung_2.0</cbc:CustomizationID>
  <cbc:ID>INV-2023-0001</cbc:ID>
  <cbc:IssueDate>2023-05-15</cbc:IssueDate>
  <cbc:DueDate>2023-06-14</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cbc:BuyerReference>04011000-12345-34</cbc:BuyerReference>
  
  <!-- Leitweg-ID für deutsche Behörden -->
  <cbc:AccountingCost>Leitweg-ID: 04011000-12345-34</cbc:AccountingCost>
  
  <!-- Weitere XRechnung-spezifische Elemente... -->
</ubl:Invoice>`,
      useCases: [
        'B2G-Rechnungen in Deutschland',
        'Öffentliche Aufträge über dem EU-Schwellenwert',
        'Kommunikation mit Bundesbehörden',
        'Vollständig digitalisierte Rechnungsprozesse'
      ],
      advantages: [
        'Vollständig konform mit EU-Norm EN16931',
        'Verbindlicher Standard für B2G in Deutschland',
        'Klare Validierungsregeln',
        'Unterstützung durch offizielle Tools und Plattformen'
      ],
      limitations: [
        'Nur für B2G-Szenarien optimiert',
        'Keine visuelle Darstellung (reines XML)',
        'Strenge Validierungsregeln können Implementierung erschweren',
        'Weniger flexibel als andere Formate'
      ]
    }
  ];

  const selectedFormatData = formatExamples.find(f => f.id === selectedFormat) || formatExamples[0];

  const formatComparison = [
    { 
      feature: 'Menschenlesbarkeit', 
      xml: 'Gut', 
      edifact: 'Schlecht', 
      json: 'Sehr gut',
      zugferd: 'Gut (XML) + Sehr gut (PDF)',
      xrechnung: 'Gut'
    },
    { 
      feature: 'Maschinenverarbeitbarkeit', 
      xml: 'Sehr gut', 
      edifact: 'Sehr gut', 
      json: 'Sehr gut',
      zugferd: 'Gut',
      xrechnung: 'Sehr gut'
    },
    { 
      feature: 'Dateigröße', 
      xml: 'Groß', 
      edifact: 'Klein', 
      json: 'Mittel',
      zugferd: 'Sehr groß',
      xrechnung: 'Groß'
    },
    { 
      feature: 'Verarbeitungsgeschwindigkeit', 
      xml: 'Mittel', 
      edifact: 'Hoch', 
      json: 'Hoch',
      zugferd: 'Niedrig',
      xrechnung: 'Mittel'
    },
    { 
      feature: 'Validierungsmöglichkeiten', 
      xml: 'Sehr gut (XSD)', 
      edifact: 'Gut', 
      json: 'Begrenzt (JSON Schema)',
      zugferd: 'Sehr gut',
      xrechnung: 'Sehr gut'
    },
    { 
      feature: 'Implementierungsaufwand', 
      xml: 'Mittel', 
      edifact: 'Hoch', 
      json: 'Niedrig',
      zugferd: 'Mittel-Hoch',
      xrechnung: 'Mittel-Hoch'
    },
    { 
      feature: 'B2B-Verbreitung', 
      xml: 'Hoch', 
      edifact: 'Hoch (etablierte Branchen)', 
      json: 'Zunehmend',
      zugferd: 'Mittel (DE/FR)',
      xrechnung: 'Niedrig (nur B2G)'
    },
    { 
      feature: 'B2G-Eignung', 
      xml: 'Sehr gut', 
      edifact: 'Begrenzt', 
      json: 'Begrenzt',
      zugferd: 'Gut',
      xrechnung: 'Sehr gut (DE)'
    },
    { 
      feature: 'Zukunftssicherheit', 
      xml: 'Hoch', 
      edifact: 'Mittel', 
      json: 'Hoch',
      zugferd: 'Hoch',
      xrechnung: 'Hoch (für B2G)'
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">B2B Formate für E-Invoicing</h2>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {formatExamples.map(format => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={`px-4 py-2 rounded ${
                selectedFormat === format.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {format.name}
            </button>
          ))}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`px-4 py-2 rounded ${
              showComparison 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {showComparison ? 'Format-Details anzeigen' : 'Formate vergleichen'}
          </button>
        </div>

        {!showComparison ? (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{selectedFormatData.name}</h3>
            <p className="mb-4">{selectedFormatData.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <h4 className="font-medium mb-2">Anwendungsfälle</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {selectedFormatData.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Vorteile</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {selectedFormatData.advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Einschränkungen</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {selectedFormatData.limitations.map((limitation, index) => (
                    <li key={index}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Beispiel</h4>
              <pre className="bg-gray-800 text-white p-3 rounded text-xs overflow-x-auto whitespace-pre-wrap">
                {selectedFormatData.example}
              </pre>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded shadow overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4">Format-Vergleich</h3>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Merkmal</th>
                  <th className="border px-4 py-2 text-center">XML (UBL/CII)</th>
                  <th className="border px-4 py-2 text-center">EDIFACT</th>
                  <th className="border px-4 py-2 text-center">JSON</th>
                  <th className="border px-4 py-2 text-center">ZUGFeRD/Factur-X</th>
                  <th className="border px-4 py-2 text-center">XRechnung</th>
                </tr>
              </thead>
              <tbody>
                {formatComparison.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="border px-4 py-2 font-medium">{row.feature}</td>
                    <td className="border px-4 py-2 text-center">{row.xml}</td>
                    <td className="border px-4 py-2 text-center">{row.edifact}</td>
                    <td className="border px-4 py-2 text-center">{row.json}</td>
                    <td className="border px-4 py-2 text-center">{row.zugferd}</td>
                    <td className="border px-4 py-2 text-center">{row.xrechnung}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">🎓 Lernhinweise (B2B Formate):</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li><b>Formatauswahl</b> hängt von verschiedenen Faktoren ab:
            <ul className="list-disc list-inside ml-4">
              <li>Gesetzliche Anforderungen (z.B. XRechnung für B2G in Deutschland)</li>
              <li>Branchenstandards (z.B. EDIFACT in Automotive)</li>
              <li>Geschäftspartner-Anforderungen</li>
              <li>Integrationsszenarien (On-Premise vs. Cloud)</li>
              <li>Vorhandene Systeme und Fähigkeiten</li>
            </ul>
          </li>
          <li><b>Semantische Modelle</b> vs. <b>Syntaxformate</b>:
            <ul className="list-disc list-inside ml-4">
              <li>Semantisches Modell: Definiert die Bedeutung der Datenelemente (z.B. EN16931)</li>
              <li>Syntax: Definiert die technische Darstellung (z.B. XML, JSON, EDIFACT)</li>
              <li>Ein semantisches Modell kann in verschiedenen Syntaxen ausgedrückt werden</li>
            </ul>
          </li>
          <li><b>Hybride Ansätze</b> wie ZUGFeRD bieten Vorteile für die Migration:
            <ul className="list-disc list-inside ml-4">
              <li>Visuelle Darstellung für Menschen (PDF)</li>
              <li>Strukturierte Daten für Maschinen (XML)</li>
              <li>Schrittweise Implementierung möglich</li>
            </ul>
          </li>
          <li><b>Internationale Standards</b> gewinnen an Bedeutung:
            <ul className="list-disc list-inside ml-4">
              <li>Peppol für grenzüberschreitenden Rechnungsaustausch</li>
              <li>UBL und UN/CEFACT CII als Basis für viele nationale Standards</li>
              <li>EU-Norm EN16931 als gemeinsames semantisches Modell in Europa</li>
            </ul>
          </li>
          <li><b>Mapping und Transformation</b> zwischen verschiedenen Formaten ist eine Kernkompetenz von Integrationsplattformen wie SEEBURGER BIC.</li>
        </ul>
      </div>
    </div>
  );
}
