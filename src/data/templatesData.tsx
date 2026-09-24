import React from 'react';

export interface SharedTemplateItem {
  slug: string;
  name: string;
  tag: string;
  type: '1-page' | '2-page';
  atsPercent: number;
  designDescription: string;
  preview: React.ReactNode;
}

// 1. EXECUTIVE ELITE (Centered Serif layout)
const ExecutiveElitePreview: React.FC = () => (
  <div className="p-[3.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-y-auto" style={{ fontFamily: 'Georgia, serif' }}>
    <div>
      {/* Centered Header */}
      <div className="border-b-[0.5cqw] border-stone-800 pb-[1.5cqw] mb-[2cqw] text-center">
        <div className="font-bold text-stone-900" style={{ fontSize: '7.5cqw', letterSpacing: '0.04em', lineHeight: '1.1' }}>ARTHUR PENDRAGON</div>
        <div className="text-stone-600 font-medium tracking-widest uppercase mt-[0.5cqw]" style={{ fontSize: '3.2cqw' }}>CHIEF OPERATING OFFICER</div>
        <div className="text-stone-500 mt-[0.5cqw]" style={{ fontSize: '2.1cqw' }}>London, UK • arthur@pendragon.co • +44 20 7946 0958</div>
      </div>

      {/* Summary / About Me */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-stone-900 uppercase border-b border-stone-300 pb-[0.3cqw] mb-[0.8cqw]" style={{ fontSize: '3.2cqw', letterSpacing: '0.05em' }}>Executive Summary</div>
        <div className="text-stone-600 leading-relaxed text-justify" style={{ fontSize: '2.1cqw' }}>
          Distinguished and results-driven Chief Operating Officer with 15+ years of success leading multi-national operations, corporate restructuring, and sovereign governance portfolios. Proven track record in scaling global capacity, managing $120M+ capital budgets, and leading highly profitable mergers and acquisitions. Recognized for transforming supply chain models, driving business digital migrations, and establishing strategic partnerships with leading venture capital organizations.
        </div>
      </div>

      {/* Experience - Multi-role Timeline */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-stone-900 uppercase border-b border-stone-300 pb-[0.3cqw] mb-[0.8cqw]" style={{ fontSize: '3.2cqw', letterSpacing: '0.05em' }}>Professional Experience</div>
        
        {/* Company 1 (Camelot Holdings) with Multi-role Timeline */}
        <div className="mb-[1cqw] border-l-2 border-stone-700 pl-[1.5cqw]">
          <div className="font-bold text-stone-900" style={{ fontSize: '2.4cqw' }}>Camelot Holdings</div>
          <div className="italic text-stone-500 mb-[0.5cqw]" style={{ fontSize: '2cqw' }}>Strategic Group Operations & Enterprise Governance</div>
          
          {/* Role 1 */}
          <div className="mb-[0.6cqw]">
            <div className="flex justify-between font-bold text-stone-800" style={{ fontSize: '2.2cqw' }}>
              <span>• Chief Operating Officer</span>
              <span className="font-normal text-stone-500">2018 – Present</span>
            </div>
            <div className="text-stone-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
              - Governed $120M annual operational budgets, yielding 14% margin optimization.<br/>
              - Orchestrated complex corporate merger logistics with Round Table Ventures.
            </div>
          </div>
          
          {/* Role 2 */}
          <div>
            <div className="flex justify-between font-bold text-stone-800" style={{ fontSize: '2.2cqw' }}>
              <span>• VP of Strategic Initiatives</span>
              <span className="font-normal text-stone-500">2015 – 2018</span>
            </div>
            <div className="text-stone-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
              - Restructured European warehousing operations, trimming distribution latency by 22%.<br/>
              - Supervised cross-border implementation teams of over 85 senior specialists.
            </div>
          </div>
        </div>

        {/* Company 2 */}
        <div className="mb-[0.8cqw] border-l-2 border-stone-300 pl-[1.5cqw]">
          <div className="flex justify-between font-bold text-stone-900" style={{ fontSize: '2.4cqw' }}>
            <span>VP of Global Operations — Pendragon Group</span>
            <span className="font-normal text-stone-500">2012 – 2015</span>
          </div>
          <div className="text-stone-600 mt-[0.3cqw]" style={{ fontSize: '2.1cqw', lineHeight: '1.3' }}>
            • Scaled manufacturing capacity across 14 European sites by 40% with zero downtime.<br/>
            • Led supply-chain digital migration saving $4.2M in annual overheads.
          </div>
        </div>
      </div>

      {/* Education - Multiple Qualifications */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-stone-900 uppercase border-b border-stone-300 pb-[0.3cqw] mb-[0.5cqw]" style={{ fontSize: '3.2cqw', letterSpacing: '0.05em' }}>Education & Credentials</div>
        <div className="space-y-[0.5cqw]">
          <div className="flex justify-between font-bold text-stone-800" style={{ fontSize: '2.2cqw' }}>
            <span>MBA, Global Management — London Business School</span>
            <span className="font-normal text-stone-500">2012</span>
          </div>
          <div className="flex justify-between font-bold text-stone-800" style={{ fontSize: '2.2cqw' }}>
            <span>B.S. in Economics & Operations Research — University of Oxford</span>
            <span className="font-normal text-stone-500">2009</span>
          </div>
        </div>
      </div>
    </div>

    {/* Languages, References & Competencies Grid */}
    <div className="space-y-[1.5cqw]">
      <div className="grid grid-cols-2 gap-[2cqw]">
        {/* Languages */}
        <div>
          <div className="font-bold text-stone-900 uppercase border-b border-stone-300 pb-[0.3cqw] mb-[0.5cqw]" style={{ fontSize: '2.8cqw', letterSpacing: '0.05em' }}>Languages</div>
          <div className="text-stone-600" style={{ fontSize: '2.1cqw' }}>
            • English (Native) • French (Fluent) • German (Conversational)
          </div>
        </div>
        {/* References */}
        <div>
          <div className="font-bold text-stone-900 uppercase border-b border-stone-300 pb-[0.3cqw] mb-[0.5cqw]" style={{ fontSize: '2.8cqw', letterSpacing: '0.05em' }}>Professional References</div>
          <div className="text-stone-600 space-y-[0.2cqw]" style={{ fontSize: '2.0cqw' }}>
            <div><strong>Sir Galahad</strong>, Chairman — Camelot Holdings (galahad@camelot.co)</div>
            <div><strong>Guinevere Pendragon</strong>, MD — Round Table Ventures (guinevere@rtv.com)</div>
          </div>
        </div>
      </div>

      {/* Competencies */}
      <div>
        <div className="font-bold text-stone-900 uppercase border-b border-stone-300 pb-[0.3cqw] mb-[0.5cqw]" style={{ fontSize: '2.8cqw', letterSpacing: '0.05em' }}>Core Competencies</div>
        <div className="text-stone-600 font-medium" style={{ fontSize: '2.1cqw' }}>
          Operational Scaling • Mergers & Acquisitions • Capital Restructuring • Board Governance • Global Logistics
        </div>
      </div>
    </div>
  </div>
);

// 2. CORPORATE PRO (Modern Sans-serif with accent bars)
const CorporateProPreview: React.FC = () => (
  <div className="p-[3.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-y-auto" style={{ fontFamily: 'system-ui, sans-serif' }}>
    <div>
      {/* Header */}
      <div className="border-l-[1.2cqw] border-indigo-600 pl-[2cqw] mb-[2.5cqw]">
        <div className="font-black text-slate-900" style={{ fontSize: '8cqw', lineHeight: '1' }}>SARAH JENKINS</div>
        <div className="text-indigo-600 font-bold tracking-wide uppercase mt-[0.3cqw]" style={{ fontSize: '3.5cqw' }}>SENIOR PROJECT MANAGER</div>
        <div className="text-slate-500 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>Chicago, IL • s.jenkins@email.com • (312) 555-0143</div>
      </div>

      {/* Summary / About Me */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-indigo-900 uppercase tracking-wider mb-[0.6cqw]" style={{ fontSize: '3.2cqw' }}>Professional Profile</div>
        <div className="text-slate-600 leading-relaxed text-justify" style={{ fontSize: '2.1cqw' }}>
          Certified Project Management Professional (PMP) with over 8 years of experience spearheading Agile scrum teams, streamlining cross-functional project lifecycles, and delivering complex corporate SaaS portals. Proven expert in resource planning, risk mitigation, and continuous delivery pipelines, with a career focus on scaling software development operations and optimizing inter-departmental communications.
        </div>
      </div>

      {/* Experience with timeline dots & multi-role timeline */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-indigo-900 uppercase tracking-wider mb-[1cqw]" style={{ fontSize: '3.2cqw' }}>Professional Experience</div>
        <div className="border-l border-slate-200 pl-[2cqw] space-y-[1.5cqw]">
          
          {/* Company 1 (Apex Corp) Multi-role */}
          <div className="relative">
            <div className="absolute -left-[2.5cqw] top-[0.6cqw] w-[1cqw] h-[1cqw] rounded-full bg-indigo-600"></div>
            <div className="font-bold text-slate-800" style={{ fontSize: '2.4cqw' }}>Apex Corp</div>
            
            {/* Role 1 */}
            <div className="mt-[0.3cqw] mb-[0.6cqw]">
              <div className="flex justify-between font-bold text-slate-700" style={{ fontSize: '2.2cqw' }}>
                <span>• Senior Project Lead</span>
                <span className="font-normal text-slate-500">2020 – Present</span>
              </div>
              <div className="text-slate-600 mt-[0.2cqw]" style={{ fontSize: '2.1cqw' }}>
                - Managed 18 cross-functional agile teams to deploy high-throughput corporate SaaS portals.<br/>
                - Cut operational development blockers by 30% using customized Kanban boards.
              </div>
            </div>
            
            {/* Role 2 */}
            <div>
              <div className="flex justify-between font-bold text-slate-700" style={{ fontSize: '2.2cqw' }}>
                <span>• Project Manager</span>
                <span className="font-normal text-slate-500">2018 – 2020</span>
              </div>
              <div className="text-slate-600 mt-[0.2cqw]" style={{ fontSize: '2.1cqw' }}>
                - Directed the rollout of automated billing interfaces across 4 regional branches.<br/>
                - Supervised resource scheduling, aligning daily deliverables with executive milestones.
              </div>
            </div>
          </div>

          {/* Company 2 */}
          <div className="relative">
            <div className="absolute -left-[2.5cqw] top-[0.6cqw] w-[1cqw] h-[1cqw] rounded-full bg-indigo-400"></div>
            <div className="flex justify-between font-bold text-slate-800" style={{ fontSize: '2.4cqw' }}>
              <span>Project Coordinator — BlueStone Tech</span>
              <span className="font-normal text-slate-500">2015 – 2018</span>
            </div>
            <div className="text-slate-600 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
              • Facilitated sprint planning, retrospectives, and daily standups for 4 teams.<br/>
              • Maintained high-quality project documentation and key stakeholder communications.
            </div>
          </div>
        </div>
      </div>

      {/* Education - Multiple Qualifications */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-indigo-900 uppercase tracking-wider mb-[0.6cqw]" style={{ fontSize: '3.2cqw' }}>Education</div>
        <div className="space-y-[0.5cqw]">
          <div className="flex justify-between text-slate-700" style={{ fontSize: '2.1cqw' }}>
            <span><strong>M.S. in Project Management</strong> — Northwestern University</span>
            <span>2017</span>
          </div>
          <div className="flex justify-between text-slate-700" style={{ fontSize: '2.1cqw' }}>
            <span><strong>B.S. in Information Systems</strong> — DePaul University</span>
            <span>2015</span>
          </div>
        </div>
      </div>
    </div>

    {/* Languages, References & Skill pills */}
    <div className="space-y-[1.5cqw] mt-[1.5cqw]">
      <div className="grid grid-cols-2 gap-[2cqw]">
        <div>
          <div className="font-bold text-indigo-900 uppercase tracking-wider mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>Languages</div>
          <div className="text-slate-600" style={{ fontSize: '2.1cqw' }}>
            • English (Native) • Spanish (Fluent)
          </div>
        </div>
        <div>
          <div className="font-bold text-indigo-900 uppercase tracking-wider mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>References</div>
          <div className="text-slate-600 space-y-[0.1cqw]" style={{ fontSize: '2.0cqw' }}>
            <div><strong>Robert Carter</strong>, VP Operations — Apex Corp (r.carter@apex.com)</div>
            <div><strong>David Chen</strong>, IT Director — BlueStone Tech (d.chen@bluestone.com)</div>
          </div>
        </div>
      </div>

      <div>
        <div className="font-bold text-indigo-900 uppercase tracking-wider mb-[0.6cqw]" style={{ fontSize: '3.2cqw' }}>Skills & Frameworks</div>
        <div className="flex flex-wrap gap-[0.8cqw]">
          {['Agile/Scrum', 'PMP Certified', 'Resource Allocation', 'Risk Mitigation', 'Jira'].map(s => (
            <span key={s} className="px-[1.5cqw] py-[0.4cqw] bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full font-semibold" style={{ fontSize: '1.8cqw' }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 3. FINANCE AUTHORITY (Emerald elegant timeline layout)
const FinanceAuthorityPreview: React.FC = () => (
  <div className="p-[3.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-y-auto" style={{ fontFamily: 'system-ui, sans-serif' }}>
    <div>
      {/* Emerald accent top line */}
      <div className="h-[1.5cqw] bg-emerald-600 mb-[2cqw]"></div>
      
      {/* Header */}
      <div className="flex justify-between items-baseline mb-[2.5cqw] border-b border-slate-100 pb-[1.5cqw]">
        <div>
          <div className="font-extrabold text-slate-900" style={{ fontSize: '7.5cqw', lineHeight: '1' }}>DAVID MILLER, CFA</div>
          <div className="text-emerald-700 font-bold tracking-wide uppercase mt-[0.3cqw]" style={{ fontSize: '3.2cqw' }}>PORTFOLIO MANAGER</div>
        </div>
        <div className="text-right text-slate-500" style={{ fontSize: '2cqw' }}>
          NYC • d.miller@cfa.net • (212) 555-0199
        </div>
      </div>

      {/* Summary / About Me */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-emerald-800 uppercase tracking-wider mb-[0.6cqw]" style={{ fontSize: '3.2cqw' }}>Executive Profile</div>
        <div className="text-slate-600 leading-relaxed text-justify" style={{ fontSize: '2.1cqw' }}>
          Accomplished Chartered Financial Analyst (CFA) with over 10 years of experience in asset management, quantitative portfolio hedging, and equity valuation modeling. Expert in overseeing large-scale liquid portfolios ($450M+), structuring risk mitigations against macroeconomic shifts, and delivering superior risk-adjusted returns. Strong background in corporate finance, sovereign risk analysis, and high-level client relations.
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-emerald-800 uppercase tracking-wider mb-[0.8cqw]" style={{ fontSize: '3.2cqw' }}>Investment Tenure</div>
        <div className="space-y-[1.2cqw]">
          
          {/* Company 1 (Oakwood Capital) Multi-role */}
          <div className="border-l-2 border-emerald-500 pl-[1.5cqw]">
            <div className="font-bold text-slate-800" style={{ fontSize: '2.4cqw' }}>Oakwood Capital</div>
            
            {/* Role 1 */}
            <div className="mt-[0.3cqw] mb-[0.6cqw]">
              <div className="flex justify-between font-bold text-slate-700" style={{ fontSize: '2.2cqw' }}>
                <span>• VP, Asset Allocation</span>
                <span className="font-mono text-emerald-600 font-medium">2019 – Present</span>
              </div>
              <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Managed $450M liquid equity portfolio, generating 18.4% annualized return.<br/>
                - Designed quantitative hedging strategies to shelter sovereign risk.
              </div>
            </div>

            {/* Role 2 */}
            <div>
              <div className="flex justify-between font-bold text-slate-700" style={{ fontSize: '2.2cqw' }}>
                <span>• Portfolio Analyst</span>
                <span className="font-mono text-emerald-600 font-medium">2016 – 2019</span>
              </div>
              <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Developed algorithmic valuation matrices to track tech sector growth trends.<br/>
                - Reallocated strategic capital assets to boost baseline yields by 115 bps.
              </div>
            </div>
          </div>

          {/* Company 2 */}
          <div className="border-l-2 border-emerald-300 pl-[1.5cqw]">
            <div className="flex justify-between font-bold text-slate-800" style={{ fontSize: '2.4cqw' }}>
              <span>Senior Investment Analyst — Apex Funds</span>
              <span className="font-mono text-emerald-600 font-medium">2014 – 2016</span>
            </div>
            <div className="text-slate-600 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
              • Conducted risk-modeling on $1.2B global equity products.<br/>
              • Built proprietary equity valuation templates used across all internal divisions.
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-emerald-800 uppercase tracking-wider mb-[0.6cqw]" style={{ fontSize: '3.2cqw' }}>Education</div>
        <div className="space-y-[0.5cqw]">
          <div className="flex justify-between text-slate-700" style={{ fontSize: '2.1cqw' }}>
            <span><strong>M.S. in Quantitative Finance</strong> — NYU Stern School of Business</span>
            <span>2014</span>
          </div>
          <div className="flex justify-between text-slate-700" style={{ fontSize: '2.1cqw' }}>
            <span><strong>B.A. in Economics</strong> — Columbia University</span>
            <span>2012</span>
          </div>
        </div>
      </div>
    </div>

    {/* Languages, References & Matrix */}
    <div className="space-y-[1.5cqw] mt-[1.5cqw]">
      <div className="grid grid-cols-2 gap-[2cqw]">
        <div>
          <div className="font-bold text-emerald-800 uppercase tracking-wider mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>Languages</div>
          <div className="text-slate-600" style={{ fontSize: '2.1cqw' }}>
            • English (Native) • Mandarin (Professional)
          </div>
        </div>
        <div>
          <div className="font-bold text-emerald-800 uppercase tracking-wider mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>References</div>
          <div className="text-slate-600 space-y-[0.1cqw]" style={{ fontSize: '2.0cqw' }}>
            <div><strong>Arthur Pendelton</strong>, MD — Oakwood Capital (a.pendelton@oakwood.com)</div>
            <div><strong>Sophia Martinez</strong>, Partner — Apex Funds (s.martinez@apexfunds.com)</div>
          </div>
        </div>
      </div>

      <div>
        <div className="font-bold text-emerald-800 uppercase tracking-wider mb-[0.6cqw]" style={{ fontSize: '3.2cqw' }}>Competency Matrix</div>
        <div className="grid grid-cols-2 gap-[1cqw] text-slate-600 font-medium" style={{ fontSize: '2.1cqw' }}>
          <div>• Valuation & Modeling</div>
          <div>• Portfolio Hedging</div>
          <div>• GAAP/IFRS Standards</div>
          <div>• M&A Strategic Advisory</div>
        </div>
      </div>
    </div>
  </div>
);

// 4. HEALTHCARE PROFESSIONAL (Teal-accented certification focused)
const HealthcareProfessionalPreview: React.FC = () => (
  <div className="p-[3.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-y-auto" style={{ fontFamily: 'system-ui, sans-serif' }}>
    <div>
      {/* Header */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-[2cqw] mb-[2cqw] text-center">
        <div className="font-extrabold text-teal-950" style={{ fontSize: '7cqw', lineHeight: '1.1' }}>DR. EVELYN CARTER, MD</div>
        <div className="text-teal-700 font-bold tracking-wider uppercase mt-[0.3cqw]" style={{ fontSize: '3.2cqw' }}>CHIEF OF CLINICAL CARDIOLOGY</div>
        <div className="text-teal-600 mt-[0.3cqw]" style={{ fontSize: '2cqw' }}>Boston, MA • e.carter@hospital.org • (617) 555-0120</div>
      </div>

      {/* Summary / About Me */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-teal-900 uppercase tracking-wide border-b border-teal-200 pb-[0.3cqw] mb-[0.6cqw]" style={{ fontSize: '3cqw' }}>Professional Statement</div>
        <div className="text-slate-600 leading-relaxed text-justify" style={{ fontSize: '2.1cqw' }}>
          Compassionate and highly certified Attending Cardiologist with 12+ years of medical practice, specializing in non-invasive diagnostic workflows, pediatric cardiology, and inpatient intensive care governance. Excellent history managing 44-bed clinical units, leading emergency response medical cohorts, and presenting award-winning research at major international medical congresses.
        </div>
      </div>

      {/* Licenses */}
      <div className="mb-[2cqw] bg-teal-50/40 p-[1.5cqw] rounded-lg border border-teal-100">
        <div className="font-bold text-teal-900 uppercase" style={{ fontSize: '2.8cqw' }}>State Licenses & Board Certifications</div>
        <div className="text-teal-800 font-medium mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
          • Medical License: MA #892014 • American Board of Internal Medicine (ABIM)
        </div>
      </div>

      {/* Experience - Multi-role Timeline */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-teal-900 uppercase tracking-wide border-b border-teal-200 pb-[0.3cqw] mb-[0.8cqw]" style={{ fontSize: '3cqw' }}>Clinical Experience</div>
        <div className="space-y-[1cqw] mb-[0.8cqw]">
          
          {/* Company 1 (General Hospital) Multi-role */}
          <div className="border-l-2 border-teal-500 pl-[1.5cqw]">
            <div className="font-bold text-slate-800" style={{ fontSize: '2.4cqw' }}>General Hospital</div>
            
            {/* Role 1 */}
            <div className="mt-[0.3cqw] mb-[0.6cqw]">
              <div className="flex justify-between font-bold text-teal-800" style={{ fontSize: '2.2cqw' }}>
                <span>• Chief of Clinical Cardiology</span>
                <span className="text-teal-700 font-semibold">2018 – Present</span>
              </div>
              <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Oversee non-invasive diagnostic laboratory operations and outpatient cardiac wellness clinics.<br/>
                - Restructured inpatient cardiac diagnostic cycles, lowering average discharge latency by 18%.
              </div>
            </div>

            {/* Role 2 */}
            <div>
              <div className="flex justify-between font-bold text-teal-800" style={{ fontSize: '2.2cqw' }}>
                <span>• Attending Cardiologist</span>
                <span className="text-teal-700 font-semibold">2016 – 2018</span>
              </div>
              <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Governed 44-bed inpatient cardiac ward, optimizing diagnostic rounds by 25%.<br/>
                - Supervised 12 cardiology fellows and clinical residents.
              </div>
            </div>
          </div>

          {/* Company 2 */}
          <div className="border-l-2 border-teal-300 pl-[1.5cqw]">
            <div className="flex justify-between font-bold text-slate-800" style={{ fontSize: '2.4cqw' }}>
              <span>Cardiology Resident — Boston Medical Center</span>
              <span className="text-teal-700 font-semibold">2012 – 2016</span>
            </div>
            <div className="text-slate-600 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
              • Performed over 300 cardiac catheterizations and inpatient evaluations.<br/>
              • Conducted clinical research on microvascular cardiac dysfunctions.
            </div>
          </div>
        </div>
      </div>

      {/* Education - Multiple Qualifications */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-teal-900 uppercase tracking-wide border-b border-teal-200 pb-[0.3cqw] mb-[0.5cqw]" style={{ fontSize: '3cqw' }}>Education</div>
        <div className="space-y-[0.5cqw]">
          <div className="flex justify-between text-slate-700" style={{ fontSize: '2.1cqw' }}>
            <span><strong>Doctor of Medicine (M.D.)</strong> — Harvard Medical School</span>
            <span>2012</span>
          </div>
          <div className="flex justify-between text-slate-700" style={{ fontSize: '2.1cqw' }}>
            <span><strong>B.S. in Biology (Summa Cum Laude)</strong> — Yale University</span>
            <span>2008</span>
          </div>
        </div>
      </div>
    </div>

    {/* Languages, References & Footer Grid */}
    <div className="space-y-[1.5cqw] mt-[1.5cqw]">
      <div className="grid grid-cols-2 gap-[2cqw]">
        <div>
          <div className="font-bold text-teal-900 uppercase tracking-wide mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>Languages</div>
          <div className="text-slate-600" style={{ fontSize: '2.1cqw' }}>
            • English (Native) • Spanish (Conversational)
          </div>
        </div>
        <div>
          <div className="font-bold text-teal-900 uppercase tracking-wide mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>References</div>
          <div className="text-slate-600 space-y-[0.1cqw]" style={{ fontSize: '2.0cqw' }}>
            <div><strong>Dr. Gregory House</strong>, Chief of Medicine — General Hospital (g.house@hospital.org)</div>
            <div><strong>Dr. Lisa Cuddy</strong>, Dean — Boston Medical Center (l.cuddy@bmc.org)</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-slate-400 font-mono text-center uppercase tracking-widest pt-[1cqw] border-t border-teal-100" style={{ fontSize: '1.6cqw' }}>
        TRUST • CARE • CLINICAL INTEGRITY
      </div>
    </div>
  </div>
);

// 5. LEGAL PROFESSIONAL (Traditional legal serif layout)
const LegalProfessionalPreview: React.FC = () => (
  <div className="p-[3.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-y-auto" style={{ fontFamily: 'Times New Roman, serif' }}>
    <div>
      {/* Traditional Legal Header */}
      <div className="border-b border-stone-400 pb-[1.5cqw] mb-[2cqw] text-center">
        <div className="font-normal text-stone-900" style={{ fontSize: '7.5cqw', letterSpacing: '0.04em' }}>REGINALD VANCE, ESQ.</div>
        <div className="text-stone-700 font-normal tracking-widest uppercase mt-[0.3cqw]" style={{ fontSize: '3cqw' }}>PARTNER, APPELLATE LITIGATION</div>
        <div className="text-stone-500 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>Washington, DC • r.vance@vancelaw.com • (202) 555-0188</div>
      </div>

      {/* Summary / About Me */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-stone-900 uppercase border-b border-stone-300 pb-[0.3cqw] mb-[0.6cqw]" style={{ fontSize: '3.2cqw' }}>Professional Statement</div>
        <div className="text-stone-700 leading-relaxed text-justify" style={{ fontSize: '2.1cqw' }}>
          Distinguished appellate litigation partner with 14+ years of expertise representing Fortune 100 defendants before state and federal appellate courts. Expert in drafting winning certiorari petitions, governing high-stakes oral arguments, and orchestrating regulatory compliance defences in high-profile administrative challenges. Admissions include Supreme Court of the United States and District of Columbia Bar.
        </div>
      </div>

      {/* Admissions */}
      <div className="mb-[2cqw] border border-stone-200 p-[1.5cqw]">
        <div className="font-bold text-stone-900 text-center uppercase" style={{ fontSize: '2.8cqw' }}>Admissions & Courts</div>
        <div className="text-stone-700 text-center mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
          District of Columbia Bar, 2012 • Supreme Court of the United States, 2018
        </div>
      </div>

      {/* Experience - Multi-role Timeline */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-stone-900 uppercase border-b border-stone-300 pb-[0.3cqw] mb-[0.8cqw]" style={{ fontSize: '3.2cqw' }}>Professional Experience</div>
        <div className="space-y-[1cqw]">
          
          {/* Company 1 (Vance & Partners LLC) Multi-role */}
          <div className="border-l-2 border-stone-400 pl-[1.5cqw]">
            <div className="font-bold text-stone-900" style={{ fontSize: '2.4cqw' }}>Vance & Partners LLC</div>
            
            {/* Role 1 */}
            <div className="mt-[0.3cqw] mb-[0.6cqw]">
              <div className="flex justify-between font-bold text-stone-800" style={{ fontSize: '2.2cqw' }}>
                <span>• Partner, Appellate Litigation</span>
                <span className="font-normal text-stone-500">2018 – Present</span>
              </div>
              <div className="text-stone-700 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Govern oral arguments and appellate briefs for major commercial defendants.<br/>
                - Direct a team of 8 senior litigation associates on federal appeal pipelines.
              </div>
            </div>

            {/* Role 2 */}
            <div>
              <div className="flex justify-between font-bold text-stone-800" style={{ fontSize: '2.2cqw' }}>
                <span>• Senior Litigator</span>
                <span className="font-normal text-stone-500">2015 – 2018</span>
              </div>
              <div className="text-stone-700 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Drafted 14 winning petitions for writ of certiorari to SCOTUS.<br/>
                - Authored crucial summary judgments in high-value antitrust lawsuits.
              </div>
            </div>
          </div>

          {/* Company 2 */}
          <div className="border-l-2 border-stone-200 pl-[1.5cqw]">
            <div className="flex justify-between font-bold text-stone-900" style={{ fontSize: '2.4cqw' }}>
              <span>Associate Attorney — Gibson Appellate LLP</span>
              <span className="font-normal text-stone-500">2012 – 2015</span>
            </div>
            <div className="text-stone-700 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
              • Authored 45+ appellate briefs in federal circuit courts.<br/>
              • Conducted exhaustive legal research on complex regulatory challenges.
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Education - Multiple Qualifications */}
    <div className="mb-[2cqw]">
      <div className="font-bold text-stone-900 uppercase border-b border-stone-300 pb-[0.3cqw] mb-[0.5cqw]" style={{ fontSize: '3.2cqw' }}>Education</div>
      <div className="space-y-[0.5cqw]">
        <div className="flex justify-between text-stone-800" style={{ fontSize: '2.2cqw' }}>
          <span><strong>Harvard Law School</strong> — Juris Doctor (J.D.)</span>
          <span>2012</span>
        </div>
        <div className="flex justify-between text-stone-800" style={{ fontSize: '2.2cqw' }}>
          <span><strong>Princeton University</strong> — B.A. in Political Science (Magna Cum Laude)</span>
          <span>2009</span>
        </div>
      </div>
    </div>

    {/* Languages & References */}
    <div className="space-y-[1.5cqw] mt-[1.5cqw] border-t border-stone-300 pt-[1.5cqw]">
      <div className="grid grid-cols-2 gap-[2cqw]">
        <div>
          <div className="font-bold text-stone-900 uppercase mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>Languages</div>
          <div className="text-stone-700" style={{ fontSize: '2.1cqw' }}>
            • English (Native) • Latin (Scholarly)
          </div>
        </div>
        <div>
          <div className="font-bold text-stone-900 uppercase mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>References</div>
          <div className="text-stone-700 space-y-[0.1cqw]" style={{ fontSize: '2.0cqw' }}>
            <div><strong>Hon. James Vance</strong>, Senior Partner — Vance & Partners (j.vance@vancelaw.com)</div>
            <div><strong>Prof. Elizabeth Warren</strong>, Harvard Law — (ewarren@law.harvard.edu)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 6. EDUCATION LEADER (Warm, qualifications grid layout)
const EducationLeaderPreview: React.FC = () => (
  <div className="p-[3.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-y-auto" style={{ fontFamily: 'system-ui, sans-serif' }}>
    <div>
      {/* Header */}
      <div className="border-b-[0.5cqw] border-amber-500 pb-[1.5cqw] mb-[2cqw]">
        <div className="font-bold text-slate-800" style={{ fontSize: '8cqw', lineHeight: '1.1' }}>HELENA ROSTAND</div>
        <div className="text-amber-600 font-bold uppercase mt-[0.3cqw]" style={{ fontSize: '3.5cqw' }}>HIGH SCHOOL PRINCIPAL</div>
        <div className="text-slate-500 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>Seattle, WA • h.rostand@academy.edu • (206) 555-0161</div>
      </div>

      {/* Summary / About Me */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-amber-700 uppercase mb-[0.6cqw]" style={{ fontSize: '3cqw' }}>Professional Statement</div>
        <div className="text-slate-600 leading-relaxed text-justify" style={{ fontSize: '2.1cqw' }}>
          Visionary educational administrator with over 12 years of experience leading secondary schools, spearheading modern digital curriculum frameworks, and fostering inclusive, student-focused learning environments. Dedicated leader proven in governing $8M+ operational school budgets, recruiting top-tier certified instructional faculty, and boosting graduation readiness indicators by 24%.
        </div>
      </div>

      {/* Qualifications */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-amber-700 uppercase mb-[0.8cqw]" style={{ fontSize: '3cqw' }}>Educational Leadership</div>
        <div className="bg-amber-50/50 p-[1.5cqw] rounded-xl border border-amber-100/60 text-slate-700" style={{ fontSize: '2.1cqw', lineHeight: '1.4' }}>
          • 12 years directing comprehensive secondary school curriculum standards.<br/>
          • Engineered innovative digital learning programs adopted by 18 public districts.
        </div>
      </div>

      {/* Experience - Multi-role Timeline */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-amber-700 uppercase mb-[0.8cqw]" style={{ fontSize: '3cqw' }}>Teaching & Leadership History</div>
        <div className="space-y-[1cqw]">
          
          {/* Company 1 (Lakeside Academy) Multi-role */}
          <div className="border-l-2 border-amber-500 pl-[1.5cqw]">
            <div className="font-bold text-slate-800" style={{ fontSize: '2.4cqw' }}>Lakeside Academy</div>
            
            {/* Role 1 */}
            <div className="mt-[0.3cqw] mb-[0.6cqw]">
              <div className="flex justify-between font-bold text-slate-700" style={{ fontSize: '2.2cqw' }}>
                <span>• Principal</span>
                <span className="text-amber-600 font-semibold">2018 – Present</span>
              </div>
              <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Govern $8M campus budget and lead 64 certified instructional faculty.<br/>
                - Deployed responsive mental health counseling programs to support 1,200+ students.
              </div>
            </div>

            {/* Role 2 */}
            <div>
              <div className="flex justify-between font-bold text-slate-700" style={{ fontSize: '2.2cqw' }}>
                <span>• Vice Principal</span>
                <span className="text-amber-600 font-semibold">2015 – 2018</span>
              </div>
              <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Oversaw student leadership associations, athletics calendars, and disciplinary procedures.<br/>
                - Coordinated weekly teacher training protocols focusing on multi-cultural literacy.
              </div>
            </div>
          </div>

          {/* Company 2 */}
          <div className="border-l-2 border-amber-300 pl-[1.5cqw]">
            <div className="flex justify-between font-bold text-slate-800" style={{ fontSize: '2.4cqw' }}>
              <span>Assistant Principal — Roosevelt High</span>
              <span className="text-amber-600 font-semibold">2013 – 2015</span>
            </div>
            <div className="text-slate-600 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
              • Administered student activities, counseling workflows, and community engagement.
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Education - Multiple Qualifications */}
    <div className="mb-[2cqw]">
      <div className="font-bold text-amber-700 uppercase mb-[0.5cqw]" style={{ fontSize: '3cqw' }}>Education</div>
      <div className="space-y-[0.5cqw] text-slate-700" style={{ fontSize: '2.1cqw' }}>
        <div className="flex justify-between">
          <span><strong>M.Ed. Academic Administration</strong> — University of Washington</span>
          <span>2013</span>
        </div>
        <div className="flex justify-between">
          <span><strong>B.A. in English Literature (Honors)</strong> — Seattle University</span>
          <span>2009</span>
        </div>
      </div>
    </div>

    {/* Languages & References Grid */}
    <div className="space-y-[1.5cqw] mt-[1.5cqw] border-t border-amber-200 pt-[1.5cqw]">
      <div className="grid grid-cols-2 gap-[2cqw]">
        <div>
          <div className="font-bold text-amber-700 uppercase mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>Languages</div>
          <div className="text-slate-600" style={{ fontSize: '2.1cqw' }}>
            • English (Native) • French (Fluent)
          </div>
        </div>
        <div>
          <div className="font-bold text-amber-700 uppercase mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>References</div>
          <div className="text-slate-600 space-y-[0.1cqw]" style={{ fontSize: '2.0cqw' }}>
            <div><strong>Dr. Marcus Vance</strong>, Superintendent — Seattle Schools (m.vance@seattleschools.org)</div>
            <div><strong>Clara Oswald</strong>, Director — Lakeside Academy (c.oswald@lakeside.edu)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 7. GOVERNMENT PROFESSIONAL (Formal civil service matrix)
const GovernmentProfessionalPreview: React.FC = () => (
  <div className="p-[3.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-y-auto" style={{ fontFamily: 'system-ui, sans-serif' }}>
    <div>
      {/* Formal Header */}
      <div className="border-b-[0.8cqw] border-stone-800 pb-[1.5cqw] mb-[2cqw]">
        <div className="font-extrabold text-stone-900 tracking-tight" style={{ fontSize: '7.5cqw' }}>CONNOR FITZGERALD</div>
        <div className="text-stone-600 font-bold tracking-widest uppercase mt-[0.3cqw]" style={{ fontSize: '3.2cqw' }}>PUBLIC POLICY ANALYST</div>
        <div className="text-stone-500 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>Arlington, VA • fitzgerald@gov.org • (703) 555-0177</div>
      </div>

      {/* Summary / About Me */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-stone-900 uppercase tracking-wider mb-[0.6cqw]" style={{ fontSize: '3.2cqw' }}>Executive Statement</div>
        <div className="text-stone-700 leading-relaxed text-justify" style={{ fontSize: '2.1cqw' }}>
          Distinguished civil service professional with over 10 years of public administration and strategic urban policy design experience. Expert in monitoring federal transit grant compliance ($45M+), drafting inter-agency municipal safety frameworks, and presenting key data dashboards to federal legislative committees.
        </div>
      </div>

      {/* Experience */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-stone-900 uppercase tracking-wider mb-[0.8cqw]" style={{ fontSize: '3.2cqw' }}>Civil Service tenure</div>
        <div className="space-y-[1.2cqw]">
          
          {/* Company 1 (Department of Transportation) Multi-role */}
          <div className="border-l-[0.6cqw] border-stone-800 pl-[1.5cqw]">
            <div className="font-bold text-stone-900" style={{ fontSize: '2.4cqw' }}>Department of Transportation</div>
            
            {/* Role 1 */}
            <div className="mt-[0.3cqw] mb-[0.6cqw]">
              <div className="flex justify-between font-bold text-stone-700" style={{ fontSize: '2.2cqw' }}>
                <span>• Senior Analyst, Urban Transit</span>
                <span className="font-mono text-stone-500 font-normal">2018 – Present</span>
              </div>
              <div className="text-stone-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Governed federal compliance reporting for $45M infrastructure grants.<br/>
                - Coauthored comprehensive guidelines on municipal railway transit.
              </div>
            </div>

            {/* Role 2 */}
            <div>
              <div className="flex justify-between font-bold text-stone-700" style={{ fontSize: '2.2cqw' }}>
                <span>• Transportation Planner</span>
                <span className="font-mono text-stone-500 font-normal">2016 – 2018</span>
              </div>
              <div className="text-stone-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Developed GIS routing models, boosting suburban commuter throughput by 14%.<br/>
                - Coordinated town hall public review cycles with municipal directors.
              </div>
            </div>
          </div>

          {/* Company 2 */}
          <div className="border-l-[0.6cqw] border-stone-400 pl-[1.5cqw]">
            <div className="flex justify-between font-bold text-stone-900" style={{ fontSize: '2.4cqw' }}>
              <span>Policy Research Fellow — Brookings Institution</span>
              <span className="font-mono text-stone-500">2013 – 2016</span>
            </div>
            <div className="text-stone-600 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
              • Conducted statistical analysis of urban transportation trends.<br/>
              • Published 3 peer-reviewed reports on public sector investments.
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-stone-900 uppercase tracking-wider mb-[0.5cqw]" style={{ fontSize: '3cqw' }}>Education</div>
        <div className="space-y-[0.5cqw] text-slate-700" style={{ fontSize: '2.1cqw' }}>
          <div className="flex justify-between">
            <span><strong>Master of Public Policy (M.P.P.)</strong> — Georgetown University</span>
            <span>2013</span>
          </div>
          <div className="flex justify-between">
            <span><strong>B.A. in Public Administration (Cum Laude)</strong> — George Mason University</span>
            <span>2011</span>
          </div>
        </div>
      </div>
    </div>

    {/* Languages & References Grid block */}
    <div className="space-y-[1cqw] mt-[1cqw]">
      <div className="bg-stone-50 p-[1.5cqw] rounded-lg border border-stone-200">
        <div className="font-bold text-stone-900 uppercase mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>Language Proficiencies</div>
        <div className="text-stone-700 font-medium flex justify-between mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
          <span>• English (Native)</span>
          <span>• Spanish (Professional Working)</span>
          <span>• French (Conversational)</span>
        </div>
      </div>

      <div className="bg-stone-50 p-[1.5cqw] rounded-lg border border-stone-200">
        <div className="font-bold text-stone-900 uppercase mb-[0.4cqw]" style={{ fontSize: '2.8cqw' }}>References</div>
        <div className="text-stone-700 font-medium flex justify-between mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
          <span><strong>David Axelrod</strong>, Policy Director, DOT (d.axelrod@dot.gov)</span>
          <span><strong>Dr. Alice Paul</strong>, Senior Fellow, Brookings (a.paul@brookings.edu)</span>
        </div>
      </div>
    </div>
  </div>
);

// 8. MODERN TECH (Asymmetric split pane with dark sidebar)
const ModernTechPreview: React.FC = () => (
  <div className="bg-slate-900 h-full flex text-left overflow-hidden" style={{ fontFamily: 'system-ui, sans-serif' }}>
    {/* Left Sidebar - Dark */}
    <div className="w-[35%] bg-slate-950 p-[2cqw] flex flex-col justify-between border-r border-slate-800 text-slate-300">
      <div>
        {/* Photo silhouette placeholder */}
        <div className="w-[12cqw] h-[12cqw] rounded-full bg-slate-800 border-2 border-cyan-500 mx-auto flex items-center justify-center mb-[2cqw]">
          <span className="text-cyan-400 font-mono" style={{ fontSize: '4cqw' }}>&lt;/&gt;</span>
        </div>

        {/* Contact details */}
        <div className="mb-[2cqw]">
          <div className="text-slate-400 font-bold uppercase tracking-wider mb-[0.5cqw]" style={{ fontSize: '2.4cqw' }}>Contact</div>
          <div className="space-y-[0.3cqw]" style={{ fontSize: '1.8cqw', lineHeight: '1.3' }}>
            <div>📧 ryan@tech.io</div>
            <div>📱 (415) 555-0155</div>
            <div>🌐 github.com/ryan</div>
          </div>
        </div>

        {/* Tech skills with level bars */}
        <div>
          <div className="text-slate-400 font-bold uppercase tracking-wider mb-[0.6cqw]" style={{ fontSize: '2.4cqw' }}>Tech Skills</div>
          <div className="space-y-[0.6cqw]">
            {[
              { name: 'TypeScript', pct: '95%' },
              { name: 'React/Next.js', pct: '90%' },
              { name: 'Node.js/Go', pct: '85%' }
            ].map(sk => (
              <div key={sk.name}>
                <div className="text-slate-200" style={{ fontSize: '1.8cqw' }}>{sk.name}</div>
                <div className="w-full h-[0.6cqw] bg-slate-800 rounded">
                  <div className="h-full bg-cyan-500 rounded" style={{ width: sk.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-slate-500 font-mono text-[1.4cqw] uppercase">
        // SYSTEM.OK
      </div>
    </div>

    {/* Right Main Pane - White */}
    <div className="flex-1 bg-white p-[3cqw] flex flex-col justify-between text-slate-800 overflow-y-auto">
      <div>
        <div className="mb-[2cqw]">
          <div className="font-extrabold text-slate-950" style={{ fontSize: '6.5cqw', lineHeight: '1' }}>RYAN COOPER</div>
          <div className="text-cyan-600 font-bold uppercase mt-[0.3cqw]" style={{ fontSize: '3.2cqw' }}>SENIOR DEVOPS ENGINEER</div>
        </div>

        {/* Profile / About Me */}
        <div className="mb-[2cqw]">
          <div className="font-bold text-slate-900 uppercase border-b border-slate-200 pb-[0.3cqw] mb-[0.6cqw]" style={{ fontSize: '2.8cqw' }}>About Me</div>
          <div className="text-slate-600 leading-relaxed text-justify" style={{ fontSize: '2.1cqw' }}>
            Highly analytical Senior DevOps Engineer with 7+ years of experience specializing in AWS infrastructure provisioning, Kubernetes orchestration, and self-healing CI/CD automation pipelines. Passionate about minimizing latency, standardizing infrastructure as code, and coordinating high-availability architectures that handle millions of daily request loads.
          </div>
        </div>

        {/* Experience - Multi-role Timeline */}
        <div className="mb-[2cqw]">
          <div className="font-bold text-slate-900 uppercase border-b border-slate-200 pb-[0.3cqw] mb-[0.8cqw]" style={{ fontSize: '2.8cqw' }}>Work Experience</div>
          <div className="space-y-[1cqw]">
            
            {/* Company 1 (Techcorp) Multi-role */}
            <div className="border-l-2 border-cyan-500 pl-[1.5cqw]">
              <div className="font-bold text-slate-900" style={{ fontSize: '2.4cqw' }}>Techcorp</div>
              
              {/* Role 1 */}
              <div className="mt-[0.3cqw] mb-[0.6cqw]">
                <div className="flex justify-between font-bold text-slate-800" style={{ fontSize: '2.2cqw' }}>
                  <span>• DevOps Lead</span>
                  <span className="font-mono text-slate-400 font-normal">2020 – Present</span>
                </div>
                <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                  - Led AWS Kubernetes migration, reducing microservice response latency by 45%.<br/>
                  - Built automated multi-environment deployment blueprints.
                </div>
              </div>

              {/* Role 2 */}
              <div>
                <div className="flex justify-between font-bold text-slate-800" style={{ fontSize: '2.2cqw' }}>
                  <span>• Senior Infrastructure Engineer</span>
                  <span className="font-mono text-slate-400 font-normal">2018 – 2020</span>
                </div>
                <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                  - Trimmed operational dev pipeline cycle wait times by 3.5 hrs via intelligent caching rules.<br/>
                  - Spearheaded multi-region database migration.
                </div>
              </div>
            </div>

            {/* Company 2 */}
            <div className="border-l-2 border-slate-300 pl-[1.5cqw]">
              <div className="flex justify-between font-bold text-slate-900" style={{ fontSize: '2.4cqw' }}>
                <span>Site Reliability Engineer — CloudBase</span>
                <span className="font-mono text-slate-400 font-normal">2017 – 2018</span>
              </div>
              <div className="text-slate-600 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
                • Maintained 99.99% uptime for core high-frequency billing services.<br/>
                • Managed infrastructure configuration via modular Terraform modules.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="mb-[1.5cqw]">
        <div className="font-bold text-slate-900 uppercase border-b border-slate-200 pb-[0.3cqw] mb-[0.5cqw]" style={{ fontSize: '2.8cqw' }}>Featured Projects</div>
        <div className="text-slate-700 font-medium" style={{ fontSize: '2cqw' }}>
          <strong>Kubernetes Blueprint:</strong> Open-source provisioning scripts downloaded 12k times.
        </div>
      </div>

      {/* Education - Multiple Qualifications */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-slate-900 uppercase border-b border-slate-200 pb-[0.3cqw] mb-[0.5cqw]" style={{ fontSize: '2.8cqw' }}>Education</div>
        <div className="space-y-[0.5cqw] text-slate-700" style={{ fontSize: '2.1cqw' }}>
          <div className="flex justify-between">
            <span><strong>B.S. in Computer Engineering</strong> — UT Austin</span>
            <span>2017</span>
          </div>
          <div className="flex justify-between">
            <span><strong>Graduate Certificate, Cloud Architecture</strong> — Stanford University</span>
            <span>2019</span>
          </div>
        </div>
      </div>

      {/* Languages & References */}
      <div className="border-t border-slate-200 pt-[1.5cqw]">
        <div className="grid grid-cols-2 gap-[2cqw]">
          <div>
            <div className="font-bold text-slate-900 uppercase mb-[0.4cqw]" style={{ fontSize: '2.6cqw' }}>Languages</div>
            <div className="text-slate-600" style={{ fontSize: '2.1cqw' }}>
              • English (Native) • Japanese (Conversational)
            </div>
          </div>
          <div>
            <div className="font-bold text-slate-900 uppercase mb-[0.4cqw]" style={{ fontSize: '2.6cqw' }}>References</div>
            <div className="text-slate-600 space-y-[0.1cqw]" style={{ fontSize: '2.0cqw' }}>
              <div><strong>Linus Torvalds</strong>, VP — Techcorp (l.torvalds@techcorp.com)</div>
              <div><strong>Ada Lovelace</strong>, SRE Director — CloudBase (a.lovelace@cloudbase.io)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 9. CREATIVE EDGE (Vibrant gradient sidebar with award showcase)
const CreativeEdgePreview: React.FC = () => (
  <div className="bg-slate-50 h-full flex text-left overflow-hidden" style={{ fontFamily: 'system-ui, sans-serif' }}>
    {/* Left Gradient Sidebar */}
    <div className="w-[35%] bg-gradient-to-b from-purple-900 via-violet-850 to-indigo-950 p-[2cqw] flex flex-col justify-between text-white border-r border-violet-850">
      <div>
        {/* Photo avatar outline */}
        <div className="w-[12cqw] h-[12cqw] rounded-full bg-white/10 border-2 border-pink-400 mx-auto flex items-center justify-center mb-[2cqw]">
          <span className="text-pink-400 font-bold" style={{ fontSize: '4cqw' }}>✨</span>
        </div>

        {/* Creative info */}
        <div className="mb-[2cqw]">
          <div className="text-purple-200 font-bold uppercase tracking-wider mb-[0.5cqw]" style={{ fontSize: '2.4cqw' }}>Connect</div>
          <div className="space-y-[0.3cqw]" style={{ fontSize: '1.8cqw', lineHeight: '1.3' }}>
            <div>✉️ liam@design.studio</div>
            <div>📞 (213) 555-0130</div>
            <div>🎨 behance.net/liam</div>
          </div>
        </div>

        {/* Dynamic competencies */}
        <div>
          <div className="text-purple-200 font-bold uppercase tracking-wider mb-[0.6cqw]" style={{ fontSize: '2.4cqw' }}>Expertise</div>
          <div className="flex flex-wrap gap-[0.5cqw]">
            {['UI/UX Design', 'Branding', 'Figma', 'Webflow'].map(t => (
              <span key={t} className="px-[1.2cqw] py-[0.3cqw] bg-white/10 rounded-md font-semibold text-purple-100" style={{ fontSize: '1.6cqw' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-pink-300 font-bold uppercase tracking-wider" style={{ fontSize: '1.6cqw' }}>
        CREATIVE ENGINE
      </div>
    </div>

    {/* Right Main Pane */}
    <div className="flex-1 bg-white p-[3cqw] flex flex-col justify-between text-slate-800 overflow-y-auto">
      <div>
        <div className="mb-[2cqw]">
          <div className="font-black text-slate-950 tracking-tight" style={{ fontSize: '7.5cqw', lineHeight: '1' }}>LIAM VANCE</div>
          <div className="text-violet-700 font-bold uppercase mt-[0.3cqw]" style={{ fontSize: '3cqw' }}>CREATIVE DIRECTOR</div>
        </div>

        {/* Profile / About Me */}
        <div className="mb-[2cqw]">
          <div className="font-bold text-slate-900 uppercase border-b border-slate-100 pb-[0.3cqw] mb-[0.6cqw]" style={{ fontSize: '2.8cqw' }}>Creative Statement</div>
          <div className="text-slate-600 leading-relaxed text-justify" style={{ fontSize: '2.1cqw' }}>
            Award-winning Creative Director with 8+ years of global agency and brand experiences, orchestrating visually stunning UI/UX, unified brand architectures, and immersive interactive installations. Proven leader inspiring teams of designers, motion artists, and writers to deliver commercially and artistically successful campaigns for global brands like Nike, Apple, and Pepsi.
          </div>
        </div>

        {/* Experience - Multi-role Timeline */}
        <div className="mb-[2cqw]">
          <div className="font-bold text-slate-900 uppercase border-b border-slate-100 pb-[0.3cqw] mb-[0.8cqw]" style={{ fontSize: '2.8cqw' }}>Creative Ventures</div>
          <div className="space-y-[1cqw]">
            
            {/* Company 1 (Studio Design) Multi-role */}
            <div className="border-l-2 border-violet-500 pl-[1.5cqw]">
              <div className="font-bold text-slate-900" style={{ fontSize: '2.4cqw' }}>Studio Design</div>
              
              {/* Role 1 */}
              <div className="mt-[0.3cqw] mb-[0.6cqw]">
                <div className="flex justify-between font-bold text-slate-800" style={{ fontSize: '2.2cqw' }}>
                  <span>• Creative Director</span>
                  <span className="text-violet-600 font-semibold">2021 – Present</span>
                </div>
                <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                  - Rebuilt brand campaigns, increasing global design engagement rates by 34%.<br/>
                  - Directed a cohesive creative squad of 6 senior designers and motion experts.
                </div>
              </div>

              {/* Role 2 */}
              <div>
                <div className="flex justify-between font-bold text-slate-800" style={{ fontSize: '2.2cqw' }}>
                  <span>• Lead UI/UX Designer</span>
                  <span className="text-violet-600 font-semibold">2019 – 2021</span>
                </div>
                <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                  - Designed comprehensive digital system blueprints deployed by millions of unique viewers.<br/>
                  - Standardized web components across all mobile development tracks.
                </div>
              </div>
            </div>

            {/* Company 2 */}
            <div className="border-l-2 border-slate-200 pl-[1.5cqw]">
              <div className="flex justify-between font-bold text-slate-900" style={{ fontSize: '2.4cqw' }}>
                <span>Junior Designer — PixelCraft Agency</span>
                <span className="text-violet-600">2018 – 2019</span>
              </div>
              <div className="text-slate-600 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
                • Designed modern brand system guidelines and identity assets for 20+ fast-growing clients.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education - Multiple Qualifications */}
      <div className="mb-[1.5cqw]">
        <div className="font-bold text-slate-900 uppercase border-b border-slate-100 pb-[0.3cqw] mb-[0.5cqw]" style={{ fontSize: '2.8cqw' }}>Education</div>
        <div className="space-y-[0.5cqw] text-slate-700" style={{ fontSize: '2.1cqw' }}>
          <div className="flex justify-between">
            <span><strong>Master of Design (M.Des)</strong> — Royal College of Art</span>
            <span>2020</span>
          </div>
          <div className="flex justify-between">
            <span><strong>B.F.A. in Graphic Design</strong> — RISD</span>
            <span>2018</span>
          </div>
        </div>
      </div>

      {/* Languages & References */}
      <div className="border-t border-slate-100 pt-[1.5cqw] mb-[1.5cqw]">
        <div className="grid grid-cols-2 gap-[2cqw]">
          <div>
            <div className="font-bold text-slate-900 uppercase mb-[0.4cqw]" style={{ fontSize: '2.6cqw' }}>Languages</div>
            <div className="text-slate-600" style={{ fontSize: '2.1cqw' }}>
              • English (Native) • French (Conversational)
            </div>
          </div>
          <div>
            <div className="font-bold text-slate-900 uppercase mb-[0.4cqw]" style={{ fontSize: '2.6cqw' }}>References</div>
            <div className="text-slate-600 space-y-[0.1cqw]" style={{ fontSize: '2.0cqw' }}>
              <div><strong>John Maeda</strong>, Lead — Studio Design (j.maeda@design.studio)</div>
              <div><strong>Jessica Walsh</strong>, Founder — PixelCraft (jessica@pixelcraft.io)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Accolades */}
      <div className="bg-violet-50 p-[1.5cqw] rounded-xl border border-violet-100">
        <div className="font-bold text-violet-900 uppercase" style={{ fontSize: '2.4cqw' }}>Recognitions & Awards</div>
        <div className="text-slate-700 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
          🏆 Red Dot Design Winner, 2024 • Adobe Design Circle Member
        </div>
      </div>
    </div>
  </div>
);

// 10. PERSONAL BRAND (Consultant magazine-style format)
const PersonalBrandPreview: React.FC = () => (
  <div className="p-[3.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-y-auto animate-fade-in" style={{ fontFamily: 'system-ui, sans-serif' }}>
    <div>
      {/* Magazine Greeting Header */}
      <div className="border-b-[0.6cqw] border-slate-900 pb-[1.5cqw] mb-[2cqw]">
        <div className="font-black text-slate-900 tracking-tighter" style={{ fontSize: '8cqw', lineHeight: '1' }}>CHLOE HARPER, MBA</div>
        <div className="text-amber-600 font-extrabold uppercase mt-[0.3cqw]" style={{ fontSize: '3.2cqw', letterSpacing: '0.1em' }}>INDEPENDENT GROWTH CONSULTANT</div>
        <div className="text-slate-500 mt-[0.3cqw] font-mono" style={{ fontSize: '2cqw' }}>chloe@harperadvisory.com • London / NYC • (212) 555-0144</div>
      </div>

      {/* Hero statement */}
      <div className="mb-[2cqw] text-slate-700 font-serif leading-relaxed italic" style={{ fontSize: '2.4cqw' }}>
        "I partner with seed-stage venture founders to accelerate market entry, scaling ARR from zero to $5M in under 18 months."
      </div>

      {/* Profile Details */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-slate-950 uppercase border-b border-slate-200 pb-[0.3cqw] mb-[0.6cqw]" style={{ fontSize: '2.8cqw' }}>Executive Overview</div>
        <div className="text-slate-600 leading-relaxed text-justify" style={{ fontSize: '2.1cqw' }}>
          Dynamic, outcome-driven Growth Consultant and LBS MBA graduate with 11+ years of strategy advising and investment analysis expertise. Specializes in building go-to-market systems, mentoring founders on successful Series A fundraising pitches, and scaling commercial software ventures internationally.
        </div>
      </div>

      {/* Split details */}
      <div className="grid grid-cols-2 gap-[2.5cqw] mb-[2cqw]">
        <div>
          <div className="font-bold text-slate-950 uppercase mb-[0.6cqw]" style={{ fontSize: '2.8cqw' }}>Advisory Focus</div>
          <div className="space-y-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
            <div>⚡ Go-To-Market Execution</div>
            <div>⚡ Founder Pitch Coaching</div>
            <div>⚡ Series A Fundraising</div>
          </div>
        </div>
        <div>
          <div className="font-bold text-slate-950 uppercase mb-[0.6cqw]" style={{ fontSize: '2.8cqw' }}>Selected Successes</div>
          <div className="text-slate-600 leading-snug" style={{ fontSize: '2cqw' }}>
            • Led Series A for Fintech SaaS, closing $8.2M.<br/>
            • Expanded 4 SaaS startups into APAC sectors.
          </div>
        </div>
      </div>

      {/* Experience - Multi-role Timeline */}
      <div className="mb-[2cqw]">
        <div className="font-bold text-slate-950 uppercase border-b border-slate-200 pb-[0.3cqw] mb-[0.6cqw]" style={{ fontSize: '2.8cqw' }}>Advisory History</div>
        <div className="space-y-[1cqw]">
          
          {/* Company 1 (Harper Advisory) Multi-role */}
          <div className="border-l-2 border-slate-900 pl-[1.5cqw]">
            <div className="font-bold text-slate-900" style={{ fontSize: '2.4cqw' }}>Harper Advisory Group</div>
            
            {/* Role 1 */}
            <div className="mt-[0.3cqw] mb-[0.6cqw]">
              <div className="flex justify-between font-bold text-slate-800" style={{ fontSize: '2.2cqw' }}>
                <span>• Growth Consultant & Managing Partner</span>
                <span className="text-amber-600">2020 – Present</span>
              </div>
              <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Advised 12 portfolio startup founders on user-acquisition systems, realizing a combined $45M valuation growth.
              </div>
            </div>

            {/* Role 2 */}
            <div>
              <div className="flex justify-between font-bold text-slate-800" style={{ fontSize: '2.2cqw' }}>
                <span>• Senior Strategy Advisory Lead</span>
                <span className="text-amber-600">2018 – 2020</span>
              </div>
              <div className="text-slate-600 pl-[1cqw]" style={{ fontSize: '2.1cqw' }}>
                - Formulated expansion tactics for SaaS clients entering continental European spaces.
              </div>
            </div>
          </div>

          {/* Company 2 */}
          <div className="border-l-2 border-slate-300 pl-[1.5cqw]">
            <div className="flex justify-between font-bold text-slate-900" style={{ fontSize: '2.4cqw' }}>
              <span>Ventures Analyst — Seedcamp London</span>
              <span className="text-amber-600">2015 – 2018</span>
            </div>
            <div className="text-slate-600 mt-[0.3cqw]" style={{ fontSize: '2.1cqw' }}>
              • Screened 400+ pre-seed pitch applications yearly; spearheaded 14 deal recommendations.
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Education - Multiple Qualifications */}
    <div className="mb-[2cqw]">
      <div className="font-bold text-slate-950 uppercase border-b border-slate-200 pb-[0.3cqw] mb-[0.5cqw]" style={{ fontSize: '2.8cqw' }}>Education</div>
      <div className="space-y-[0.5cqw] text-slate-700" style={{ fontSize: '2.1cqw' }}>
        <div className="flex justify-between">
          <span><strong>MBA in Entrepreneurship</strong> — London Business School</span>
          <span>2015</span>
        </div>
        <div className="flex justify-between">
          <span><strong>B.A. in Economics</strong> — Columbia University</span>
          <span>2011</span>
        </div>
      </div>
    </div>

    {/* Languages, References & Footer tags */}
    <div className="space-y-[1.5cqw] mt-[1.5cqw] border-t border-slate-200 pt-[1.5cqw]">
      <div className="grid grid-cols-2 gap-[2cqw] text-slate-700 mb-[1.5cqw]">
        <div>
          <div className="font-bold text-slate-950 uppercase mb-[0.4cqw]" style={{ fontSize: '2.6cqw' }}>Languages</div>
          <div className="text-slate-600" style={{ fontSize: '2.1cqw' }}>
            • English (Native) • Spanish (Fluent)
          </div>
        </div>
        <div>
          <div className="font-bold text-slate-950 uppercase mb-[0.4cqw]" style={{ fontSize: '2.6cqw' }}>References</div>
          <div className="text-slate-600 space-y-[0.1cqw]" style={{ fontSize: '2.0cqw' }}>
            <div><strong>Brent Hoberman</strong>, Founder — Founders Forum (brent@ff.co)</div>
            <div><strong>Saul Klein</strong>, Partner — Seedcamp (saul@seedcamp.com)</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-slate-50 p-[1.2cqw] border border-slate-200 rounded-lg">
        <span className="font-mono text-slate-500 font-bold uppercase" style={{ fontSize: '1.6cqw' }}>#ADVISORY #STARTUPS</span>
        <span className="text-amber-600 font-bold" style={{ fontSize: '1.8cqw' }}>HARPERADVISORY.COM</span>
      </div>
    </div>
  </div>
);

export const resumeTemplates1Page: SharedTemplateItem[] = [
  {
    slug: "executive-elite",
    name: "Executive Elite",
    tag: "Executive",
    type: "1-page",
    atsPercent: 99,
    designDescription: "Classic executive resume with centered header, serif typography, and traditional formatting. Ideal for senior leadership positions.",
    preview: <ExecutiveElitePreview />
  },
  {
    slug: "corporate-pro",
    name: "Corporate Pro",
    tag: "Corporate",
    type: "1-page",
    atsPercent: 99,
    designDescription: "Modern professional template with accent bars, skill level indicators, and project highlights. Perfect for operations and project professionals.",
    preview: <CorporateProPreview />
  },
  {
    slug: "finance-authority",
    name: "Finance Authority",
    tag: "Finance",
    type: "1-page",
    atsPercent: 98,
    designDescription: "Finance-focused template with timeline-style experience, competency grid, and clean emerald accents. Optimized for financial roles.",
    preview: <FinanceAuthorityPreview />
  },
  {
    slug: "healthcare-professional",
    name: "Healthcare Professional",
    tag: "Healthcare",
    type: "1-page",
    atsPercent: 98,
    designDescription: "Healthcare-focused template with medical styling, certification emphasis, and program/project highlights. Ideal for medical professionals.",
    preview: <HealthcareProfessionalPreview />
  },
  {
    slug: "legal-professional",
    name: "Legal Professional",
    tag: "Legal",
    type: "1-page",
    atsPercent: 99,
    designDescription: "Traditional legal resume with serif typography, bar admissions section, and pro bono highlights. Perfect for legal professionals.",
    preview: <LegalProfessionalPreview />
  },
  {
    slug: "education-leader",
    name: "Education Leader",
    tag: "Academic",
    type: "1-page",
    atsPercent: 98,
    designDescription: "Academic-focused template with research highlights, teaching experience, and professional affiliations. Ideal for educators.",
    preview: <EducationLeaderPreview />
  },
  {
    slug: "government-professional",
    name: "Government Professional",
    tag: "Government",
    type: "1-page",
    atsPercent: 99,
    designDescription: "Formal government-style template with program highlights, language proficiency, and community engagement. Perfect for public sector roles.",
    preview: <GovernmentProfessionalPreview />
  },
  {
    slug: "modern-tech",
    name: "Modern Tech",
    tag: "Technology",
    type: "1-page",
    atsPercent: 95,
    designDescription: "Two-column tech template with dark sidebar, technical skill bars, featured projects, and photo support. Perfect for tech professionals.",
    preview: <ModernTechPreview />
  },
  {
    slug: "creative-edge",
    name: "Creative Edge",
    tag: "Creative",
    type: "1-page",
    atsPercent: 94,
    designDescription: "Vibrant creative template with gradient sidebar, featured work section, and award showcase. Ideal for creative professionals.",
    preview: <CreativeEdgePreview />
  },
  {
    slug: "personal-brand",
    name: "Personal Brand",
    tag: "Consulting",
    type: "1-page",
    atsPercent: 95,
    designDescription: "Premium personal branding template with hero section, expertise tags, and three-column layout. Perfect for consultants and entrepreneurs.",
    preview: <PersonalBrandPreview />
  }
];

export const resumeTemplates2Page: SharedTemplateItem[] = [
  {
    slug: "executive-elite",
    name: "Executive Elite",
    tag: "Executive",
    type: "2-page",
    atsPercent: 99,
    designDescription: "Classic executive resume with centered header, serif typography, and traditional formatting. Ideal for senior leadership positions.",
    preview: <ExecutiveElitePreview />
  },
  {
    slug: "corporate-pro",
    name: "Corporate Pro",
    tag: "Corporate",
    type: "2-page",
    atsPercent: 99,
    designDescription: "Modern professional template with accent bars, skill level indicators, and project highlights. Perfect for operations and project professionals.",
    preview: <CorporateProPreview />
  },
  {
    slug: "finance-authority",
    name: "Finance Authority",
    tag: "Finance",
    type: "2-page",
    atsPercent: 98,
    designDescription: "Finance-focused template with timeline-style experience, competency grid, and clean emerald accents. Optimized for financial roles.",
    preview: <FinanceAuthorityPreview />
  },
  {
    slug: "healthcare-professional",
    name: "Healthcare Professional",
    tag: "Healthcare",
    type: "2-page",
    atsPercent: 98,
    designDescription: "Healthcare-focused template with medical styling, certification emphasis, and program/project highlights. Ideal for medical professionals.",
    preview: <HealthcareProfessionalPreview />
  },
  {
    slug: "legal-professional",
    name: "Legal Professional",
    tag: "Legal",
    type: "2-page",
    atsPercent: 99,
    designDescription: "Traditional legal resume with serif typography, bar admissions section, and pro bono highlights. Perfect for legal professionals.",
    preview: <LegalProfessionalPreview />
  },
  {
    slug: "education-leader",
    name: "Education Leader",
    tag: "Academic",
    type: "2-page",
    atsPercent: 98,
    designDescription: "Academic-focused template with research highlights, teaching experience, and professional affiliations. Ideal for educators.",
    preview: <EducationLeaderPreview />
  },
  {
    slug: "government-professional",
    name: "Government Professional",
    tag: "Government",
    type: "2-page",
    atsPercent: 99,
    designDescription: "Formal government-style template with program highlights, language proficiency, and community engagement. Perfect for public sector roles.",
    preview: <GovernmentProfessionalPreview />
  },
  {
    slug: "modern-tech",
    name: "Modern Tech",
    tag: "Technology",
    type: "2-page",
    atsPercent: 95,
    designDescription: "Two-column tech template with dark sidebar, technical skill bars, featured projects, and photo support. Perfect for tech professionals.",
    preview: <ModernTechPreview />
  },
  {
    slug: "creative-edge",
    name: "Creative Edge",
    tag: "Creative",
    type: "2-page",
    atsPercent: 94,
    designDescription: "Vibrant creative template with gradient sidebar, featured work section, and award showcase. Ideal for creative professionals.",
    preview: <CreativeEdgePreview />
  },
  {
    slug: "personal-brand",
    name: "Personal Brand",
    tag: "Consulting",
    type: "2-page",
    atsPercent: 95,
    designDescription: "Premium personal branding template with hero section, expertise tags, and three-column layout. Perfect for consultants and entrepreneurs.",
    preview: <PersonalBrandPreview />
  }
];
