'use client';

import Image from 'next/image';
import { Menu, Star, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const procedures = [
  'Botox',
  'Bioestimulador de colágeno (Radiesse)',
  'Ultraformer',
  'Laser Lavieen',
  'Microagulhamento',
  'Preenchimento facial e labial'
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <div className="relative flower-bg bg-gradient-to-b from-blush via-champagne to-[#fffdfd]">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
          <div>
            <p className="font-serif text-2xl font-semibold tracking-wide text-mauve">Belle Âme</p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-rose">estética facial</p>
          </div>
          <button className="rounded-2xl bg-rose p-3 text-white shadow-soft transition hover:bg-mauve" aria-label="Abrir menu">
            <Menu size={20} />
          </button>
        </header>

        <section className="relative z-10 mx-auto grid max-w-6xl gap-8 px-5 pb-14 pt-3 md:grid-cols-2 md:items-center md:px-8 md:pb-20 md:pt-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.8 }}>
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-rose">Clínica Premium</p>
            <h1 className="font-serif text-5xl leading-[0.95] text-[#7f5c59] md:text-7xl">Beleza refinada com naturalidade</h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-stone-600 md:text-base">
              Protocolos exclusivos para realçar seus traços com sofisticação, leveza e segurança clínica de alto padrão.
            </p>
            <button className="mt-7 rounded-full border border-rose/60 bg-white/70 px-7 py-3 text-sm tracking-[0.2em] text-mauve transition hover:-translate-y-0.5 hover:bg-rose hover:text-white">
              AGENDAR AVALIAÇÃO
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative mx-auto w-full max-w-sm">
            <div className="organic-shape relative aspect-[4/5] overflow-hidden border border-white/70 bg-nude shadow-soft">
              <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80" alt="Especialista em estética facial" fill className="object-cover" />
            </div>
          </motion.div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.28em] text-rose">sobre a especialista</p>
          <h2 className="mt-2 font-serif text-4xl text-[#7f5c59]">Cuidado técnico com sensibilidade estética</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed md:text-base">Atendimento personalizado para mulheres que buscam rejuvenescimento elegante, preservando autenticidade e harmonia facial em cada detalhe.</p>
        </motion.div>
      </section>

      <section className="bg-blush/45 py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.h3 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-8 font-serif text-4xl text-[#7f5c59]">Procedimentos premium</motion.h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {procedures.map((item, idx) => (
              <motion.article key={item} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: idx * 0.05 }} className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-soft backdrop-blur-sm">
                <Sparkles className="mb-3 text-rose" size={18} />
                <p className="text-sm font-medium text-stone-700">{item}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-7 px-5 py-16 md:grid-cols-2 md:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="rounded-[2rem] bg-white p-7 shadow-soft">
          <h3 className="font-serif text-3xl text-[#7f5c59]">Antes & Depois</h3>
          <p className="mt-3 text-sm">Resultados naturais com refinamento dos contornos faciais e viço saudável da pele.</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="rounded-[2rem] bg-nude/70 p-7 shadow-soft">
          <h3 className="font-serif text-3xl text-[#7f5c59]">Depoimentos</h3>
          <p className="mt-3 text-sm italic">"Atendimento impecável e resultado sofisticado. Me senti acolhida e ainda mais confiante."</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 md:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="rounded-[2.3rem] bg-gradient-to-r from-[#eddbd8] to-[#f7efee] p-9 text-center shadow-soft">
          <Star className="mx-auto mb-4 text-mauve" />
          <h3 className="font-serif text-4xl text-[#7f5c59]">Agende sua experiência premium</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm">Consulta especializada para desenhar o protocolo ideal de rejuvenescimento e harmonização facial.</p>
          <button className="mt-7 rounded-full bg-mauve px-8 py-3 text-xs tracking-[0.3em] text-white transition hover:bg-[#9f6f6a]">QUERO AGENDAR</button>
        </motion.div>
      </section>

      <footer className="border-t border-rose/20 px-5 py-8 text-center text-xs tracking-[0.2em] text-rose md:px-8">BELLE ÂME · ESTÉTICA FACIAL PREMIUM</footer>

      <a href="https://wa.me/5500000000000" className="fixed bottom-5 right-5 rounded-full bg-[#25D366] p-3 text-white shadow-lg transition hover:scale-105" aria-label="WhatsApp">
        <MessageCircle size={24} />
      </a>
    </main>
  );
}
