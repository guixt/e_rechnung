import { useState } from 'react';

interface SimpleInvoice {
  invoiceNumber: string;
  invoiceDate: string;
  seller: string;
  buyer: string;
  amount: string;
}

export function EInvoiceAnalyzerSim() {
  const [invoice, setInvoice] = useState<SimpleInvoice>({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    seller: '',
    buyer: '',
    amount: ''
  });
  const [eInvoiceText, setEInvoiceText] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleFieldChange = (field: keyof SimpleInvoice, value: string) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const convertToEinvoice = () => {
    const errs: string[] = [];
    if (!invoice.invoiceNumber) errs.push('Rechnungsnummer fehlt');
    if (!invoice.invoiceDate) errs.push('Rechnungsdatum fehlt');
    if (!invoice.seller) errs.push('Lieferant fehlt');
    if (!invoice.buyer) errs.push('Kunde fehlt');
    if (!invoice.amount) errs.push('Betrag fehlt');

    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    const einvoiceObj = {
      Invoice: {
        ID: invoice.invoiceNumber,
        IssueDate: invoice.invoiceDate,
        Seller: invoice.seller,
        Buyer: invoice.buyer,
        Amount: parseFloat(invoice.amount)
      }
    };

    setEInvoiceText(JSON.stringify(einvoiceObj, null, 2));
    setErrors([]);
  };

  const loadFromEinvoice = () => {
    try {
      const obj = JSON.parse(eInvoiceText);
      const inv = obj.Invoice || obj;
      const mappingErrors: string[] = [];

      const newInvoice: SimpleInvoice = {
        invoiceNumber: inv.ID || '',
        invoiceDate: inv.IssueDate || '',
        seller: inv.Seller || '',
        buyer: inv.Buyer || '',
        amount: inv.Amount != null ? String(inv.Amount) : ''
      };

      if (!inv.ID) mappingErrors.push('ID fehlt im JSON');
      if (!inv.IssueDate) mappingErrors.push('IssueDate fehlt im JSON');
      if (!inv.Seller) mappingErrors.push('Seller fehlt im JSON');
      if (!inv.Buyer) mappingErrors.push('Buyer fehlt im JSON');
      if (inv.Amount == null) mappingErrors.push('Amount fehlt im JSON');

      setInvoice(newInvoice);
      setErrors(mappingErrors);
    } catch (e) {
      setErrors(['Ungültiges JSON']);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">E-Invoice Analyzer</h2>
      <p className="text-gray-700">Konvertiere einfache Rechnungsdaten in eine JSON-basierte E-Rechnung und prüfe eingelesene Dateien.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">Rechnungsdaten</h3>
          <div className="space-y-2">
            <input type="text" className="w-full p-2 border rounded" placeholder="Rechnungsnummer" value={invoice.invoiceNumber} onChange={e => handleFieldChange('invoiceNumber', e.target.value)} />
            <input type="date" className="w-full p-2 border rounded" placeholder="Datum" value={invoice.invoiceDate} onChange={e => handleFieldChange('invoiceDate', e.target.value)} />
            <input type="text" className="w-full p-2 border rounded" placeholder="Lieferant" value={invoice.seller} onChange={e => handleFieldChange('seller', e.target.value)} />
            <input type="text" className="w-full p-2 border rounded" placeholder="Kunde" value={invoice.buyer} onChange={e => handleFieldChange('buyer', e.target.value)} />
            <input type="number" className="w-full p-2 border rounded" placeholder="Betrag" value={invoice.amount} onChange={e => handleFieldChange('amount', e.target.value)} />
          </div>
          <button onClick={convertToEinvoice} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Zur E-Rechnung konvertieren</button>
        </div>
        <div>
          <h3 className="font-medium mb-2">E-Rechnung (JSON)</h3>
          <textarea className="w-full h-64 p-2 border rounded font-mono text-xs" value={eInvoiceText} onChange={e => setEInvoiceText(e.target.value)}></textarea>
          <button onClick={loadFromEinvoice} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">E-Rechnung laden</button>
        </div>
      </div>
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          <ul className="list-disc list-inside text-sm space-y-1">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
