export type SourceGroup = { title: string; items: { label: string; url: string }[] }

export const SOURCES: SourceGroup[] = [
  {
    title: 'Overview and mechanism',
    items: [
      {
        label:
          'Griffiths CEM, Armstrong AW, Gudjonsson JE, Barker JNWN. Psoriasis. The Lancet, 2021.',
        url: 'https://doi.org/10.1016/S0140-6736(20)32549-6',
      },
      {
        label: 'World Health Organization. Global report on psoriasis, 2016.',
        url: 'https://www.who.int/publications/i/item/9789241565189',
      },
      {
        label:
          'Parisi R et al. National, regional, and worldwide epidemiology of psoriasis. BMJ, 2020.',
        url: 'https://doi.org/10.1136/bmj.m1590',
      },
    ],
  },
  {
    title: 'Clinical guidance',
    items: [
      {
        label: 'National Psoriasis Foundation. About psoriasis: locations and types.',
        url: 'https://www.psoriasis.org/about-psoriasis/',
      },
      {
        label: 'American Academy of Dermatology. Psoriasis resource centre.',
        url: 'https://www.aad.org/public/diseases/psoriasis',
      },
      {
        label: 'NICE guideline CG153. Psoriasis: assessment and management.',
        url: 'https://www.nice.org.uk/guidance/cg153',
      },
      {
        label: 'AAD and NPF joint guidelines of care for psoriasis.',
        url: 'https://www.aad.org/member/clinical-quality/guidelines/psoriasis',
      },
    ],
  },
  {
    title: 'Diet, weight, alcohol and smoking',
    items: [
      {
        label:
          'Ford AR et al. Dietary recommendations for adults with psoriasis or psoriatic arthritis. JAMA Dermatology, 2018.',
        url: 'https://doi.org/10.1001/jamadermatol.2018.1412',
      },
      {
        label:
          'Phan C et al. Mediterranean diet and severity of psoriasis, NutriNet-Santé. JAMA Dermatology, 2018.',
        url: 'https://doi.org/10.1001/jamadermatol.2018.2127',
      },
      {
        label:
          'Jensen P et al. Effect of weight loss on the severity of psoriasis: a randomized clinical trial. JAMA Dermatology, 2013.',
        url: 'https://doi.org/10.1001/jamadermatol.2013.722',
      },
      {
        label:
          'Armstrong AW et al. Psoriasis and smoking: a systematic review and meta-analysis. British Journal of Dermatology, 2014.',
        url: 'https://doi.org/10.1111/bjd.12670',
      },
    ],
  },
  {
    title: 'Stress, mood and comorbidity',
    items: [
      {
        label:
          'Snast I et al. Psychological stress and psoriasis: a systematic review and meta-analysis. British Journal of Dermatology, 2018.',
        url: 'https://doi.org/10.1111/bjd.16116',
      },
      {
        label:
          'Dowlatshahi EA et al. Depressive symptoms and clinical depression in psoriasis. Journal of Investigative Dermatology, 2014.',
        url: 'https://doi.org/10.1038/jid.2013.508',
      },
      {
        label:
          'Takeshita J et al. Psoriasis and comorbid diseases: epidemiology. Journal of the American Academy of Dermatology, 2017.',
        url: 'https://doi.org/10.1016/j.jaad.2016.07.064',
      },
    ],
  },
  {
    title: 'Credits',
    items: [
      {
        label: 'Body model: MakeHuman base mesh, released as CC0 by the MakeHuman community.',
        url: 'http://www.makehumancommunity.org/',
      },
      {
        label: '3D rendering: three.js and React Three Fiber.',
        url: 'https://docs.pmnd.rs/react-three-fiber',
      },
      { label: 'Interface: Mantine component library.', url: 'https://mantine.dev/' },
    ],
  },
]
