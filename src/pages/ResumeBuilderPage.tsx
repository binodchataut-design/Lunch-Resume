/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { PremiumResumeBuilder } from '../components/PremiumResumeBuilder';
import { SEO } from '../components/SEO';
import seoJson from '../../content/seo.json';
import { TemplateType } from '../types';

export const ResumeBuilderPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const format = (searchParams.get('format') as '1-page' | '2-page') || location.state?.format || '1-page';
  const template = (searchParams.get('template') as TemplateType) || undefined;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans text-[#1C2B33]">
      <SEO 
        title={seoJson.resumeBuilder.title} 
        description={seoJson.resumeBuilder.description} 
        canonical={seoJson.resumeBuilder.canonical} 
      />
      <div className="w-full relative z-10">
        <PremiumResumeBuilder initialFormat={format} initialTemplate={template} />
      </div>
    </div>
  );
};
