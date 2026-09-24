/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroScene } from '../components/QuantumScene';
import { SEO } from '../components/SEO';
import { SoftwareApplicationSchema, FAQSchema } from '../components/Schema';
import seoJson from '../../content/seo.json';
import { 
  ArrowDown, ShieldCheck, CheckCircle, HelpCircle,
  Sparkles, UserX, Monitor, Lock
} from 'lucide-react';
import { motion } from 'motion/react';

import homepageContent from '../../content/homepage.json';
import BLOG_POSTS from '../../content/blogs.json';
import { HomepageContent } from '../../types/content';
import { resumeTemplates1Page, resumeTemplates2Page } from '../data/templatesData';

const typedHomepageContent = homepageContent as HomepageContent;

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'1-page' | '2-page'>('1-page');

  const handleNavigateToBuilder = (format: '1-page' | '2-page') => {
    navigate(`/resume-builder?format=${format}`, { state: { format } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleTemplateClick = (slug: string) => {
    const formatQuery = activeTab === '1-page' ? '1-page' : '2-page';
    navigate(`/resume-builder?format=${formatQuery}&template=${slug}`, { state: { format: formatQuery } });
    window.scrollTo(0, 0);
  };

  // 4 Resume Templates to preview (1-Pager)
  const resumeTemplates1Page = [
    {
      slug: "classic",
      name: "Classic Executive",
      tag: "Corporate",
      preview: (
        <div className="p-[3.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-hidden" style={{fontFamily: 'Georgia, serif'}}>
          <div>
            {/* Name & Title Header */}
            <div className="border-b-[0.5cqw] border-[#1C2B33] pb-[1.5cqw] mb-[2cqw] text-center">
              <div style={{fontSize:'8.5cqw', fontWeight:'bold', color:'#1C2B33', letterSpacing:'0.05em', lineHeight:'1.1'}}>MARGARET CHEN, CPA</div>
              <div style={{fontSize:'4.6cqw', color:'#0F766E', fontWeight:'600', marginTop:'0.5cqw', letterSpacing:'0.08em'}}>CHIEF FINANCIAL OFFICER (CFO)</div>
              <div style={{fontSize:'2.8cqw', color:'#46504D', marginTop:'0.5cqw'}}>New York, NY • m.chen@email.com • (212) 555-0182 • linkedin.com/in/mchen</div>
            </div>

            {/* Summary */}
            <div className="mb-[2cqw]">
              <div style={{fontSize:'3.6cqw', fontWeight:'bold', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.08em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>PROFESSIONAL SUMMARY</div>
              <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.46'}}>Strategic, high-impact CFO with 14+ years scaling multi-national finance divisions across Fortune 500 environments. Expert in corporate development, capital restructuring, and board reporting. Orchestrated Series C debt refinancing, securing $45M, and facilitated a major IPO with a $400M valuation exit. Deliver double-digit margin enhancements.</div>
            </div>

            {/* Experience */}
            <div className="mb-[2cqw]">
              <div style={{fontSize:'3.6cqw', fontWeight:'bold', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.08em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>PROFESSIONAL EXPERIENCE</div>
              
              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'bold', color:'#1C2B33'}}>
                  <span>CFO — Meridian Capital Group</span><span style={{color:'#46504D', fontWeight:'400'}}>2020 – Pres</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Spearheaded all global risk assessment, commercial treasury operations, and $180M multi-entity budgets.<br/>
                  • Reduced quarterly corporate overhead by 18% through workflow automation and centralized business intelligence.<br/>
                  • Successfully led global finance team of 24 in raising $45M series C financing and debt restructuring covenants.
                </div>
              </div>

              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'bold', color:'#1C2B33'}}>
                  <span>VP of Finance — Sterling Holdings</span><span style={{color:'#46504D', fontWeight:'400'}}>2016 – 2020</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Governed strict P&L accountability for $75M capital portfolio, auditing and realigning tax structures.<br/>
                  • Accelerated transactional close processes by 4 days utilizing SAP S/4HANA ERP systems migration.<br/>
                  • Implemented cash flow strategies yielding $4.2M in annual recurring working capital enhancements.
                </div>
              </div>

              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'bold', color:'#1C2B33'}}>
                  <span>Senior Financial Analyst — Goldman Sachs</span><span style={{color:'#46504D', fontWeight:'400'}}>2011 – 2016</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Executed statistical modeling for tech-sector advisory portfolios, advising on 11 public transactions.<br/>
                  • Formulated regulatory SEC financial reporting models (10-K, 10-Q) with high compliance accuracy.
                </div>
              </div>
            </div>

            {/* Education & Certs split row */}
            <div style={{display:'grid', gridTemplateColumns:'55% 45%', gap:'4cqw', marginBottom:'2cqw'}}>
              <div>
                <div style={{fontSize:'3.6cqw', fontWeight:'bold', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.08em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>EDUCATION</div>
                <div style={{fontSize:'2.9cqw', color:'#1C2B33', fontWeight:'600'}}>MBA, Finance — Wharton</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D'}}>UPenn • GPA 3.9</div>
                <div style={{fontSize:'2.9cqw', color:'#1C2B33', fontWeight:'600', marginTop:'0.5cqw'}}>B.S. Economics — NYU Stern</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D'}}>Summa Cum Laude</div>
              </div>
              <div>
                <div style={{fontSize:'3.6cqw', fontWeight:'bold', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.08em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>CERTIFICATIONS</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38'}}>
                  • Certified Public Accountant (CPA)<br/>
                  • Chartered Financial Analyst (CFA)<br/>
                  • Wharton CFO Academy (2021)<br/>
                  • SEC Regulatory Reporting Cert
                </div>
              </div>
            </div>
          </div>

          {/* Skills / Footer */}
          <div>
            <div style={{fontSize:'3.6cqw', fontWeight:'bold', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.08em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>CORE COMPETENCIES</div>
            <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.46'}}>
              Financial Planning & Analysis (FP&A) • Treasury Management • GAAP/IFRS Standards • M&A Strategic Due Diligence • ERP Systems Configuration • Investor & Board Communications • Tax Shield Strategy • SOX Compliance Audit • Venture Capital Restructuring • Active Portfolio Risk Governance
            </div>
          </div>
        </div>
      )
    },
    {
      slug: "modern",
      name: "Tech Pro",
      tag: "Popular",
      preview: (
        <div className="p-[3.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-hidden" style={{fontFamily: 'system-ui, sans-serif'}}>
          <div>
            {/* Header */}
            <div className="mb-[2cqw]">
              <div style={{fontSize:'8.5cqw', fontWeight:'800', color:'#1C2B33'}}>ALEX RIVERA</div>
              <div style={{fontSize:'4.6cqw', color:'#0F766E', fontWeight:'700', marginTop:'0.5cqw'}}>Senior Full-Stack Engineer</div>
              <div style={{fontSize:'2.8cqw', color:'#46504D', marginTop:'0.5cqw'}}>San Francisco, CA • a.rivera@dev.io • github.com/arivera • (415) 555-0293 • linkedin.com/in/arivera</div>
              <div style={{height:'1px', background:'#0F766E', marginTop:'1.5cqw'}}></div>
            </div>

            {/* Summary */}
            <div className="mb-[2cqw]">
              <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.46'}}>Results-driven Full-Stack Engineer with 7+ years of experience engineering secure, scalable software products. Achieved major architectural upgrades for 2M+ active environments. Proficient in TypeScript, React, Go, Node.js, and multi-cloud distributed systems. Champion of automated CI/CD methodologies and developer toolchain optimization.</div>
            </div>

            {/* Experience */}
            <div className="mb-[2cqw]">
              <div style={{fontSize:'3.6cqw', fontWeight:'700', color:'#0F766E', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1cqw'}}>WORK EXPERIENCE</div>
              
              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                  <span>Senior Software Engineer — Notion</span><span style={{color:'#46504D', fontWeight:'400'}}>2022 – Pres</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Rebuilt editing rendering pipeline, reducing initial load latency by 55% across 1.8M active enterprise workspaces.<br/>
                  • Spearheaded seamless Webpack migration to Vite and Turborepo, reducing core CI build pipelines from 14 minutes to 3.5 minutes.<br/>
                  • Led cross-team mentorship of 4 junior developers and governed robust code review processes.
                </div>
              </div>

              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                  <span>Software Engineer II — Stripe</span><span style={{color:'#46504D', fontWeight:'400'}}>2019 – 2022</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Designed responsive dispute resolution workflow platform, securely processing $4B+ in transaction volume.<br/>
                  • Architected high-throughput Redis caching layers, scaling API endpoint performance from 340ms to 82ms p99.<br/>
                  • Engineered localized token authentication layers to align internal checkout interfaces with global security standards.
                </div>
              </div>

              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                  <span>Full Stack Developer — Airbnb</span><span style={{color:'#46504D', fontWeight:'400'}}>2018 – 2019</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Engineered responsive localized features in React & Node, elevating APAC booking checkout completion rates by 14%.
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div style={{marginBottom:'2cqw', borderTop:'0.5px solid #E2E8E6', paddingTop:'2cqw'}}>
              <div style={{fontSize:'3.6cqw', fontWeight:'700', color:'#0F766E', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5cqw'}}>CERTIFICATIONS</div>
              <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38'}}>
                • AWS Certified Solutions Architect &nbsp;&bull;&nbsp; Certified Kubernetes Administrator (CKA) &nbsp;&bull;&nbsp; Advanced Scrum Alliance CSM Degree
              </div>
            </div>
          </div>

          <div>
            {/* Tech Stack */}
            <div style={{fontSize:'3.6cqw', fontWeight:'700', color:'#0F766E', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1cqw'}}>TECH STACK & SKILLS</div>
            <div style={{display:'flex', flexWrap:'wrap', gap:'1cqw'}}>
              {['TypeScript','React & Next.js','Node.js','Go','PostgreSQL','Redis','AWS Cloud','GCP','Docker','Kubernetes','CI/CD','GraphQL','Terraform','Webpack/Vite','Jest/Playwright'].map(s => (
                <span key={s} style={{fontSize:'2.3cqw', background:'#F7F9F8', border:'0.5px solid #E2E8E6', color:'#0F766E', padding:'0.5cqw 1.5cqw', borderRadius:'1.5px', fontWeight:'600'}}>{s}</span>
              ))}
            </div>
            
            {/* Education */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:'2cqw', borderTop:'0.5px solid #E2E8E6', paddingTop:'2cqw'}}>
              <span style={{fontSize:'2.9cqw', fontWeight:'700', color:'#1C2B33'}}>B.S. CS — UC Berkeley</span>
              <span style={{fontSize:'2.7cqw', color:'#46504D'}}>GPA 3.8 / Dean's List / Class of 2018</span>
            </div>
          </div>
        </div>
      )
    },
    {
      slug: "minimalist",
      name: "Minimalist Slate",
      tag: "ATS Safe",
      preview: (
        <div className="p-[4.5cqw] bg-white h-full flex flex-col justify-between text-left overflow-hidden" style={{fontFamily:'system-ui, sans-serif'}}>
          <div>
            {/* Header */}
            <div className="mb-[2cqw]">
              <div style={{fontSize:'9cqw', fontWeight:'300', color:'#1C2B33', letterSpacing:'-0.02em', lineHeight:'1.1'}}>James Whitmore, PMP</div>
              <div style={{fontSize:'4.6cqw', color:'#46504D', marginTop:'0.5cqw', fontWeight:'400'}}>Operations & Logistics Director</div>
              <div style={{height:'0.5px', background:'#E2E8E6', margin:'2.5cqw 0'}}></div>
              <div style={{fontSize:'2.8cqw', color:'#46504D'}}>Chicago, IL  •  j.whitmore@ops.com  •  (312) 555-0147  •  linkedin.com/in/jameswhitmore</div>
            </div>

            {/* Profile Summary */}
            <div className="mb-[2cqw]">
              <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.15em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>Professional Profile</div>
              <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.46'}}>Efficient, strategic-focused Director of Operations with over 10 years of success managing high-performing shipping hubs, regional warehouse logistics networks, and complex vendor negotiations. Proven leader in boosting last-mile efficiency metrics, controlling operating leakage, and introducing modern WMS. Certified PMP & Six Sigma specialist.</div>
            </div>

            {/* Experience */}
            <div className="mb-[2cqw]">
              <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.15em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>Experience</div>
              
              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', color:'#1C2B33', fontWeight:'600'}}>
                  <span>Director of Operations — Apex Logistics</span><span style={{fontWeight:'400', color:'#46504D'}}>2021 – Pres</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Directed cross-functional shipping, receiving, and warehouse operations across 3 regional distribution centers with 34 personnel.<br/>
                  • Reduced regional last-mile shipping overhead by 23% by renegotiating carrier route schedules and service contract tiers.<br/>
                  • Secured 99.2% overall SLA fulfillment rating across all enterprise accounts in fiscal years 2023 and 2024.
                </div>
              </div>

              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', color:'#1C2B33', fontWeight:'600'}}>
                  <span>Operations Manager — BlueLine Supply Co.</span><span style={{fontWeight:'400', color:'#46504D'}}>2017 – 2021</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Maintained daily inventory management flows mapping over $28M in consumer supply commodities, decreasing physical shrinkage rate by 11%.<br/>
                  • Integrated streamlined automated Warehouse Management Software (WMS), lowering order picking errors down to 0.4%.
                </div>
              </div>

              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', color:'#1C2B33', fontWeight:'600'}}>
                  <span>Logistics Coordinator — FedEx Ground</span><span style={{fontWeight:'400', color:'#46504D'}}>2014 – 2017</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Supervised loading, tracking dispatch workflows, and safety verification compliance procedures for 14 fleet delivery vehicles daily.
                </div>
              </div>
            </div>

            {/* Certifications & Education Split Column */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4cqw'}}>
              <div>
                <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.15em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>Certifications</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38'}}>
                  • Project Management Professional (PMP)<br/>
                  • Lean Six Sigma Green Belt Certification<br/>
                  • OSHA 30-Hour General Industry Compliance
                </div>
              </div>
              <div>
                <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.15em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>Education</div>
                <div style={{fontSize:'2.9cqw', color:'#1C2B33', fontWeight:'500'}}>B.S. Business Administration</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D'}}>University of Illinois • 2014 • GPA 3.7</div>
              </div>
            </div>
          </div>

          <div style={{borderTop:'0.5px solid #E2E8E6', paddingTop:'1.5cqw', marginTop:'1.5cqw'}}>
            <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:'0.5cqw'}}>Strategic Skills</div>
            <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38'}}>
              Supply Chain Routing Optimization • Enterprise Business P&L Management • WMS ERP Application Tools • Lean Logistics Workflow Process Design • Multi-Level Vendor Negotiation • Performance Metrics KPI Dashboard Reporting • Cross-Functional Staff Mentorship • Fleet Maintenance Scheduling
            </div>
          </div>
        </div>
      )
    },
    {
      slug: "creative",
      name: "Creative Canvas",
      tag: "Bold",
      preview: (
        <div className="bg-white h-full flex text-left overflow-hidden" style={{fontFamily:'system-ui, sans-serif'}}>
          {/* Dark Sidebar */}
          <div className="flex flex-col justify-between p-[2.5cqw]" style={{width:'33%', background:'#1C2B33', minHeight:'100%'}}>
            {/* Initials & details */}
            <div>
              <div style={{fontSize:'11cqw', fontWeight:'800', color:'#8CFBD4', lineHeight:'1', marginBottom:'3cqw'}}>SL</div>
              <div style={{height:'1px', background:'rgba(140,251,212,0.3)', marginBottom:'3cqw'}}></div>
              
              <div style={{fontSize:'3.6cqw', fontWeight:'700', color:'#8CFBD4', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.5cqw'}}>Contact</div>
              <div style={{fontSize:'2.7cqw', color:'rgba(255,255,255,0.7)', lineHeight:'1.5'}}>Sofia Lark<br/>Brooklyn, NY<br/>s.lark@studio.io<br/>(718) 555-0364<br/>linkedin.com/in/sofialark</div>
              
              <div style={{height:'1px', background:'rgba(140,251,212,0.2)', margin:'3cqw 0'}}></div>
              
              <div style={{fontSize:'3.6cqw', fontWeight:'700', color:'#8CFBD4', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.5cqw'}}>Expertise</div>
              <div style={{fontSize:'2.7cqw', color:'rgba(255,255,255,0.75)', lineHeight:'1.6'}}>Figma / Sketch<br/>Motion Mockups<br/>B2C Product Strategy<br/>React / Framer<br/>Ad Directing<br/>UX User Research<br/>Heuristic Evaluation</div>

              <div style={{height:'1px', background:'rgba(140,251,212,0.2)', margin:'3cqw 0'}}></div>

              <div style={{fontSize:'3.6cqw', fontWeight:'700', color:'#8CFBD4', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.5cqw'}}>Awards</div>
              <div style={{fontSize:'2.7cqw', color:'rgba(255,255,255,0.7)', lineHeight:'1.5'}}>• Awwwards Site of the Day<br/>• Webby UX Design 2024<br/>• AIGA NY Excellence</div>
              
              <div style={{height:'1px', background:'rgba(140,251,212,0.2)', margin:'3cqw 0'}}></div>

              <div style={{fontSize:'3.6cqw', fontWeight:'700', color:'#8CFBD4', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.5cqw'}}>Certs</div>
              <div style={{fontSize:'2.7cqw', color:'rgba(255,255,255,0.7)', lineHeight:'1.5'}}>• NN/g UX Master #4829<br/>• Google UX Cert</div>
            </div>
            <div style={{fontSize:'2.7cqw', color:'rgba(140,251,212,0.5)', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:'5cqw'}}>sofialark.design</div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col justify-between p-[3.5cqw]" style={{width:'67%'}}>
            <div>
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'8.5cqw', fontWeight:'800', color:'#1C2B33', lineHeight:'1.1'}}>SOFIA LARK</div>
                <div style={{fontSize:'4.6cqw', color:'#0F766E', fontWeight:'700', marginTop:'0.5cqw'}}>Creative Director & Experience Lead</div>
                <div style={{height:'1px', background:'#8CFBD4', marginTop:'1.5cqw', width:'60%'}}></div>
              </div>

              <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.46', marginBottom:'2.5cqw'}}>
                Award-winning creative director with 9+ years defining unified digital experience, brand identity, and design infrastructure for global clients. Raised campaign retention standards by 38%, accelerating consumer interest.
              </div>

              <div style={{fontSize:'3.6cqw', fontWeight:'700', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'1.5cqw', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw'}}>Experience</div>

              <div style={{marginBottom:'2cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                  <span>Creative Director — Wren Studio</span><span style={{color:'#46504D', fontWeight:'400'}}>2021 – Pres</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Orchestrated comprehensive end-to-end rebranding for 20+ consumer tech products, generating an average 38% conversion increase.<br/>
                  • Mentored and empowered a high-performing multi-disciplinary team of 7 senior artists and content strategists across remote hubs.
                </div>
              </div>

              <div style={{marginBottom:'2cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                  <span>Senior UX Designer — Instrument</span><span style={{color:'#46504D', fontWeight:'400'}}>2018 – 2021</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Designed interactive prototype experience mockups for the flagship Nike Mobile App, resulting in a 28% increase in Day-30 customer retention. <br/>
                  • Drafted unified interactive motion systems and visual style guidelines adopted across top cloud services accounts.
                </div>
              </div>
              
              <div style={{marginBottom:'2.5cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                  <span>Interaction Designer — Digital Ocean</span><span style={{color:'#46504D', fontWeight:'400'}}>2015 – 2018</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Spearheaded interface optimization auditing, reducing billing support request tickets by 17% through intuitive layout navigation blocks.
                </div>
              </div>
            </div>

            <div>
              {/* Special Projects & Education */}
              <div style={{borderTop:'0.5px solid #E2E8E6', paddingTop:'2cqw'}}>
                <div>
                  <div style={{fontSize:'3.4cqw', fontWeight:'700', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.12em', paddingBottom:'0.5cqw', marginBottom:'0.5cqw'}}>Education</div>
                  <div style={{fontSize:'2.9cqw', fontWeight:'600', color:'#1C2B33'}}>BFA Graphic Design — Parsons</div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D'}}>2015 • Cum Laude Honors • Senator's Scholarship Panel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // 2 Resume Templates to preview (2-Pager)
  const resumeTemplates2Page = [
    {
      slug: "classic",
      name: "Classic Executive Extended",
      tag: "Leadership",
      preview: (
        <div className="bg-white h-full flex flex-col text-left overflow-hidden" style={{fontFamily:'Georgia, serif'}}>
          {/* PAGE 1 */}
          <div className="p-[3.5cqw] flex flex-col justify-between overflow-hidden" style={{flex:'0 0 50%', borderBottom:'1.5px dashed #E2E8E6', position:'relative'}}>
            <div style={{position:'absolute', top:'1px', right:'2px', fontSize:'2.5cqw', color:'#E2E8E6', textTransform:'uppercase', letterSpacing:'0.1em'}}>Page 1</div>
            
            <div>
              {/* Header */}
              <div style={{textAlign:'center', borderBottom:'1.5px solid #1C2B33', paddingBottom:'1.5cqw', marginBottom:'1.5cqw'}}>
                <div style={{fontSize:'8.5cqw', fontWeight:'bold', color:'#1C2B33', letterSpacing:'0.05em', lineHeight:'1.1'}}>RICHARD HARLOW, CFA</div>
                <div style={{fontSize:'4.6cqw', color:'#0F766E', fontWeight:'600', marginTop:'0.5cqw', letterSpacing:'0.08em'}}>CHIEF EXECUTIVE OFFICER</div>
                <div style={{fontSize:'2.8cqw', color:'#46504D', marginTop:'1cqw'}}>Boston, MA • r.harlow@executive.com • (617) 555-0291 • linkedin.com/in/richardharlow</div>
              </div>

              {/* Executive Summary */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'0.1em', color:'#1C2B33', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>EXECUTIVE SUMMARY</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.46'}}>Visionary CEO with 18+ years scaling B2B SaaS and enterprise technology companies from growth-stage to acquisition with significant shareholder value enhancement. Orchestrated $280M in M&A transactions, raised $120M in venture capital across 3 funding rounds, and delivered 3 successful high-valuation portfolio exits. Highly skilled in board governance, venture relations, cross-functional organizational alignment, and multi-track revenue development.</div>
              </div>

              {/* Core Competencies */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'0.1em', color:'#1C2B33', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>CORE STRATEGIC COMPETENCIES</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8cqw', fontSize:'2.6cqw', color:'#46504D'}}>
                  <span>• Comprehensive P&L Management ($120M+)</span><span>• Enterprise M&A Strategy & Post-Merger Integration</span>
                  <span>• Multi-tier Joint Ventures & Alliances</span><span>• Enterprise Sales & Complex GTM Strategy</span>
                  <span>• Progressive Board Governance & Compliance</span><span>• SaaS Scaled Expansion & Product Optimization</span>
                  <span>• Restructuring & Capital Allocation</span><span>• High-Performance Corporate Culture Building</span>
                </div>
              </div>
            </div>

            {/* Experience P1 */}
            <div>
              <div style={{fontSize:'3.4cqw', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'0.1em', color:'#1C2B33', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>PROFESSIONAL EXPERIENCE</div>
              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'bold', color:'#1C2B33'}}>
                  <span>Chief Executive Officer — Vantage Systems Inc.</span><span style={{color:'#46504D', fontWeight:'400'}}>2019 – Present</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Expanded annual recurring revenue (ARR) from $18M initially to $104M in 4 fiscal years via dedicated enterprise conversion frameworks.<br/>
                  • Built and trained an executive leadership panel of 9 C-suite directors across Product, Engineering, and Global Customer Acquisition.<br/>
                  • Moderated and completed strategic acquisition negotiations of DataLoop AI ($34M), speeding up internal ML development roadmaps by 18 months.<br/>
                  • Slashed net monthly customer churn metrics from 4.2% to 0.9% by completely revamping customer success support structures.
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div className="p-[3.5cqw] flex flex-col justify-between overflow-hidden" style={{flex:'0 0 50%', position:'relative'}}>
            <div style={{position:'absolute', top:'1px', right:'2px', fontSize:'2.5cqw', color:'#E2E8E6', textTransform:'uppercase', letterSpacing:'0.1em'}}>Page 2</div>

            <div>
              {/* Experience continued */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'0.1em', color:'#1C2B33', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>EXPERIENCE (CONTINUED)</div>
                <div style={{marginBottom:'1.5cqw'}}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'bold', color:'#1C2B33'}}>
                    <span>President & Chief Operating Officer — Meridian Technologies</span><span style={{color:'#46504D', fontWeight:'400'}}>2015 – 2019</span>
                  </div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                    • Directed multi-site day-to-day corporate operations across 6 global offices, managing a $72M departmental operating budget.<br/>
                    • Facilitated institutional Series C capital fundraiser rounds totaling $55M led by Sequoia, completing subsequent corporate exit of $180M.<br/>
                    • Standardized strict corporate objectives via an OKR alignment framework, raising milestone completion indexes by 87%.
                  </div>
                </div>
                <div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'bold', color:'#1C2B33'}}>
                    <span>VP of Product Strategy — ClearPath Group</span><span style={{color:'#46504D', fontWeight:'400'}}>2010 – 2015</span>
                  </div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                    • Designed long-term customer pipeline expansion strategy, adding $40M in net incremental contract value over 5 years.<br/>
                    • Governed key partner portfolios consisting of 3 major Fortune 100 industrial firms, securing continued contract agreements.
                  </div>
                </div>
              </div>

              {/* Board & Advisory */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'0.1em', color:'#1C2B33', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>BOARD & ADVISORY ROLES</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.5'}}>
                  • <strong>Board Director:</strong> Elevate Ventures (Gov, Remuneration, Audit Committees) — 2022 – Present<br/>
                  • <strong>Advisory Member:</strong> TechStars Boston Startup Cohort Panel Reviewer — 2020 – Present<br/>
                  • <strong>Venture Mentor:</strong> Harvard Business School Innovation Lab (iLab) Advisor — 2019 – Present
                </div>
              </div>

              {/* Training and Certifications */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'0.1em', color:'#1C2B33', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>EXECUTIVE DEVELOPMENT & CERTIFICATIONS</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.5'}}>
                  • Chartered Financial Analyst (CFA) Charterholder — CFA Institute<br/>
                  • Wharton Certificate in Corporate Governance & Board Effectiveness — Wharton School of Business (2021)<br/>
                  • Strategic Leadership Executive Residency Training — Stanford Graduate School of Business (2018)
                </div>
              </div>
            </div>

            <div>
              {/* Education */}
              <div style={{marginBottom:'2cqw', borderTop:'0.5px solid #E2E8E6', paddingTop:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'0.1em', color:'#1C2B33', marginBottom:'0.5cqw'}}>EDUCATION</div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'2.9cqw', fontWeight:'700', color:'#1C2B33'}}>
                  <span>MBA, Corporate Strategy & Leadership — Harvard Business School</span>
                  <span style={{color:'#46504D', fontWeight:'400'}}>Baker Scholar (Top 5%) • 2006</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'2.9cqw', fontWeight:'700', color:'#1C2B33', marginTop:'0.5cqw'}}>
                  <span>B.S. Economics & Philosophy — Yale University</span>
                  <span style={{color:'#46504D', fontWeight:'400'}}>Summa Cum Laude • Phi Beta Kappa • 2003</span>
                </div>
              </div>

              {/* Publications */}
              <div style={{borderTop:'0.5px solid #E2E8E6', paddingTop:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'0.1em', color:'#1C2B33', marginBottom:'0.5cqw'}}>PUBLICATIONS & SPEAKING ENGAGEMENTS</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.46'}}>
                  "Scaling B2B Enterprise SaaS Past $100M ARR Guidelines" — Harvard Business Review (HBR), Feb 2023 &nbsp;•&nbsp; Featured Contributor on Corporate Strategy — Forbes Technology Council Panelists &nbsp;•&nbsp; Keynote Presenter: SaaStr Annual Tech Leadership Summit (FY24 / FY25)
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      slug: "modern",
      name: "Tech Pro Extended",
      tag: "Engineering",
      preview: (
        <div className="bg-white h-full flex flex-col text-left overflow-hidden" style={{fontFamily:'system-ui, sans-serif'}}>
          {/* PAGE 1 */}
          <div className="p-[3.5cqw] flex flex-col justify-between overflow-hidden" style={{flex:'0 0 50%', borderBottom:'1.5px dashed #E2E8E6', position:'relative'}}>
            <div style={{position:'absolute', top:'1px', right:'2px', fontSize:'2.5cqw', color:'#E2E8E6', textTransform:'uppercase', letterSpacing:'0.1em'}}>Page 1</div>

            <div>
              {/* Header */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'8.5cqw', fontWeight:'800', color:'#1C2B33'}}>PRIYA NAIR</div>
                <div style={{fontSize:'4.6cqw', color:'#0F766E', fontWeight:'700', marginTop:'0.5cqw'}}>Principal Software Architect</div>
                <div style={{height:'1px', background:'#0F766E', margin:'1.5cqw 0'}}></div>
                <div style={{fontSize:'2.8cqw', color:'#46504D'}}>Seattle, WA • p.nair@arch.dev • github.com/priyanair • (206) 555-0173 • linkedin.com/in/priyanair</div>
              </div>

              {/* Summary */}
              <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.46', marginBottom:'2cqw'}}>
                Innovative, highly technical Principal Systems Architect with 12+ years of expertise designing globally distributed databases, transaction engines, and core SaaS platforms for hyper-scale environments. Successfully led architectural blueprints for cloud platforms processing 800M+ real-time API transactions daily. Proven capability in engineering organizational design, platform tooling implementation, and mentoring staff.
              </div>

              {/* Skills Grid */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'700', color:'#0F766E', textTransform:'uppercase', letterSpacing:'0.12em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>TECH STACK & CORE EXPERTISE</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8cqw'}}>
                  {[
                    ['Languages','Go, Rust, TypeScript, Python, C++, Java, Scala, SQL'],
                    ['Cloud & Infra','Kubernetes, Terraform, AWS, GCP, Azure, Docker, Envoy'],
                    ['Databases & Cache','PostgreSQL, Apache Cassandra, Redis Core, DynamoDB, MongoDB'],
                    ['Design Architectures','High-Throughput Microservices, Event Sourcing, CQRS, gRPC, REST']
                  ].map(([k,v]) => (
                    <div key={k} style={{fontSize:'2.6cqw'}}>
                      <span style={{fontWeight:'700', color:'#1C2B33'}}>{k}: </span>
                      <span style={{color:'#46504D'}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience P1 */}
            <div>
              <div style={{fontSize:'3.4cqw', fontWeight:'700', color:'#0F766E', textTransform:'uppercase', letterSpacing:'0.12em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>PROFESSIONAL EXPERIENCE</div>
              <div style={{marginBottom:'1cqw'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                  <span>Principal Architect — Amazon Web Services (AWS)</span><span style={{color:'#46504D', fontWeight:'400'}}>2020 – Present</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Designed multi-region active-active database replication protocol, successfully facilitating 800M requests daily under a strict 99.999% SLA uptime.<br/>
                  • Governed platform engineering tooling supporting over 12,000 corporate partners across AWS geographic regions (us-east/ap-south).<br/>
                  • Optimized server container consolidation clusters via automated bin-packing scheduling, reducing cloud asset expenditure by 64% over two years.<br/>
                  • Authored AWS internal publication "Scalable Platform Architectural Guidelines" utilized across 200+ micro-engineering squads.
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div className="p-[3.5cqw] flex flex-col justify-between overflow-hidden" style={{flex:'0 0 50%', position:'relative'}}>
            <div style={{position:'absolute', top:'1px', right:'2px', fontSize:'2.5cqw', color:'#E2E8E6', textTransform:'uppercase', letterSpacing:'0.1em'}}>Page 2</div>

            <div>
              {/* Experience continued */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'700', color:'#0F766E', textTransform:'uppercase', letterSpacing:'0.12em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>EXPERIENCE (CONTINUED)</div>
                <div style={{marginBottom:'1.5cqw'}}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                    <span>Staff Systems Engineer — Uber Technologies</span><span style={{color:'#46504D', fontWeight:'400'}}>2016 – 2020</span>
                  </div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                    • Directed absolute overhaul of dispatch matching matrix algorithms, decreasing globally aggregated driver ETA metrics by 22%.<br/>
                    • Spearheaded Uber Surge Pricing messaging buffer pipeline, stably supporting peak streaming loads of over 4M message events/sec.<br/>
                    • Standardized gRPC across 40+ microservices dependencies, trimming serialization bandwidth usage overhead by 35%.
                  </div>
                </div>
                <div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                    <span>Senior Software Engineer — Palantir Technologies</span><span style={{color:'#46504D', fontWeight:'400'}}>2012 – 2016</span>
                  </div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                    • Created custom real-time transactional ingestion pipeline parsing 50TB of streaming data daily for defense intelligence software client suites.<br/>
                    • Implemented database optimization routines, compressing querying response lookup intervals by 8x on multi-PB scale warehouses.
                  </div>
                </div>
              </div>

              {/* Open Source & Certs split */}
              <div style={{display:'grid', gridTemplateColumns:'55% 45%', gap:'6cqw', marginBottom:'1.5cqw'}}>
                <div>
                  <div style={{fontSize:'3.4cqw', fontWeight:'700', color:'#0F766E', textTransform:'uppercase', letterSpacing:'0.12em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>OPEN SOURCE & PUBLICATIONS</div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.3'}}>
                    • <strong>github.com/priyanair/distrib-cache:</strong> High-performance distributed in-memory cache. 4,200+ stars, 180+ global contributors.<br/>
                    • "Zero-Downtime DB Migrations at Scale" — ACM Queue Press Publication (2023)<br/>
                    • "Symmetric Event-Driven Sourcing" — Keynote, QCon (2022)
                  </div>
                </div>
                <div>
                  <div style={{fontSize:'3.4cqw', fontWeight:'700', color:'#0F766E', textTransform:'uppercase', letterSpacing:'0.12em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>CERTIFICATIONS</div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.3'}}>
                    • AWS Certified Corporate Fellow<br/>
                    • Certified Kubernetes Security Specialist (CKS)<br/>
                    • HashiCorp Certified Associate (Terraform)
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Patents */}
              <div style={{marginBottom:'2cqw', borderTop:'0.5px solid #E2E8E6', paddingTop:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'700', color:'#0F766E', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'0.5cqw'}}>PATENTS</div>
                <div style={{fontSize:'2.6cqw', color:'#46504D', lineHeight:'1.3'}}>
                  • US Patent #11,234,567: "Adaptive Load Routing Protocols across Heterogeneous Computing Entities" (AWS Corp, Issued 2022)<br/>
                  • US Patent #10,987,654: "Zero-Overhead Event Stream Deduplication Methods using Temporal Filters" (Uber Tech, Issued 2020)
                </div>
              </div>

              {/* Education */}
              <div style={{borderTop:'0.5px solid #E2E8E6', paddingTop:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'700', color:'#0F766E', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'0.5cqw'}}>EDUCATION</div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'2.8cqw', fontWeight:'700', color:'#1C2B33'}}>
                  <span>M.S. Computer Science — Carnegie Mellon University</span>
                  <span style={{color:'#46504D', fontWeight:'400'}}>Specialization: Distributed Systems • GPA 4.0 • 2012</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      slug: "minimalist",
      name: "Minimalist Slate Extended",
      tag: "ATS Safe",
      preview: (
        <div className="bg-white h-full flex flex-col text-left overflow-hidden" style={{fontFamily:'system-ui, sans-serif'}}>
          {/* PAGE 1 */}
          <div className="p-[3.5cqw] flex flex-col justify-between overflow-hidden" style={{flex:'0 0 50%', borderBottom:'1.5px dashed #E2E8E6', position:'relative'}}>
            <div style={{position:'absolute', top:'1px', right:'2px', fontSize:'2.5cqw', color:'#E2E8E6', textTransform:'uppercase', letterSpacing:'0.1em'}}>Page 1</div>
            
            <div>
              {/* Header */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'8.5cqw', fontWeight:'300', color:'#1C2B33', letterSpacing:'-0.01em'}}>JAMES WHITMORE, PMP</div>
                <div style={{fontSize:'4.6cqw', color:'#46504D', marginTop:'0.5cqw', fontWeight:'500'}}>DIRECTOR OF OPERATIONS & LOGISTICS INFRASTRUCTURE</div>
                <div style={{height:'1px', background:'#E2E8E6', margin:'1.5cqw 0'}}></div>
                <div style={{fontSize:'2.8cqw', color:'#46504D'}}>Chicago, IL • j.whitmore@ops.com • (312) 555-0147 • linkedin.com/in/jameswhitmore</div>
              </div>

              {/* Profile Summary */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.12em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>PROFESSIONAL MATRIX</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.46'}}>Efficient, strategic-focused Director of Operations with over 10 years of success managing high-performing shipping hubs, regional warehouse logistics networks, and complex vendor negotiations. Champion of Lean workflow architectures, multi-facility distribution matrix systems, and automated supply integrations. Deliver major operating expenditure reductions.</div>
              </div>

              {/* Core Competencies */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.12em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>OPERATING RANGE & EXPERTISE</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8cqw', fontSize:'2.6cqw', color:'#46504D'}}>
                  <span>• Regional Supply Chain Logistics Setup</span><span>• ERP & WMS Database Administration</span>
                  <span>• Strategic Multi-Level Vendor Contracts</span><span>• Continuous Process Improv (Six Sigma)</span>
                  <span>• Operating Budget P&L Supervision</span><span>• Standard Operating Procedure Blueprinting</span>
                  <span>• Inventory Shrink Control & Audits</span><span>• Professional Project Governance (PMP)</span>
                </div>
              </div>
            </div>

            {/* Work Experience P1 */}
            <div>
              <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.12em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>WORK EXPERIENCE (PAGE 1)</div>
              <div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'600', color:'#1C2B33'}}>
                  <span>Director of Operations & Safety — Apex Logistics Ltd.</span><span style={{color:'#46504D', fontWeight:'400'}}>2021 – Present</span>
                </div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                  • Oversee 3 multi-site distribution terminals housing 34 personnel, directing $18M in yearly operations budget.<br/>
                  • Slashed regional last-mile freight expenditure schedules by 23% by centralizing route routing schedules.<br/>
                  • Achieved 99.2% overall SLA customer performance ratings consistently throughout audited fiscal years.
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div className="p-[3.5cqw] flex flex-col justify-between overflow-hidden" style={{flex:'0 0 50%', position:'relative'}}>
            <div style={{position:'absolute', top:'1px', right:'2px', fontSize:'2.5cqw', color:'#E2E8E6', textTransform:'uppercase', letterSpacing:'0.1em'}}>Page 2</div>

            <div>
              {/* Experience Continued */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.12em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>EXPERIENCE (CONTINUED)</div>
                <div style={{marginBottom:'1.5cqw'}}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'600', color:'#1C2B33'}}>
                    <span>General Terminal Manager — BlueLine Supply Co.</span><span style={{color:'#46504D', fontWeight:'400'}}>2017 – 2021</span>
                  </div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                    • Governed inventory cataloging representing $28M in industrial elements, compressing item shrinkage rate by 11%.<br/>
                    • Standardized state-of-the-art Warehouse Management Platforms (WMS), reducing manual fulfillment inaccuracies to 0.4%.
                  </div>
                </div>
                <div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'600', color:'#1C2B33'}}>
                    <span>Primary Logistics Coordinator — FedEx Ground Hubs</span><span style={{color:'#46504D', fontWeight:'400'}}>2014 – 2017</span>
                  </div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                    • Managed vehicle dispatch loops, driver schedules, and federal security compliance checks for a cluster of 14 box trucks.
                  </div>
                </div>
              </div>

              {/* Credentials */}
              <div style={{marginBottom:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.12em', borderBottom:'0.5px solid #E2E8E6', paddingBottom:'0.5cqw', marginBottom:'1cqw'}}>PROFESSIONAL CREDENTIALS</div>
                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38'}}>
                  • Project Management Professional (PMP) &nbsp;&bull;&nbsp; Lean Six Sigma Green Belt Certification &nbsp;&bull;&nbsp; OSHA 30-Hour General Industry Safety
                </div>
              </div>
            </div>

            <div>
              {/* Education */}
              <div style={{borderTop:'0.5px solid #E2E8E6', paddingTop:'2cqw'}}>
                <div style={{fontSize:'3.4cqw', fontWeight:'600', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'0.5cqw'}}>ACADEMIC COMPLIANCE</div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'2.8cqw', fontWeight:'700', color:'#1C2B33'}}>
                  <span>B.S. Business Administration & Logistics — University of Illinois</span>
                  <span style={{color:'#46504D', fontWeight:'400'}}>Summa Cum Laude • Class of 2014</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      slug: "creative",
      name: "Creative Canvas Extended",
      tag: "Bold",
      preview: (
        <div className="bg-white h-full flex flex-col text-left overflow-hidden" style={{fontFamily:'system-ui, sans-serif'}}>
          {/* PAGE 1 */}
          <div className="p-0 flex overflow-hidden" style={{flex:'0 0 50%', borderBottom:'1.5px dashed #E2E8E6', position:'relative'}}>
            <div style={{position:'absolute', top:'1px', right:'2px', fontSize:'2.5cqw', color:'#E2E8E6', textTransform:'uppercase', letterSpacing:'0.1em', zIndex:10}}>Page 1</div>
            
            {/* Sidebar Left */}
            <div style={{width:'30%', background:'#1C2B33', padding:'3.5cqw', color:'white', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:'8.5cqw', fontWeight:'900', color:'#8CFBD4', marginBottom:'2cqw'}}>SL</div>
                <div style={{height:'1px', background:'rgba(140,251,212,0.3)', marginBottom:'2cqw'}}></div>
                
                <div style={{fontSize:'3.2cqw', fontWeight:'700', color:'#8CFBD4', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'0.5cqw'}}>Contact</div>
                <div style={{fontSize:'2.5cqw', color:'rgba(255,255,255,0.8)', lineHeight:'1.35', marginBottom:'2cqw'}}>
                  Sofia Lark<br/>Brooklyn, NY<br/>s.lark@studio.io<br/>(718) 555-0364
                </div>

                <div style={{fontSize:'3.2cqw', fontWeight:'700', color:'#8CFBD4', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'0.5cqw'}}>Creative Stack</div>
                <div style={{fontSize:'2.5cqw', color:'rgba(255,255,255,0.8)', lineHeight:'1.35'}}>
                  Figma / Sketch<br/>Motion Design<br/>System Assets<br/>React / Framer<br/>Heuristic Audits
                </div>
              </div>
              <div style={{fontSize:'2.4cqw', color:'rgba(140,251,212,0.4)'}}>sofialark.design</div>
            </div>

            {/* Main column Page 1 */}
            <div style={{width:'70%', padding:'3.5cqw', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div>
                <div style={{marginBottom:'2cqw'}}>
                  <div style={{fontSize:'8cqw', fontWeight:'800', color:'#1C2B33', lineHeight:'1'}}>SOFIA LARK</div>
                  <div style={{fontSize:'4.2cqw', color:'#0F766E', fontWeight:'700', marginTop:'0.5cqw'}}>Creative Director & Experience Lead</div>
                  <div style={{height:'1px', background:'#8CFBD4', marginTop:'1cqw', width:'50%'}}></div>
                </div>

                <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.46', marginBottom:'2.5cqw'}}>
                  Award-winning director with 9+ years defining unified experiences and design protocols for hyper-growth clients. Boosted initial campaign clickthrough indexes by 38% through system layouts.
                </div>

                <div style={{fontSize:'3.4cqw', fontWeight:'700', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.1em', paddingBottom:'0.5cqw', marginBottom:'1cqw', borderBottom:'0.5px solid #E2E8E6'}}>PROFESSIONAL ENGAGEMENT</div>
                
                <div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                    <span>Creative Director — Wren Studio</span><span style={{color:'#46504D', fontWeight:'400'}}>2021 – Present</span>
                  </div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                    • Reconstructed global brand architecture for 20+ consumer product lines, scoring substantial client validation rates.<br/>
                    • Supervised 7 remote visual curators, establishing modern interface design guidelines and publishing collaborative design kits.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div className="p-0 flex overflow-hidden" style={{flex:'0 0 50%', position:'relative'}}>
            <div style={{position:'absolute', top:'1px', right:'2px', fontSize:'2.5cqw', color:'#E2E8E6', textTransform:'uppercase', letterSpacing:'0.1em', zIndex:10}}>Page 2</div>

            {/* Sidebar Left Page 2 */}
            <div style={{width:'30%', background:'#1C2B33', padding:'3.5cqw', color:'white', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:'3.2cqw', fontWeight:'700', color:'#8CFBD4', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'0.5cqw'}}>RECOGNITIONS</div>
                <div style={{fontSize:'2.5cqw', color:'rgba(255,255,255,0.8)', lineHeight:'1.35', marginBottom:'3cqw'}}>
                  • Awwwards Site of the Day<br/>
                  • Webby Honoree, UX (2024)<br/>
                  • AIGA NY Design Excellence
                </div>

                <div style={{fontSize:'3.2cqw', fontWeight:'700', color:'#8CFBD4', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'0.5cqw'}}>CREDENTIALS</div>
                <div style={{fontSize:'2.5cqw', color:'rgba(255,255,255,0.8)', lineHeight:'1.35'}}>
                  • NNG Certified UX Master<br/>
                  • Google UX Design Prof.<br/>
                  • Interaction Specialist
                </div>
              </div>
            </div>

            {/* Main column Page 2 */}
            <div style={{width:'70%', padding:'3.5cqw', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:'3.4cqw', fontWeight:'700', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.1em', paddingBottom:'0.5cqw', marginBottom:'1cqw', borderBottom:'0.5px solid #E2E8E6'}}>EXPERIENCE (CONTINUED)</div>
                
                <div style={{marginBottom:'2cqw'}}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                    <span>Senior UX Expert — Instrument Agency</span><span style={{color:'#46504D', fontWeight:'400'}}>2018 – 2021</span>
                  </div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                    • Spearheaded application prototype interactions mapping luxury digital platforms, boosting 30-day user repeat engagement indexes by 28%.<br/>
                    • Standardized motion principles adopted by key corporate teams.
                  </div>
                </div>

                <div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'3cqw', fontWeight:'700', color:'#1C2B33'}}>
                    <span>Interface Artist — Digital Ocean</span><span style={{color:'#46504D', fontWeight:'400'}}>2015 – 2018</span>
                  </div>
                  <div style={{fontSize:'2.7cqw', color:'#46504D', lineHeight:'1.38', marginTop:'0.5cqw'}}>
                    • Trimmed support request queues by 17% through systematic product wizard designs.
                  </div>
                </div>
              </div>

              <div>
                {/* Academic credentials */}
                <div style={{borderTop:'0.5px solid #E2E8E6', paddingTop:'2cqw', marginTop:'1.5cqw'}}>
                  <div style={{fontSize:'3.2cqw', fontWeight:'700', color:'#1C2B33', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'0.5cqw'}}>EDUCATION</div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'2.8cqw', fontWeight:'700', color:'#1C2B33'}}>
                    <span>BFA Communication Design — Parsons School of Design</span>
                    <span style={{color:'#46504D', fontWeight:'400'}}>Cum Laude • 2015</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // 3 Cover Letter Styles
  const coverLetterStyles = [
    {
      key: "classic",
      label: "Elegant Top Header",
      tag: "Traditional",
      preview: (
        <div className="p-[3.5cqw] bg-white h-full flex flex-col text-left overflow-hidden" style={{fontFamily:'Georgia, serif'}}>
          {/* Letterhead */}
          <div style={{textAlign:'center', borderBottom:'1.5px solid #1C2B33', paddingBottom:'1.5cqw', marginBottom:'2cqw'}}>
            <div style={{fontSize:'8.5cqw', fontWeight:'bold', color:'#1C2B33', letterSpacing:'0.05em'}}>MARGARET CHEN</div>
            <div style={{fontSize:'3.2cqw', color:'#46504D', marginTop:'0.5cqw'}}>New York, NY  •  m.chen@email.com  •  (212) 555-0182</div>
          </div>

          {/* Date & Addressee */}
          <div style={{fontSize:'3cqw', color:'#46504D', marginBottom:'2cqw', lineHeight:'1.7'}}>
            June 2026<br/>
            Hiring Manager<br/>
            Apex Financial Partners<br/>
            New York, NY 10001
          </div>

          {/* Greeting */}
          <div style={{fontSize:'3cqw', color:'#1C2B33', fontWeight:'600', marginBottom:'1.5cqw'}}>Dear Hiring Manager,</div>

          {/* Body */}
          <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.7', marginBottom:'1.5cqw'}}>
            I am writing to express my strong interest in the Chief Financial Officer position at Apex Financial Partners. With 14 years of progressive financial leadership, I have directed multi-national treasury operations, led IPO preparation for a $400M exit, and delivered $22M in cost savings through enterprise restructuring initiatives at Meridian Capital Group.
          </div>
          <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.7', marginBottom:'2.5cqw'}}>
            My expertise in GAAP compliance, M&A due diligence, and board-level investor communication positions me uniquely to drive financial clarity and strategic growth at your organization. I welcome the opportunity to discuss how my background aligns with your firm's objectives.
          </div>

          {/* Closing */}
          <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.7'}}>
            Sincerely,<br/><br/>
            <span style={{fontWeight:'bold', color:'#1C2B33'}}>Margaret Chen</span>
          </div>
        </div>
      )
    },
    {
      key: "modern",
      label: "Sleek Left-Border Column",
      tag: "Modern",
      preview: (
        <div className="h-full flex text-left overflow-hidden bg-white" style={{fontFamily:'system-ui, sans-serif'}}>
          {/* Teal Left Border Accent */}
          <div style={{width:'8px', background:'#0F766E', flexShrink:0}}></div>
          
          <div className="p-[3.5cqw] flex flex-col" style={{flex:1}}>
            {/* Header */}
            <div style={{marginBottom:'2cqw'}}>
              <div style={{fontSize:'8.5cqw', fontWeight:'800', color:'#1C2B33'}}>ALEX RIVERA</div>
              <div style={{fontSize:'4.2cqw', color:'#0F766E', fontWeight:'700', marginTop:'0.5cqw'}}>Senior Full-Stack Engineer</div>
              <div style={{fontSize:'2.8cqw', color:'#46504D', marginTop:'0.5cqw'}}>San Francisco, CA  •  a.rivera@dev.io  •  (415) 555-0293</div>
              <div style={{height:'1px', background:'#E2E8E6', marginTop:'1.5cqw'}}></div>
            </div>

            {/* Date & Recipient */}
            <div style={{fontSize:'3cqw', color:'#46504D', marginBottom:'2cqw', lineHeight:'1.7'}}>
              June 2026  •  Engineering Hiring Team  •  Notion, Inc.
            </div>

            {/* Body */}
            <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.7', marginBottom:'1.5cqw'}}>
              I am excited to apply for the Staff Engineer opening at Notion. Over the past 7 years, I have built production systems serving millions of users — including rebuilding Stripe's dispute resolution dashboard handling $4B+ in annual transactions and cutting API latency from 340ms to 82ms via Redis architecture redesign.
            </div>
            <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.7', marginBottom:'2.5cqw'}}>
              At Notion, I see a unique opportunity to apply my expertise in TypeScript, distributed systems, and editor performance optimization. My recent work reducing Notion-scale editor load times by 55% has given me direct insight into your technical challenges and how I can contribute from day one.
            </div>

            {/* Closing */}
            <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.7'}}>
              Best regards,<br/><br/>
              <span style={{fontWeight:'700', color:'#1C2B33'}}>Alex Rivera</span>
            </div>
          </div>
        </div>
      )
    },
    {
      key: "minimalist",
      label: "Minimal Left Align Block",
      tag: "Clean",
      preview: (
        <div className="p-[4.5cqw] bg-white h-full flex flex-col text-left overflow-hidden" style={{fontFamily:'system-ui, sans-serif'}}>
          {/* Name block */}
          <div style={{marginBottom:'2cqw'}}>
            <div style={{fontSize:'8.5cqw', fontWeight:'300', color:'#1C2B33', letterSpacing:'-0.02em'}}>James Whitmore</div>
            <div style={{height:'1px', background:'#E2E8E6', margin:'1.5cqw 0'}}></div>
            <div style={{fontSize:'2.8cqw', color:'#46504D'}}>Chicago, IL  •  j.whitmore@ops.com  •  (312) 555-0147</div>
          </div>

          {/* Date block */}
          <div style={{fontSize:'3cqw', color:'#46504D', marginBottom:'2cqw', lineHeight:'1.7'}}>
            June 2026<br/>
            Talent Acquisition Team<br/>
            Apex Logistics Corporation
          </div>

          {/* Letter body */}
          <div style={{fontSize:'3cqw', color:'#1C2B33', fontWeight:'500', marginBottom:'1cqw'}}>Dear Hiring Team,</div>
          <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.7', marginBottom:'1.5cqw'}}>
            I am applying for the Director of Operations role at Apex Logistics. In my current position, I manage operations teams of 34 across 3 regional hubs, achieving 99.2% SLA compliance and reducing last-mile delivery costs by 23% through carrier renegotiation.
          </div>
          <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.7', marginBottom:'2.5cqw'}}>
            My background in supply chain optimization, ERP implementation, and Lean/Six Sigma methodology equips me to drive measurable operational improvements for your growing enterprise. I would welcome the opportunity to contribute to Apex's next chapter.
          </div>

          {/* Sign off */}
          <div style={{fontSize:'2.8cqw', color:'#46504D', lineHeight:'1.7'}}>
            Regards,<br/><br/>
            <span style={{fontWeight:'600', color:'#1C2B33'}}>James Whitmore</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <SEO 
        title={seoJson.home.title} 
        description={seoJson.home.description} 
        canonical={seoJson.home.canonical} 
      />
      <SoftwareApplicationSchema 
        name="LunchResume"
        applicationCategory="BusinessApplication"
        operatingSystem="Web"
        price={0}
        priceCurrency="USD"
      />
      <FAQSchema items={typedHomepageContent.faqs.items} />
      
      {/* 1. Hero Header */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-14 md:py-24 bg-[#FAFDFB] border-b border-[#E2E8E6]">
        <HeroScene />
        
        {/* Soft Radial Ambient Layer to maintain contrast */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(250,253,251,0.4)_0%,rgba(250,253,251,0.85)_100%)]" />

        {/* Backside soft glowing orbs to enhance the glassmorphism backdrop-blur */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-teal-400/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-400/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-violet-400/8 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 container mx-auto px-6 py-10 text-center max-w-4xl bg-white/45 backdrop-blur-md rounded-3xl border border-white/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06),0_10px_25px_-5px_rgba(15,118,110,0.04)] md:p-14 my-4 relative overflow-hidden">
          {/* Inner ambient shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/18 to-white/0 pointer-events-none" />
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 mb-6 px-4 py-1.5 border border-white/80 text-[#0F766E] text-[13px] uppercase tracking-wider font-bold rounded-full bg-white/75 backdrop-blur-md shadow-sm">
            {typedHomepageContent.hero.badge}
          </div>
          
          {/* Main heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight mb-6 text-[#1A1F1E] tracking-tight">
            {typedHomepageContent.hero.title.split('\n')[0]} <br />
            <span className="italic font-normal text-[#46504D]">{typedHomepageContent.hero.title.split('\n')[1]}</span>
          </h1>
          
          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-[16px] text-[#46504D] font-normal leading-relaxed mb-8">
            {typedHomepageContent.hero.subtitle}
          </p>
          
          {/* Primary actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4 relative z-10">
            <button 
              onClick={() => handleNavigateToBuilder('1-page')}
              className="relative overflow-hidden group px-8 py-4.5 rounded-3xl font-sans font-bold text-[14px] tracking-wider uppercase cursor-pointer text-center transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-white border border-teal-500/20 shadow-[0_15px_30px_-5px_rgba(15,118,110,0.3)] bg-gradient-to-r from-teal-800 via-[#0F766E] to-emerald-700 hover:from-teal-700 hover:to-emerald-600"
            >
              <div className="absolute inset-0 bg-white/18 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {typedHomepageContent.hero.primaryActionLabel}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
            <a 
              href="#resume-templates-preview" 
              onClick={scrollToSection('resume-templates-preview')}
              className="relative overflow-hidden group px-8 py-4.5 rounded-3xl font-sans font-bold text-[14px] tracking-wider uppercase cursor-pointer text-center transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-[#0F766E] border border-[#0F766E]/20 bg-white/60 backdrop-blur-md shadow-[0_12px_30px_rgba(15,118,110,0.08)] hover:bg-white/85 hover:border-[#0F766E]/40 hover:shadow-[0_15px_35px_rgba(15,118,110,0.15)]"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                {typedHomepageContent.hero.secondaryActionLabel}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </a>
          </div>

          {/* Core Trust Message Right Under Buttons */}
          <p className="text-[13.5px] text-[#46504D] mb-10 flex items-center justify-center gap-1.5 font-normal">
            <ShieldCheck size={16} className="text-[#16A34A]" /> Your data stays in your browser. Nothing is uploaded.
          </p>
          
          {/* Small scroll vector indicator */}
          <div className="flex justify-center">
             <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="group flex flex-col items-center gap-2 text-[13px] font-sans font-bold tracking-wider text-[#0F766E] hover:text-[#0F766E]/95 transition-colors cursor-pointer">
                <span>{typedHomepageContent.hero.scrollIndicator}</span>
                <span className="p-2 border border-[#E2E8E6] rounded-full group-hover:border-[#0F766E] transition-colors bg-[#F7F9F8] shadow-sm">
                    <ArrowDown size={14} className="text-[#0F766E]" />
                </span>
             </a>
          </div>
        </div>
      </header>

      {/* 2. Trust Bar */}
      <section className="bg-gradient-to-r from-[#F7F9F8] via-white to-[#F7F9F8] border-y border-[#E2E8E6] py-8 relative overflow-hidden">
        {/* Subtle background abstract decorations */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0F766E_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Trust Title Capsule */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3 self-center lg:self-auto"
            >
              <div className="p-2.5 bg-[#0F766E]/5 rounded-xl border border-[#0F766E]/10 text-[#0F766E]">
                <ShieldCheck size={20} className="animate-pulse" />
              </div>
              <div className="text-left">
                <span className="block uppercase tracking-widest text-[11px] font-extrabold text-[#0F766E]">
                  Guaranteed Privacy
                </span>
                <span className="block text-[15px] font-serif font-black text-[#1C2B33] leading-none mt-0.5">
                  Our Trust Policy
                </span>
              </div>
            </motion.div>

            {/* Interactive Cards Track */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto flex-1 max-w-4xl">
              {[
                {
                  id: "p1",
                  title: "100% Free",
                  desc: "No premium paywalls",
                  icon: Sparkles,
                  color: "from-amber-500/10 to-transparent",
                  iconColor: "text-amber-500",
                  iconBg: "bg-amber-50 border-amber-100/80 group-hover:bg-amber-100 group-hover:border-amber-200 group-hover:text-amber-600 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]",
                },
                {
                  id: "p2",
                  title: "Skip Sign-Up",
                  desc: "Zero registration",
                  icon: UserX,
                  color: "from-indigo-500/10 to-transparent",
                  iconColor: "text-indigo-500",
                  iconBg: "bg-indigo-50 border-indigo-100/80 group-hover:bg-indigo-100 group-hover:border-indigo-200 group-hover:text-indigo-600 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.25)]",
                },
                {
                  id: "p3",
                  title: "In-Browser",
                  desc: "Local sandbox speed",
                  icon: Monitor,
                  color: "from-sky-500/10 to-transparent",
                  iconColor: "text-sky-500",
                  iconBg: "bg-sky-50 border-sky-100/80 group-hover:bg-sky-100 group-hover:border-sky-200 group-hover:text-sky-600 group-hover:shadow-[0_0_12px_rgba(14,165,233,0.25)]",
                },
                {
                  id: "p4",
                  title: "No Data Stored",
                  desc: "Your files stay yours",
                  icon: Lock,
                  color: "from-emerald-500/10 to-transparent",
                  iconColor: "text-emerald-500",
                  iconBg: "bg-emerald-50 border-emerald-100/80 group-hover:bg-emerald-100 group-hover:border-emerald-200 group-hover:text-emerald-600 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]",
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 25, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      boxShadow: "0 12px 20px -8px rgba(15, 118, 110, 0.12)",
                    }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: index * 0.08
                    }}
                    className="relative p-3.5 bg-white border border-[#E2E8E6] rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left group cursor-pointer overflow-hidden transition-colors hover:border-[#0F766E]/40"
                  >
                    {/* Corner gradient glow */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${item.color} rounded-bl-full opacity-60 transition-all group-hover:scale-150`}></div>
                    
                    <div className={`p-2 rounded-xl mb-2.5 z-10 transition-all duration-300 group-hover:scale-115 group-hover:rotate-6 ${item.iconBg} ${item.iconColor}`}>
                      <IconComponent size={18} />
                    </div>
                    
                    <div className="z-10">
                      <h4 className="font-sans font-bold text-[13px] text-[#1A1F1E] group-hover:text-[#0F766E] transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <p className="font-sans text-[11px] text-[#46504D] leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      <main>
        {/* 3. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-16 md:py-24 bg-[#FAFDFB] relative overflow-hidden border-b border-[#E2E8E6]">
          {/* Backside soft glowing orbs for the utility portion to enhance glass backdrop-blur */}
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-violet-400/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-1/3 w-72 h-72 bg-amber-400/6 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 mb-3 px-4 py-1.5 border border-[#E2E8E6] text-[#0F766E] text-[13px] tracking-wider uppercase font-bold rounded-full bg-white/80 backdrop-blur-md shadow-sm">
                {typedHomepageContent.utility.badge}
              </div>
              <h2 className="font-serif text-[30px] font-bold text-[#1C2B33] tracking-tight leading-tight mb-3">
                {typedHomepageContent.utility.title}
              </h2>
              <p className="text-[#0F766E] font-sans text-[13px] uppercase tracking-wider font-bold">
                {typedHomepageContent.utility.subtitle}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {typedHomepageContent.utility.pillars.map((pillar, index) => {
                const isSerifDemo = pillar.typePreset === "EB Garamond" || pillar.typePreset === "Playfair Serif Preset";
                const titleFontClass = "font-sans text-[20px] font-bold text-[#1C2B33] mb-2 leading-tight px-0.5 group-hover:text-black transition-colors";
                const presetLabel = isSerifDemo ? "Playfair Serif" : "Inter Sans";

                let styleGroup = {
                  colorName: "emerald",
                  glow: "from-emerald-500/12 to-transparent/5",
                  iconClass: "bg-emerald-100/60 border-white text-emerald-700 group-hover:bg-emerald-200/80 group-hover:border-emerald-300 group-hover:text-emerald-800 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.35)]",
                  borderColor: "border-emerald-500/15 group-hover:border-emerald-500/40",
                  glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(16,185,129,0.05)]",
                  bigNumberColor: "text-emerald-500/5 group-hover:text-emerald-500/15",
                  presetValClass: "text-emerald-600 font-sans font-bold text-[12px]",
                  textLabelColor: "text-emerald-600/80",
                  hoverGlowShadow: "rgba(16, 185, 129, 0.15)",
                };

                if (pillar.icon === 'FileText') {
                  styleGroup = {
                    colorName: "indigo",
                    glow: "from-indigo-500/12 to-transparent/5",
                    iconClass: "bg-indigo-100/60 border-white text-indigo-700 group-hover:bg-indigo-200/80 group-hover:border-indigo-300 group-hover:text-indigo-800 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.35)]",
                    borderColor: "border-indigo-500/15 group-hover:border-indigo-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(99,102,241,0.05)]",
                    bigNumberColor: "text-indigo-500/5 group-hover:text-indigo-500/15",
                    presetValClass: "text-indigo-600 font-sans font-bold text-[12px]",
                    textLabelColor: "text-indigo-600/80",
                    hoverGlowShadow: "rgba(99, 102, 241, 0.15)",
                  };
                } else if (pillar.icon === 'ShieldCheck') {
                  styleGroup = {
                    colorName: "violet",
                    glow: "from-violet-500/12 to-transparent/5",
                    iconClass: "bg-violet-100/60 border-white text-violet-700 group-hover:bg-violet-200/80 group-hover:border-violet-300 group-hover:text-violet-800 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.35)]",
                    borderColor: "border-violet-500/15 group-hover:border-violet-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(139,92,246,0.05)]",
                    bigNumberColor: "text-violet-500/5 group-hover:text-violet-500/15",
                    presetValClass: "text-violet-600 font-sans font-bold text-[12px]",
                    textLabelColor: "text-violet-600/80",
                    hoverGlowShadow: "rgba(139, 92, 246, 0.15)",
                  };
                } else if (pillar.icon === 'Sparkles') {
                  styleGroup = {
                    colorName: "amber",
                    glow: "from-amber-500/12 to-transparent/5",
                    iconClass: "bg-amber-100/60 border-white text-amber-700 group-hover:bg-amber-200/80 group-hover:border-amber-300 group-hover:text-amber-800 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.35)]",
                    borderColor: "border-amber-500/15 group-hover:border-amber-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(245,158,11,0.05)]",
                    bigNumberColor: "text-amber-500/5 group-hover:text-amber-500/15",
                    presetValClass: "text-amber-600 font-sans font-bold text-[12px]",
                    textLabelColor: "text-amber-600/80",
                    hoverGlowShadow: "rgba(245, 158, 11, 0.15)",
                  };
                }

                return (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.02,
                      boxShadow: `0 15px 30px -10px ${styleGroup.hoverGlowShadow}`,
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ 
                      type: "spring",
                      stiffness: 90,
                      damping: 15,
                      delay: index * 0.10
                    }}
                    className={`text-left p-6 rounded-2xl border ${styleGroup.glassBg} ${styleGroup.borderColor} backdrop-blur-md transition-all duration-300 group flex flex-col justify-between min-h-[220px] relative overflow-hidden cursor-pointer`}
                  >
                    {/* Inner crystal reflection / shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Floating ambient glow circle behind the card contents */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${styleGroup.glow} rounded-bl-full opacity-60 transition-transform duration-500 group-hover:scale-125 pointer-events-none`} />

                    <div>
                      {/* Top Header - Icon and Animation */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border ${styleGroup.iconClass}`}>
                          {pillar.icon === 'Lock' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          )}
                          {pillar.icon === 'FileText' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                          )}
                          {pillar.icon === 'ShieldCheck' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8.24-2a1 1 0 0 1 .5 0l8.24 2A1 1 0 0 1 20 6Z"/><path d="m9 12 2 2 4-4"/></svg>
                          )}
                          {pillar.icon === 'Sparkles' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="M19 17l1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>
                          )}
                        </div>
                        <span className={`text-[10px] uppercase font-bold font-mono tracking-widest ${styleGroup.textLabelColor} transition-colors`}>
                          Pillar
                        </span>
                      </div>

                      <h3 className={titleFontClass}>
                        {pillar.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed font-normal text-[#46504D] px-0.5">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* 3 Steps Roadmap */}
            <div className="border-t border-[#E2E8E6] pt-14 md:pt-20 relative overflow-hidden">
              {/* Backside soft glowing orbs to enhance the glassmorphism backdrop-blur */}
              <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
              <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-indigo-400/8 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
              <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-amber-300/4 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

              <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
                <span className="inline-block px-4 py-1.5 bg-[#F7F9F8] border border-[#E2E8E6] text-[#0F766E] text-[13px] uppercase tracking-wider font-bold rounded-full mb-3 shadow-sm">
                  {typedHomepageContent.roadmap.badge}
                </span>
                <h2 className="font-serif text-[30px] font-bold text-[#1C2B33] leading-tight mb-2">
                  {typedHomepageContent.roadmap.title}
                </h2>
                <p className="text-[#0F766E] font-sans text-[13px] uppercase tracking-wider font-bold">
                  {typedHomepageContent.roadmap.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {typedHomepageContent.roadmap.steps.map((step, idx) => {
                  let stepStyle = {
                    colorName: "emerald",
                    glow: "from-emerald-500/12 to-transparent/5",
                    borderColor: "border-emerald-500/15 group-hover:border-emerald-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(16,185,129,0.05)]",
                    bigNumberColor: "text-emerald-500/5 group-hover:text-emerald-500/15",
                    dotBg: "bg-gradient-to-br from-[#1C2B33] to-[#0F1B1E] text-[#8CFBD4] border border-[#8CFBD4]/30 group-hover:border-[#8CFBD4]/75 group-hover:shadow-[0_0_12px_rgba(140,251,212,0.3)]",
                    hoverGlowShadow: "rgba(16, 185, 129, 0.15)"
                  };

                  if (idx === 1) {
                    stepStyle = {
                      colorName: "indigo",
                      glow: "from-indigo-500/12 to-transparent/5",
                      borderColor: "border-indigo-500/15 group-hover:border-indigo-500/40",
                      glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(99,102,241,0.05)]",
                      bigNumberColor: "text-indigo-500/5 group-hover:text-indigo-500/15",
                      dotBg: "bg-gradient-to-br from-[#1C2B33] to-[#0F1B1E] text-[#8CFBD4] border border-[#8CFBD4]/30 group-hover:border-[#8CFBD4]/75 group-hover:shadow-[0_0_12px_rgba(140,251,212,0.3)]",
                      hoverGlowShadow: "rgba(99, 102, 241, 0.15)"
                    };
                  } else if (idx === 2) {
                    stepStyle = {
                      colorName: "amber",
                      glow: "from-amber-500/12 to-transparent/5",
                      borderColor: "border-amber-500/15 group-hover:border-amber-500/40",
                      glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(245,158,11,0.05)]",
                      bigNumberColor: "text-amber-500/5 group-hover:text-amber-500/15",
                      dotBg: "bg-gradient-to-br from-[#1C2B33] to-[#0F1B1E] text-[#8CFBD4] border border-[#8CFBD4]/30 group-hover:border-[#8CFBD4]/75 group-hover:shadow-[0_0_12px_rgba(140,251,212,0.3)]",
                      hoverGlowShadow: "rgba(245, 158, 11, 0.15)"
                    };
                  }

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      whileHover={{ 
                        y: -6, 
                        scale: 1.02,
                        boxShadow: `0 15px 30px -10px ${stepStyle.hoverGlowShadow}`,
                      }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ 
                        type: "spring",
                        stiffness: 90,
                        damping: 15,
                        delay: idx * 0.12
                      }}
                      className={`text-left relative p-7 rounded-2xl border ${stepStyle.glassBg} ${stepStyle.borderColor} backdrop-blur-md transition-all duration-300 group overflow-hidden cursor-pointer flex flex-col justify-between min-h-[230px]`}
                    >
                      {/* Inner crystal reflection / shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      {/* Corner subtle glow gradient */}
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${stepStyle.glow} rounded-bl-full opacity-60 transition-transform duration-500 group-hover:scale-125`} />

                      <div>
                        <div className="flex items-center justify-between mb-5">
                          {/* Circle with premium active indicator */}
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${stepStyle.dotBg}`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-emerald-400' : idx === 1 ? 'bg-indigo-400' : 'bg-amber-400'} animate-pulse`} />
                          </div>

                          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${idx === 0 ? 'text-emerald-600' : idx === 1 ? 'text-indigo-600' : 'text-amber-600'} opacity-75`}>
                            Phase
                          </span>
                        </div>

                        <h3 className="font-sans text-[22px] font-bold text-[#1C2B33] mb-2 px-0.5 tracking-tight group-hover:text-black transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-[#46504D] text-[14px] leading-relaxed font-normal px-0.5">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION A — Resume Templates Preview (replaces deleted Section 6 + targetFormats) */}
        <section id="resume-templates-preview" className="py-16 md:py-24 bg-[#FAFDFB] relative overflow-hidden border-b border-[#E2E8E6]">
          {/* Backside soft glowing orbs to enhance the glassmorphism backdrop-blur */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-amber-400/6 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            
            {/* Heading Area */}
            <div className="max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 mb-3 px-4 py-1.5 border border-[#E2E8E6] bg-white/80 backdrop-blur-md shadow-sm text-[#0F766E] text-[13px] tracking-wider uppercase font-bold rounded-full">
                📄 CHOOSE YOUR RESUME FORMAT
              </span>
              <h2 className="font-serif text-3xl md:text-[36px] font-bold text-[#1C2B33] mb-3 leading-tight">
                Pick your resume template
              </h2>
              <p className="text-[#46504D] text-base md:text-[17px] font-normal leading-relaxed">
                Select your experience level first, then choose a style that fits your industry.
              </p>
            </div>

            {/* Two tab toggles */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 max-w-xl mx-auto relative z-10">
              <button
                onClick={() => setActiveTab('1-page')}
                className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-[13.5px] tracking-wider uppercase transition-all duration-300 cursor-pointer border ${
                  activeTab === '1-page' 
                    ? 'bg-emerald-800/85 backdrop-blur-md text-white border-emerald-700/50 shadow-[0_8px_25px_-5px_rgba(16,185,129,0.3)]' 
                    : 'bg-white/45 backdrop-blur-sm border-white/80 text-[#46504D] hover:bg-white/75 hover:border-white hover:text-black shadow-sm'
                }`}
              >
                1-Pager — Starter & Mid-Level
              </button>
              <button
                onClick={() => setActiveTab('2-page')}
                className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-[13.5px] tracking-wider uppercase transition-all duration-300 cursor-pointer border ${
                  activeTab === '2-page' 
                    ? 'bg-emerald-800/85 backdrop-blur-md text-white border-emerald-700/50 shadow-[0_8px_25px_-5px_rgba(16,185,129,0.3)]' 
                    : 'bg-white/45 backdrop-blur-sm border-white/80 text-[#46504D] hover:bg-white/75 hover:border-white hover:text-black shadow-sm'
                }`}
              >
                2-Pager — Senior & Leadership
              </button>
            </div>

            {/* Description Chip */}
            <div className="inline-block px-5 py-2 mb-10 bg-white/45 backdrop-blur-sm border border-white/75 rounded-full text-[14px] text-[#46504D] font-medium shadow-sm">
              {activeTab === '1-page' ? (
                <span>Best for <strong>0–5 years experience</strong>. Keeps everything tight and scannable on one page.</span>
              ) : (
                <span>Best for <strong>5+ years experience</strong>. Room to showcase full career depth across two clean pages.</span>
              )}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {(activeTab === '1-page' ? resumeTemplates1Page : resumeTemplates2Page).map((template, idx) => {
                let glassStyle = {
                  glow: "from-emerald-500/12 to-transparent/5",
                  borderColor: "border-emerald-500/15 group-hover:border-emerald-500/40",
                  glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(16,185,129,0.03)]",
                  badgeClass: "text-emerald-700 bg-emerald-500/10 border-emerald-500/15",
                  buttonBg: "from-emerald-500/8 via-emerald-600/5 to-teal-500/8 hover:from-emerald-500/20 hover:to-teal-500/20 border-white/60 hover:border-emerald-500/30 text-emerald-800 hover:text-emerald-900",
                  hoverGlowShadow: "rgba(16, 185, 129, 0.15)"
                };

                if (idx % 4 === 1) {
                  glassStyle = {
                    glow: "from-indigo-500/12 to-transparent/5",
                    borderColor: "border-indigo-500/15 group-hover:border-indigo-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(99,102,241,0.03)]",
                    badgeClass: "text-indigo-700 bg-indigo-500/10 border-indigo-500/15",
                    buttonBg: "from-indigo-500/8 via-indigo-600/5 to-violet-500/8 hover:from-indigo-500/20 hover:to-violet-500/20 border-white/60 hover:border-indigo-500/30 text-indigo-800 hover:text-indigo-900",
                    hoverGlowShadow: "rgba(99, 102, 241, 0.15)"
                  };
                } else if (idx % 4 === 2) {
                  glassStyle = {
                    glow: "from-violet-500/12 to-transparent/5",
                    borderColor: "border-violet-500/15 group-hover:border-violet-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(139,92,246,0.03)]",
                    badgeClass: "text-violet-700 bg-violet-500/10 border-violet-500/15",
                    buttonBg: "from-violet-500/8 via-violet-600/5 to-purple-500/8 hover:from-violet-500/20 hover:to-purple-500/20 border-white/60 hover:border-violet-500/30 text-violet-800 hover:text-violet-900",
                    hoverGlowShadow: "rgba(139, 92, 246, 0.15)"
                  };
                } else if (idx % 4 === 3) {
                  glassStyle = {
                    glow: "from-amber-500/12 to-transparent/5",
                    borderColor: "border-amber-500/15 group-hover:border-amber-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(245,158,11,0.03)]",
                    badgeClass: "text-amber-800 bg-amber-500/10 border-amber-500/15",
                    buttonBg: "from-amber-500/8 via-amber-600/5 to-orange-500/8 hover:from-amber-500/20 hover:to-orange-500/20 border-white/60 hover:border-amber-500/30 text-amber-800 hover:text-amber-900",
                    hoverGlowShadow: "rgba(245, 158, 11, 0.15)"
                  };
                }

                return (
                  <motion.div 
                    key={template.slug}
                    initial={{ opacity: 0, scale: 0.96, y: 25 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.02,
                      boxShadow: `0 20px 40px -15px ${glassStyle.hoverGlowShadow}`,
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    onClick={() => handleTemplateClick(template.slug)}
                    className={`text-left p-5 rounded-3xl border ${glassStyle.glassBg} ${glassStyle.borderColor} backdrop-blur-md transition-all duration-300 group flex flex-col justify-between min-h-[460px] relative overflow-hidden cursor-pointer`}
                  >
                    {/* Inner crystal reflection / shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/18 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Gradient subtle glow */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${glassStyle.glow} rounded-bl-full opacity-60 transition-transform duration-500 group-hover:scale-125 pointer-events-none`} />

                    <div className="flex-1 flex flex-col gap-4">
                      {/* Document mini window */}
                      <div className="aspect-[210/297] bg-white/75 border border-white/90 rounded-2xl overflow-hidden p-2.5 group-hover:scale-[1.015] shadow-inner transition-all duration-300 relative" style={{ containerType: 'inline-size' }}>
                        {template.preview}

                        <div className="absolute inset-0 bg-black/2 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>

                      {/* Header tags and text */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-1 text-left gap-2 w-full px-1">
                        <span className="font-sans font-black text-[14.5px] text-[#1C2B33] leading-tight group-hover:text-black transition-colors">
                          {template.name}
                        </span>
                        <span className={`text-[10.5px] font-sans font-bold px-2.5 py-0.5 rounded-full border ${glassStyle.badgeClass}`}>
                          {template.tag}
                        </span>
                      </div>
                    </div>

                    {/* Highly creative glass type button */}
                    <div className="mt-4 px-1">
                      <div className={`w-full py-3.5 rounded-2xl font-sans font-bold text-[12.5px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_5px_15px_rgba(0,0,0,0.02)] border bg-gradient-to-r backdrop-blur-md ${glassStyle.buttonBg}`}>
                        <span>Use Template</span>
                        <svg className="w-4 h-4 transition-transform duration-350 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Browse link */}
            <button
              onClick={() => { navigate('/resume-templates'); window.scrollTo(0, 0); }}
              className="text-[#0F766E] font-bold text-[14.5px] hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer relative z-10 hover:text-emerald-700 transition-colors"
            >
              Browse all templates <span className="text-[16px]">&rarr;</span>
            </button>

          </div>
        </section>

        {/* SECTION B — Cover Letter Preview (brand new section, add after the Resume Templates Preview) */}
        <section id="cover-letter-preview" className="py-16 md:py-24 bg-[#FAFDFB] relative overflow-hidden border-b border-[#E2E8E6]">
          {/* Backside soft glowing orbs to enhance the glassmorphism backdrop-blur */}
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-violet-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/2 w-72 h-72 bg-emerald-400/6 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            
            {/* Heading Area */}
            <div className="max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 mb-3 px-4 py-1.5 border border-[#E2E8E6] bg-white/80 backdrop-blur-md shadow-sm text-[#0F766E] text-[13px] tracking-wider uppercase font-bold rounded-full">
                ✉️ COVER LETTER BUILDER
              </span>
              <h2 className="font-serif text-3xl md:text-[36px] font-bold text-[#1C2B33] mb-3 leading-tight">
                Pair your resume with a matching cover letter
              </h2>
              <p className="text-[#46504D] text-base md:text-[17px] font-normal leading-relaxed">
                Choose from 3 professionally structured cover letter layouts, pre-filled with outcomes-focused language.
              </p>
            </div>

            {/* Cover Letter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {coverLetterStyles.map((style, idx) => {
                let glassStyle = {
                  glow: "from-indigo-500/12 to-transparent/5",
                  borderColor: "border-indigo-500/15 group-hover:border-indigo-500/40",
                  glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(99,102,241,0.03)]",
                  badgeClass: "text-indigo-700 bg-indigo-500/10 border-indigo-500/15",
                  buttonBg: "from-indigo-500/8 via-indigo-600/5 to-violet-500/8 hover:from-indigo-500/20 hover:to-violet-500/20 border-white/60 hover:border-indigo-500/30 text-indigo-800 hover:text-indigo-900",
                  hoverGlowShadow: "rgba(99, 102, 241, 0.15)"
                };

                if (idx === 1) {
                  glassStyle = {
                    glow: "from-violet-500/12 to-transparent/5",
                    borderColor: "border-violet-500/15 group-hover:border-violet-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(139,92,246,0.03)]",
                    badgeClass: "text-violet-700 bg-violet-500/10 border-violet-500/15",
                    buttonBg: "from-violet-500/8 via-violet-600/5 to-purple-500/8 hover:from-violet-500/20 hover:to-purple-500/20 border-white/60 hover:border-violet-500/30 text-violet-800 hover:text-violet-900",
                    hoverGlowShadow: "rgba(139, 92, 246, 0.15)"
                  };
                } else if (idx === 2) {
                  glassStyle = {
                    glow: "from-emerald-500/12 to-transparent/5",
                    borderColor: "border-emerald-500/15 group-hover:border-emerald-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(16,185,129,0.03)]",
                    badgeClass: "text-emerald-700 bg-emerald-500/10 border-emerald-500/15",
                    buttonBg: "from-emerald-500/8 via-emerald-600/5 to-teal-500/8 hover:from-emerald-500/20 hover:to-teal-500/20 border-white/60 hover:border-emerald-500/30 text-emerald-800 hover:text-emerald-900",
                    hoverGlowShadow: "rgba(16, 185, 129, 0.15)"
                  };
                }

                return (
                  <motion.div 
                    key={style.key}
                    initial={{ opacity: 0, scale: 0.96, y: 25 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.02,
                      boxShadow: `0 20px 40px -15px ${glassStyle.hoverGlowShadow}`,
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    onClick={() => { navigate('/cover-letter-builder'); window.scrollTo(0, 0); }}
                    className={`text-left p-5 rounded-3xl border ${glassStyle.glassBg} ${glassStyle.borderColor} backdrop-blur-md transition-all duration-300 group flex flex-col justify-between min-h-[460px] relative overflow-hidden cursor-pointer`}
                  >
                    {/* Inner crystal reflection / shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/18 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Gradient subtle glow */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${glassStyle.glow} rounded-bl-full opacity-60 transition-transform duration-500 group-hover:scale-125 pointer-events-none`} />

                    <div className="flex-1 flex flex-col gap-4">
                      {/* Document mini window */}
                      <div className="aspect-[4/5] bg-white/75 border border-white/90 rounded-2xl overflow-hidden p-2.5 group-hover:scale-[1.015] shadow-inner transition-all duration-300 relative" style={{ containerType: 'inline-size' }}>
                        {style.preview}
                        <div className="absolute inset-0 bg-black/2 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>

                      {/* Header tags and text */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-1 text-left gap-2 w-full px-1">
                        <span className="font-sans font-black text-[14.5px] text-[#1C2B33] leading-tight group-hover:text-black transition-colors">
                          {style.label}
                        </span>
                        <span className={`text-[10.5px] font-sans font-bold px-2.5 py-0.5 rounded-full border ${glassStyle.badgeClass}`}>
                          {style.tag}
                        </span>
                      </div>
                    </div>

                    {/* Highly creative glass type button */}
                    <div className="mt-4 px-1">
                      <div className={`w-full py-3.5 rounded-2xl font-sans font-bold text-[12.5px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_5px_15px_rgba(0,0,0,0.02)] border bg-gradient-to-r backdrop-blur-md ${glassStyle.buttonBg}`}>
                        <span>Select Style</span>
                        <svg className="w-4 h-4 transition-transform duration-350 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Direct Open Link */}
            <button
              onClick={() => { navigate('/cover-letter-builder'); window.scrollTo(0, 0); }}
              className="text-[#0F766E] font-bold text-[14.5px] hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer relative z-10 hover:text-emerald-700 transition-colors"
            >
              Open Cover Letter Builder <span className="text-[16px]">&rarr;</span>
            </button>

          </div>
        </section>

        {/* 6. Why Choose Us (The Noise Barrier) */}
        <section id="about" className="py-16 md:py-24 bg-[#FAFDFB] relative overflow-hidden border-b border-[#E2E8E6]">
          {/* Backside soft glowing orbs for backdrop depth */}
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-indigo-400/8 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
            
            <div className="md:col-span-12 lg:col-span-5 text-left">
              <div className="inline-flex items-center gap-1.5 mb-3 px-4 py-1.5 border border-[#E2E8E6] bg-white/80 backdrop-blur-md shadow-sm text-[#0F766E] text-[13px] tracking-wider uppercase font-bold rounded-full">
                {typedHomepageContent.noiseBarrier.badge}
              </div>
              <h2 className="font-serif text-[30px] font-bold mb-6 leading-tight text-[#1C2B33]">{typedHomepageContent.noiseBarrier.title}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mb-6 rounded-full"></div>
              
              <div className="p-7 bg-white/45 border border-white/70 backdrop-blur-md rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07)] text-[13px] text-[#46504D] space-y-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-60 pointer-events-none" />
                <div className="text-[11px] font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/15 px-2.5 py-0.5 rounded-full inline-block uppercase tracking-wider">{typedHomepageContent.noiseBarrier.studyIndexLabel}</div>
                <div className="text-[#1C2B33] font-bold text-[18px]">{typedHomepageContent.noiseBarrier.studyIndexTitle}</div>
                <p className="leading-relaxed font-normal">{typedHomepageContent.noiseBarrier.studyIndexDescription}</p>
              </div>
            </div>

            <div className="md:col-span-12 lg:col-span-7 text-[16px] text-[#46504D] leading-relaxed space-y-6 text-left">
              <p className="text-[18px] text-[#1A1F1E] font-normal">
                <span className="text-5xl float-left mr-3 mt-[-8px] font-sans text-emerald-700 font-bold">
                  {typedHomepageContent.noiseBarrier.descriptionParagraphs[0].charAt(0)}
                </span>
                <span dangerouslySetInnerHTML={{ __html: typedHomepageContent.noiseBarrier.descriptionParagraphs[0].substring(1).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }} />
              </p>
              <p className="font-normal" dangerouslySetInnerHTML={{ __html: typedHomepageContent.noiseBarrier.descriptionParagraphs[1].replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }} />
              <p className="font-normal" dangerouslySetInnerHTML={{ __html: typedHomepageContent.noiseBarrier.descriptionParagraphs[2].replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }} />
            </div>

          </div>
        </section>

        {/* SECTION C — Manifesto Section (currently missing — add it back) */}
        <section id="manifesto" className="py-16 md:py-24 bg-[#FAFDFB] relative overflow-hidden border-b border-[#E2E8E6]">
          {/* Subtle light background lights */}
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-emerald-400/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-violet-400/6 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            
            <div className="inline-flex items-center gap-1.5 mb-3 px-4 py-1.5 border border-[#E2E8E6] bg-white/80 backdrop-blur-md shadow-sm text-[#0F766E] text-[13px] tracking-wider uppercase font-bold rounded-full">
              {typedHomepageContent.manifesto.badge}
            </div>
            
            <h2 className="font-serif text-[30px] font-bold text-[#1C2B33] mb-6 leading-tight">
              {typedHomepageContent.manifesto.title}
            </h2>

            <div className="text-left text-[#46504D] text-base space-y-4 mb-8">
              {typedHomepageContent.manifesto.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed font-normal">
                  {p}
                </p>
              ))}
            </div>

            {/* List items with CheckCircle icon */}
            <div className="text-left space-y-4 my-8 max-w-2xl mx-auto">
              {typedHomepageContent.manifesto.listItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-1" />
                  <span className="text-[#46504D] text-[15px] font-normal leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Footnote */}
            <p className="text-[13px] text-[#46504D]/70 italic mt-8 text-center leading-relaxed">
              {typedHomepageContent.manifesto.footnote}
            </p>

          </div>
        </section>

        {/* SECTION D — Add a "Recent Blog Posts" teaser (add after Manifesto, before FAQs) */}
        <section id="recent-blog-posts" className="py-16 md:py-24 bg-[#FAFDFB] relative overflow-hidden border-b border-[#E2E8E6]">
          {/* Backside soft glowing orbs to enhance the glassmorphism backdrop-blur */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-400/8 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            
            {/* Heading area */}
            <div className="max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 mb-3 px-4 py-1.5 border border-[#E2E8E6] bg-white/80 backdrop-blur-md shadow-sm text-[#0F766E] text-[13px] tracking-wider uppercase font-bold rounded-full">
                📚 RECRUITER INSIGHTS
              </span>
              <h2 className="font-serif text-3xl md:text-[36px] font-bold text-[#1C2B33] mb-3 leading-tight">
                From the LunchResume blog
              </h2>
            </div>

            {/* 3-column Grid of Blog teaser cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {BLOG_POSTS.slice(0, 3).map((post, idx) => {
                let glassStyle = {
                  glow: "from-indigo-500/12 to-transparent/5",
                  borderColor: "border-indigo-500/15 group-hover:border-indigo-500/40",
                  glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(99,102,241,0.03)]",
                  badgeColor: "text-indigo-700 bg-indigo-500/10 border-indigo-500/15",
                  hoverGlowShadow: "rgba(99, 102, 241, 0.15)"
                };

                if (idx === 1) {
                  glassStyle = {
                    glow: "from-violet-500/12 to-transparent/5",
                    borderColor: "border-violet-500/15 group-hover:border-violet-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(139,92,246,0.03)]",
                    badgeColor: "text-violet-700 bg-violet-500/10 border-violet-500/15",
                    hoverGlowShadow: "rgba(139, 92, 246, 0.15)"
                  };
                } else if (idx === 2) {
                  glassStyle = {
                    glow: "from-emerald-500/12 to-transparent/5",
                    borderColor: "border-emerald-500/15 group-hover:border-emerald-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(16,185,129,0.03)]",
                    badgeColor: "text-emerald-700 bg-emerald-500/10 border-emerald-500/15",
                    hoverGlowShadow: "rgba(16, 185, 129, 0.15)"
                  };
                }

                return (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.96, y: 25 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.02,
                      boxShadow: `0 20px 40px -15px ${glassStyle.hoverGlowShadow}`,
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    onClick={() => { navigate(`/blog/${post.id}`); window.scrollTo(0, 0); }}
                    className={`text-left p-6 rounded-3xl border ${glassStyle.glassBg} ${glassStyle.borderColor} backdrop-blur-md transition-all duration-300 group flex flex-col justify-between min-h-[280px] relative overflow-hidden cursor-pointer`}
                  >
                    {/* Inner crystal reflection / shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/18 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Gradient subtle glow */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${glassStyle.glow} rounded-bl-full opacity-60 transition-transform duration-500 group-hover:scale-125 pointer-events-none`} />

                    <div className="relative z-10 text-left">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${glassStyle.badgeColor}`}>
                          {post.category}
                        </span>
                        <span className="text-[11px] text-[#46504D] font-mono">
                          • {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-[18px] font-bold text-[#1C2B33] mb-3 group-hover:text-black transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-[14px] text-[#46504D] leading-relaxed mb-6 font-sans line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <div className="text-[13.5px] font-sans font-bold text-[#0F766E] flex items-center gap-1 group-hover:text-emerald-700 transition-colors relative z-10">
                      Read article <span className="transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* View all articles link */}
            <button
              onClick={() => { navigate('/blog'); window.scrollTo(0, 0); }}
              className="text-[#0F766E] font-bold text-[14.5px] hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer relative z-10 hover:text-emerald-700 transition-colors"
            >
              View all articles <span className="text-[16px]">&rarr;</span>
            </button>

          </div>
        </section>

        {/* 9. FAQS SECTION */}
        <section id="faqs" className="py-16 md:py-24 bg-[#FAFDFB] border-b border-[#E2E8E6]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-serif text-[30px] font-bold text-center mb-12 text-[#1C2B33]">{typedHomepageContent.faqs.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {typedHomepageContent.faqs.items.map((faq, idx) => (
                <div key={idx} className="align-baseline">
                  <h3 className="font-sans font-bold text-[#1C2B33] text-[16px] mb-2 flex items-start gap-2">
                    <HelpCircle size={15} className="text-emerald-600 shrink-0 mt-1" /> {faq.question}
                  </h3>
                  <p className="text-[#46504D] text-[14px] leading-relaxed font-normal" dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA SECTION (Conversion Closing Band - NEW) */}
        <section id="final-cta-band" className="py-20 md:py-28 bg-[#0F1B1E] text-white text-center relative overflow-hidden border-t border-[#E2E8E6]/20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#0F766E]/15 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-[46px] font-bold leading-tight mb-4 tracking-tight text-[#F2F7F5]">
              Your resume is 15 minutes away.
            </h2>
            <p className="text-[#8CFBD4] font-sans text-base md:text-lg mb-8 font-bold">
              Free forever. No account needed.
            </p>
            <button 
              onClick={() => handleNavigateToBuilder('1-page')}
              className="relative overflow-hidden group px-10 py-5 rounded-3xl font-sans font-bold text-[14px] tracking-wider uppercase cursor-pointer text-center transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-emerald-950 font-black border border-emerald-400/30 shadow-[0_15px_30px_-5px_rgba(16,185,129,0.25)] bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-300 hover:from-emerald-200 hover:to-teal-200"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Create My Resume
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};
