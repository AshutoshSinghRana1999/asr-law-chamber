export const expertiseSlugs = [
  "banking-finance",
  "drt-sarfaesi",
  "insolvency-bankruptcy",
  "commercial-civil-litigation",
  "arbitration",
  "intellectual-property-rights",
] as const;

export type ExpertiseSlug =
  (typeof expertiseSlugs)[number];

export type ExpertiseArea = {
  title: string;
  slug: ExpertiseSlug;
  eyebrow: string;
  description: string;

  seoTitle: string;
  seoDescription: string;

  overview: string[];
  services: string[];
  relatedCategory: string;
};

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Banking & Finance",
    slug: "banking-finance",
    eyebrow: "Transactional and advisory support",

    description:
      "Legal support for lenders, borrowers, businesses and financial stakeholders across lending transactions, security documentation and recovery strategy.",

    seoTitle:
      "Banking & Finance Legal Services in New Delhi",

    seoDescription:
      "ASR LAW advises lenders, borrowers, businesses and financial stakeholders on loan documentation, guarantees, security creation, restructuring and recovery strategy.",

    overview: [
      "ASR LAW advises on legal issues arising from corporate and commercial lending transactions, including facility documentation, guarantees, security creation and enforcement planning.",
      "The firm assists clients in evaluating contractual rights, identifying legal and documentation risks and developing commercially practical strategies across the lifecycle of a financing arrangement.",
    ],

    services: [
      "Review and drafting of facility and loan documentation",
      "Personal and corporate guarantees",
      "Security creation and perfection",
      "Loan restructuring and settlement documentation",
      "Default and enforcement notices",
      "Lender and borrower advisory",
      "Contractual risk and documentation review",
      "Recovery and enforcement strategy",
    ],

    relatedCategory: "Banking & Finance",
  },

  {
    title: "DRT & SARFAESI",
    slug: "drt-sarfaesi",
    eyebrow: "Debt recovery and secured enforcement",

    description:
      "Representation and strategic advice in debt recovery proceedings, secured-creditor enforcement and related challenges before the appropriate forums.",

    seoTitle:
      "DRT & SARFAESI Legal Services in New Delhi",

    seoDescription:
      "ASR LAW represents banks, financial institutions, borrowers and guarantors in DRT, DRAT and SARFAESI proceedings involving debt recovery and secured enforcement.",

    overview: [
      "ASR LAW represents banks, financial institutions, borrowers, guarantors and other stakeholders in proceedings involving recovery of debt and enforcement of security interests.",
      "The firm assists with demand notices, possession measures, recovery applications, securitisation applications, appeals and connected enforcement disputes.",
    ],

    services: [
      "Proceedings before Debts Recovery Tribunals",
      "Proceedings before Debts Recovery Appellate Tribunals",
      "SARFAESI demand and possession measures",
      "Securitisation applications and challenges",
      "Original applications for debt recovery",
      "Guarantor and borrower liability disputes",
      "Auction and sale-process disputes",
      "Settlement and recovery strategy",
    ],

    relatedCategory: "DRT & SARFAESI",
  },

  {
    title: "Insolvency & Bankruptcy",
    slug: "insolvency-bankruptcy",
    eyebrow: "Insolvency strategy and representation",

    description:
      "Advice and representation for creditors, corporate debtors, resolution professionals and other stakeholders in insolvency and liquidation matters.",

    seoTitle:
      "Insolvency & Bankruptcy Legal Services in New Delhi",

    seoDescription:
      "ASR LAW advises creditors, corporate debtors, resolution professionals and other stakeholders on insolvency, liquidation, claims and personal guarantor proceedings.",

    overview: [
      "ASR LAW advises clients on proceedings and disputes arising under the insolvency framework, including creditor claims, corporate insolvency, liquidation and personal-guarantor matters.",
      "The firm assists stakeholders in assessing their legal position, preparing applications and responses and navigating contested issues before the adjudicating and appellate forums.",
    ],

    services: [
      "Corporate insolvency proceedings",
      "Creditor claims and claim disputes",
      "Applications by financial and operational creditors",
      "Representation of corporate debtors",
      "Resolution professional and liquidator-related matters",
      "Avoidance-transaction proceedings",
      "Liquidation and asset-realisation disputes",
      "Personal guarantor proceedings",
    ],

    relatedCategory: "Insolvency & Bankruptcy",
  },

  {
    title: "Commercial & Civil Litigation",
    slug: "commercial-civil-litigation",
    eyebrow: "Dispute resolution before courts and tribunals",

    description:
      "Representation in commercial and civil disputes involving contracts, recovery, property, injunctions and other contested business rights.",

    seoTitle:
      "Commercial & Civil Litigation in New Delhi",

    seoDescription:
      "ASR LAW represents businesses and individuals in commercial and civil disputes involving contracts, recovery claims, injunctions, property rights and enforcement proceedings.",

    overview: [
      "ASR LAW represents businesses and individuals in commercial and civil proceedings before courts and tribunals.",
      "The firm focuses on early assessment of rights, evidence and procedural strategy, with particular attention to urgent interim relief, enforceability and the commercial consequences of litigation.",
    ],

    services: [
      "Commercial suits and contractual disputes",
      "Recovery and damages claims",
      "Interim injunctions and urgent relief",
      "Property and possession disputes",
      "Declaratory and specific-relief proceedings",
      "Execution and enforcement proceedings",
      "Civil appeals and revisions",
      "Pre-litigation strategy and legal notices",
    ],

    relatedCategory: "Commercial & Civil Litigation",
  },

  {
    title: "Arbitration",
    slug: "arbitration",
    eyebrow: "Domestic and commercial arbitration",

    description:
      "Advice and representation across the arbitration lifecycle, from contractual strategy and interim relief to hearings, challenges and enforcement.",

    seoTitle:
      "Arbitration Legal Services in New Delhi",

    seoDescription:
      "ASR LAW advises and represents parties in commercial arbitration, interim measures, tribunal proceedings, appointment matters, award challenges and enforcement.",

    overview: [
      "ASR LAW assists clients with arbitration-related disputes arising from commercial contracts and business relationships.",
      "The firm advises at the pre-arbitration stage, represents parties before courts and arbitral tribunals and assists with interim protection, appointment proceedings, challenges and enforcement.",
    ],

    services: [
      "Arbitration notices and pre-arbitration strategy",
      "Appointment of arbitral tribunals",
      "Interim measures before courts and tribunals",
      "Statements of claim and defence",
      "Evidence and final-hearing preparation",
      "Challenges to arbitral awards",
      "Enforcement of arbitral awards",
      "Arbitration-related court proceedings",
    ],

    relatedCategory: "Arbitration",
  },

  {
    title: "Intellectual Property Rights",
    slug: "intellectual-property-rights",
    eyebrow:
      "Brand protection and intellectual property enforcement",

    description:
      "Advisory and dispute-resolution support for the protection and enforcement of trademarks, commercial identity, goodwill and related intellectual property rights.",

    seoTitle:
      "Intellectual Property Legal Services in New Delhi",

    seoDescription:
      "ASR LAW advises businesses and individuals on trademark infringement, passing off, prior use, brand protection, deceptive similarity and intellectual property enforcement.",

    overview: [
      "ASR LAW advises businesses and individuals on the protection, use and enforcement of intellectual property rights, with particular focus on trademarks, passing off and brand-related disputes.",
      "The firm assists clients in assessing ownership, prior use, registration, deceptive similarity, market confusion and the appropriate enforcement strategy, including urgent interim relief where commercial goodwill is at risk.",
    ],

    services: [
      "Trademark infringement and passing off",
      "Cease-and-desist notices",
      "Trademark ownership and prior-use disputes",
      "Brand protection and enforcement strategy",
      "Interim injunction proceedings",
      "Online and marketplace infringement",
      "Trademark opposition and rectification-related disputes",
      "Commercial goodwill and deceptive-similarity claims",
    ],

    relatedCategory: "Property & IP",
  },
];

export function getExpertiseBySlug(
  slug: string
): ExpertiseArea | undefined {
  return expertiseAreas.find(
    (expertise) => expertise.slug === slug
  );
}