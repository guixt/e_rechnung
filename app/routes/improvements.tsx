import type { Route } from "./+types/improvements";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ausblick & Verbesserungen" },
    {
      name: "description",
      content: "Ideen für zukünftige Erweiterungen des E-Invoicing Navigators",
    },
  ];
}

export default function Improvements() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mögliche Erweiterungen</h1>
      <p className="mb-4">
        Diese Vorschläge richten sich besonders an neue Kolleginnen und Kollegen
        bei SEEBURGER. Sie sollen Anregungen geben, wie wir den Navigator weiter
        ausbauen können.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Interaktive Schritt-für-Schritt Tutorials für typische SAP-Prozesse.</li>
        <li>Ein Glossar wichtiger Begriffe rund um E-Invoicing und Integration.</li>
        <li>Fortschrittsanzeige und kleine Quests zum selbständigen Lernen.</li>
        <li>Sandbox für Testdaten und Experimente mit der SEEBURGER BIS Plattform.</li>
        <li>Video-Guides und Best-Practices aus realen Kundenprojekten.</li>
        <li>Checklisten für den Einstieg und weiterführende interne Ressourcen.</li>
      </ul>
    </div>
  );
}
