import React, { useState } from 'react';

interface SalesOrder {
  id: string;
  customer: string;
  orderDate: string;
  items: OrderItem[];
  status: 'Erfasst' | 'Freigegeben' | 'Fakturiert';
}

interface OrderItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface OutboundInvoice {
  id: string;
  salesOrderId: string;
  billingDate: string;
  status: 'Erstellt' | 'Gedruckt' | 'Versendet' | 'E-Rechnung übermittelt';
  format?: 'PDF' | 'ZUGFeRD' | 'XRechnung' | 'EDI';
}

export function SapOutboundInvoiceSim() {
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);
  const [invoices, setInvoices] = useState<OutboundInvoice[]>([]);
  const [activeTab, setActiveTab] = useState<'sd' | 'fi'>('sd');
  const [showBapi, setShowBapi] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const BAPI_EXAMPLES = {
    CREATE_SALES_ORDER: `
// BAPI_SALESORDER_CREATEFROMDAT2 (vereinfacht)
{
  ORDER_HEADER_IN: {
    DOC_TYPE: 'TA', // Auftragsart
    SALES_ORG: '1000', // Verkaufsorganisation
    DISTR_CHAN: '10', // Vertriebsweg
    DIVISION: '00', // Sparte
    PURCH_NO_C: 'Bestellung-123', // Bestellnummer
  },
  ORDER_PARTNERS: [
    { PARTN_ROLE: 'AG', PARTN_NUMB: '1000123' } // Auftraggeber
  ],
  ORDER_ITEMS_IN: [
    { 
      ITM_NUMBER: '10', // Positionsnummer
      MATERIAL: '100-100', // Materialnummer
      TARGET_QTY: '10', // Menge
      TARGET_QU: 'ST', // Mengeneinheit (Stück)
      PLANT: '1000' // Werk
    }
  ]
}
    `,
    CREATE_INVOICE: `
// BAPI_BILLINGDOC_CREATEMULTIPLE (vereinfacht)
{
  CREATEFROMDAT: [
    {
      REF_DOC: '0000012345', // Referenzbeleg (Verkaufsauftrag)
      REF_DOC_CA: 'C', // Kategorie des Referenzbelegs (C = Kundenauftrag)
      BILL_DATE: '20240515', // Fakturadatum
      BILLING_TYPE: 'F2', // Faktura-Art
    }
  ]
}
    `,
    OUTBOUND_DELIVERY: `
// BAPI_OUTBOUND_DELIVERY_CREATE (vereinfacht)
{
  SALES_ORDER_ITEMS: [
    {
      REF_DOC: '0000012345', // Verkaufsauftrag
      REF_ITEM: '000010', // Position
      DLV_QTY: '10' // Liefermenge
    }
  ],
  DELIVERY_HEADER: {
    SHIP_POINT: '1000' // Versandstelle
  }
}
    `
  };

  const handleCreateSalesOrder = () => {
    const newItems = [
      {
        id: `ITEM${Date.now()}-1`,
        description: 'Produkt A',
        quantity: Math.floor(Math.random() * 5) + 1,
        price: parseFloat((Math.random() * 100 + 50).toFixed(2))
      },
      {
        id: `ITEM${Date.now()}-2`,
        description: 'Produkt B',
        quantity: Math.floor(Math.random() * 3) + 1,
        price: parseFloat((Math.random() * 200 + 100).toFixed(2))
      }
    ];

    const newOrder: SalesOrder = {
      id: `SO${Date.now()}`,
      customer: 'Kunde 4711',
      orderDate: new Date().toISOString().split('T')[0],
      items: newItems,
      status: 'Erfasst'
    };

    setSalesOrders([...salesOrders, newOrder]);
    setErrorMessage(null);
  };

  const handleReleaseSalesOrder = (orderId: string) => {
    setSalesOrders(
      salesOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'Freigegeben' } 
          : order
      )
    );
  };

  const handleCreateInvoice = (orderId: string) => {
    const order = salesOrders.find(o => o.id === orderId);
    if (!order || order.status !== 'Freigegeben') return;

    const newInvoice: OutboundInvoice = {
      id: `INV${Date.now()}`,
      salesOrderId: orderId,
      billingDate: new Date().toISOString().split('T')[0],
      status: 'Erstellt'
    };

    setInvoices([...invoices, newInvoice]);
    setSalesOrders(
      salesOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'Fakturiert' } 
          : order
      )
    );
  };

  const handlePrintInvoice = (invoiceId: string) => {
    setInvoices(
      invoices.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: 'Gedruckt' } 
          : invoice
      )
    );
  };

  const handleSendInvoice = (invoiceId: string, format: 'PDF' | 'ZUGFeRD' | 'XRechnung' | 'EDI') => {
    setInvoices(
      invoices.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: 'Versendet', format } 
          : invoice
      )
    );
  };

  const handleTransmitEInvoice = (invoiceId: string) => {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice || invoice.status !== 'Versendet') return;

    setInvoices(
      invoices.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: 'E-Rechnung übermittelt' } 
          : invoice
      )
    );
  };

  const resetSimulation = () => {
    setSalesOrders([]);
    setInvoices([]);
    setErrorMessage(null);
    setShowBapi(null);
  };

  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2);
  };

  const renderSalesOrderCard = (order: SalesOrder) => (
    <div key={order.id} className="mb-4 p-3 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">Auftrag: {order.id}</h4>
        <span className={`px-2 py-1 text-xs rounded ${
          order.status === 'Fakturiert' 
            ? 'bg-green-100 text-green-800' 
            : order.status === 'Freigegeben' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
        }`}>
          {order.status}
        </span>
      </div>
      <p className="text-sm">Kunde: {order.customer}</p>
      <p className="text-sm">Datum: {order.orderDate}</p>
      
      <div className="mt-2 border-t pt-2">
        <p className="text-sm font-medium">Positionen:</p>
        {order.items.map(item => (
          <div key={item.id} className="text-xs flex justify-between mt-1">
            <span>{item.quantity}x {item.description}</span>
            <span>{(item.quantity * item.price).toFixed(2)} €</span>
          </div>
        ))}
        <div className="mt-2 pt-1 border-t flex justify-between font-medium">
          <span>Gesamt:</span>
          <span>{calculateTotal(order.items)} €</span>
        </div>
      </div>

      <div className="mt-3 flex space-x-2">
        {order.status === 'Erfasst' && (
          <button 
            onClick={() => handleReleaseSalesOrder(order.id)}
            className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
          >
            Freigeben
          </button>
        )}
        {order.status === 'Freigegeben' && (
          <button 
            onClick={() => handleCreateInvoice(order.id)}
            className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
          >
            Fakturieren
          </button>
        )}
      </div>
    </div>
  );

  const renderInvoiceCard = (invoice: OutboundInvoice) => {
    const order = salesOrders.find(o => o.id === invoice.salesOrderId);
    
    return (
      <div key={invoice.id} className="mb-4 p-3 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold">Rechnung: {invoice.id}</h4>
          <span className={`px-2 py-1 text-xs rounded ${
            invoice.status === 'E-Rechnung übermittelt' 
              ? 'bg-purple-100 text-purple-800' 
              : invoice.status === 'Versendet' 
                ? 'bg-green-100 text-green-800' 
                : invoice.status === 'Gedruckt'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
          }`}>
            {invoice.status}
          </span>
        </div>
        <p className="text-sm">Auftrag: {invoice.salesOrderId}</p>
        <p className="text-sm">Datum: {invoice.billingDate}</p>
        {invoice.format && <p className="text-sm">Format: {invoice.format}</p>}
        
        {order && (
          <div className="mt-2 border-t pt-2">
            <p className="text-sm">Kunde: {order.customer}</p>
            <p className="text-sm font-medium mt-1">Positionen:</p>
            {order.items.map(item => (
              <div key={item.id} className="text-xs flex justify-between mt-1">
                <span>{item.quantity}x {item.description}</span>
                <span>{(item.quantity * item.price).toFixed(2)} €</span>
              </div>
            ))}
            <div className="mt-2 pt-1 border-t flex justify-between font-medium">
              <span>Gesamt:</span>
              <span>{calculateTotal(order.items)} €</span>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {invoice.status === 'Erstellt' && (
            <button 
              onClick={() => handlePrintInvoice(invoice.id)}
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Drucken
            </button>
          )}
          {invoice.status === 'Gedruckt' && (
            <>
              <button 
                onClick={() => handleSendInvoice(invoice.id, 'PDF')}
                className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
              >
                PDF senden
              </button>
              <button 
                onClick={() => handleSendInvoice(invoice.id, 'ZUGFeRD')}
                className="px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600"
              >
                ZUGFeRD
              </button>
              <button 
                onClick={() => handleSendInvoice(invoice.id, 'XRechnung')}
                className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
              >
                XRechnung
              </button>
              <button 
                onClick={() => handleSendInvoice(invoice.id, 'EDI')}
                className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
              >
                EDI
              </button>
            </>
          )}
          {invoice.status === 'Versendet' && (
            <button 
              onClick={() => handleTransmitEInvoice(invoice.id)}
              className="px-2 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600"
            >
              An E-Invoicing-Plattform übermitteln
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">SAP Ausgangsrechnungen Simulation</h2>

      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => setActiveTab('sd')}
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'sd' ? 'bg-white border-t border-l border-r' : 'bg-gray-100'}`}
        >
          SD (Vertrieb)
        </button>
        <button 
          onClick={() => setActiveTab('fi')}
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'fi' ? 'bg-white border-t border-l border-r' : 'bg-gray-100'}`}
        >
          FI (Faktura)
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-semibold mb-2">
              {activeTab === 'sd' ? 'Verkaufsaufträge (SD)' : 'Ausgangsrechnungen (FI)'}
            </h3>
            <p className="text-sm text-gray-600">
              {activeTab === 'sd' 
                ? 'Erstellen und verwalten Sie Verkaufsaufträge im SD-Modul' 
                : 'Verwalten Sie Ausgangsrechnungen und E-Invoicing-Formate'}
            </p>
          </div>
          <div className="space-y-2">
            {activeTab === 'sd' && (
              <button 
                onClick={handleCreateSalesOrder}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm"
              >
                Neuen Verkaufsauftrag erstellen
              </button>
            )}
            <button 
              onClick={resetSimulation}
              className="w-full bg-gray-700 hover:bg-gray-800 text-white py-1 px-3 rounded text-xs"
            >
              Simulation zurücksetzen
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeTab === 'sd' 
            ? salesOrders.map(order => renderSalesOrderCard(order))
            : invoices.map(invoice => renderInvoiceCard(invoice))
          }
          {activeTab === 'sd' && salesOrders.length === 0 && (
            <p className="text-gray-500 italic">Keine Verkaufsaufträge vorhanden. Erstellen Sie einen neuen Auftrag.</p>
          )}
          {activeTab === 'fi' && invoices.length === 0 && (
            <p className="text-gray-500 italic">Keine Rechnungen vorhanden. Erstellen Sie zuerst einen Verkaufsauftrag und fakturieren Sie diesen.</p>
          )}
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <button 
          onClick={() => setShowBapi(showBapi === 'CREATE_SALES_ORDER' ? null : 'CREATE_SALES_ORDER')}
          className="px-3 py-1 bg-gray-200 text-gray-800 text-xs rounded hover:bg-gray-300"
        >
          BAPI Verkaufsauftrag
        </button>
        <button 
          onClick={() => setShowBapi(showBapi === 'CREATE_INVOICE' ? null : 'CREATE_INVOICE')}
          className="px-3 py-1 bg-gray-200 text-gray-800 text-xs rounded hover:bg-gray-300"
        >
          BAPI Faktura
        </button>
        <button 
          onClick={() => setShowBapi(showBapi === 'OUTBOUND_DELIVERY' ? null : 'OUTBOUND_DELIVERY')}
          className="px-3 py-1 bg-gray-200 text-gray-800 text-xs rounded hover:bg-gray-300"
        >
          BAPI Lieferung
        </button>
      </div>

      {showBapi && BAPI_EXAMPLES[showBapi as keyof typeof BAPI_EXAMPLES] && (
        <div className="mb-6 p-3 bg-gray-800 text-white rounded shadow">
          <h4 className="font-semibold mb-1">Beispiel BAPI Struktur ({showBapi})</h4>
          <pre className="text-xs whitespace-pre-wrap overflow-x-auto">{BAPI_EXAMPLES[showBapi as keyof typeof BAPI_EXAMPLES]}</pre>
        </div>
      )}

      <div className="mt-8 p-4 bg-emerald-50 rounded">
        <h4 className="font-bold">🎓 Lernhinweise (SAP Ausgangsrechnungen):</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Der <b>Verkaufsauftrag</b> (Sales Order, Transaktion <code>VA01</code>) ist der Ausgangspunkt für den Vertriebsprozess in SAP SD.</li>
          <li>Nach Freigabe des Auftrags erfolgt typischerweise die <b>Lieferung</b> (Transaktion <code>VL01N</code>), bevor die Fakturierung stattfindet.</li>
          <li>Die <b>Fakturierung</b> (Billing, Transaktion <code>VF01</code>) erzeugt die Ausgangsrechnung basierend auf dem Verkaufsauftrag und/oder der Lieferung.</li>
          <li>Für <b>E-Invoicing</b> können verschiedene Formate verwendet werden:
            <ul className="list-disc list-inside ml-4">
              <li><b>ZUGFeRD</b>: Hybridformat mit PDF und eingebetteter XML-Datei, in Deutschland verbreitet</li>
              <li><b>XRechnung</b>: XML-basiertes Format für B2G (Business-to-Government) in Deutschland</li>
              <li><b>EDI</b>: Electronic Data Interchange, häufig im B2B-Bereich verwendet (EDIFACT, ANSI X12)</li>
              <li>Internationale Formate: Factur-X (Frankreich), Peppol BIS (EU), FatturaPA (Italien)</li>
            </ul>
          </li>
          <li>Die <b>Integration</b> mit E-Invoicing-Plattformen wie SEEBURGER BIC erfolgt über Schnittstellen, die die SAP-Daten in die entsprechenden Formate transformieren.</li>
          <li><b>Wichtige BAPIs</b> für Ausgangsrechnungen:
            <ul className="list-disc list-inside ml-4">
              <li><code>BAPI_SALESORDER_CREATEFROMDAT2</code>: Zum Erstellen von Verkaufsaufträgen</li>
              <li><code>BAPI_OUTBOUND_DELIVERY_CREATE</code>: Zum Erstellen von Lieferungen</li>
              <li><code>BAPI_BILLINGDOC_CREATEMULTIPLE</code>: Zum Erstellen von Fakturabelegen</li>
            </ul>
          </li>
          <li>Im <b>Customizing</b> (SPRO) werden u.a. Belegarten, Nummernkreise, Steuerfindung und Ausgabesteuerung für E-Invoicing konfiguriert.</li>
        </ul>
      </div>
    </div>
  );
}
