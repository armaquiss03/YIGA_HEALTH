import { Clinic, HealthCard } from './types';

export const CLINICS: Clinic[] = [
  { name: "ARBEF Kigali Center", address: "KN 5 Ave, Nyarugenge, Kigali", dist: "1.2 km", tags: ["HIV Testing", "Family Planning", "Youth Clinic"], hours: "Open", time: "Mon–Fri 8am–5pm", type: ["hiv","fp","youth"] },
  { name: "King Faisal Hospital — Youth Wing", address: "KG 544 St, Kacyiru, Kigali", dist: "2.8 km", tags: ["HIV Testing", "Menstrual Health", "SRH Counseling"], hours: "Open", time: "Mon–Sat 8am–6pm", type: ["hiv","mhm"] },
  { name: "Ruhengeri District Hospital", address: "Musanze District, Northern Province", dist: "98 km", tags: ["Family Planning", "Youth Clinic", "HIV Testing"], hours: "Open", time: "Daily 7am–8pm", type: ["fp","youth","hiv"] },
  { name: "Marie Stopes Rwanda — Kigali", address: "KG 201 St, Gasabo, Kigali", dist: "3.5 km", tags: ["Family Planning", "Menstrual Health", "Counseling"], hours: "Open", time: "Mon–Sat 8am–5pm", type: ["fp","mhm"] },
  { name: "Butare University Hospital", address: "Huye District, Southern Province", dist: "135 km", tags: ["HIV Testing", "SRH Services", "Youth Clinic"], hours: "Open", time: "Daily 24hrs", type: ["hiv","youth"] },
  { name: "RBC Community Health Center", address: "KK 15 Ave, Kicukiro, Kigali", dist: "5.1 km", tags: ["HIV Testing", "Menstrual Health", "Family Planning"], hours: "Open", time: "Mon–Fri 7:30am–4pm", type: ["hiv","mhm","fp"] },
];

export const HEALTH_CARDS: HealthCard[] = [
  {
    id: "hiv",
    title: "HIV & Prevention",
    emoji: "🔴",
    desc: "Understanding HIV, PrEP, testing, and living positively",
    colorClass: "bg-gradient-to-br from-[#1a3d2b] to-[#3d6b4f]",
    content: `
      <p>HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system. In Rwanda, new HIV infections among youth 15–24 account for 24% of all new infections — but HIV is <strong>fully preventable</strong>.</p>
      <h4 class="font-bold mt-4">How HIV spreads</h4>
      <ul class="list-disc pl-5"><li>Unprotected sexual contact</li><li>Sharing needles or syringes</li><li>From mother to child (pregnancy, birth, breastfeeding)</li></ul>
      <h4 class="font-bold mt-4">Prevention</h4>
      <ul class="list-disc pl-5"><li><strong>Condoms</strong> — highly effective when used correctly</li><li><strong>PrEP</strong> (Pre-Exposure Prophylaxis) — a daily pill that prevents HIV. Available free at many Rwandan clinics</li><li><strong>Regular testing</strong> — know your status</li><li>Reduce number of sexual partners</li></ul>
      <h4 class="font-bold mt-4">Testing</h4>
      <p>HIV testing is free, confidential, and available at health centers across Rwanda. You can test anonymously. Results are ready same day with rapid tests.</p>
      <h4 class="font-bold mt-4">Living with HIV</h4>
      <p>With antiretroviral treatment (ART), people with HIV live long, healthy lives. Treatment is free in Rwanda through the national health program.</p>
    `
  },
  {
    id: "contraception",
    title: "Contraception",
    emoji: "💊",
    desc: "Options, how they work, and where to access them in Rwanda",
    colorClass: "bg-gradient-to-br from-[#8b3a20] to-[#c4724a]",
    content: `
      <p>Contraception helps prevent unintended pregnancies. In Rwanda, teen pregnancy affects 8% of girls 15–19. Knowing your options is empowering.</p>
      <h4 class="font-bold mt-4">Short-term methods</h4>
      <ul class="list-disc pl-5"><li><strong>Condoms</strong> — also protect against STIs and HIV. Free at many health centers</li><li><strong>Emergency contraception ("morning-after pill")</strong> — within 72 hours of unprotected sex</li><li><strong>Combined pill</strong> — taken daily. Requires prescription</li></ul>
      <h4 class="font-bold mt-4">Long-acting methods</h4>
      <ul class="list-disc pl-5"><li><strong>Injectable (Depo)</strong> — every 3 months injection</li><li><strong>Implant</strong> — small rod inserted in arm, lasts 3–5 years</li><li><strong>IUD</strong> — device placed in uterus, lasts up to 10 years</li></ul>
      <h4 class="font-bold mt-4">Access in Rwanda</h4>
      <p>ARBEF centers and youth-friendly clinics offer confidential contraception services to anyone 15+. You do NOT need parental consent. Services are often free or low-cost through the Community Health Insurance (Mutuelle).</p>
    `
  },
  {
    id: "menstrual",
    title: "Menstrual Health",
    emoji: "🩸",
    desc: "Understanding your cycle, hygiene products, and your rights",
    colorClass: "bg-gradient-to-br from-[#7a5c10] to-[#d4a030]",
    content: `
      <p>Menstruation is a normal, healthy part of life — yet many girls in Rwanda miss school due to limited access to hygiene products and facilities.</p>
      <h4 class="font-bold mt-4">Your cycle basics</h4>
      <ul class="list-disc pl-5"><li>Average cycle: 21–35 days</li><li>Period duration: 2–7 days</li><li>Irregular cycles are common, especially in first few years</li></ul>
      <h4 class="font-bold mt-4">Hygiene options</h4>
      <ul class="list-disc pl-5"><li>Disposable pads — available at pharmacies, health centers</li><li>Reusable cloth pads — eco-friendly, washable</li><li>Menstrual cups — long-lasting, available in Kigali</li></ul>
      <h4 class="font-bold mt-4">When to see a doctor</h4>
      <ul class="list-disc pl-5"><li>Very heavy bleeding (soaking a pad every hour)</li><li>Severe pain that doesn't respond to paracetamol</li><li>Periods stopping for 3+ months (if not pregnant)</li><li>Unusual discharge or strong odor</li></ul>
      <h4 class="font-bold mt-4">Your rights at school</h4>
      <p>You have the right to access menstrual hygiene facilities at school. If you face challenges, speak to your school nurse or a trusted teacher. Rwanda's national policy supports menstrual health in schools.</p>
    `
  },
  {
    id: "consent",
    title: "Consent & Relationships",
    emoji: "🤝",
    desc: "What healthy relationships look like and how to set boundaries",
    colorClass: "bg-gradient-to-br from-[#1a4040] to-[#3d8080]",
    content: `
      <p>Understanding consent is fundamental to healthy relationships and your personal safety.</p>
      <h4 class="font-bold mt-4">What is consent?</h4>
      <ul class="list-disc pl-5"><li>Consent is a clear, enthusiastic <strong>YES</strong> — not silence or absence of "no"</li><li>It must be <strong>freely given</strong> (no pressure, threats, or manipulation)</li><li>It can be <strong>withdrawn at any time</strong></li><li>You cannot consent if you are drunk, asleep, or under pressure</li></ul>
      <h4 class="font-bold mt-4">Signs of a healthy relationship</h4>
      <ul class="list-disc pl-5"><li>Mutual respect and trust</li><li>Open, honest communication</li><li>Both people feel safe and valued</li><li>Neither person controls, isolates, or threatens the other</li></ul>
      <h4 class="font-bold mt-4">Signs of an unhealthy relationship</h4>
      <ul class="list-disc pl-5"><li>Pressure or coercion for sex or intimacy</li><li>Jealousy, control, or monitoring your movements</li><li>Threats or physical violence</li><li>Isolation from friends and family</li></ul>
      <h4 class="font-bold mt-4">Getting help</h4>
      <p>If you are in an unsafe situation, contact the <strong>Rwanda National Police GBV hotline: 3512</strong>. You can also speak to a trusted adult, health worker, or community leader.</p>
    `
  },
  {
    id: "mental",
    title: "Mental Health",
    emoji: "🧠",
    desc: "Promoting awareness, building inclusive communities, and finding support",
    colorClass: "bg-gradient-to-br from-[#4a3d8b] to-[#7c66d1]",
    content: `
      <p>Your mental health is just as important as your physical health. Especially for young people, navigating life's challenges requires a healthy mind and a supportive community.</p>
      <h4 class="font-bold mt-4">Common Challenges</h4>
      <ul class="list-disc pl-5">
        <li><strong>Anxiety & Stress</strong> — Feeling overwhelmed by school, family, or the future.</li>
        <li><strong>Depression</strong> — Persistent sadness or loss of interest in things you once loved.</li>
        <li><strong>Stigma</strong> — Fear of being judged for seeking help.</li>
      </ul>
      <h4 class="font-bold mt-4">Self-Care Tips</h4>
      <ul class="list-disc pl-5">
        <li>Stay physically active and eat well.</li>
        <li>Talk to someone you trust (friend, parent, teacher).</li>
        <li>Connect with others to build a supportive network.</li>
      </ul>
      <h4 class="font-bold mt-4">Safe Spaces in Rwanda</h4>
      <p>Rwanda is investing in mental health services. You can visit community clinics or contact specialized organizations for support. Remember, you are not alone.</p>
    `
  }
];
