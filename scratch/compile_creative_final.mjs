import fs from 'fs';
import { architect, designer } from './compile_creative_all.mjs';

const graphicDesigner = [
  {
    investment: {
      time: "2 Years (High school education + visual sketching & art)",
      cost: "₹20,000 - ₹50,000 (Drawing supplies, basic design software, online tutorials)"
    },
    actionItems: [
      {
        task: "Master the fundamentals of color theory, color harmony, and psychology of colors.",
        detail: "Understand warm vs cool palettes, complementary colors, and RGB (digital) vs CMYK (print) color gamuts."
      },
      {
        task: "Study Typography: anatomy of type, serif vs sans-serif, kerning, leading, and pairing fonts.",
        detail: "Great typography distinguishes amateur canva users from professional commercial graphic designers."
      },
      {
        task: "Practice hand lettering, calligraphy, and conceptual thumbnail sketches in a physical sketchbook.",
        detail: "Develop the ability to brainstorm 20 distinct visual concept sketches before opening computer software."
      }
    ],
    resources: [
      {
        name: "Thinking with Type by Ellen Lupton",
        type: "book",
        url: "https://ellenlupton.com",
        note: "The definitive critical guide to typography in visual communication and graphic design."
      },
      {
        name: "The Elements of Graphic Design by Alex W. White",
        type: "book",
        url: "https://www.simonandschuster.com",
        note: "Mastering space, unity, page architecture, and visual hierarchy."
      },
      {
        name: "The Futur with Chris Do (YouTube)",
        type: "course",
        url: "https://thefutur.com",
        note: "World-class tutorials on graphic design craft, typography, brand identity, and client pricing."
      }
    ],
    checkpoint: {
      criteria: "Completing 30 distinct brand logo sketches and scoring 80%+ in Class 12 Boards across any academic stream.",
      deliverable: "Class 12 Passing Marksheet and personal conceptual design sketchbook."
    },
    decisionPoints: [
      {
        question: "B.Des in Communication Design (NID/NIFT/Srishti) vs BFA in Applied Arts (Sir J.J. School of Art)",
        options: [
          {
            choice: "B.Des in Communication / Graphic Design (NID, NIFT, Pearl)",
            pros: "Modern digital branding, digital illustration, motion design, strong tech campus placement.",
            cons: "Higher tuition fees at private fashion and design schools."
          },
          {
            choice: "BFA in Applied Art (Sir J.J. Institute of Applied Art Mumbai, College of Art Delhi)",
            pros: "Classical illustration, rigorous hand-painting and typography foundations, prestigious advertising legacy.",
            cons: "Heavier focus on traditional print and manual commercial illustration over digital UI."
          }
        ]
      }
    ],
    warning: "Relying exclusively on Canva templates: Pre-made templates teach copy-pasting, not original visual concept generation, vector pen-tool mastery, or brand strategy.",
    fallbackPlan: "If design entrance exams are missed, enroll in a standard BA/B.Com and build an undeniable Behance/Dribbble portfolio using Adobe Illustrator.",
    realWorldStats: [
      {
        label: "NID DAT Prelims Acceptance Rate",
        value: "< 2%",
        context: "National Institute of Design entrance selectivity"
      },
      {
        label: "Freelance Logo Design Ticket Size",
        value: "₹5,000 - ₹50,000",
        context: "Standard brand identity design fees for Indian small businesses"
      }
    ]
  },
  {
    investment: {
      time: "3-4 Years (Undergraduate design degree + 15 hrs/week software projects)",
      cost: "₹1,50,000 (Govt College of Art) to ₹12,00,000 - ₹20,00,000 (Private design schools)"
    },
    actionItems: [
      {
        task: "Master the Adobe Creative Cloud suite: Adobe Illustrator, Adobe Photoshop, and Adobe InDesign.",
        detail: "Learn precise vector pen-tool bezier curves, photo compositing, non-destructive layer masks, and editorial book layout."
      },
      {
        task: "Design complete Brand Identity Systems: Logo mark, logotype, color palette, brand guidelines, and stationery.",
        detail: "Establish clear rules for minimum logo clearspace, incorrect usage, typography hierarchy, and branded packaging."
      },
      {
        task: "Learn print production specifications: bleed margins, trim lines, spot colors (Pantone PMS), and vector prepress.",
        detail: "Prevent costly commercial print errors like blurry raster images or incorrect color shifts."
      }
    ],
    resources: [
      {
        name: "Logo Design Love by David Airey",
        type: "book",
        url: "https://www.logodesignlove.com",
        note: "Essential guide for creating iconic brand identities with real client case studies."
      },
      {
        name: "Brand New (UnderConsideration)",
        type: "platform",
        url: "https://www.underconsideration.com/brandnew",
        note: "The leading global design blog reviewing corporate redesigns, rebrands, and logo redesigns."
      },
      {
        name: "Adobe Certified Professional (Illustrator / Photoshop)",
        type: "course",
        url: "https://certifiedprofessional.adobe.com",
        note: "Official industry-recognized credentials demonstrating software mastery."
      }
    ],
    checkpoint: {
      criteria: "Publishing 3 comprehensive brand identity projects on Behance that receive Featured badges or 1,000+ project appreciations.",
      deliverable: "Bachelor of Design / Fine Arts Degree Certificate and live Behance portfolio."
    },
    decisionPoints: [
      {
        question: "Brand Identity Design vs Editorial / Publishing Design vs Packaging Design",
        options: [
          {
            choice: "Brand Identity Design & Rebranding",
            pros: "High creative prestige, lucrative corporate client retainers, work across digital and physical touchpoints.",
            cons: "Subject to endless rounds of subjective client revisions and executive opinions."
          },
          {
            choice: "Packaging Design (FMCG Products)",
            pros: "Tangible physical products on supermarket shelves, complex structural dielines, high demand in consumer goods.",
            cons: "Strict statutory packaging labeling norms (FSSAI/FDA) and print production constraints."
          }
        ]
      }
    ],
    warning: "Using copyrighted fonts, images, or stock vectors in commercial client work without proper commercial licensing: Copyright infringement lawsuits can bankrupt an independent freelance designer.",
    fallbackPlan: "Join an advertising agency (Ogilvy, Dentsu, McCann) or creative boutique as a Junior Visualizer working on brand campaigns.",
    realWorldStats: [
      {
        label: "Junior Graphic Designer CTC",
        value: "₹3.5L - ₹7.5L/yr",
        context: "Starting salaries in advertising agencies and creative studios"
      },
      {
        label: "Behance Portfolio Impact",
        value: "70%+ of Inbound Client Inquiries",
        context: "Generated for visual designers through curated Behance projects"
      }
    ]
  },
  {
    investment: {
      time: "1-2 Years (Building agency experience + creative portfolio expansion)",
      cost: "₹15,000 - ₹50,000 (Behance Pro, Creative Cloud subscription ₹3,500/mo, design awards entry fees)"
    },
    actionItems: [
      {
        task: "Expand into Motion Graphics and 2D Animation using Adobe After Effects.",
        detail: "Animate logos, social media motion posters, explainer videos, and UI micro-animations (Lottie)."
      },
      {
        task: "Master 3D Illustration and Product Mockups using Blender or Cinema 4D.",
        detail: "Create realistic 3D bottle renders, isometric brand scenes, and photorealistic packaging mockups."
      },
      {
        task: "Secure client freelance projects on platforms like Contra, Behance, and through direct LinkedIn networking.",
        detail: "Draft formal freelance design service contracts with milestone-based payment schedules (50% upfront, 50% on completion)."
      }
    ],
    resources: [
      {
        name: "School of Motion (After Effects & Motion Design)",
        type: "course",
        url: "https://www.schoolofmotion.com",
        note: "The premier global academy for mastering motion design, animation principles, and visual storytelling."
      },
      {
        name: "Blender 3D Open Source Creation Suite",
        type: "tool",
        url: "https://www.blender.org",
        note: "The powerful free 3D modeling, texturing, and rendering suite used by top digital illustrators."
      },
      {
        name: "D&AD (Design and Art Direction) Annual & Awards",
        type: "platform",
        url: "https://www.dandad.org",
        note: "The global benchmark celebrating commercial design and advertising excellence (Yellow Pencil)."
      }
    ],
    checkpoint: {
      criteria: "Winning a recognized industry design award or building a motion graphics showreel viewed by 10,000+ design peers.",
      deliverable: "60-second Motion Graphics Showreel and verified client delivery portfolio."
    },
    decisionPoints: [
      {
        question: "Motion Graphics Designer vs 3D Brand Illustrator",
        options: [
          {
            choice: "Motion Graphics Designer",
            pros: "Massive demand in tech marketing, SaaS product videos, YouTube channels, 25-40% higher pay than static design.",
            cons: "Heavy rendering times; requires continuous hardware upgrades and animation keyframing patience."
          },
          {
            choice: "3D Brand Illustrator",
            pros: "High creative differentiation, work featured in high-end tech advertising (Apple, Nike style), artistic recognition.",
            cons: "Steeper 3D modeling, texturing, and lighting learning curve."
          }
        ]
      }
    ],
    warning: "Delivering design files without organizing layers and converting fonts to outlines: Sending messy, unorganized layered PSDs or missing font files makes you look completely unprofessional to print vendors and clients.",
    fallbackPlan: "Work as an in-house Senior Visual Designer for high-growth consumer D2C brands (Mamaearth, BoAt, Sugar Cosmetics) designing social and performance ad campaigns.",
    realWorldStats: [
      {
        label: "Motion Designer Salary Premium",
        value: "30% Higher Pay",
        context: "Compared to static graphic design roles in Indian agencies"
      },
      {
        label: "Performance Ad Design Volume",
        value: "20 - 50 Creatives / Month",
        context: "Required by D2C brands for Meta/Google ad variations"
      }
    ]
  },
  {
    investment: {
      time: "3-5 Years (Art Director / Creative Director / Independent Studio founder)",
      cost: "₹2,00,000 - ₹8,00,000 (Creative studio office lease, calibrated high-end displays, business development)"
    },
    actionItems: [
      {
        task: "Lead end-to-end Brand Strategy and Creative Direction for national and international corporate rebrands.",
        detail: "Define brand archetype, voice and tone, visual positioning, and manage a team of visualizers and copywriters."
      },
      {
        task: "Direct large-scale commercial photo and video shoots for brand campaigns.",
        detail: "Create mood boards, direct camera angles, supervise color grading (LUTs), and approve final master deliverables."
      },
      {
        task: "Establish an independent Boutique Branding Agency or Creative Studio.",
        detail: "Pitch for multi-lakh retainer accounts with startups, hospitality groups, and FMCG consumer brands."
      }
    ],
    resources: [
      {
        name: "Damn Good Advice (For People with Talent!) by George Lois",
        type: "book",
        url: "https://www.phaidon.com",
        note: "Legendary advertising masterclass on daring ideas, cultural provocation, and creative confidence."
      },
      {
        name: "Communication Arts Magazine",
        type: "platform",
        url: "https://www.commarts.com",
        note: "The premier source of inspiration for graphic designers, art directors, and corporate communicators."
      },
      {
        name: "AIGA (American Institute of Graphic Arts)",
        type: "platform",
        url: "https://www.aiga.org",
        note: "The oldest and largest professional membership organization for design."
      }
    ],
    checkpoint: {
      criteria: "Leading an enterprise rebrand campaign that achieves national visibility and securing regular monthly agency retainer revenue.",
      deliverable: "Published Comprehensive Brand Identity Guidelines Book (100+ pages) and active creative studio roster."
    },
    decisionPoints: [
      {
        question: "Agency Creative Director vs Founding an Independent Boutique Design Studio",
        options: [
          {
            choice: "Agency Creative Director (Ogilvy, Leo Burnett, DDB)",
            pros: "Direct mega-budget campaigns for Fortune 500 brands, global Cannes Lions award campaigns, high corporate salary.",
            cons: "Agonizing corporate politics; long agency hours with pitch deadlines."
          },
          {
            choice: "Independent Boutique Design Studio Founder",
            pros: "Select your own clients, total creative freedom, keep all agency net profit margins (30-40%).",
            cons: "Continuous business development pressure; financial responsibility for team salaries during slow months."
          }
        ]
      }
    ],
    warning: "Letting your design style become outdated: Graphic design trends evolve every 2-3 years; resting on past laurels and failing to adapt to modern 3D, AI, and kinetic typography will make your studio irrelevant.",
    fallbackPlan: "Serve as Global Head of Brand Design at a multinational technology enterprise overseeing enterprise brand governance.",
    realWorldStats: [
      {
        label: "Creative Director CTC",
        value: "₹25L - ₹65L+/yr",
        context: "Senior creative leadership in Indian advertising hubs (Mumbai, Bengaluru, Delhi-NCR)"
      },
      {
        label: "Complete Rebranding Agency Fee",
        value: "₹8 Lakhs - ₹35 Lakhs+",
        context: "Standard enterprise brand overhaul retainer for mid-size corporations"
      }
    ]
  }
];

const interiorDesigner = [
  {
    investment: {
      time: "2 Years (High school education + spatial sketching & architectural awareness)",
      cost: "₹20,000 - ₹50,000 (School tuition & sketching supplies)"
    },
    actionItems: [
      {
        task: "Score 50%+ in Class 12 Boards across any academic stream (Arts, Commerce, or Science).",
        detail: "Interior design values creative spatial thinking, color balance, and material sensitivity over pure mathematics."
      },
      {
        task: "Appear for design entrance exams: NID DAT, UCEED, or private design college entrances (Pearl, UID, CEPT).",
        detail: "Practice observation drawing, human scale perspective, light and shadow rendering, and spatial aptitude."
      },
      {
        task: "Study architectural styles and furniture history: Mid-Century Modern, Scandinavian, Industrial, Art Deco, and Indian Vernacular.",
        detail: "Recognize iconic furniture forms, joinery styles, and historical material movements."
      }
    ],
    resources: [
      {
        name: "National Institute of Design (NID) Entrance Resources",
        type: "documentation",
        url: "https://admissions.nid.edu",
        note: "Official portal for India's premier design education institution."
      },
      {
        name: "The Interior Design Handbook by Frida Ramstedt",
        type: "book",
        url: "https://www.penguin.co.uk",
        note: "Practical rules of thumb on space planning, rug sizing, lighting layers, and visual balance."
      },
      {
        name: "Institute of Indian Interior Designers (IIID)",
        type: "platform",
        url: "https://www.iiid.in",
        note: "Apex professional body for interior designers, educators, and trade affiliates across India."
      }
    ],
    checkpoint: {
      criteria: "Scoring qualifying marks in design entrance exams and securing admission into a recognized B.Des Interior Design program.",
      deliverable: "Class 12 Passing Certificate and College Admission Allotment Letter."
    },
    decisionPoints: [
      {
        question: "4-Year Bachelor of Design (B.Des) vs 3-Year B.Sc in Interior Design vs Diploma",
        options: [
          {
            choice: "4-Year B.Des in Interior / Spatial Design",
            pros: "Deep architectural studio training, ergonomics, building services, recognized globally for master's programs.",
            cons: "Longer duration and higher overall tuition costs."
          },
          {
            choice: "3-Year B.Sc / Diploma in Interior Design",
            pros: "Faster entry into the job market, lower educational expense, practical software focus.",
            cons: "Often skips complex structural services, HVAC coordination, and advanced commercial design."
          }
        ]
      }
    ],
    warning: "Confusing interior decoration with interior design: Interior designers do not just pick curtains and cushions; they design spatial layouts, electrical conduits, plumbing, false ceilings, and structural partition walls.",
    fallbackPlan: "If top design institutes are inaccessible, enroll in an accredited 3-year interior design program and focus on mastering 3ds Max, AutoCAD, and construction detailing.",
    realWorldStats: [
      {
        label: "Indian Interior Design Market",
        value: "$25+ Billion",
        context: "Rapidly expanding residential and commercial real estate market"
      },
      {
        label: "Average Renovation Budget",
        value: "₹1,200 - ₹2,500 / sq ft",
        context: "Standard residential interior fit-out cost in Indian tier-1 cities"
      }
    ]
  },
  {
    investment: {
      time: "4 Years (Undergraduate degree + practical studio juries + material workshops)",
      cost: "₹2,00,000 (Govt) to ₹10,00,000 - ₹20,00,000 (Private design universities)"
    },
    actionItems: [
      {
        task: "Master technical interior drafting in AutoCAD: 2D floor plans, reflected ceiling plans (RCP), and electrical layouts.",
        detail: "Dimension switchboard heights, two-way lighting loops, AC indoor/outdoor copper piping, and plumbing lines."
      },
      {
        task: "Master photorealistic 3D rendering using 3ds Max + V-Ray/Corona or SketchUp + Enscape.",
        detail: "Create photorealistic material textures (wood veneers, Italian marble, brass finishes, boucle fabrics) with accurate IES lighting."
      },
      {
        task: "Conduct material market surveys in timber, stone, and tile wholesale markets.",
        detail: "Learn plywood grades (BWP / BWR / Commercial), veneers, high-pressure laminates, quartz, and hardware fittings (Blum, Hettich, Hafele)."
      }
    ],
    resources: [
      {
        name: "Time-Saver Standards for Interior Design and Space Planning (DeChiara)",
        type: "book",
        url: "https://www.mheducation.com",
        note: "The definitive encyclopedia of interior dimensions, clearances, ergonomics, and accessibility."
      },
      {
        name: "Chaos Corona / V-Ray Rendering Masterclasses",
        type: "course",
        url: "https://www.chaos.com",
        note: "Industry standard tutorials on realistic interior lighting, camera composition, and PBR material creation."
      },
      {
        name: "Hettich & Hafele Architectural Hardware Manuals",
        type: "documentation",
        url: "https://www.hettich.com",
        note: "Essential technical specifications for soft-close drawer runners, concealed hinges, and sliding door fittings."
      }
    ],
    checkpoint: {
      criteria: "Successfully completing and defending an end-to-end commercial interior design project (boutique hotel or co-working space) before an external jury.",
      deliverable: "Bachelor of Design (B.Des) in Interior Design Degree Certificate and comprehensive design portfolio."
    },
    decisionPoints: [
      {
        question: "High-End Luxury Residential Design vs Commercial Office / Hospitality Design",
        options: [
          {
            choice: "Luxury Residential Interiors (Villas, Penthouses)",
            pros: "Deep creative personalization, custom bespoke furniture, emotionally fulfilling client relationships.",
            cons: "Demanding clients with frequent indecisive changes; payments often delayed until final touch-ups."
          },
          {
            choice: "Commercial / Corporate Workplace Interiors (Offices, Retail, Cafes)",
            pros: "Structured corporate procurement, fast project turnaround, clear milestone payments, high square footage.",
            cons: "Corporate cost-cutting pressures; standardized corporate branding guidelines."
          }
        ]
      }
    ],
    warning: "Specifying materials without checking site feasibility: Selecting heavy Italian marble on weak partition walls or specifying non-fire-rated materials in commercial spaces violates safety codes and causes structural failures.",
    fallbackPlan: "Work as an in-house Interior Designer for digital modular interior platforms (Livspace, HomeLane) managing residential client conversions and 3D design visualizers.",
    realWorldStats: [
      {
        label: "Junior Interior Designer Starting Pay",
        value: "₹22,000 - ₹40,000/month",
        context: "Junior designers in boutique interior architecture studios"
      },
      {
        label: "Photorealistic Render Value",
        value: "₹3,000 - ₹8,000 / View",
        context: "Freelance 3D rendering fees charged per camera angle"
      }
    ]
  },
  {
    investment: {
      time: "1-2 Years (Practical site supervision + modular manufacturing internships)",
      cost: "₹10,000 - ₹40,000 (Laser measurement meter, safety boots, site tools)"
    },
    actionItems: [
      {
        task: "Supervise on-site carpentry, civil masonry, false ceiling POP framing, and electrical wiring execution.",
        detail: "Coordinate teams of carpenters, electricians, plumbers, and painters; verify plumb line and spirit level accuracy."
      },
      {
        task: "Draft comprehensive Bill of Quantities (BOQ) and detailed contractor estimates.",
        detail: "Calculate square footage of laminates, running feet of skirting, number of electrical points, and paint coats."
      },
      {
        task: "Intern with modular furniture manufacturing factories equipped with CNC machines and edge-banders.",
        detail: "Understand factory-finished pre-laminated particle board/MDF carcass manufacturing and cam-lock flatpack assembly."
      }
    ],
    resources: [
      {
        name: "Indian Institute of Interior Designers (IIID) Code of Professional Conduct",
        type: "documentation",
        url: "https://www.iiid.in",
        note: "Ethical guidelines on designer commissions, vendor kickbacks, and professional practice fees."
      },
      {
        name: "Elle Decor India & GoodHomes Magazine",
        type: "platform",
        url: "https://www.elledecor.in",
        note: "Inspirational showcase of the finest homes, designer furniture collections, and trend forecasts."
      },
      {
        name: "Bosch Professional Laser Measure (GLM 50C)",
        type: "tool",
        url: "https://www.bosch-professional.com",
        note: "The essential pocket laser measurement tool for recording accurate on-site room dimensions."
      }
    ],
    checkpoint: {
      criteria: "Successfully managing on-site execution of a complete 3BHK residential interior project from bare shell to final handover.",
      deliverable: "Verified site handover sign-off sheet and completed project photograph portfolio."
    },
    decisionPoints: [
      {
        question: "Site Execution Project Manager vs Studio Concept Designer",
        options: [
          {
            choice: "Site Project Manager (Execution Track)",
            pros: "Hands-on master of construction reality, solving practical site bottlenecks, managing contractor labor, highly valued.",
            cons: "Dusty, noisy construction sites; handling daily contractor labor delays and material breakages."
          },
          {
            choice: "Studio Concept & Material Stylist",
            pros: "Air-conditioned studio environment, curating color palettes, fabrics, artwork, and mood boards.",
            cons: "Less direct control over whether the finished site matches the concept rendering."
          }
        ]
      }
    ],
    warning: "Accepting hidden vendor commissions (kickbacks) without client transparency: Taking under-the-table kickbacks from tile and marble vendors erodes professional ethics and destroys client trust when discovered.",
    fallbackPlan: "Serve as a Lead Visual Merchandiser or Retail Space Designer for global retail brands (IKEA, West Elm, FabIndia).",
    realWorldStats: [
      {
        label: "Carpentry Labor Rate in Metros",
        value: "₹350 - ₹650 / sq ft",
        context: "Standard on-site carpentry fabrication labor cost for custom wardrobes"
      },
      {
        label: "Modular Turnkey Project Timeline",
        value: "45 - 60 Days",
        context: "Standard turnaround from factory order to on-site assembly"
      }
    ]
  },
  {
    investment: {
      time: "2-5 Years (Launching independent interior design firm / design-build practice)",
      cost: "₹5,00,000 - ₹18,00,000 (Sample material library, studio interior, CAD workstations, marketing)"
    },
    actionItems: [
      {
        task: "Found an independent Interior Architecture & Design Studio.",
        detail: "Build an active vendor ecosystem of reliable master carpenters, marble polishers, fabricators, and upholstery artisans."
      },
      {
        task: "Offer Turnkey Design & Build services: charge 10-15% management fee on total project cost, or fixed rate per sq ft.",
        detail: "Manage client cash flow milestones, material procurement discounts, and structural warranties."
      },
      {
        task: "Style and photograph completed residential and commercial projects for Architectural Digest and social media.",
        detail: "Hire architectural photographers, style with fresh florals, props, and art, and build a magnetic Instagram presence."
      }
    ],
    resources: [
      {
        name: "Architectural Digest India (AD100 Most Influential Architects & Interior Designers)",
        type: "platform",
        url: "https://www.architecturaldigest.in",
        note: "The benchmark annual list celebrating the finest spatial design talents in the country."
      },
      {
        name: "Houzz India Interior Design Portal",
        type: "platform",
        url: "https://www.houzz.in",
        note: "Premier homeowner marketplace connecting interior design professionals with prospective clients."
      },
      {
        name: "Livingetc & Wallpaper* Magazine",
        type: "platform",
        url: "https://www.wallpaper.com",
        note: "International avant-garde design, bespoke furniture, and contemporary interior architecture."
      }
    ],
    checkpoint: {
      criteria: "Executing 5+ independent turnkey interior projects annually with client referral rate above 60%.",
      deliverable: "Published portfolio of executed turnkey projects and profitable registered design firm."
    },
    decisionPoints: [
      {
        question: "Turnkey (End-to-End Contract) vs Pure Design Consultation (Per Sq Ft Fee)",
        options: [
          {
            choice: "Turnkey Design & Build Contract",
            pros: "Much larger cash flow (handling ₹30L - ₹1 Cr+ per project); earn contractor margins plus design fees.",
            cons: "Direct financial liability if materials are damaged or contractors delay the handover."
          },
          {
            choice: "Design Consultation Only (₹150 - ₹400 / sq ft)",
            pros: "Zero construction financial risk; provide design sheets and material specs; client pays contractors directly.",
            cons: "Client may execute the design poorly with cheap contractors, ruining your portfolio pictures."
          }
        ]
      }
    ],
    warning: "Handing over keys to the client before collecting final payment milestone: Once homeowners move their furniture into the house, collecting the final 10-15% payment retention becomes an exhausting legal battle.",
    fallbackPlan: "Partner with luxury real estate developers designing flagship experience centers and sample show flats (model apartments).",
    realWorldStats: [
      {
        label: "Established Studio Annual Turnover",
        value: "₹50 Lakhs - ₹3 Crores+",
        context: "Annual billings of successful boutique interior design firm"
      },
      {
        label: "Average Design Profit Margin",
        value: "15% - 25%",
        context: "Net profit margin on comprehensive turnkey residential projects"
      }
    ]
  }
];

// Combine the first 4 creative careers
export const partialCreativeRoadmaps = {
  architect,
  designer,
  "graphic-designer": graphicDesigner,
  "interior-designer": interiorDesigner
};

console.log('Creative partial (4/8) prepared.');
