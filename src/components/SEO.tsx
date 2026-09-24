/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import seoJson from '../../content/seo.json';
import { SeoMetadataConfig } from '../../types/content';

const typedSeoData = seoJson as SeoMetadataConfig;

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical, noindex = false }) => {
  const defaultMeta = typedSeoData.default;
  const finalTitle = title || defaultMeta.title;
  const finalDescription = description || defaultMeta.description;
  const finalCanonical = canonical || defaultMeta.canonical;

  useEffect(() => {
    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Update Description Meta Tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', finalDescription);

    // 3. Update Canonical Link Tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', finalCanonical);

    // 4. Update Robots Meta Tag for Security Exclusion (noindex, nofollow)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
    } else {
      if (metaRobots) {
        metaRobots.remove();
      }
    }
  }, [finalTitle, finalDescription, finalCanonical, noindex]);

  return null;
};
