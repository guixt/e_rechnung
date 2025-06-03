import { Link } from "react-router";
import { useState } from "react";
import modules from "../data/modules";

export default function Modules() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModules = modules.filter((mod) =>
    mod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mod.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Trainingsmodule</h1>
        <p className="text-gray-600 mb-4">Wähle ein Thema, um dein IS-U-Wissen zu vertiefen:</p>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Module durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredModules.map((mod) => (
            <Link
              key={mod.id}
              to={`/modules/${mod.id}`}
              className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{mod.title}</h3>
              <p className="text-gray-600">{mod.description}</p>
            </Link>
          ))}
          {filteredModules.length === 0 && (
            <p className="col-span-2 text-gray-500">Keine Module gefunden.</p>
          )}
        </div>
      </div>
    </div>
  );
}
