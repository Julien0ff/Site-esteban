import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FileText, Download } from 'lucide-react';

const annalesList = [
  { year: '2024', name: 'Brevet des collèges – Session 2024', meta: 'Maths · Français · Histoire-Géo', isNew: true },
  { year: '2023', name: 'Brevet des collèges – Session 2023', meta: 'Maths · Français · Histoire-Géo' },
  { year: '2022', name: 'Brevet des collèges – Session 2022', meta: 'Maths · Français · Histoire-Géo' },
  { year: '2019', name: 'Brevet des collèges – Session 2019', meta: 'Maths · Français · Histoire-Géo' },
  { year: '2018', name: 'Brevet des collèges – Session 2018', meta: 'Maths · Français · Histoire-Géo' },
  { year: '2017', name: 'Brevet des collèges – Session 2017', meta: 'Maths · Français · Histoire-Géo' },
];

const Annales = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, scale: 0.9, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  const handleDownload = (year) => {
    // Dans une version finale, on mettrait le vrai lien PDF.
    // En attendant, on ouvre une recherche ou un lien vers un site éducatif.
    window.open(`https://eduscol.education.fr/recherche?keys=sujet+dnb+${year}`, '_blank');
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2 flex items-center gap-3">
          <FileText className="text-[#4facfe]" size={36} />
          Annales du Brevet
        </h1>
        <p className="text-[#8b92b2] text-lg">Sujets des années précédentes pour s'entraîner dans les conditions réelles</p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {annalesList.map((annale, idx) => (
          <div 
            key={idx}
            onClick={() => handleDownload(annale.year)}
            className="glass-card p-6 cursor-pointer hover:border-[#4facfe] group relative overflow-hidden"
          >
            {annale.isNew && (
              <div className="absolute top-4 right-4 bg-[rgba(108,99,255,0.2)] text-[#6c63ff] text-xs font-bold px-2 py-1 rounded-md border border-[rgba(108,99,255,0.3)]">
                Nouveau
              </div>
            )}
            
            <div className="text-5xl font-extrabold font-['Syne'] text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#6c63ff] mb-4">
              {annale.year}
            </div>
            
            <h3 className="text-lg font-bold mb-1 group-hover:text-[#4facfe] transition-colors">{annale.name}</h3>
            <p className="text-[#8b92b2] text-sm">{annale.meta}</p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#8b92b2] group-hover:text-[#4facfe] transition-colors">
              <Download size={16} /> Télécharger le PDF
            </div>

            {/* Hover Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#4facfe] rounded-full filter blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Annales;
