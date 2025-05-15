import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "E-Invoicing Navigator" },
    { name: "description", content: "Interaktives Lernen für SAP E-Invoicing und Ausgangsrechnungen" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-emerald-50">
      <main className="flex-1 container mx-auto p-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">E-Invoicing Navigator</h1>
          <p className="mb-6 text-lg text-gray-700">
            Ihre Plattform für interaktives Lernen rund um SAP E-Invoicing, elektronische Ausgangsrechnungen und Integrationsprozesse.
          </p>

          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-start max-w-xl mx-auto border border-blue-100">
              <div className="flex items-center mb-2">
                <span className="inline-block text-blue-500 mr-2 text-2xl">📚</span>
                <h2 className="text-xl font-semibold text-blue-800">Was erwartet Sie?</h2>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base">
                <li><b>Praxisnahe Simulationen</b> zu SAP-Rechnungsprozessen & E-Invoicing</li>
                <li><b>Module</b> zu B2B-Formaten, Mapping, Compliance & Archivierung</li>
                <li><b>Consulting-Mission:</b> Erleben Sie ein E-Invoicing-Projekt als Berater</li>
                <li><b>Fehleranalyse & Troubleshooting</b> interaktiv üben</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-start max-w-xl mx-auto border border-blue-100">
              <div className="flex items-center mb-2">
                <span className="inline-block text-blue-500 mr-2 text-2xl">🎯</span>
                <h2 className="text-xl font-semibold text-blue-800">Für wen ist das?</h2>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base">
                <li><b>Berater:innen & IT-Professionals</b> im SAP-Umfeld</li>
                <li><b>Projektleiter:innen & Entscheider:innen</b> im Rechnungswesen</li>
                <li><b>Studierende & Quereinsteiger:innen</b> mit Interesse an Digitalisierung</li>
                <li><b>Alle</b>, die E-Invoicing in der Praxis verstehen wollen</li>
              </ul>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-2 text-emerald-800">Ihre Vorteile mit Simulationen</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <li className="bg-emerald-100 rounded-lg px-4 py-3 text-center text-base font-medium">Realitätsnahe Szenarien</li>
              <li className="bg-emerald-100 rounded-lg px-4 py-3 text-center text-base font-medium">Fehler machen & daraus lernen</li>
              <li className="bg-emerald-100 rounded-lg px-4 py-3 text-center text-base font-medium">Direktes Feedback & Tipps</li>
              <li className="bg-emerald-100 rounded-lg px-4 py-3 text-center text-base font-medium">Komplexe Prozesse einfach erklärt</li>
            </ul>
          </div>

          <Link
            to="/modules"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition-colors"
          >
            Zu den Lernmodulen
          </Link>
        </div>
      </main>
      <footer className="text-center text-xs text-gray-400 py-4 border-t bg-white/60 mt-8">
        &copy; {new Date().getFullYear()} E-Invoicing Navigator &ndash; Demo- und Lernplattform. Kontakt/Impressum auf Anfrage.
      </footer>
    </div>
  );
}
