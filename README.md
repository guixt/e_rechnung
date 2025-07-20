# E-Invoicing Navigator

Ein interaktives Lernprojekt rund um elektronische Rechnungen und SAP-Rechnungsprozesse. Die Anwendung bietet Simulationen, kurze Module und eine Beratungs-Mission, um typische Integrationsszenarien und Fehlerquellen spielerisch kennenzulernen.

## Funktionsumfang

- Trainingsmodule zu B2B-Formaten, Mapping und Compliance
- Simulationen mit direktem Feedback
- Consulting-Missionen zur E-Invoicing-Einführung
- Suche und Filtermöglichkeit über alle Module
- Implementiert mit React Router, TypeScript und Tailwind CSS
- E-Invoice Analyzer zum Umwandeln einfacher Rechnungen in XRechnung/ZUGFeRD und zurück

## Installation

Abhängigkeiten installieren:

```bash
npm install
```

## Entwicklung

Lokalen Entwicklungsserver starten:

```bash
npm run dev
```

Die App ist anschließend unter `http://localhost:5173` erreichbar.

## Produktion

Produktionsbuild erstellen:

```bash
npm run build
```

### Docker-Deployment

Optional kann die Anwendung in einem Docker-Container ausgeführt werden:

```bash
docker build -t e-invoicing-navigator .
docker run -p 3000:3000 e-invoicing-navigator
```

## Hintergrund

Dieses Repository dient als Demo- und Lernplattform. Es zeigt, wie man mit React Router eine moderne Webanwendung mit Server-Side Rendering und Hot Module Replacement erstellt.

## Ausblick

Weitere Ideen und Verbesserungsvorschläge findest du auf der neuen Seite [Verbesserungen](/improvements). Dort sind mögliche Erweiterungen speziell für Einsteigerinnen und Einsteiger bei SEEBURGER beschrieben.

---

Erstellt mit ❤️ mithilfe von React Router.
