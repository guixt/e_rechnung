import { Link } from "react-router";
import { useState } from "react";
import modules from "../data/modules";
import categories from "../data/categories";

export default function Modules() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModules = modules.filter((mod) =>
    mod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mod.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const modulesByCategory = categories.map((cat) => ({
    ...cat,
    modules: filteredModules.filter((m) => m.category === cat.id),
  }));

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

        {/* Inhaltsübersicht */}
        <ul className="mb-8 flex flex-wrap gap-4 text-sm">
          {categories.map((cat) => (
            <li key={cat.id}>
              <a href={`#${cat.id}`} className="text-blue-600 hover:underline">
                {cat.title}
              </a>
            </li>
          ))}
        </ul>

        {modulesByCategory.map((cat) => (
          <section key={cat.id} id={cat.id} className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">{cat.title}</h2>
            <p className="text-gray-600 mb-4">{cat.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.modules.map((mod) => (
                <Link
                  key={mod.id}
                  to={`/modules/${mod.id}`}
                  className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{mod.title}</h3>
                  <p className="text-gray-600">{mod.description}</p>
                </Link>
              ))}
              {cat.modules.length === 0 && (
                <p className="col-span-2 text-gray-500">Keine Module in dieser Kategorie.</p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
