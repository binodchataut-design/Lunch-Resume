/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

interface JSONLDSchemaProps {
  id: string;
  schema: Record<string, any>;
}

/**
 * Reusable utility component to inject a JSON-LD structured data script into the head
 * and safely clean it up on unmount to prevent stale schema pollution.
 */
export const JSONLDSchema: React.FC<JSONLDSchemaProps> = ({ id, schema }) => {
  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema, null, 2);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [id, schema]);

  return null;
};

interface SoftwareApplicationSchemaProps {
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  price: number | string;
  priceCurrency: string;
}

/**
 * SoftwareApplication Schema Component
 */
export const SoftwareApplicationSchema: React.FC<SoftwareApplicationSchemaProps> = ({
  name,
  applicationCategory,
  operatingSystem,
  price,
  priceCurrency,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory,
    operatingSystem,
    offers: {
      '@type': 'Offer',
      price: String(price),
      priceCurrency,
    },
  };

  return <JSONLDSchema id="software-app" schema={schema} />;
};

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

/**
 * FAQPage Schema Component
 */
export const FAQSchema: React.FC<FAQSchemaProps> = ({ items }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <JSONLDSchema id="faq-page" schema={schema} />;
};

interface ArticleSchemaProps {
  title: string;
  excerpt: string;
  datePublished: string;
  canonicalUrl: string;
}

/**
 * Article Schema Component
 */
export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  title,
  excerpt,
  datePublished,
  canonicalUrl,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt,
    datePublished: datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return <JSONLDSchema id="blog-article" schema={schema} />;
};

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbList Schema Component
 */
export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return <JSONLDSchema id="breadcrumb" schema={schema} />;
};
