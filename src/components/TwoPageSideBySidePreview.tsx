import React from 'react';

export interface TwoPageSideBySidePreviewProps {
  slug: string;
  preview?: React.ReactNode;
  isHovered?: boolean;
}

export const TwoPageSideBySidePreview: React.FC<TwoPageSideBySidePreviewProps> = ({ 
  slug, 
  preview, 
  isHovered 
}) => {
  // Helper for structured bullet points
  const BulletText: React.FC<{ text: string; colorClass?: string }> = ({ 
    text, 
    colorClass = 'text-stone-600' 
  }) => (
    <div className="flex items-start gap-[0.5cqw] leading-[1.25]">
      <span className="text-[1.8cqw] font-black leading-none text-emerald-700/80 shrink-0 select-none">•</span>
      <span className={`text-[1.35cqw] font-sans font-medium ${colorClass}`}>{text}</span>
    </div>
  );

  // 1. Executive / CFO Preview
  const renderClassic = () => (
    <div className="flex gap-[1.5cqw] w-full h-full p-[1cqw] bg-stone-100/60 rounded-2xl select-none" style={{ containerType: 'inline-size' }}>
      {/* Page 1 (58%) */}
      <div className="w-[58%] h-full bg-white border border-stone-200/60 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-serif relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-stone-900/10 text-stone-700 font-sans font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 1
        </div>
        <div className="space-y-[1.8cqw]">
          {/* Header */}
          <div className="text-center pb-[0.6cqw] border-b-[0.2cqw] border-stone-800">
            <h4 className="text-[3.2cqw] font-black text-stone-900 leading-none uppercase tracking-wide">ELIZABETH HARLOW, CFA</h4>
            <p className="text-[2.1cqw] font-sans font-bold text-emerald-800 tracking-widest uppercase mt-[0.3cqw]">CHIEF FINANCIAL OFFICER</p>
            <p className="text-[1.35cqw] text-stone-500 font-sans mt-[0.2cqw]">Denver, CO • e.harlow@cfo-meridian.com • (303) 555-0190</p>
          </div>

          {/* Summary */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-black text-stone-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">PROFESSIONAL SUMMARY</h5>
            <p className="text-[1.35cqw] text-stone-600 font-sans leading-[1.3]">
              Strategic, multi-national CFO with 15+ years of experience scaling corporate finance divisions, leading multi-entity mergers, and reporting to private equity boards.
            </p>
          </div>

          {/* Core Competencies Grid */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-black text-stone-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">CORE COMPETENCIES</h5>
            <div className="grid grid-cols-2 gap-x-[1.2cqw] gap-y-[0.6cqw] pt-[0.1cqw]">
              <span className="text-[1.35cqw] font-sans font-bold border border-stone-150 rounded px-[0.6cqw] py-[0.2cqw] bg-stone-50/55 text-stone-700 text-center truncate">P&L Management ($180M)</span>
              <span className="text-[1.35cqw] font-sans font-bold border border-stone-150 rounded px-[0.6cqw] py-[0.2cqw] bg-stone-50/55 text-stone-700 text-center truncate">Capital Restructuring</span>
              <span className="text-[1.35cqw] font-sans font-bold border border-stone-150 rounded px-[0.6cqw] py-[0.2cqw] bg-stone-50/55 text-stone-700 text-center truncate">Corporate M&A Strategy</span>
              <span className="text-[1.35cqw] font-sans font-bold border border-stone-150 rounded px-[0.6cqw] py-[0.2cqw] bg-stone-50/55 text-stone-700 text-center truncate">SOX Financial Compliance</span>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-black text-stone-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">WORK EXPERIENCE</h5>
            <div className="space-y-[0.8cqw]">
              <div>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-[1.65cqw] font-bold text-stone-900">CFO — Meridian Capital Group</span>
                  <span className="text-[1.35cqw] text-stone-500 font-sans">2020 – Pres</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Governed global treasury, tax compliance, and $180M multi-entity budgets." />
                  <BulletText text="Raised $45M Series C venture debt restructuring at 4.2% rate." />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-[1.65cqw] font-bold text-stone-900">VP of Finance — Sterling Holdings</span>
                  <span className="text-[1.35cqw] text-stone-500 font-sans">2015 – 2020</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Accountable for $75M P&L accounts, managing 24 global controllers." />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-[1.65cqw] font-bold text-stone-900">Director of Finance — Vantage Systems</span>
                  <span className="text-[1.35cqw] text-stone-500 font-sans">2011 – 2015</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Supervised regional financial reporting, tax compliance, and annual audits." />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-[1.65cqw] font-bold text-stone-900">Finance Manager — Deloitte Consulting</span>
                  <span className="text-[1.35cqw] text-stone-500 font-sans">2010 – 2011</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Advised corporate clients on strategic cost-reduction initiatives and resource allocation." />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="border-t border-stone-100 pt-[1cqw] mt-[1cqw]">
          <div className="grid grid-cols-3 gap-[0.8cqw]">
            <div className="p-[0.8cqw] bg-emerald-50/40 rounded-lg border border-emerald-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-sans font-black text-emerald-800 leading-none">$180M</span>
              <span className="text-[1.1cqw] font-sans uppercase font-bold text-stone-400 mt-[0.2cqw] tracking-wider leading-none">P&L Managed</span>
            </div>
            <div className="p-[0.8cqw] bg-emerald-50/40 rounded-lg border border-emerald-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-sans font-black text-emerald-800 leading-none">+24%</span>
              <span className="text-[1.1cqw] font-sans uppercase font-bold text-stone-400 mt-[0.2cqw] tracking-wider leading-none">Revenue Growth</span>
            </div>
            <div className="p-[0.8cqw] bg-emerald-50/40 rounded-lg border border-emerald-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-sans font-black text-emerald-800 leading-none">18%</span>
              <span className="text-[1.1cqw] font-sans uppercase font-bold text-stone-400 mt-[0.2cqw] tracking-wider leading-none">Margin Boost</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 (42%) */}
      <div className="w-[42%] h-full bg-white border border-stone-200/60 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-serif relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-stone-900/10 text-stone-700 font-sans font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 2
        </div>
        <div className="space-y-[1.6cqw]">
          {/* Header Continuity */}
          <div className="flex justify-between items-baseline border-b border-stone-200 pb-[0.4cqw]">
            <span className="text-[1.65cqw] font-black text-stone-850 uppercase tracking-wider">HARLOW, CFA</span>
            <span className="text-[1.35cqw] text-stone-400 font-sans font-bold uppercase tracking-widest">Page 2</span>
          </div>

          {/* Representative Projects */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-black text-stone-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">EXPERIENCE (CONTINUED)</h5>
            <div className="space-y-[0.6cqw]">
              <div>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-[1.5cqw] font-bold text-stone-850">Senior Analyst — Goldman Sachs</span>
                  <span className="text-[1.35cqw] text-stone-500 font-sans">2008 – 2011</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 font-sans leading-tight mt-[0.1cqw]">Executed strategic equity research for tech portfolios.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-[1.5cqw] font-bold text-stone-850">Treasury Associate — Merrill Lynch</span>
                  <span className="text-[1.35cqw] text-stone-500 font-sans">2006 – 2008</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 font-sans leading-tight mt-[0.1cqw]">Managed daily cash positioning and debt reconciliations.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-[1.5cqw] font-bold text-stone-850">Investment Associate — Lehman Brothers</span>
                  <span className="text-[1.35cqw] text-stone-500 font-sans">2004 – 2006</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 font-sans leading-tight mt-[0.1cqw]">Formulated valuation models for healthcare acquisitions.</p>
              </div>
            </div>
          </div>



          {/* Credentials */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-black text-stone-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">CREDENTIALS</h5>
            <div className="space-y-[0.3cqw]">
              <BulletText text="Chartered Financial Analyst (CFA)" />
              <BulletText text="Certified Public Accountant (CPA)" />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-black text-stone-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">EDUCATION</h5>
            <div>
              <div className="text-[1.5cqw] font-bold text-stone-900 leading-tight">MBA — Harvard Business School</div>
              <p className="text-[1.35cqw] text-stone-500 font-sans leading-none mt-[0.1cqw]">Deans List Honor</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="space-y-[0.5cqw] border-t border-stone-100 pt-[1cqw] mt-[0.8cqw]">
          <div className="grid grid-cols-2 gap-[0.8cqw]">
            <div>
              <h6 className="text-[1.5cqw] font-bold text-stone-800 uppercase">VOLUNTEER</h6>
              <p className="text-[1.2cqw] text-stone-500 font-sans leading-tight">Board Lead, Innovation Coalition</p>
            </div>
            <div>
              <h6 className="text-[1.5cqw] font-bold text-stone-800 uppercase">AWARDS</h6>
              <p className="text-[1.2cqw] text-stone-500 font-sans leading-tight">Stevie Award (2024)</p>
            </div>
          </div>
          <div className="text-[1.10cqw] text-stone-400 font-sans font-bold flex justify-between pt-[0.4cqw] border-t border-stone-50 select-none">
            <span>Pub: Capital Models</span>
            <span>References: On request</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. Software Engineer Preview
  const renderModern = () => (
    <div className="flex gap-[1.5cqw] w-full h-full p-[1cqw] bg-stone-100/60 rounded-2xl select-none" style={{ containerType: 'inline-size' }}>
      {/* Page 1 (58%) */}
      <div className="w-[58%] h-full bg-slate-900 text-slate-100 border border-slate-800 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-sans relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-teal-500/10 text-teal-400 font-mono font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 1
        </div>
        <div className="space-y-[1.8cqw]">
          {/* Header */}
          <div className="pb-[0.6cqw] border-b border-slate-800">
            <h4 className="text-[3.2cqw] font-black text-white leading-none tracking-tight">ALEX RIVERA</h4>
            <p className="text-[2.1cqw] font-mono font-bold text-teal-400 tracking-wider uppercase mt-[0.3cqw]">STAFF SOFTWARE ARCHITECT</p>
            <p className="text-[1.35cqw] text-slate-400 font-mono mt-[0.2cqw]">Seattle, WA • alex.rivera@dev.io • github.com/arivera</p>
          </div>

          {/* Summary */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-teal-300 tracking-wide uppercase border-b border-slate-800 pb-[0.1cqw]">ABOUT ME</h5>
            <p className="text-[1.35cqw] text-slate-300 leading-[1.3]">
              Systems architect with 12+ years of experience engineering secure, globally distributed SaaS platforms and high-throughput databases. Pioneer in microservices.
            </p>
          </div>

          {/* Technical Stack Tags */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-teal-300 tracking-wide uppercase border-b border-slate-800 pb-[0.1cqw]">TECHNICAL CAPABILITIES</h5>
            <div className="flex flex-wrap gap-[0.6cqw] pt-[0.2cqw]">
              {['Go', 'Rust', 'TypeScript', 'AWS', 'Kubernetes', 'gRPC', 'Redis', 'Docker', 'Terraform'].map((skill) => (
                <span key={skill} className="text-[1.35cqw] font-mono border border-slate-800 rounded px-[0.6cqw] py-[0.1cqw] bg-slate-850 text-teal-400 font-bold">{skill}</span>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-teal-300 tracking-wide uppercase border-b border-slate-800 pb-[0.1cqw]">EXPERIENCE_ENGINEERING</h5>
            <div className="space-y-[0.8cqw]">
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.65cqw] font-bold text-white">Principal Architect — AWS Cloud</span>
                  <span className="text-[1.35cqw] text-slate-400">2020 – Pres</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Rebuilt data ingestion tier, reducing service response latency by 55%." colorClass="text-slate-300" />
                  <BulletText text="Architected container scheduler supporting 800M API operations daily." colorClass="text-slate-300" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.65cqw] font-bold text-white">Staff Systems Engineer — Uber</span>
                  <span className="text-[1.35cqw] text-slate-400">2016 – 2020</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Decreased global dispatch ETAs by 22% via real-time stream processing." colorClass="text-slate-300" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.65cqw] font-bold text-white">Lead Cloud Developer — Cloudflare</span>
                  <span className="text-[1.35cqw] text-slate-400">2015 – 2016</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Optimized CDN routing rules, slashing cold-start connection speeds." colorClass="text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Stats Box */}
        <div className="border-t border-slate-800 pt-[1cqw] mt-[1cqw]">
          <div className="grid grid-cols-3 gap-[0.8cqw]">
            <div className="p-[0.8cqw] bg-teal-500/5 rounded-lg border border-teal-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-mono font-black text-teal-400 leading-none">99.99%</span>
              <span className="text-[1.1cqw] font-mono uppercase font-bold text-slate-500 mt-[0.2cqw] tracking-wider leading-none">SLA Uptime</span>
            </div>
            <div className="p-[0.8cqw] bg-teal-500/5 rounded-lg border border-teal-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-mono font-black text-teal-400 leading-none">$1.2M</span>
              <span className="text-[1.1cqw] font-mono uppercase font-bold text-slate-500 mt-[0.2cqw] tracking-wider leading-none">Cloud Savings</span>
            </div>
            <div className="p-[0.8cqw] bg-teal-500/5 rounded-lg border border-teal-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-mono font-black text-teal-400 leading-none">98%</span>
              <span className="text-[1.1cqw] font-mono uppercase font-bold text-slate-500 mt-[0.2cqw] tracking-wider leading-none">ATS Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 (42%) */}
      <div className="w-[42%] h-full bg-slate-900 text-slate-100 border border-slate-800 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-sans relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-teal-500/10 text-teal-400 font-mono font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 2
        </div>
        <div className="space-y-[1.6cqw]">
          {/* Header Continuity */}
          <div className="flex justify-between items-baseline border-b border-slate-800 pb-[0.4cqw]">
            <span className="text-[1.65cqw] font-mono font-bold text-slate-200">ALEX_RIVERA.CONF</span>
            <span className="text-[1.35cqw] text-slate-500 font-mono">Page_2</span>
          </div>

          {/* Past Chronicles / Experience Continued */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-teal-300 tracking-wide uppercase border-b border-slate-800 pb-[0.1cqw]">PAST_EXPERIENCE</h5>
            <div className="space-y-[0.6cqw]">
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.5cqw] font-bold text-white">Senior Engineer — Netflix</span>
                  <span className="text-[1.35cqw] text-slate-400">2014 – 16</span>
                </div>
                <p className="text-[1.35cqw] text-slate-400 leading-tight mt-[0.1cqw]">Architected high-throughput dynamic streaming caches.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.5cqw] font-bold text-white">Systems Engineer II — Twitter</span>
                  <span className="text-[1.35cqw] text-slate-400">2012 – 14</span>
                </div>
                <p className="text-[1.35cqw] text-slate-400 leading-tight mt-[0.1cqw]">Maintained low-latency user timeline messaging layers.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.5cqw] font-bold text-white">Software Engineer — Yahoo</span>
                  <span className="text-[1.35cqw] text-slate-400">2010 – 12</span>
                </div>
                <p className="text-[1.35cqw] text-slate-400 leading-tight mt-[0.1cqw]">Implemented backend services for content search delivery.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.5cqw] font-bold text-white">Junior Developer — Microsoft</span>
                  <span className="text-[1.35cqw] text-slate-400">2008 – 10</span>
                </div>
                <p className="text-[1.35cqw] text-slate-400 leading-tight mt-[0.1cqw]">Contributed code optimizations to localized Windows search UI components.</p>
              </div>
            </div>
          </div>



          {/* Certifications */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-teal-300 tracking-wide uppercase border-b border-slate-800 pb-[0.1cqw]">CERTIFICATIONS</h5>
            <div className="space-y-[0.3cqw]">
              <BulletText text="AWS Solutions Architect Pro" colorClass="text-slate-300" />
              <BulletText text="Certified Kubernetes Admin (CKA)" colorClass="text-slate-300" />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-teal-300 tracking-wide uppercase border-b border-slate-800 pb-[0.1cqw]">EDUCATION</h5>
            <div>
              <div className="text-[1.5cqw] font-bold text-white leading-tight font-mono">M.S. Computer Science</div>
              <p className="text-[1.35cqw] text-slate-400 leading-none mt-[0.1cqw]">Stanford University</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="space-y-[0.5cqw] border-t border-slate-800 pt-[1cqw] mt-[0.8cqw]">
          <div className="grid grid-cols-2 gap-[0.8cqw] font-mono text-[1.2cqw]">
            <div>
              <h6 className="text-[1.35cqw] font-bold text-teal-400 uppercase">VOLUNTEER</h6>
              <p className="text-slate-400 leading-tight">CNCF Kubernetes SIG Contributor</p>
            </div>
            <div>
              <h6 className="text-[1.35cqw] font-bold text-teal-400 uppercase">AWARDS</h6>
              <p className="text-slate-400 leading-tight">AWS Tech Pioneer Award</p>
            </div>
          </div>
          <div className="text-[1.10cqw] text-slate-500 font-mono flex justify-between pt-[0.4cqw] border-t border-slate-850 select-none">
            <span>Patent: Adaptive Balancing</span>
            <span>References: GitHub/Docs</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 3. Project Manager Preview (Minimalist Slate)
  const renderMinimalist = () => (
    <div className="flex gap-[1.5cqw] w-full h-full p-[1cqw] bg-stone-100/60 rounded-2xl select-none" style={{ containerType: 'inline-size' }}>
      {/* Page 1 (58%) */}
      <div className="w-[58%] h-full bg-white border border-stone-200/60 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-sans relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-stone-900/10 text-stone-700 font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 1
        </div>
        <div className="space-y-[1.8cqw]">
          {/* Header */}
          <div className="pb-[0.6cqw] border-b border-stone-200">
            <h4 className="text-[3.2cqw] font-extrabold text-stone-900 leading-none tracking-tight">JAMES WHITMORE, PMP</h4>
            <p className="text-[2.1cqw] font-bold text-indigo-700 tracking-wider uppercase mt-[0.3cqw]">DIRECTOR OF PROGRAM MANAGEMENT</p>
            <p className="text-[1.35cqw] text-stone-500 mt-[0.2cqw]">Chicago, IL • j.whitmore@ops.com • (312) 555-0145</p>
          </div>

          {/* Summary */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-800 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">PROFILE SUMMARY</h5>
            <p className="text-[1.35cqw] text-stone-600 leading-[1.3]">
              Results-driven Program Director directing complex logistics operations, software releases, and cross-functional teams with budget authority up to $10M.
            </p>
          </div>

          {/* Competencies */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-800 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">CORE COMPETENCIES</h5>
            <div className="flex flex-wrap gap-[0.5cqw] pt-[0.1cqw]">
              {['Agile/Scrum', 'Project Governance', 'Risk Mitigation', 'Six Sigma', 'Resource Allocation', 'Budget Management'].map((skill) => (
                <span key={skill} className="text-[1.35cqw] border border-stone-200 rounded px-[0.6cqw] py-[0.1cqw] bg-stone-50 text-stone-600 font-medium">{skill}</span>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-800 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">EXPERIENCE</h5>
            <div className="space-y-[0.8cqw]">
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.65cqw] font-bold text-stone-900">Director of Programs — Apex Logistics</span>
                  <span className="text-[1.35cqw] text-stone-500">2021 – Pres</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Orchestrated cloud WMS database migration across 3 central shipping hubs." />
                  <BulletText text="Enhanced routing operational efficiency by 24% via software." />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.65cqw] font-bold text-stone-900">Operations Manager — BlueLine Supply</span>
                  <span className="text-[1.35cqw] text-stone-500">2017 – 2021</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Managed $28M supply assets, reducing physical shrinkage by 11%." />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.65cqw] font-bold text-stone-900">Senior Logistics Consultant — McKinsey & Co</span>
                  <span className="text-[1.35cqw] text-stone-500">2016 – 2017</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Drafted post-merger supply integration guidelines for retail conglomerates." />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-stone-100 pt-[1cqw] mt-[1cqw]">
          <div className="grid grid-cols-3 gap-[0.8cqw]">
            <div className="p-[0.8cqw] bg-indigo-50/40 rounded-lg border border-indigo-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-black text-indigo-700 leading-none">22+</span>
              <span className="text-[1.1cqw] uppercase font-bold text-stone-400 mt-[0.2cqw] tracking-wider leading-none">Launch Pipelines</span>
            </div>
            <div className="p-[0.8cqw] bg-indigo-50/40 rounded-lg border border-indigo-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-black text-indigo-700 leading-none">98%</span>
              <span className="text-[1.1cqw] uppercase font-bold text-stone-400 mt-[0.2cqw] tracking-wider leading-none">ATS Score Match</span>
            </div>
            <div className="p-[0.8cqw] bg-indigo-50/40 rounded-lg border border-indigo-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-black text-indigo-700 leading-none">$2.4M</span>
              <span className="text-[1.1cqw] uppercase font-bold text-stone-400 mt-[0.2cqw] tracking-wider leading-none">Budget Managed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 (42%) */}
      <div className="w-[42%] h-full bg-white border border-stone-200/60 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-sans relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-stone-900/10 text-stone-700 font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 2
        </div>
        <div className="space-y-[1.6cqw]">
          {/* Header Continuity */}
          <div className="flex justify-between items-baseline border-b border-stone-200 pb-[0.4cqw]">
            <span className="text-[1.65cqw] font-bold text-stone-800">JAMES WHITMORE</span>
            <span className="text-[1.35cqw] text-stone-400 uppercase tracking-widest font-bold">Page 2</span>
          </div>

          {/* Representative Projects */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-800 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">PAST EXPERIENCE</h5>
            <div className="space-y-[0.6cqw]">
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-stone-900">Senior PM — DHL Group</span>
                  <span className="text-[1.35cqw] text-stone-500">2014 – 17</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 leading-tight mt-[0.1cqw]">Directed agile terminal optimization and scheduling sprints.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-stone-900">Logistics Program Manager — FedEx</span>
                  <span className="text-[1.35cqw] text-stone-500">2011 – 14</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 leading-tight mt-[0.1cqw]">Coordinated cross-docking logistics flow improvements.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-stone-900">Supply Chain Analyst — Target</span>
                  <span className="text-[1.35cqw] text-stone-500">2009 – 11</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 leading-tight mt-[0.1cqw]">Conducted operational pipeline variance audits.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-stone-900">Junior Operations Planner — Walmart</span>
                  <span className="text-[1.35cqw] text-stone-500">2007 – 09</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 leading-tight mt-[0.1cqw]">Assisted distribution centers with automated slot allocation schedules.</p>
              </div>
            </div>
          </div>



          {/* Certifications */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-800 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">CERTIFICATIONS</h5>
            <div className="space-y-[0.3cqw]">
              <BulletText text="Project Management Professional (PMP)" />
              <BulletText text="Certified Scrum Product Owner (CSPO)" />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-800 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">EDUCATION</h5>
            <div>
              <div className="text-[1.5cqw] font-bold text-stone-900 leading-tight">M.S. Engineering Management</div>
              <p className="text-[1.35cqw] text-stone-500 leading-none mt-[0.1cqw]">Northwestern University</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="space-y-[0.5cqw] border-t border-stone-100 pt-[1cqw] mt-[0.8cqw]">
          <div className="grid grid-cols-2 gap-[0.8cqw]">
            <div>
              <h6 className="text-[1.5cqw] font-bold text-stone-800 uppercase">VOLUNTEER</h6>
              <p className="text-[1.2cqw] text-stone-500 leading-tight">Consultant, Chicago Food Depository</p>
            </div>
            <div>
              <h6 className="text-[1.5cqw] font-bold text-stone-800 uppercase">AWARDS</h6>
              <p className="text-[1.2cqw] text-stone-500 leading-tight">PMI Global Project of the Year</p>
            </div>
          </div>
          <div className="text-[1.10cqw] text-stone-400 font-bold flex justify-between pt-[0.4cqw] border-t border-stone-50 select-none">
            <span>Pub: Logistics Agile</span>
            <span>References: Available</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. Marketing Director Preview (Creative Visionary)
  const renderCreative = () => (
    <div className="flex gap-[1.5cqw] w-full h-full p-[1cqw] bg-stone-100/60 rounded-2xl select-none" style={{ containerType: 'inline-size' }}>
      {/* Page 1 (58%) */}
      <div className="w-[58%] h-full bg-stone-900 text-stone-100 border border-stone-800 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-sans relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-fuchsia-500/10 text-fuchsia-400 font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 1
        </div>
        <div className="space-y-[1.8cqw]">
          {/* Header */}
          <div className="pb-[0.6cqw] border-b border-stone-800 flex items-center justify-between">
            <div>
              <h4 className="text-[3.2cqw] font-black text-white leading-none tracking-tight">SOFIA LARK</h4>
              <p className="text-[2.1cqw] font-bold text-fuchsia-400 tracking-wider uppercase mt-[0.3cqw]">CREATIVE & MARKETING DIRECTOR</p>
              <p className="text-[1.35cqw] text-stone-400 mt-[0.2cqw]">Brooklyn, NY • s.lark@studio.io • sofialark.design</p>
            </div>
            <div className="w-[6cqw] h-[6cqw] bg-gradient-to-tr from-fuchsia-600 to-violet-600 rounded-xl shrink-0 flex items-center justify-center text-white text-[2.5cqw] font-black shadow-lg">SL</div>
          </div>

          {/* Summary */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-300 tracking-wide uppercase border-b border-stone-800 pb-[0.1cqw]">CREATIVE VISION</h5>
            <p className="text-[1.35cqw] text-stone-400 leading-[1.3]">
              Award-winning Creative and Marketing Director defining unified consumer design systems, digital CRO pipelines, and viral campaigns scaling brand equities.
            </p>
          </div>

          {/* Core Skills (styled in nice fuchsia tags) */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-300 tracking-wide uppercase border-b border-stone-800 pb-[0.1cqw]">EXPERTISE</h5>
            <div className="flex flex-wrap gap-[0.5cqw] pt-[0.1cqw]">
              {['Brand Strategy', 'CRO Systems', 'Motion Design', 'B2C Campaign', 'Figma UX', 'Copywriting'].map((skill) => (
                <span key={skill} className="text-[1.35cqw] border border-fuchsia-500/20 rounded px-[0.6cqw] py-[0.1cqw] bg-fuchsia-500/10 text-fuchsia-300 font-bold">{skill}</span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-300 tracking-wide uppercase border-b border-stone-800 pb-[0.1cqw]">EXPERIENCE</h5>
            <div className="space-y-[0.8cqw]">
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.65cqw] font-bold text-white">VP of Brand — Wren Studio</span>
                  <span className="text-[1.35cqw] text-stone-400">2021 – Pres</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Scaled active consumer accounts by 40% using conversion growth maps." colorClass="text-stone-300" />
                  <BulletText text="Spearheaded complete rebrand spanning 20 digital checkout channels." colorClass="text-stone-300" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.65cqw] font-bold text-white">Senior UX Lead — Instrument</span>
                  <span className="text-[1.35cqw] text-stone-400">2018 – 2021</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Designed mobile app workflows, raising checkout conversions by 32%." colorClass="text-stone-300" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.65cqw] font-bold text-white">Creative Strategist — Wieden+Kennedy</span>
                  <span className="text-[1.35cqw] text-stone-400">2017 – 2018</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Authored social media strategy and visual concepts for premium lifestyle brands." colorClass="text-stone-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-stone-800 pt-[1cqw] mt-[1cqw]">
          <div className="grid grid-cols-3 gap-[0.8cqw]">
            <div className="p-[0.8cqw] bg-fuchsia-500/5 rounded-lg border border-fuchsia-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-black text-fuchsia-400 leading-none">40%</span>
              <span className="text-[1.1cqw] uppercase font-bold text-stone-500 mt-[0.2cqw] tracking-wider leading-none">Account Growth</span>
            </div>
            <div className="p-[0.8cqw] bg-fuchsia-500/5 rounded-lg border border-fuchsia-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-black text-fuchsia-400 leading-none">38%</span>
              <span className="text-[1.1cqw] uppercase font-bold text-stone-500 mt-[0.2cqw] tracking-wider leading-none">Checkout CRO</span>
            </div>
            <div className="p-[0.8cqw] bg-fuchsia-500/5 rounded-lg border border-fuchsia-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-black text-fuchsia-400 leading-none">$4.5M</span>
              <span className="text-[1.1cqw] uppercase font-bold text-stone-500 mt-[0.2cqw] tracking-wider leading-none">Campaign Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 (42%) */}
      <div className="w-[42%] h-full bg-stone-900 text-stone-100 border border-stone-800 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-sans relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-fuchsia-500/10 text-fuchsia-400 font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 2
        </div>
        <div className="space-y-[1.6cqw]">
          {/* Header Continuity */}
          <div className="flex justify-between items-baseline border-b border-stone-800 pb-[0.4cqw]">
            <span className="text-[1.65cqw] font-bold text-stone-200">SOFIA LARK</span>
            <span className="text-[1.35cqw] text-stone-500 font-bold">Page 2</span>
          </div>

          {/* Creative Projects */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-300 tracking-wide uppercase border-b border-stone-800 pb-[0.1cqw]">PAST EXPERIENCE</h5>
            <div className="space-y-[0.6cqw]">
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-white">Lead Art Director — R/GA</span>
                  <span className="text-[1.35cqw] text-stone-400">2015 – 18</span>
                </div>
                <p className="text-[1.35cqw] text-stone-400 leading-tight mt-[0.1cqw]">Led visual identity and digital campaigns for Fortune 100 brands.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-white">Senior Designer — Pentagram</span>
                  <span className="text-[1.35cqw] text-stone-400">2012 – 15</span>
                </div>
                <p className="text-[1.35cqw] text-stone-400 leading-tight mt-[0.1cqw]">Engineered complex typography systems and publications.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-white">Visual Designer — Huge Agency</span>
                  <span className="text-[1.35cqw] text-stone-400">2009 – 12</span>
                </div>
                <p className="text-[1.35cqw] text-stone-400 leading-tight mt-[0.1cqw]">Created landing layouts and branding asset packages.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-white">Graphic Designer — Landor Associates</span>
                  <span className="text-[1.35cqw] text-stone-400">2007 – 09</span>
                </div>
                <p className="text-[1.35cqw] text-stone-400 leading-tight mt-[0.1cqw]">Rendered vector logos, style guides, and package concepts.</p>
              </div>
            </div>
          </div>



          {/* Certifications */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-300 tracking-wide uppercase border-b border-stone-800 pb-[0.1cqw]">CREDENTIALS</h5>
            <div className="space-y-[0.3cqw]">
              <BulletText text="Google Analytics IQ Certified" colorClass="text-stone-300" />
              <BulletText text="Certified Framer Expert" colorClass="text-stone-300" />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-stone-300 tracking-wide uppercase border-b border-stone-800 pb-[0.1cqw]">EDUCATION</h5>
            <div>
              <div className="text-[1.5cqw] font-bold text-white leading-tight">BFA Communication Design</div>
              <p className="text-[1.35cqw] text-stone-400 leading-none mt-[0.1cqw]">Parsons School of Design</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="space-y-[0.5cqw] border-t border-stone-800 pt-[1cqw] mt-[0.8cqw]">
          <div className="grid grid-cols-2 gap-[0.8cqw]">
            <div>
              <h6 className="text-[1.5cqw] font-bold text-fuchsia-400 uppercase">VOLUNTEER</h6>
              <p className="text-[1.2cqw] text-stone-400 leading-tight">Design Mentor, ADPList Platform</p>
            </div>
            <div>
              <h6 className="text-[1.5cqw] font-bold text-fuchsia-400 uppercase">AWARDS</h6>
              <p className="text-[1.2cqw] text-stone-400 leading-tight">Awwwards Site of the Year</p>
            </div>
          </div>
          <div className="text-[1.10cqw] text-stone-500 flex justify-between pt-[0.4cqw] border-t border-stone-850 select-none">
            <span>Pub: High-Conversion Systems</span>
            <span>References: On Site</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 5. Healthcare Professional Preview
  const renderHealthcare = () => (
    <div className="flex gap-[1.5cqw] w-full h-full p-[1cqw] bg-stone-100/60 rounded-2xl select-none" style={{ containerType: 'inline-size' }}>
      {/* Page 1 (58%) */}
      <div className="w-[58%] h-full bg-white border border-stone-200/60 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-sans relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-stone-900/10 text-stone-700 font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 1
        </div>
        <div className="space-y-[1.8cqw]">
          {/* Header */}
          <div className="pb-[0.6cqw] border-b-[0.25cqw] border-sky-700">
            <h4 className="text-[3.2cqw] font-black text-sky-850 leading-none tracking-tight">DR. SARAH JENKINS, DNP</h4>
            <p className="text-[2.1cqw] font-bold text-sky-650 tracking-wider uppercase mt-[0.3cqw]">CLINICAL NURSE DIRECTOR</p>
            <p className="text-[1.35cqw] text-stone-500 mt-[0.2cqw]">Denver, CO • s.jenkins@health-lead.com • (303) 555-0130</p>
          </div>

          {/* Summary */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-sky-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">PROFESSIONAL SUMMARY</h5>
            <p className="text-[1.35cqw] text-stone-600 leading-[1.3]">
              Compassionate, high-performing Nurse Director with 14+ years managing acute care, emergency medicine units, and nursing staffs. Certified patient safety advocate.
            </p>
          </div>

          {/* Core Competencies (styled in sky blue tags) */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-sky-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">CLINICAL CAPABILITIES</h5>
            <div className="flex flex-wrap gap-[0.5cqw] pt-[0.1cqw]">
              {['Acute Care', 'ER Workflow', 'EHR Systems', 'Patient Safety', 'Staff Training', 'HIPAA'].map((skill) => (
                <span key={skill} className="text-[1.35cqw] border border-sky-200 rounded px-[0.6cqw] py-[0.1cqw] bg-sky-50 text-sky-700 font-semibold">{skill}</span>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-sky-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">NURSING PRACTICE</h5>
            <div className="space-y-[0.8cqw]">
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.65cqw] font-bold text-stone-900">Clinical Director — St. Jude Hospital</span>
                  <span className="text-[1.35cqw] text-stone-500">2019 – Pres</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Coordinate ER care workflows, directing 45 clinical staff nurses." />
                  <BulletText text="Slashed patient ER waiting times by 28% via Lean scheduling rules." />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.65cqw] font-bold text-stone-900">Emergency Dept Manager — Mercy Health</span>
                  <span className="text-[1.35cqw] text-stone-500">2015 – 2019</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Supervised emergency department operations and clinician staffing schedules." />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.65cqw] font-bold text-stone-900">Clinical Quality Auditor — Kaiser Permanente</span>
                  <span className="text-[1.35cqw] text-stone-500">2014 – 2015</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Audited acute clinical care metrics to comply with regional board codes." />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-stone-100 pt-[1cqw] mt-[1cqw]">
          <div className="grid grid-cols-3 gap-[0.8cqw]">
            <div className="p-[0.8cqw] bg-sky-50/40 rounded-lg border border-sky-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-black text-sky-700 leading-none">98%</span>
              <span className="text-[1.1cqw] uppercase font-bold text-stone-400 mt-[0.2cqw] tracking-wider leading-none">Patient Sat</span>
            </div>
            <div className="p-[0.8cqw] bg-sky-50/40 rounded-lg border border-sky-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-black text-sky-700 leading-none">45</span>
              <span className="text-[1.1cqw] uppercase font-bold text-stone-400 mt-[0.2cqw] tracking-wider leading-none">Clinicians Led</span>
            </div>
            <div className="p-[0.8cqw] bg-sky-50/40 rounded-lg border border-sky-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-black text-sky-700 leading-none">-32%</span>
              <span className="text-[1.1cqw] uppercase font-bold text-stone-400 mt-[0.2cqw] tracking-wider leading-none">Readmit Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 (42%) */}
      <div className="w-[42%] h-full bg-white border border-stone-200/60 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-sans relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-stone-900/10 text-stone-700 font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 2
        </div>
        <div className="space-y-[1.6cqw]">
          {/* Header Continuity */}
          <div className="flex justify-between items-baseline border-b border-stone-200 pb-[0.4cqw]">
            <span className="text-[1.65cqw] font-bold text-sky-850">DR. JENKINS, DNP</span>
            <span className="text-[1.35cqw] text-stone-400 font-bold">Page 2</span>
          </div>

          {/* Representative Projects */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-sky-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">PAST CLINICAL PRACTICE</h5>
            <div className="space-y-[0.6cqw]">
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-stone-900">Chief Charge Nurse — Mayo Clinic</span>
                  <span className="text-[1.35cqw] text-stone-500">2012 – 15</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 leading-tight mt-[0.1cqw]">Led night shift charge nursing and triage priorities.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-stone-900">Registered Nurse (ER) — Cleveland Clinic</span>
                  <span className="text-[1.35cqw] text-stone-500">2009 – 12</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 leading-tight mt-[0.1cqw]">Provided high-acuity level-1 emergency trauma care.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-stone-900">Clinical Nurse Intern — Denver General</span>
                  <span className="text-[1.35cqw] text-stone-500">2007 – 09</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 leading-tight mt-[0.1cqw]">Assisted senior staff nurses with patient diagnostics.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[1.5cqw] font-bold text-stone-900">Staff Nurse (Pediatrics) — Johns Hopkins Medicine</span>
                  <span className="text-[1.35cqw] text-stone-500">2005 – 07</span>
                </div>
                <p className="text-[1.35cqw] text-stone-500 leading-tight mt-[0.1cqw]">Monitored pediatric vital indicators and medical administration charts.</p>
              </div>
            </div>
          </div>



          {/* Certifications */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-sky-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">CREDENTIALS</h5>
            <div className="space-y-[0.3cqw]">
              <BulletText text="Doctor of Nursing Practice (DNP)" />
              <BulletText text="Advanced Practice Registered Nurse (APRN)" />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-bold text-sky-900 tracking-wide uppercase border-b-[0.5px] border-stone-200 pb-[0.1cqw]">EDUCATION</h5>
            <div>
              <div className="text-[1.5cqw] font-bold text-stone-900 leading-tight">Doctor of Nursing Practice</div>
              <p className="text-[1.35cqw] text-stone-500 leading-none mt-[0.1cqw]">University of Colorado</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="space-y-[0.5cqw] border-t border-stone-100 pt-[1cqw] mt-[0.8cqw]">
          <div className="grid grid-cols-2 gap-[0.8cqw]">
            <div>
              <h6 className="text-[1.5cqw] font-bold text-sky-850 uppercase">VOLUNTEER</h6>
              <p className="text-[1.2cqw] text-stone-500 leading-tight">Practitioner, Colorado Free Clinic</p>
            </div>
            <div>
              <h6 className="text-[1.5cqw] font-bold text-sky-850 uppercase">AWARDS</h6>
              <p className="text-[1.2cqw] text-stone-500 leading-tight">Florence Nightingale Award</p>
            </div>
          </div>
          <div className="text-[1.10cqw] text-stone-400 font-bold flex justify-between pt-[0.4cqw] border-t border-stone-50 select-none">
            <span>Pub: Emergency Flows</span>
            <span>References: CMO Office</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 6. Data Analyst Preview
  const renderDataAnalyst = () => (
    <div className="flex gap-[1.5cqw] w-full h-full p-[1cqw] bg-stone-100/60 rounded-2xl select-none" style={{ containerType: 'inline-size' }}>
      {/* Page 1 (58%) */}
      <div className="w-[58%] h-full bg-[#111827] text-gray-100 border border-gray-800 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-sans relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-indigo-500/10 text-indigo-400 font-mono font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 1
        </div>
        <div className="space-y-[1.8cqw]">
          {/* Header */}
          <div className="pb-[0.6cqw] border-b border-indigo-900/60">
            <h4 className="text-[3.2cqw] font-bold text-white leading-none tracking-tight">ELENA ROSTOVA</h4>
            <p className="text-[2.1cqw] font-mono font-bold text-indigo-400 tracking-wider uppercase mt-[0.3cqw]">LEAD BI ANALYST</p>
            <p className="text-[1.35cqw] text-gray-400 font-mono mt-[0.2cqw]">Austin, TX • e.rostova@data-insights.net • (512) 555-0160</p>
          </div>

          {/* Summary */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-indigo-300 tracking-wide uppercase border-b border-indigo-950 pb-[0.1cqw]">PROFILE SUMMARY</h5>
            <p className="text-[1.35cqw] text-gray-300 leading-[1.3]">
              Data-driven Lead BI Analyst with 8+ years building automated Snowflake ETL warehouses, predictive ML churn pipelines, and executive dashboards.
            </p>
          </div>

          {/* Technical tags */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-indigo-300 tracking-wide uppercase border-b border-indigo-950 pb-[0.1cqw]">TECHNICAL_STACK</h5>
            <div className="flex flex-wrap gap-[0.5cqw] pt-[0.1cqw]">
              {['SQL', 'Python', 'Tableau', 'Snowflake', 'ETL Pipelines', 'AWS S3', 'Regression'].map((skill) => (
                <span key={skill} className="text-[1.35cqw] font-mono border border-indigo-950 rounded px-[0.6cqw] py-[0.1cqw] bg-[#1F2937] text-indigo-300 font-semibold">{skill}</span>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-indigo-300 tracking-wide uppercase border-b border-indigo-950 pb-[0.1cqw]">PROFESSIONAL_RECORDS</h5>
            <div className="space-y-[0.8cqw]">
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.65cqw] font-bold text-white">Lead BI Analyst — Snowflake</span>
                  <span className="text-[1.35cqw] text-gray-400">2021 – Pres</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Designed central executive dashboards saving 14 analytics prep hours." colorClass="text-gray-300" />
                  <BulletText text="Orchestrated ETL pipeline tracking marketing ROI across 8 channels." colorClass="text-gray-300" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.65cqw] font-bold text-white">Senior Data Analyst — Tableau</span>
                  <span className="text-[1.35cqw] text-gray-400">2018 – 2021</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Engineered unified customer attribution datasets and automated schedules." colorClass="text-gray-300" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.65cqw] font-bold text-white">Data Scientist — Palantir Technologies</span>
                  <span className="text-[1.35cqw] text-gray-400">2017 – 2018</span>
                </div>
                <div className="space-y-[0.4cqw] mt-[0.3cqw]">
                  <BulletText text="Formulated prediction models forecasting resource limits on edge computing." colorClass="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-indigo-950 pt-[1cqw] mt-[1cqw]">
          <div className="grid grid-cols-3 gap-[0.8cqw]">
            <div className="p-[0.8cqw] bg-indigo-500/5 rounded-lg border border-indigo-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-mono font-black text-indigo-400 leading-none">$2.1M</span>
              <span className="text-[1.1cqw] font-mono uppercase font-bold text-gray-500 mt-[0.2cqw] tracking-wider leading-none">BI ROI</span>
            </div>
            <div className="p-[0.8cqw] bg-indigo-500/5 rounded-lg border border-indigo-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-mono font-black text-indigo-400 leading-none">+19%</span>
              <span className="text-[1.1cqw] font-mono uppercase font-bold text-gray-500 mt-[0.2cqw] tracking-wider leading-none">Lead Conv</span>
            </div>
            <div className="p-[0.8cqw] bg-indigo-500/5 rounded-lg border border-indigo-500/10 flex flex-col justify-center items-center text-center shadow-3xs">
              <span className="text-[2.2cqw] font-mono font-black text-indigo-400 leading-none">98%</span>
              <span className="text-[1.1cqw] font-mono uppercase font-bold text-gray-500 mt-[0.2cqw] tracking-wider leading-none">ATS Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 (42%) */}
      <div className="w-[42%] h-full bg-[#111827] text-gray-100 border border-gray-800 rounded-xl pt-[3.6cqw] pb-[3.6cqw] pl-[3.2cqw] pr-[3.2cqw] flex flex-col justify-between font-sans relative overflow-hidden shadow-xs">
        <div className="absolute top-[0.8cqw] right-[1cqw] bg-indigo-500/10 text-indigo-400 font-mono font-black tracking-widest text-[0.6cqw] uppercase px-[0.6cqw] py-[0.1cqw] rounded-sm select-none">
          Page 2
        </div>
        <div className="space-y-[1.6cqw]">
          {/* Header Continuity */}
          <div className="flex justify-between items-baseline border-b border-indigo-950 pb-[0.4cqw]">
            <span className="text-[1.65cqw] font-mono font-bold text-gray-200">ELENA ROSTOVA.DAT</span>
            <span className="text-[1.35cqw] text-gray-500 font-mono">Page_2</span>
          </div>

          {/* Representative Projects */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-indigo-300 tracking-wide uppercase border-b border-indigo-950 pb-[0.1cqw]">HISTORICAL_RECORDS</h5>
            <div className="space-y-[0.6cqw]">
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.5cqw] font-bold text-white">Data Architect — Oracle</span>
                  <span className="text-[1.35cqw] text-gray-400">2015 – 18</span>
                </div>
                <p className="text-[1.35cqw] text-gray-450 leading-tight mt-[0.1cqw]">Designed logical data models and schemas for CRM warehousing.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.5cqw] font-bold text-white">BI Analyst — IBM</span>
                  <span className="text-[1.35cqw] text-gray-400">2013 – 15</span>
                </div>
                <p className="text-[1.35cqw] text-gray-450 leading-tight mt-[0.1cqw]">Compiled global finance reports and SQL business logs.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.5cqw] font-bold text-white">Junior Data Analyst — Accenture</span>
                  <span className="text-[1.35cqw] text-gray-400">2011 – 13</span>
                </div>
                <p className="text-[1.35cqw] text-gray-450 leading-tight mt-[0.1cqw]">Cleaned, formatted, and validated raw client database datasets.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[1.5cqw] font-bold text-white">Database Administrator — HP Enterprise</span>
                  <span className="text-[1.35cqw] text-gray-400">2009 – 11</span>
                </div>
                <p className="text-[1.35cqw] text-gray-450 leading-tight mt-[0.1cqw]">Configured replication topologies and query indexing schedules.</p>
              </div>
            </div>
          </div>



          {/* Certifications */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-indigo-300 tracking-wide uppercase border-b border-indigo-950 pb-[0.1cqw]">CERTIFICATIONS</h5>
            <div className="space-y-[0.3cqw]">
              <BulletText text="Tableau Desktop Certified Pro" colorClass="text-gray-300" />
              <BulletText text="Snowflake Core Certification" colorClass="text-gray-300" />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-[0.5cqw]">
            <h5 className="text-[1.8cqw] font-mono font-bold text-indigo-300 tracking-wide uppercase border-b border-indigo-950 pb-[0.1cqw]">EDUCATION</h5>
            <div>
              <div className="text-[1.5cqw] font-bold text-white leading-tight font-mono">M.S. Business Analytics</div>
              <p className="text-[1.35cqw] text-gray-400 leading-none mt-[0.1cqw]">University of Texas (Austin)</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="space-y-[0.5cqw] border-t border-indigo-950 pt-[1cqw] mt-[0.8cqw]">
          <div className="grid grid-cols-2 gap-[0.8cqw] font-mono text-[1.2cqw]">
            <div>
              <h6 className="text-[1.35cqw] font-bold text-indigo-400 uppercase">VOLUNTEER</h6>
              <p className="text-gray-450 leading-tight">Data Volunteer, Datakind Initiatives</p>
            </div>
            <div>
              <h6 className="text-[1.35cqw] font-bold text-indigo-400 uppercase">AWARDS</h6>
              <p className="text-gray-450 leading-tight">Tableau Data Hero (2022)</p>
            </div>
          </div>
          <div className="text-[1.10cqw] text-slate-500 font-mono flex justify-between pt-[0.4cqw] border-t border-indigo-950 select-none">
            <span>Pub: ETL Scale Orchestration</span>
            <span>References: On Demand</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Router for our premium tailored templates mapped to match actual slugs
  if (slug === 'executive-elite' || slug === 'classic') return renderClassic();
  if (slug === 'finance-authority') return renderClassic();
  if (slug === 'legal-professional') return renderClassic();
  if (slug === 'government-professional') return renderClassic();
  if (slug === 'education-leader') return renderDataAnalyst();
  
  if (slug === 'corporate-pro' || slug === 'minimalist') return renderMinimalist();
  if (slug === 'modern-tech' || slug === 'modern') return renderModern();
  
  if (slug === 'creative-edge' || slug === 'creative') return renderCreative();
  if (slug === 'personal-brand') return renderCreative();
  
  if (slug === 'healthcare-professional' || slug === 'healthcare') return renderHealthcare();
  if (slug === 'data-analyst') return renderDataAnalyst();

  // Robust Fallback: Default render in case of non-matched slug
  return (
    <div className="flex gap-[1.5cqw] w-full h-full p-[1cqw] bg-stone-100/60 rounded-2xl select-none" style={{ containerType: 'inline-size' }}>
      <div className="w-[58%] h-full bg-white border border-stone-200/60 rounded-xl p-[3.2cqw] flex flex-col justify-between">
        <div className="text-[2cqw] font-bold">Page 1 ({slug})</div>
        <div className="w-full h-4 bg-stone-100 rounded" />
        <div className="w-full h-20 bg-stone-50 rounded" />
      </div>
      <div className="w-[42%] h-full bg-white border border-stone-200/60 rounded-xl p-[3.2cqw] flex flex-col justify-between">
        <div className="text-[2cqw] font-bold">Page 2</div>
        <div className="w-full h-4 bg-stone-100 rounded" />
        <div className="w-full h-20 bg-stone-50 rounded" />
      </div>
    </div>
  );
};
