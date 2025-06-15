import { useParams } from "react-router";
import modules from "../data/modules";
import { InvoicingAccountingSim } from "../components/simulations/InvoicingAccountingSim";
// Neue Simulationskomponenten für E-Invoicing
import { SapOutboundInvoiceSim } from "../components/simulations/SapOutboundInvoiceSim";
import { EInvoicingBasicsSim } from "../components/simulations/EInvoicingBasicsSim";
import { B2BFormatsSim } from "../components/simulations/B2BFormatsSim";
import { SeeburgerBICSim } from "../components/simulations/SeeburgerBICSim";
import { MappingConceptsSim } from "../components/simulations/MappingConceptsSim";
import { IntegrationScenariosSim } from "../components/simulations/IntegrationScenariosSim";
import { ComplianceArchivingSim } from "../components/simulations/ComplianceArchivingSim";
import { EInvoiceImplementationMission } from "../components/missions/EInvoiceImplementationMission";
import { TroubleshootingInvoiceTransmissionSim } from "../components/simulations/TroubleshootingInvoiceTransmissionSim";
import { VidaPeppolInternationalSim } from "../components/simulations/VidaPeppolInternationalSim";
import { SapSDFIIntegrationSim } from "../components/simulations/SapSDFIIntegrationSim";
import { EdiBasicsSim } from "../components/simulations/EdiBasicsSim";
import { PresalesConsultingSim } from "../components/simulations/PresalesConsultingSim";
import { CustomizingSim } from "../components/simulations/CustomizingSim";

export default function ModuleDetail() {
  const { id } = useParams();
  const module = modules.find((m) => m.id === id);

  if (!module) {
    return <div className="p-4 text-red-500">Modul nicht gefunden.</div>;
  }

  const renderModuleContent = () => {
    if (module.type === 'mission') {
      switch (module.id) {
        case 'mission-e-invoice-implementation':
          return <EInvoiceImplementationMission />;
        // Add other missions here in the future
        default:
          return <div className="p-4 bg-yellow-50 rounded"><p><i>Diese Consulting Mission wird bald verfügbar sein! 🚧</i></p></div>;
      }
    } else if (module.type === 'simulation') {
      switch (module.id) {
        case 'sap-outbound-invoice':
          return <SapOutboundInvoiceSim />;
        case 'e-invoicing-basics':
          return <EInvoicingBasicsSim />;
        case 'b2b-formats':
          return <B2BFormatsSim />;
        case 'seeburger-bic':
          return <SeeburgerBICSim />;
        case 'mapping-concepts':
          return <MappingConceptsSim />;
        case 'integration-scenarios':
          return <IntegrationScenariosSim />;
        case 'invoicing-accounting':
          return <InvoicingAccountingSim />;
        case 'compliance-archiving':
          return <ComplianceArchivingSim />;
        case 'troubleshooting-invoice-transmission':
          return <TroubleshootingInvoiceTransmissionSim />;
        case 'vida-peppol-intl':
          return <VidaPeppolInternationalSim />;
        case 'sap-sd-fi-integration':
          return <SapSDFIIntegrationSim />;
        case 'sap-customizing-basics':
          return <CustomizingSim />;
        case 'edi-basics-protocols':
          return <EdiBasicsSim />;
        case 'presales-consulting-skills':
          return <PresalesConsultingSim />;
        default:
          return <div className="p-4 bg-yellow-50 rounded"><p><i>Die Simulation für dieses Modul wird bald verfügbar sein! 🚧</i></p></div>;
      }
    } else {
        return <div className="p-4 bg-yellow-50 rounded"><p><i>Unbekannter Modultyp! 🚧</i></p></div>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{module.title}</h1>
        <p className="text-gray-600">{module.description}</p>
      </div>
      {renderModuleContent()}
    </div>
  );
}
