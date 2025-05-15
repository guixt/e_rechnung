import React, { useState } from 'react';

interface LegalRequirement {
  id: string;
  country: string;
  name: string;
  description: string;
  mandatorySince?: string;
  applicableFor: ('B2B' | 'B2G' | 'B2C')[];
}

interface EInvoiceFormat {
  id: string;
  name: string;
  type: 'National' | 'International' | 'Industry';
  countries: string[];
  description: string;
  basedOn: string;
  features: string[];
}

export function EInvoicingBasicsSim() {
  const [activeTab, setActiveTab] = useState<'requirements' | 'formats'>('requirements');
  const [selectedCountry, setSelectedCountry] = useState<string>('Deutschland');
  const [selectedRequirement, setSelectedRequirement] = useState<LegalRequirement | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<EInvoiceFormat | null>(null);

  const countries = ['Deutschland', 'Österreich', 'Schweiz', 'Frankreich', 'Italien', 'Spanien', 'EU'];

  const legalRequirements: LegalRequirement[] = [
    {
      id: 'de-b2g',
      country: 'Deutschland',
      name: 'E-Rechnungsverordnung',
      description: 'Verpflichtung zur elektronischen Rechnungsstellung an Bundesbehörden. Seit 27.11.2020 müssen alle Lieferanten elektronische Rechnungen an Bundesbehörden senden.',
      mandatorySince: '2020-11-27',
      applicableFor: ['B2G']
    },
    {
      id: 'de-b2b',
      country: 'Deutschland',
      name: 'Umsatzsteuergesetz §14',
      description: 'Regelt die Anforderungen an elektronische Rechnungen für Umsatzsteuerzwecke. Elektronische Rechnungen müssen die Echtheit der Herkunft, die Unversehrtheit des Inhalts und die Lesbarkeit gewährleisten.',
      applicableFor: ['B2B', 'B2C']
    },
    {
      id: 'de-gob',
      country: 'Deutschland',
      name: 'GoBD',
      description: 'Grundsätze zur ordnungsmäßigen Führung und Aufbewahrung von Büchern, Aufzeichnungen und Unterlagen in elektronischer Form sowie zum Datenzugriff. Regelt die Aufbewahrung elektronischer Rechnungen.',
      applicableFor: ['B2B', 'B2G']
    },
    {
      id: 'eu-directive',
      country: 'EU',
      name: 'EU-Richtlinie 2014/55/EU',
      description: 'Verpflichtet öffentliche Auftraggeber und Vergabestellen, elektronische Rechnungen zu empfangen und zu verarbeiten, die der europäischen Norm für elektronische Rechnungsstellung entsprechen.',
      mandatorySince: '2019-04-18',
      applicableFor: ['B2G']
    },
    {
      id: 'it-b2b',
      country: 'Italien',
      name: 'Fatturazione Elettronica',
      description: 'Verpflichtende elektronische Rechnungsstellung für alle B2B- und B2C-Transaktionen in Italien. Rechnungen müssen über das staatliche SDI-System (Sistema di Interscambio) übermittelt werden.',
      mandatorySince: '2019-01-01',
      applicableFor: ['B2B', 'B2C']
    },
    {
      id: 'fr-b2b',
      country: 'Frankreich',
      name: 'Loi de Finances 2020',
      description: 'Schrittweise Einführung der verpflichtenden elektronischen Rechnungsstellung für B2B-Transaktionen in Frankreich. Vollständige Umsetzung bis 2025.',
      mandatorySince: '2023-07-01',
      applicableFor: ['B2B']
    },
    {
      id: 'es-b2b',
      country: 'Spanien',
      name: 'Sistema de Suministro Inmediato de Información (SII)',
      description: 'Verpflichtet bestimmte Unternehmen, Rechnungsdaten innerhalb von 4 Tagen an die spanische Steuerbehörde zu übermitteln.',
      mandatorySince: '2017-07-01',
      applicableFor: ['B2B']
    },
    {
      id: 'ch-b2g',
      country: 'Schweiz',
      name: 'E-Rechnung an Bundesverwaltung',
      description: 'Lieferanten der Bundesverwaltung müssen ihre Rechnungen elektronisch einreichen.',
      mandatorySince: '2016-01-01',
      applicableFor: ['B2G']
    },
    {
      id: 'at-b2g',
      country: 'Österreich',
      name: 'E-Rechnung an den Bund (E-Rechnungs-VO)',
      description: 'Verpflichtung zur elektronischen Rechnungsstellung an Bundesdienststellen in Österreich.',
      mandatorySince: '2014-01-01',
      applicableFor: ['B2G']
    }
  ];

  const eInvoiceFormats: EInvoiceFormat[] = [
    {
      id: 'zugferd',
      name: 'ZUGFeRD',
      type: 'National',
      countries: ['Deutschland'],
      description: 'Zentraler User Guide des Forums elektronische Rechnung Deutschland. Ein hybrides Format, das ein PDF/A-3 Dokument mit eingebetteten strukturierten XML-Daten kombiniert.',
      basedOn: 'UN/CEFACT CII (Cross Industry Invoice)',
      features: [
        'Hybridformat (PDF + XML)',
        'Verschiedene Profile (Basic, Comfort, Extended)',
        'Konform mit EU-Norm EN16931',
        'Maschinenlesbar und menschenlesbar'
      ]
    },
    {
      id: 'xrechnung',
      name: 'XRechnung',
      type: 'National',
      countries: ['Deutschland'],
      description: 'Der deutsche Standard für elektronische Rechnungen an öffentliche Auftraggeber (B2G). Ein reines XML-Format, das der europäischen Norm EN16931 entspricht.',
      basedOn: 'UBL 2.1 und UN/CEFACT CII',
      features: [
        'Reines XML-Format',
        'Verpflichtend für B2G in Deutschland',
        'Vollständig konform mit EN16931',
        'Enthält alle steuerlich relevanten Informationen'
      ]
    },
    {
      id: 'facturx',
      name: 'Factur-X / Chorus Pro',
      type: 'National',
      countries: ['Frankreich'],
      description: 'Das französische Pendant zu ZUGFeRD. Factur-X ist technisch mit ZUGFeRD 2.0 identisch. Chorus Pro ist die zentrale Plattform für B2G-Rechnungen in Frankreich.',
      basedOn: 'UN/CEFACT CII',
      features: [
        'Hybridformat wie ZUGFeRD',
        'Zentrale Plattform für B2G',
        'Verschiedene Profile',
        'Kompatibel mit ZUGFeRD 2.0'
      ]
    },
    {
      id: 'fatturaPA',
      name: 'FatturaPA / SDI',
      type: 'National',
      countries: ['Italien'],
      description: 'Das italienische Format für elektronische Rechnungen. Alle Rechnungen müssen über das staatliche SDI-System (Sistema di Interscambio) übermittelt werden.',
      basedOn: 'Proprietäres XML-Format',
      features: [
        'Verpflichtend für B2B, B2G und B2C in Italien',
        'Übermittlung über zentrales staatliches System',
        'Digitale Signatur erforderlich',
        'Spezifische Validierungsregeln'
      ]
    },
    {
      id: 'peppol',
      name: 'Peppol BIS Billing',
      type: 'International',
      countries: ['EU', 'Australien', 'Neuseeland', 'Singapur'],
      description: 'Ein internationaler Standard für elektronische Rechnungen, der auf dem Peppol-Netzwerk basiert. Ermöglicht den grenzüberschreitenden Austausch von elektronischen Rechnungen.',
      basedOn: 'UBL 2.1',
      features: [
        'Internationales Netzwerk',
        'Standardisierte Geschäftsprozesse',
        'Vier-Ecken-Modell für die Übermittlung',
        'Weit verbreitet in der EU'
      ]
    },
    {
      id: 'edifact',
      name: 'EDIFACT INVOIC',
      type: 'International',
      countries: ['Global'],
      description: 'Ein internationaler EDI-Standard für elektronische Rechnungen. Weit verbreitet in etablierten B2B-Beziehungen und Branchen wie Automotive und Handel.',
      basedOn: 'UN/EDIFACT',
      features: [
        'Etablierter EDI-Standard',
        'Kompakte Datenstruktur',
        'Branchenspezifische Subsets',
        'Hohe Verarbeitungsgeschwindigkeit'
      ]
    },
    {
      id: 'ubl',
      name: 'UBL Invoice',
      type: 'International',
      countries: ['Global', 'EU'],
      description: 'Universal Business Language (UBL) ist ein XML-Standard für Geschäftsdokumente. UBL Invoice ist das Rechnungsformat, das auch die Basis für viele nationale Standards bildet.',
      basedOn: 'OASIS UBL',
      features: [
        'XML-basiert',
        'Offener Standard',
        'Basis für viele nationale Formate',
        'Umfangreiche Dokumentation'
      ]
    },
    {
      id: 'cii',
      name: 'UN/CEFACT CII',
      type: 'International',
      countries: ['Global', 'EU'],
      description: 'Cross Industry Invoice (CII) ist ein XML-Standard für Rechnungen, entwickelt von UN/CEFACT. Bildet die Basis für ZUGFeRD und Factur-X.',
      basedOn: 'UN/CEFACT XML',
      features: [
        'XML-basiert',
        'Internationaler UN-Standard',
        'Basis für hybride Formate',
        'Semantische Interoperabilität'
      ]
    }
  ];

  const filteredRequirements = legalRequirements.filter(
    req => req.country === selectedCountry || (selectedCountry === 'EU' && req.country === 'EU')
  );

  const filteredFormats = eInvoiceFormats.filter(
    format => format.countries.includes(selectedCountry) || format.countries.includes('Global') || 
    (selectedCountry === 'EU' && format.countries.includes('EU'))
  );

  const handleRequirementClick = (req: LegalRequirement) => {
    setSelectedRequirement(req);
    setSelectedFormat(null);
  };

  const handleFormatClick = (format: EInvoiceFormat) => {
    setSelectedFormat(format);
    setSelectedRequirement(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">E-Invoicing Grundlagen</h2>

      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => setActiveTab('requirements')}
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'requirements' ? 'bg-white border-t border-l border-r' : 'bg-gray-100'}`}
        >
          Rechtliche Anforderungen
        </button>
        <button 
          onClick={() => setActiveTab('formats')}
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'formats' ? 'bg-white border-t border-l border-r' : 'bg-gray-100'}`}
        >
          E-Rechnungs-Formate
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Land/Region auswählen:</label>
          <div className="flex flex-wrap gap-2">
            {countries.map(country => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-3 py-1 text-sm rounded ${
                  selectedCountry === country 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 border rounded p-3">
            <h3 className="font-medium mb-2">
              {activeTab === 'requirements' ? 'Rechtliche Anforderungen' : 'Verfügbare Formate'}
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {activeTab === 'requirements' ? (
                filteredRequirements.length > 0 ? (
                  filteredRequirements.map(req => (
                    <div 
                      key={req.id}
                      onClick={() => handleRequirementClick(req)}
                      className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        selectedRequirement?.id === req.id ? 'bg-blue-50 border border-blue-200' : ''
                      }`}
                    >
                      <p className="font-medium text-sm">{req.name}</p>
                      <p className="text-xs text-gray-600">
                        {req.applicableFor.join(', ')}
                        {req.mandatorySince && ` • Verpflichtend seit: ${req.mandatorySince}`}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Keine Anforderungen für das ausgewählte Land gefunden.</p>
                )
              ) : (
                filteredFormats.length > 0 ? (
                  filteredFormats.map(format => (
                    <div 
                      key={format.id}
                      onClick={() => handleFormatClick(format)}
                      className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        selectedFormat?.id === format.id ? 'bg-blue-50 border border-blue-200' : ''
                      }`}
                    >
                      <p className="font-medium text-sm">{format.name}</p>
                      <p className="text-xs text-gray-600">{format.type}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Keine Formate für das ausgewählte Land gefunden.</p>
                )
              )}
            </div>
          </div>

          <div className="md:col-span-2 border rounded p-4">
            <h3 className="font-medium mb-3">Details</h3>
            {activeTab === 'requirements' && selectedRequirement ? (
              <div>
                <h4 className="text-lg font-semibold">{selectedRequirement.name}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Land: {selectedRequirement.country} • 
                  Anwendungsbereich: {selectedRequirement.applicableFor.join(', ')}
                  {selectedRequirement.mandatorySince && ` • Verpflichtend seit: ${selectedRequirement.mandatorySince}`}
                </p>
                <p className="mb-4">{selectedRequirement.description}</p>
                
                <div className="bg-blue-50 p-3 rounded">
                  <h5 className="font-medium mb-1">Wichtige Informationen für Unternehmen:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {selectedRequirement.id === 'de-b2g' && (
                      <>
                        <li>XRechnung oder Peppol BIS Billing sind die akzeptierten Formate</li>
                        <li>Übermittlung über Peppol-Netzwerk oder zentrale Rechnungseingangsplattform des Bundes (ZRE)</li>
                        <li>Gilt für Aufträge über dem EU-Schwellenwert (aktuell 139.000 €)</li>
                      </>
                    )}
                    {selectedRequirement.id === 'de-b2b' && (
                      <>
                        <li>Elektronische Rechnungen müssen die Echtheit der Herkunft, die Unversehrtheit des Inhalts und die Lesbarkeit gewährleisten</li>
                        <li>Dies kann durch innerbetriebliche Kontrollverfahren oder qualifizierte elektronische Signaturen erreicht werden</li>
                        <li>ZUGFeRD ist ein weit verbreitetes Format für B2B-Rechnungen in Deutschland</li>
                      </>
                    )}
                    {selectedRequirement.id === 'de-gob' && (
                      <>
                        <li>Elektronische Rechnungen müssen für 10 Jahre aufbewahrt werden</li>
                        <li>Das Format muss maschinenlesbar und durchsuchbar sein</li>
                        <li>Der gesamte Verarbeitungsprozess muss dokumentiert werden</li>
                      </>
                    )}
                    {selectedRequirement.id === 'eu-directive' && (
                      <>
                        <li>Die Richtlinie wurde in nationales Recht der EU-Mitgliedstaaten umgesetzt</li>
                        <li>Die europäische Norm EN16931 definiert das semantische Datenmodell</li>
                        <li>UBL 2.1 und UN/CEFACT CII sind die technischen Syntaxen</li>
                      </>
                    )}
                    {selectedRequirement.id === 'it-b2b' && (
                      <>
                        <li>Alle Rechnungen müssen über das SDI-System übermittelt werden</li>
                        <li>Eine digitale Signatur ist erforderlich</li>
                        <li>Spezifisches XML-Format (FatturaPA) muss verwendet werden</li>
                      </>
                    )}
                    {selectedRequirement.id === 'fr-b2b' && (
                      <>
                        <li>Schrittweise Einführung: Große Unternehmen ab 2023, mittlere ab 2024, kleine ab 2025</li>
                        <li>Factur-X ist ein empfohlenes Format</li>
                        <li>Übermittlung über die Chorus Pro Plattform oder andere zertifizierte Plattformen</li>
                      </>
                    )}
                    {selectedRequirement.id === 'es-b2b' && (
                      <>
                        <li>Betrifft Unternehmen mit Umsatz über 6 Millionen Euro oder im REDEME-Register</li>
                        <li>Rechnungsdaten müssen innerhalb von 4 Tagen übermittelt werden</li>
                        <li>Spezifisches XML-Format für die Übermittlung an die Steuerbehörde</li>
                      </>
                    )}
                    {selectedRequirement.id === 'ch-b2g' && (
                      <>
                        <li>Übermittlung über die Plattform www.e-rechnung.admin.ch</li>
                        <li>Unterstützte Formate: XRechnung, ZUGFeRD, Swissdec</li>
                        <li>Gilt für alle Lieferanten der Bundesverwaltung</li>
                      </>
                    )}
                    {selectedRequirement.id === 'at-b2g' && (
                      <>
                        <li>Übermittlung über das Unternehmensserviceportal (USP)</li>
                        <li>Spezifisches XML-Format (ebInterface)</li>
                        <li>Gilt für alle Lieferanten des Bundes</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ) : activeTab === 'formats' && selectedFormat ? (
              <div>
                <h4 className="text-lg font-semibold">{selectedFormat.name}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Typ: {selectedFormat.type} • 
                  Länder: {selectedFormat.countries.join(', ')} •
                  Basiert auf: {selectedFormat.basedOn}
                </p>
                <p className="mb-4">{selectedFormat.description}</p>
                
                <div className="mb-4">
                  <h5 className="font-medium mb-1">Hauptmerkmale:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {selectedFormat.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-3 rounded">
                  <h5 className="font-medium mb-1">Implementierungshinweise:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {selectedFormat.id === 'zugferd' && (
                      <>
                        <li>Wählen Sie das passende Profil (Basic, Comfort, Extended) je nach Anforderungen</li>
                        <li>Nutzen Sie Bibliotheken wie Mustangproject für die Erstellung</li>
                        <li>ZUGFeRD 2.1 ist vollständig konform mit der EU-Norm EN16931</li>
                        <li>Ideal für den schrittweisen Übergang zu strukturierten Rechnungen</li>
                      </>
                    )}
                    {selectedFormat.id === 'xrechnung' && (
                      <>
                        <li>Verpflichtend für B2G-Rechnungen in Deutschland</li>
                        <li>Validieren Sie Ihre XRechnungen mit dem offiziellen Validator</li>
                        <li>Übermittlung über Peppol oder zentrale Rechnungseingangsplattformen</li>
                        <li>Enthält alle steuerlich relevanten Informationen gemäß UStG</li>
                      </>
                    )}
                    {selectedFormat.id === 'facturx' && (
                      <>
                        <li>Technisch identisch mit ZUGFeRD 2.0</li>
                        <li>Für B2G-Rechnungen in Frankreich ist die Übermittlung über Chorus Pro erforderlich</li>
                        <li>Verschiedene Profile entsprechend den Geschäftsanforderungen</li>
                        <li>Weit verbreitet in Frankreich und zunehmend in anderen EU-Ländern</li>
                      </>
                    )}
                    {selectedFormat.id === 'fatturaPA' && (
                      <>
                        <li>Verpflichtend für alle Rechnungen in Italien</li>
                        <li>Übermittlung ausschließlich über das SDI-System</li>
                        <li>Digitale Signatur ist erforderlich</li>
                        <li>Spezifische Validierungsregeln müssen eingehalten werden</li>
                      </>
                    )}
                    {selectedFormat.id === 'peppol' && (
                      <>
                        <li>Zugang zum Peppol-Netzwerk über einen akkreditierten Access Point</li>
                        <li>Unterstützt grenzüberschreitenden Rechnungsaustausch</li>
                        <li>Basiert auf dem Vier-Ecken-Modell für sichere Übermittlung</li>
                        <li>Weit verbreitet in der EU, zunehmend auch global</li>
                      </>
                    )}
                    {selectedFormat.id === 'edifact' && (
                      <>
                        <li>Etablierter Standard für EDI-Kommunikation</li>
                        <li>Erfordert spezielle EDI-Konverter oder Middleware</li>
                        <li>Branchenspezifische Subsets (z.B. EANCOM, ODETTE)</li>
                        <li>Ideal für hohe Transaktionsvolumen und etablierte Geschäftsbeziehungen</li>
                      </>
                    )}
                    {selectedFormat.id === 'ubl' && (
                      <>
                        <li>Offener XML-Standard mit umfangreicher Dokumentation</li>
                        <li>Basis für viele nationale E-Invoicing-Standards</li>
                        <li>Unterstützt komplexe Geschäftsszenarien</li>
                        <li>Weit verbreitet in der EU, insbesondere in nordischen Ländern</li>
                      </>
                    )}
                    {selectedFormat.id === 'cii' && (
                      <>
                        <li>Basis für hybride Formate wie ZUGFeRD und Factur-X</li>
                        <li>Internationaler UN-Standard mit breiter Unterstützung</li>
                        <li>Semantische Interoperabilität mit anderen Standards</li>
                        <li>Zunehmende Verbreitung durch die EU-Norm EN16931</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">Bitte wählen Sie ein Element aus der Liste, um Details anzuzeigen.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">🎓 Lernhinweise (E-Invoicing Grundlagen):</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li><b>E-Invoicing</b> bezeichnet den Austausch von Rechnungsdaten in einem strukturierten elektronischen Format zwischen Lieferanten und Kunden.</li>
          <li>Die <b>Vorteile</b> von E-Invoicing umfassen:
            <ul className="list-disc list-inside ml-4">
              <li>Reduzierte Prozesskosten (bis zu 60-80% gegenüber Papierrechnungen)</li>
              <li>Schnellere Verarbeitung und kürzere Zahlungsfristen</li>
              <li>Geringere Fehlerquote durch automatisierte Validierung</li>
              <li>Umweltfreundlichkeit durch Papiereinsparung</li>
              <li>Verbesserte Compliance und Transparenz</li>
            </ul>
          </li>
          <li>Die <b>rechtlichen Anforderungen</b> variieren je nach Land, umfassen aber typischerweise:
            <ul className="list-disc list-inside ml-4">
              <li>Gewährleistung der Echtheit der Herkunft und Unversehrtheit des Inhalts</li>
              <li>Lesbarkeit der Rechnung während der gesamten Aufbewahrungsfrist</li>
              <li>Einhaltung nationaler Steuervorschriften</li>
              <li>In vielen Ländern: Verpflichtende E-Rechnungen für B2G-Geschäfte</li>
            </ul>
          </li>
          <li><b>Technologische Ansätze</b> für E-Invoicing:
            <ul className="list-disc list-inside ml-4">
              <li>Strukturierte Datenformate (XML, EDI)</li>
              <li>Hybridformate (PDF mit eingebetteten strukturierten Daten)</li>
              <li>Übermittlung über Netzwerke (Peppol), Plattformen oder direkten Austausch</li>
              <li>Integration in ERP-Systeme wie SAP</li>
            </ul>
          </li>
          <li>Der <b>globale Trend</b> geht zu verpflichtenden E-Rechnungen, insbesondere in Europa und Lateinamerika, um Steuerbetrug zu bekämpfen und die Digitalisierung voranzutreiben.</li>
        </ul>
      </div>
    </div>
  );
}
