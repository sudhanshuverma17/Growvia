import fs from 'fs';
import { partialCreativeRoadmaps } from './compile_creative_final.mjs';

const fashionDesigner = [
  {
    investment: {
      time: "2 Years (High school education + sketching, textiles, and fashion entrance prep)",
      cost: "₹25,000 - ₹70,000 (School tuition, sketchbooks, NIFT entrance drawing classes)"
    },
    actionItems: [
      {
        task: "Score 50%+ in Class 12 Boards across any academic stream (Arts, Science, or Commerce).",
        detail: "Fashion design programs evaluate creative visual aptitude, human form sketching, and material exploration."
      },
      {
        task: "Prepare for NIFT (National Institute of Fashion Technology) Entrance Exam (CAT & GAT).",
        detail: "Practice Creative Ability Test (CAT - color sensibilities, perspective drawing) and General Ability Test (GAT)."
      },
      {
        task: "Study fashion history, world textiles, and haute couture vs ready-to-wear (prêt-à-porter).",
        detail: "Understand Indian heritage weaves (Chanderi, Banarasi, Kanjeevaram, Khadi) and international fashion houses."
      }
    ],
    resources: [
      {
        name: "National Institute of Fashion Technology (NIFT) Official Portal",
        type: "documentation",
        url: "https://www.nift.ac.in",
        note: "Statutory national institute of excellence in fashion education, design, and management."
      },
      {
        name: "Fashion Design Course: Principles, Practice, and Techniques (Steven Faerm)",
        type: "book",
        url: "https://www.barronseduc.com",
        note: "Practical handbook covering silhouette development, mood boards, and fashion sketching."
      },
      {
        name: "Vogue Runway & The Business of Fashion (BoF)",
        type: "platform",
        url: "https://www.businessoffashion.com",
        note: "The leading global authority on international fashion weeks, luxury commerce, and designer collections."
      }
    ],
    checkpoint: {
      criteria: "Scoring qualifying rank in NIFT Situation Test and securing admission into an accredited B.Des Fashion Design program.",
      deliverable: "NIFT Entrance Scorecard and Fashion College Admission Letter."
    },
    decisionPoints: [
      {
        question: "NIFT Campuses (Delhi/Mumbai) vs Private Fashion Colleges (Pearl Academy / NID)",
        options: [
          {
            choice: "NIFT Delhi / Mumbai",
            pros: "Premier national brand, highly subsidized fees compared to private schools, legendary alumni network in Indian fashion.",
            cons: "Fierce national entrance competition for top campus ranks."
          },
          {
            choice: "Pearl Academy / National Institute of Design (NID)",
            pros: "Avant-garde international design curriculum, strong industry mentor workshops, modern equipment.",
            cons: "Substantially higher tuition fees at private fashion institutes."
          }
        ]
      }
    ],
    warning: "Assuming fashion design is just modeling clothes or dressing up: Real fashion design requires hundreds of hours of pattern making, fabric cutting, sewing machine mechanics, and pin-pricked fingers.",
    fallbackPlan: "Enroll in B.Des Textile Design or Fashion Communication; these adjacent disciplines share massive overlap in styling and garment development.",
    realWorldStats: [
      {
        label: "NIFT Entrance Applicants",
        value: "40,000+ Candidates",
        context: "Competing annually for ~4,500 seats across all campuses"
      },
      {
        label: "Indian Textile & Apparel Market",
        value: "$165+ Billion",
        context: "One of the largest manufacturing and export sectors in India"
      }
    ]
  },
  {
    investment: {
      time: "4 Years (Undergraduate degree + garment construction labs + annual graduation collection)",
      cost: "₹6,00,000 (NIFT) to ₹15,00,000 - ₹24,00,000 (Private fashion schools)"
    },
    actionItems: [
      {
        task: "Master Pattern Making, Draping on dress forms, and Garment Construction sewing.",
        detail: "Create precise paper patterns with dart manipulations, seam allowances, and sew collars, plackets, and zippers."
      },
      {
        task: "Master digital fashion illustration software: Adobe Illustrator, Photoshop, and CLO 3D.",
        detail: "Create digital flat technical production sketches (tech packs) detailing stitching specs, trims, and Pantone swatches."
      },
      {
        task: "Design and construct an original 5-look Graduation Fashion Collection.",
        detail: "Source textiles from wholesale fabric markets, direct embroidery artisans, and showcase on the runway."
      }
    ],
    resources: [
      {
        name: "Patternmaking for Fashion Design by Helen Joseph-Armstrong",
        type: "book",
        url: "https://www.pearson.com",
        note: "The international undisputed bible of flat pattern making, darts, sleeves, and bodices."
      },
      {
        name: "CLO 3D Fashion Design Software",
        type: "tool",
        url: "https://www.clo3d.com",
        note: "The industry standard 3D garment simulation software used by global apparel brands for virtual sampling."
      },
      {
        name: "Fashion Design Council of India (FDCI)",
        type: "platform",
        url: "https://www.fdci.org",
        note: "Apex body organizing Lakme Fashion Week / India Fashion Week promoting Indian couture and ready-to-wear."
      }
    ],
    checkpoint: {
      criteria: "Successfully showcasing a completed 5-look collection at the college graduation runway show before industry judges.",
      deliverable: "Bachelor of Design (B.Des) in Fashion Design Degree Certificate and comprehensive Lookbook portfolio."
    },
    decisionPoints: [
      {
        question: "Couture & Bridal Wear (Sabyasachi, Manish Malhotra style) vs Commercial Western Ready-to-Wear (Zara, H&M style)",
        options: [
          {
            choice: "Indian Couture & Bridal Luxury",
            pros: "Massive Indian wedding market, hand-embroidered artisanal craftsmanship, ultra-high ticket prices (₹2L - ₹15L per lehenga).",
            cons: "High reliance on skilled manual karigars (artisans); seasonal wedding demand cycles."
          },
          {
            choice: "Commercial Ready-to-Wear / Mass Apparel",
            pros: "High manufacturing volume, consistent year-round production, corporate job stability in export houses.",
            cons: "Tight manufacturing margin pressures and fast-fashion inventory turnover."
          }
        ]
      }
    ],
    warning: "Designing unwearable fantasy costumes without technical Tech Packs: Apparel export houses and design studios hire designers who can translate ideas into industrial factory tech packs with accurate measurement charts.",
    fallbackPlan: "Work as an Assistant Fashion Stylist for Bollywood films, OTT web series, or e-commerce catalog shoots (Myntra, Nykaa).",
    realWorldStats: [
      {
        label: "Junior Designer Starting Pay",
        value: "₹22,000 - ₹42,000/month",
        context: "Assistant designers in established couture studios and export houses"
      },
      {
        label: "Indian Bridal Market Value",
        value: "$50+ Billion",
        context: "The massive luxury wedding apparel ecosystem in India"
      }
    ]
  },
  {
    investment: {
      time: "1-2 Years (Assistant designer apprenticeship in established fashion house)",
      cost: "₹10,000 - ₹30,000 (Pattern paper, tailoring shears, professional portfolio prints)"
    },
    actionItems: [
      {
        task: "Work as Assistant Designer under an established couturier or export house creative director.",
        detail: "Manage master karigars (embroidery artisans), oversee zardozi/aari embroidery sampling, and verify dyeing swatches."
      },
      {
        task: "Coordinate backstage fittings and runway lineups at Lakme Fashion Week or India Couture Week.",
        detail: "Handle last-minute garment steaming, emergency pinning, model fittings, and stylist coordination under intense pressure."
      },
      {
        task: "Manage production sample development and client bespoke custom fitting trials.",
        detail: "Take client body measurements, conduct muslin trials, and supervise final alterations for high-profile clients."
      }
    ],
    resources: [
      {
        name: "Textiles and Fashion: Materials, Design and Technology (Woodhead Publishing)",
        type: "book",
        url: "https://www.elsevier.com",
        note: "Scientific authority on yarn spinning, fabric weaving, knit structures, and fabric finishing."
      },
      {
        name: "Lakme Fashion Week Official Runway Archives",
        type: "platform",
        url: "https://www.lakmefashionweek.co.in",
        note: "High-definition photo and video archives of premier Indian designer runway collections."
      },
      {
        name: "The Fashion System by Roland Barthes",
        type: "book",
        url: "https://www.ucpress.edu",
        note: "Seminal semiotic analysis of how fashion magazines and cultural language create garment desire."
      }
    ],
    checkpoint: {
      criteria: "Successfully managing production of a complete 20-piece seasonal collection line from fabric sourcing to runway showcase.",
      deliverable: "Verified runway credit and signed letter of recommendation from creative director."
    },
    decisionPoints: [
      {
        question: "Couture Design Assistant vs Mass Retail Fashion Buyer / Merchandiser",
        options: [
          {
            choice: "Couture Studio Assistant (Design Track)",
            pros: "Direct mentorship from celebrity designers, high creative fulfillment, networking with celebrity stylists.",
            cons: "Long working hours with modest starting salaries."
          },
          {
            choice: "Fashion Buyer / Retail Merchandiser (Corporate Track - Reliance Trends, Aditya Birla Fashion)",
            pros: "Structured corporate hours, analytics-driven inventory budgeting, higher initial starting salary (₹6L - ₹10L).",
            cons: "Focus on commercial sales spreadsheets rather than designing original garments."
          }
        ]
      }
    ],
    warning: "Burning bridges with master karigars (artisans): In Indian couture, the master pattern-cutter and embroidery karigars are irreplaceable; treating them with disrespect will paralyze your collection production.",
    fallbackPlan: "Serve as an In-House Fashion Merchandiser or Costume Designer for regional theater, OTT platforms, and commercial ad films.",
    realWorldStats: [
      {
        label: "Fashion Week Runway Show Cost",
        value: "₹15 Lakhs - ₹40 Lakhs",
        context: "Sponsorship and production fees to showcase at premier fashion weeks"
      },
      {
        label: "Designer Assistant Hours",
        value: "12 - 14 Hours/Day",
        context: "Standard daily workload leading up to fashion week show dates"
      }
    ]
  },
  {
    investment: {
      time: "2-5 Years (Launching independent designer label and flagship boutique)",
      cost: "₹10,00,000 - ₹35,00,000 (Sample collection fabrics, artisan advances, atelier rent, PR & lookbook photography)"
    },
    actionItems: [
      {
        task: "Found an independent Designer Label with a distinct signature aesthetic (e.g. contemporary handlooms, modern bridal).",
        detail: "Set up a dedicated design atelier with master pattern cutters, tailors, and hand-finishing artisans."
      },
      {
        task: "Secure multi-designer retail store distribution (Pernia's Pop-Up Shop, Aza Fashions, Ogaan, Ensemble).",
        detail: "Pitch seasonal lookbooks to luxury multi-brand curators for consignment or outright wholesale purchase."
      },
      {
        task: "Execute VIP celebrity dressing and influencer styling PR campaigns.",
        detail: "Seed garments with celebrity stylists for red-carpet appearances, film promotions, and high-profile magazine covers."
      }
    ],
    resources: [
      {
        name: "Pernia's Pop-Up Shop & Aza Fashions Luxury Portals",
        type: "platform",
        url: "https://www.perniaspopupshop.com",
        note: "India's premier luxury multi-designer destination showcasing top Indian couture labels globally."
      },
      {
        name: "Fashion Business Manual by Fashionary",
        type: "book",
        url: "https://fashionary.org",
        note: "Visual handbook for launching and managing an independent fashion brand, pricing, and retail merchandising."
      },
      {
        name: "WGSN Fashion Trend Forecasting",
        type: "platform",
        url: "https://www.wgsn.com",
        note: "The global trend forecasting authority predicting color palettes, silhouettes, and consumer culture 2 years ahead."
      }
    ],
    checkpoint: {
      criteria: "Showcasing your independent label at a premier fashion week (FDCI / Lakme) and generating ₹50 Lakhs+ in annual collection orders.",
      deliverable: "Published runway collection lookbook, registered trademark brand, and active multi-designer retail stockist contracts."
    },
    decisionPoints: [
      {
        question: "Consignment Multi-Designer Stores vs Direct-to-Consumer (D2C) E-Commerce & Flagship Store",
        options: [
          {
            choice: "Direct-to-Consumer (D2C) & Private Atelier",
            pros: "Keep 100% of retail margins (avoiding 35-45% store commissions), direct relationship with high-spending brides.",
            cons: "Must drive all customer footfall and online marketing independently."
          },
          {
            choice: "Multi-Brand Luxury Stockists (Ogaan, Aza, Pernia)",
            pros: "Instant access to ultra-rich domestic and NRI diaspora clientele, high brand credibility from day one.",
            cons: "High retail commission cuts (35-45%) and delayed consignment payment reconciliation cycles."
          }
        ]
      }
    ],
    warning: "Over-producing inventory without confirmed customer orders: Manufacturing 50 expensive embroidered garments in multiple sizes before selling will trap all your working capital in unsold inventory.",
    fallbackPlan: "Focus on made-to-measure bespoke custom orders (client deposits 50% upfront before fabric is cut) to maintain a lean, profitable cash-positive operation.",
    realWorldStats: [
      {
        label: "Multi-Brand Store Retail Commission",
        value: "35% - 45% of Retail Price",
        context: "Standard luxury consignment retail margin in India"
      },
      {
        label: "Established Independent Designer Label Turnover",
        value: "₹1 Crore - ₹10 Crores+",
        context: "Annual revenue of successful boutique Indian designer brands"
      }
    ]
  }
];

const contentCreator = [
  {
    investment: {
      time: "3-6 Months focused niche discovery and audience research",
      cost: "₹10,000 - ₹40,000 (Smartphone with good 4K camera, lavalier microphone, ring light)"
    },
    actionItems: [
      {
        task: "Select a specific, defensible niche where your passion, unique insight, and market monetization overlap.",
        detail: "Avoid generic 'lifestyle vlogging'; focus on specific verticals: tech reviews, personal finance, coding tutorials, fitness, or career guidance."
      },
      {
        task: "Analyze the top 10 creators in your chosen niche to identify content gaps.",
        detail: "Study their top-performing video titles, thumbnail designs, hook structures, and read the comments to find unanswered questions."
      },
      {
        task: "Set up a clean filming setup with good lighting and professional audio.",
        detail: "Viewers will tolerate mediocre video quality, but they will immediately click away from poor, muffled audio; invest in a wireless mic."
      }
    ],
    resources: [
      {
        name: "The YouTube Formula by Derral Eves",
        type: "book",
        url: "https://www.wiley.com",
        note: "The definitive algorithmic guide to how YouTube recommends content, CTR, and audience retention."
      },
      {
        name: "Ali Abdaal Part-Time YouTuber Academy (Free Resources)",
        type: "course",
        url: "https://aliabdaal.com",
        note: "Practical frameworks on idea generation, scripting, video editing workflows, and productivity."
      },
      {
        name: "CapCut & DaVinci Resolve Free Video Editors",
        type: "tool",
        url: "https://www.blackmagicdesign.com/products/davinciresolve",
        note: "Industry-standard free video editing tools for high-retention short-form and long-form video editing."
      }
    ],
    checkpoint: {
      criteria: "Publishing your first 15 structured videos across 60 days with clear audio, custom thumbnails, and structured scripts.",
      deliverable: "Live creator channel profile with verified initial 15 published videos."
    },
    decisionPoints: [
      {
        question: "Short-Form First (Reels/Shorts/TikTok) vs Long-Form First (YouTube)",
        options: [
          {
            choice: "Short-Form Focus (Instagram Reels & YouTube Shorts)",
            pros: "Fast algorithm distribution, rapid follower acquisition, lower production barrier (60 seconds).",
            cons: "Lower audience emotional loyalty; much lower advertising RPM monetization compared to long-form."
          },
          {
            choice: "Long-Form Focus (8-15 Minute YouTube Videos)",
            pros: "Deep parasocial trust with audience, high AdSense RPM ($2 - $15), strong conversion to courses/products.",
            cons: "High production time per video (10-20 hours of scripting, shooting, and editing)."
          }
        ]
      }
    ],
    warning: "Spending thousands on high-end cinema cameras before publishing 50 videos: Hardware does not make great content; storytelling, concise editing, and authentic audience resonance are what matter.",
    fallbackPlan: "Repurpose all video scripts into written Twitter/X threads and LinkedIn carousels to capture multi-platform audiences with zero extra filming time.",
    realWorldStats: [
      {
        label: "First 30 Seconds Retention Goal",
        value: "60% - 70%+ Viewers Remaining",
        context: "Critical retention threshold for algorithmic promotion on YouTube"
      },
      {
        label: "Creator Quit Rate",
        value: "90% Quit within 3 Months",
        context: "Due to unrealistic overnight virality expectations"
      }
    ]
  },
  {
    investment: {
      time: "1-2 Years consistent publishing (1-2 long-form videos or 4-5 shorts weekly)",
      cost: "₹20,000 - ₹80,000 (Adobe Premiere Pro, Epidemic Sound music license, thumbnail designer fees)"
    },
    actionItems: [
      {
        task: "Master the 3-part storytelling framework: Strong Hook (0-5s), Core Narrative Arc, and Payoff with Call to Action.",
        detail: "Eliminate all filler words and boring pauses; every second of video must deliver information or emotional entertainment."
      },
      {
        task: "A/B test click-through rates (CTR) with high-contrast, curiosity-inducing thumbnails.",
        detail: "Keep thumbnail text under 4 words, use emotive facial expressions, and ensure readability on small mobile screens (target 6-10% CTR)."
      },
      {
        task: "Build an owned audience off social media via an email newsletter (Substack / ConvertKit).",
        detail: "Social algorithms can change overnight or shadowban your account; an email subscriber list is an asset you own forever."
      }
    ],
    resources: [
      {
        name: "Creator Hooks Newsletter by Jake Thomas",
        type: "platform",
        url: "https://creatorhooks.com",
        note: "Weekly breakdown of the psychology behind viral YouTube video titles and high-CTR concepts."
      },
      {
        name: "VidIQ / TubeBuddy Channel Analytics",
        type: "tool",
        url: "https://vidiq.com",
        note: "Essential browser extension for keyword research, competitor tag analysis, and thumbnail previewing."
      },
      {
        name: "Epidemic Sound & Artlist Royalty-Free Music",
        type: "tool",
        url: "https://www.epidemicsound.com",
        note: "High-quality, copyright-cleared music and sound effects essential for dynamic pacing."
      }
    ],
    checkpoint: {
      criteria: "Crossing 50,000 YouTube subscribers or 100,000 Instagram followers with average 20,000+ views per video.",
      deliverable: "YouTube Silver Creator Play Button milestone or verified Instagram creator profile with an engaged community."
    },
    decisionPoints: [
      {
        question: "Solo Creator (Doing Everything Alone) vs Hiring a Freelance Video Editor & Thumbnail Designer",
        options: [
          {
            choice: "Hire a Freelance Video Editor Once Generating Cash",
            pros: "Frees up 15-20 hours weekly to focus purely on high-leverage scripting, filming, and business deals.",
            cons: "Requires steady monthly cash flow to pay editing retainers (₹15,000 - ₹40,000/mo)."
          },
          {
            choice: "Continue Solo Editing",
            pros: "Zero payroll overhead; full creative control over editing cuts and comedic timing.",
            cons: "Severe risk of burnout handling research, shooting, editing, and thumbnail design concurrently."
          }
        ]
      }
    ],
    warning: "Chasing controversial drama or sensational clickbait for short-term views: Sensationalism destroys your reputation with premium brand sponsors and attracts low-quality audiences.",
    fallbackPlan: "Work as an in-house Social Media Video Producer or Growth Lead for tech brands (Cashfree, Zerodha) managing corporate content channels.",
    realWorldStats: [
      {
        label: "Benchmark Click-Through Rate (CTR)",
        value: "6% - 10%",
        context: "High-performing thumbnails on browse and suggested feeds"
      },
      {
        label: "YouTube AdSense RPM (Finance/Tech)",
        value: "₹200 - ₹600 / 1,000 Views",
        context: "Ad revenue per thousand views in high-intent Indian niches"
      }
    ]
  },
  {
    investment: {
      time: "2-4 Years (Full-time creator business operations and multi-stream monetization)",
      cost: "₹50,000 - ₹2,00,000 (Incorporating business entity, CA accounting, legal contracts, studio space)"
    },
    actionItems: [
      {
        task: "Negotiate integrated and dedicated Brand Sponsorship deals with talent management agencies.",
        detail: "Price sponsorships based on consistent median views rather than peak subscriber counts; charge ₹1 - ₹3 per view for dedicated integrations."
      },
      {
        task: "Launch Digital Products: Cohort-Based Courses, Paid Communities (Skool / Discord), or Digital Templates.",
        detail: "Digital products carry 90%+ profit margins and break your dependence on fickle brand sponsorships."
      },
      {
        task: "Incorporate a Private Limited company and operate as a formal media enterprise.",
        detail: "Manage GST compliance, trademark your personal brand, and hire a full-time content team (researcher, editor, manager)."
      }
    ],
    resources: [
      {
        name: "One Million Followers by Brendan Kane",
        type: "book",
        url: "https://www.brendanjkane.com",
        note: "Strategic growth strategies from the digital strategist behind Rihanna and Taylor Swift."
      },
      {
        name: "ConvertKit (Kit) Creator Marketing Platform",
        type: "tool",
        url: "https://kit.com",
        note: "The leading email marketing platform tailored for professional creators and digital product sales."
      },
      {
        name: "Cloutflow & Tagglabs Creator Influencer Agencies",
        type: "platform",
        url: "https://www.cloutflow.com",
        note: "Leading Indian talent agencies connecting top digital creators with corporate marketing campaigns."
      }
    ],
    checkpoint: {
      criteria: "Achieving stable monthly recurring revenue of ₹2 Lakhs - ₹10 Lakhs+ from diversified income streams (AdSense, Sponsors, Products).",
      deliverable: "Registered Media Company Incorporation Certificate, audited financial statements, and active corporate sponsor contracts."
    },
    decisionPoints: [
      {
        question: "Brand Sponsorship Reliance vs Building an Owned D2C Consumer Brand (Feastables, Beardo style)",
        options: [
          {
            choice: "Launch Owned D2C Physical Brand (e.g. Snacks, Apparel, Cosmetics)",
            pros: "Builds generational equity value; can be sold for ₹100Cr+ exits; independent of algorithm changes.",
            cons: "Complex manufacturing, inventory logistics, working capital requirements, high business failure risk."
          },
          {
            choice: "High-Margin Digital Products & Brand Partnerships",
            pros: "Lean 80%+ net profit margins, zero physical inventory headaches, total lifestyle freedom.",
            cons: "Revenue ceases if you stop creating content or taking brand deals."
          }
        ]
      }
    ],
    warning: "Promising sponsored promotions for unregulated crypto exchanges, betting apps, or predatory loan platforms: Promoting predatory schemes destroys community trust overnight and invites government ED/consumer court action.",
    fallbackPlan: "Operate a specialized Creator Marketing Agency managing organic short-form video production for B2B SaaS and consumer tech brands.",
    realWorldStats: [
      {
        label: "Established Creator Monthly Income",
        value: "₹2L - ₹12L+/month",
        context: "Creators with 100k+ dedicated niche audience in India"
      },
      {
        label: "Dedicated Brand Integration Fee",
        value: "₹50,000 - ₹3,50,000",
        context: "Per dedicated sponsored video in tech/finance niche"
      }
    ]
  }
];

const filmDirector = [
  {
    investment: {
      time: "2 Years (High school education + voracious world cinema watching and writing)",
      cost: "₹15,000 - ₹40,000 (Cinema subscriptions - MUBI, Criterion, books on screenwriting)"
    },
    actionItems: [
      {
        task: "Watch at least 200 classic world cinema masterpieces (Kurosawa, Ray, Hitchcock, Scorsese, Kubrick).",
        detail: "Analyze scene composition, blocking, lighting, non-linear editing pacing, and subtextual visual metaphors."
      },
      {
        task: "Write original short film screenplays using standard industry screenplay software (WriterDuet / Final Draft).",
        detail: "Master 3-act story structure, character arcs, visual description, and sharp, concise dialogue."
      },
      {
        task: "Shoot a 3-minute short dialogue film on a smartphone with two actors and edit it yourself.",
        detail: "Learn the 180-degree camera axis rule, shot-reverse-shot coverage, and room tone sound recording."
      }
    ],
    resources: [
      {
        name: "Film and Television Institute of India (FTII) Pune",
        type: "documentation",
        url: "https://www.ftiindia.com",
        note: "India's premier autonomous national film school producing legendary directors, cinematographers, and editors."
      },
      {
        name: "Save the Cat! The Last Book on Screenwriting by Blake Snyder",
        type: "book",
        url: "https://savethecat.com",
        note: "The world's most famous commercial Hollywood screenwriting structural guide and beat sheet."
      },
      {
        name: "Every Frame a Painting (YouTube Channel Archive)",
        type: "course",
        url: "https://www.youtube.com/c/everyframeapainting",
        note: "Masterclass video essays on visual storytelling, camera movement, and directorial style."
      }
    ],
    checkpoint: {
      criteria: "Writing a complete 15-page original short film screenplay in standard industry format.",
      deliverable: "Formatted PDF screenplay and a completed 3-minute smartphone short film link."
    },
    decisionPoints: [
      {
        question: "Film School (FTII, SRFTI, Whistling Woods) vs Jumping Directly into Industry as Assistant Director (AD)",
        options: [
          {
            choice: "Film School (FTII Pune / SRFTI Kolkata - JET Exam)",
            pros: "Access to 35mm cinema cameras, sound stages, master faculty, peer creative collaborators for life, government subsidy.",
            cons: "Extremely competitive entrance exam (JET) with <1% acceptance rate."
          },
          {
            choice: "Direct Industry Apprenticeship (Move to Mumbai/Chennai/Hyderabad)",
            pros: "Immediate practical experience on commercial sets; learning real commercial production budgeting.",
            cons: "Starting from the absolute bottom as an unpaid or low-paid intern fetching coffee."
          }
        ]
      }
    ],
    warning: "Focusing on expensive cinema cameras while ignoring character screenwriting: You can shoot on an ARRI Alexa with anamorphic lenses, but if your screenplay has boring characters and weak conflict, your film will be unwatchable.",
    fallbackPlan: "Enroll in a BA in Mass Communication or Literature and build a portfolio of independent student short films.",
    realWorldStats: [
      {
        label: "FTII Direction Seat Intake",
        value: "~10 - 12 Seats Annually",
        context: "Fierce national competition in Joint Entrance Test (JET)"
      },
      {
        label: "Indian Feature Films Produced",
        value: "1,500+ Films Annually",
        context: "The world's largest film production industry by volume"
      }
    ]
  },
  {
    investment: {
      time: "3 Years (Film school diploma or independent indie filmmaking)",
      cost: "₹1,50,000 (Govt FTII) to ₹8,00,000 - ₹20,00,000 (Private film institutes)"
    },
    actionItems: [
      {
        task: "Master the grammar of cinema: shot sizes (wide, medium, close-up), lens focal lengths, and camera movement (dolly, pan, tracking).",
        detail: "Understand how a 24mm wide lens distorts space while an 85mm telephoto lens compresses emotional intimacy."
      },
      {
        task: "Direct student narrative short films with professional actors, sync-sound, and controlled lighting.",
        detail: "Communicate actionable emotional directions to actors using active verbs rather than describing emotions."
      },
      {
        task: "Master post-production workflows: sound design, foley, ADR, color grading (DaVinci Resolve), and background score integration.",
        detail: "Sound is 50% of the cinema experience; master audio mixing and ambient soundscapes."
      }
    ],
    resources: [
      {
        name: "Directing: Film Techniques and Aesthetics by Michael Rabiger",
        type: "book",
        url: "https://www.routledge.com",
        note: "Comprehensive practical guide covering the craft of directing actors, camera blocking, and script breakdown."
      },
      {
        name: "Satyajit Ray's Our Films, Their Films",
        type: "book",
        url: "https://www.orientblackswan.com",
        note: "Profound philosophical essays on Indian cinematic aesthetics and visual realism."
      },
      {
        name: "American Cinematographer Magazine",
        type: "platform",
        url: "https://theasc.com",
        note: "In-depth technical interviews with directors and cinematographers breaking down behind-the-scenes lighting diagrams."
      }
    ],
    checkpoint: {
      criteria: "Directing a polished 15-20 minute narrative graduation short film selected for national or international film festivals.",
      deliverable: "Diploma / Degree in Film Direction and completed festival-ready DCP (Digital Cinema Package) short film."
    },
    decisionPoints: [
      {
        question: "Art-House Independent Cinema vs Commercial Mainstream Entertainment",
        options: [
          {
            choice: "Independent / Festival Track (Cannes, Venice, Sundance, MAMI)",
            pros: "Total uncompromising artistic voice, critical acclaim, international festival travel, auteur status.",
            cons: "Difficult financial path; hard to secure commercial theater releases; dependent on grants."
          },
          {
            choice: "Commercial Mainstream / OTT Series Track (Netflix, Prime, Theatrical)",
            pros: "Large multi-crore production budgets, massive mass audience reach, high commercial director fees.",
            cons: "Studio producer interference, casting dictated by star box-office value rather than character fit."
          }
        ]
      }
    ],
    warning: "Directing actors with vague adjectives ('be happier', 'be sadder'): Vague adjectives confuse actors; give them concrete objectives ('try to hide the fact that you stole his money').",
    fallbackPlan: "Work as an Assistant Director (AD) on corporate TV commercials (TVCs) and digital ad campaigns; ad film production pays ₹50,000 - ₹1,50,000 per project.",
    realWorldStats: [
      {
        label: "Short Film Budget Range",
        value: "₹50,000 - ₹5,00,000",
        context: "Typical self-funded or grant-funded festival short film budget"
      },
      {
        label: "Commercial Ad Director Day Rate",
        value: "₹50,000 - ₹2,00,000/day",
        context: "Shooting rate for established TV commercial directors"
      }
    ]
  },
  {
    investment: {
      time: "3-5 Years (Working up the ranks from 2nd AD to 1st Assistant Director / Chief AD)",
      cost: "₹20,000 - ₹60,000 (Call sheet software, production coordination tools, living in Mumbai/Hyderabad/Chennai)"
    },
    actionItems: [
      {
        task: "Work as 2nd AD and 1st AD on feature films and major OTT series.",
        detail: "1st AD is the field general of the film set: breaks down the script, creates the master shooting schedule, and runs the set on time."
      },
      {
        task: "Direct commercial digital ad films, brand films, and music videos to build an undeniable directing reel.",
        detail: "Manage client agency briefs, manage 50-person crews, and deliver high-production value within strict 1-day shoots."
      },
      {
        task: "Develop a mature, production-ready Feature Film Screenplay with full pitch deck and character bibles.",
        detail: "Pitch to studio development executives (Dharma, Excel, YRF, Maddock, Netflix India) and leading production houses."
      }
    ],
    resources: [
      {
        name: "Shot Designer Directing App",
        type: "tool",
        url: "https://www.hollywoodcamerawork.com/shot-designer.html",
        note: "Essential tool for camera blocking diagrams, actor movements, and lighting setup schematics."
      },
      {
        name: "Making Movies by Sidney Lumet",
        type: "book",
        url: "https://www.penguinrandomhouse.com",
        note: "The most honest, practical memoir on directing written by the master director of 12 Angry Men and Dog Day Afternoon."
      },
      {
        name: "NFDC (National Film Development Corporation of India) Film Bazaar",
        type: "platform",
        url: "https://filmbazaarindia.com",
        note: "South Asia's premier co-production market connecting filmmakers with international producers and financiers."
      }
    ],
    checkpoint: {
      criteria: "Submitting an officially selected film to an 'A-List' festival (Cannes, Berlin, Toronto, MAMI) or signing a formal feature film development deal.",
      deliverable: "Completed directing showreel, registered feature screenplay with SWA (Screenwriters Association), and producer agreement."
    },
    decisionPoints: [
      {
        question: "Feature Film Theatrical Track vs Multi-Episode OTT Web Series Track",
        options: [
          {
            choice: "Multi-Episode OTT Web Series (Netflix / Prime / SonyLIV)",
            pros: "Enormous boom in long-form episodic drama, high budgets, massive streaming distribution in 190 countries.",
            cons: "Heavy showrunner and studio executive creative oversight."
          },
          {
            choice: "Independent Theatrical Feature Film",
            pros: "The timeless romance of the big screen theater experience, eligible for National Awards and international film festivals.",
            cons: "High theater distribution barrier; box office weekend pressure."
          }
        ]
      }
    ],
    warning: "Neglecting the 1st AD schedule on set: Going over schedule wastes millions of rupees in crew overtime, equipment rentals, and actor dates, which will blackball a young director from future studio projects.",
    fallbackPlan: "Operate as an in-demand 1st Assistant Director or Executive Producer on international foreign film line-productions shooting in India.",
    realWorldStats: [
      {
        label: "1st Assistant Director Fee",
        value: "₹8L - ₹25L per Film",
        context: "Professional fee for seasoned 1st AD on Hindi/Tamil/Telugu features"
      },
      {
        label: "OTT Web Series Budget",
        value: "₹2 Cr - ₹8 Cr / Episode",
        context: "High-end Indian streaming production budgets"
      }
    ]
  },
  {
    investment: {
      time: "2-5 Years (Directing debut feature film to established studio auteur)",
      cost: "₹2,00,000 - ₹5,00,000 (Legal entertainment attorney contracts, representation)"
    },
    actionItems: [
      {
        task: "Direct your debut feature film with a signed production budget (₹3 Cr to ₹50 Cr+).",
        detail: "Cast lead actors, lead 40-60 days of principal photography, and supervise 6 months of editorial, VFX, and sound mastering."
      },
      {
        task: "Manage theatrical release campaign or global streaming premiere.",
        detail: "Direct the official trailer cut, coordinate promotional tours, press junkets, and film critic screenings."
      },
      {
        task: "Win critical acclaim and box office profitability to lock in multi-picture studio contracts.",
        detail: "Build your signature directorial voice and establish your own independent production banner."
      }
    ],
    resources: [
      {
        name: "Screenwriters Association (SWA) India",
        type: "documentation",
        url: "https://swaindia.org",
        note: "Statutory trade union registering screenplays and protecting writer-director intellectual property."
      },
      {
        name: "Variety & The Hollywood Reporter",
        type: "platform",
        url: "https://variety.com",
        note: "Authoritative global entertainment industry publications tracking box office, studio deals, and festival awards."
      },
      {
        name: "International Film Festival of India (IFFI Goa)",
        type: "platform",
        url: "https://iffigoa.org",
        note: "India's premier international government film festival showcasing world cinema and Golden Peacock awards."
      }
    ],
    checkpoint: {
      criteria: "Theatrical release or global streaming release of your debut feature film with critical acclaim (7.5+ IMDb / Rotten Tomatoes certified fresh).",
      deliverable: "CBFC Censor Certificate, completed theatrical feature film master, and studio distribution contract."
    },
    decisionPoints: [
      {
        question: "Studio Director for Hire vs Producing Your Own Independent Films",
        options: [
          {
            choice: "Producing Your Own Films (Director-Producer)",
            pros: "Keep backend box-office profits and IP rights; complete creative final cut autonomy.",
            cons: "Massive personal financial risk if box office underperforms."
          },
          {
            choice: "Studio Director for Hire",
            pros: "Guaranteed high director fee (₹1 Cr - ₹5 Cr+), zero personal financial loss if the film flops.",
            cons: "Producer holds the contractual 'Final Cut' authority over the editing room."
          }
        ]
      }
    ],
    warning: "Letting production budget balloon out of control: A director whose debut film loses massive investor money will struggle to secure a second film for a decade.",
    fallbackPlan: "Direct premium high-budget television commercials (TVCs) and music videos, which pay up to ₹2L - ₹5L per shoot day.",
    realWorldStats: [
      {
        label: "Feature Film Director Starting Fee",
        value: "₹25L - ₹1.5 Cr per Film",
        context: "Directorial fee for fresh feature film directors on commercial projects"
      },
      {
        label: "Established A-List Director Fee",
        value: "₹5 Cr - ₹25 Cr+ per Film",
        context: "Top tier Indian directors plus backend profit share"
      }
    ]
  }
];

const photographer = [
  {
    investment: {
      time: "1-2 Years (Mastering manual camera controls, optics, and lighting basics)",
      cost: "₹40,000 - ₹90,000 (Entry-level mirrorless camera with 50mm f/1.8 prime lens, memory cards, bag)"
    },
    actionItems: [
      {
        task: "Master the Exposure Triangle in 100% manual mode: Aperture, Shutter Speed, and ISO.",
        detail: "Understand depth of field (bokeh), motion blur vs freeze frame, and digital sensor noise at high ISO."
      },
      {
        task: "Master composition rules: Rule of Thirds, Leading Lines, Framing, Negative Space, and Golden Hour lighting.",
        detail: "Shoot 500 photos weekly experimenting with perspective, reflections, and natural window lighting."
      },
      {
        task: "Shoot exclusively in RAW format and master Adobe Lightroom Classic for non-destructive color grading.",
        detail: "Learn tone curve adjustments, HSL color grading, split toning, exposure masks, and chromatic aberration correction."
      }
    ],
    resources: [
      {
        name: "Understanding Exposure by Bryan Peterson",
        type: "book",
        url: "https://www.amphoto.com",
        note: "The international undisputed classic on mastering camera exposure, apertures, and creative shutter speeds."
      },
      {
        name: "Magnum Photos Educational Resources",
        type: "platform",
        url: "https://www.magnumphotos.com",
        note: "The world's most prestigious photography cooperative showcasing documentary and visual storytelling."
      },
      {
        name: "Adobe Lightroom Classic Masterclass (YouTube / Adobe Live)",
        type: "course",
        url: "https://www.adobe.com/products/photoshop-lightroom.html",
        note: "Official tutorials on RAW catalog management, color calibration, and batch export workflows."
      }
    ],
    checkpoint: {
      criteria: "Publishing a curated 20-image portfolio demonstrating mastery of manual exposure and consistent color grading.",
      deliverable: "Digital portfolio website or curated Instagram photography showcase link."
    },
    decisionPoints: [
      {
        question: "Formal Photography School Degree (Light & Life Academy) vs Self-Taught Portfolio",
        options: [
          {
            choice: "Specialized Photography Academy (Light & Life Academy Ooty)",
            pros: "Rigorous studio lighting equipment, specialized automotive and fashion studios, peer mentorship.",
            cons: "Substantial tuition cost (₹6L - ₹12L) for a non-statutory diploma."
          },
          {
            choice: "Self-Taught / Apprenticeship Route",
            pros: "Save capital to purchase professional camera bodies and prime lenses; learn directly on commercial jobs.",
            cons: "Requires intense personal hustle to learn studio lighting setups independently."
          }
        ]
      }
    ],
    warning: "Believing 'natural light only' is a badge of honor: Relying solely on the sun means you cannot shoot commercial catalog, food, jewelry, or high-end studio fashion, which strictly requires off-camera artificial flash.",
    fallbackPlan: "Work as an in-house photographer for e-commerce brands (Amazon, Myntra, Meesho) shooting daily product catalog items on white backgrounds.",
    realWorldStats: [
      {
        label: "Entry-Level Camera Setup Cost",
        value: "₹50,000 - ₹90,000",
        context: "Sony A6400 / Canon R50 with 50mm f/1.8 lens"
      },
      {
        label: "Commercial E-Commerce Day Rate",
        value: "₹3,000 - ₹8,000/day",
        context: "Catalog product photography in Indian apparel hubs"
      }
    ]
  },
  {
    investment: {
      time: "2-3 Years (Working as Assistant to established commercial/fashion/wedding photographer)",
      cost: "₹30,000 - ₹1,00,000 (Upgraded full-frame camera body, fast 24-70mm f/2.8 zoom lens)"
    },
    actionItems: [
      {
        task: "Work as 1st or 2nd Assistant to a master commercial, advertising, or celebrity photographer.",
        detail: "Set up Profoto / Godox studio strobes, light modifiers (softboxes, octaboxes, beauty dishes, grids), and manage tethered capture."
      },
      {
        task: "Master Tethered Shooting on location using Capture One Pro.",
        detail: "Live-stream RAW images directly from camera to a calibrated monitor for client and art director real-time approvals."
      },
      {
        task: "Master High-End Beauty and Product Retouching in Adobe Photoshop.",
        detail: "Perform frequency separation for skin texture preservation, dodge and burn, path clipping, and color matching."
      }
    ],
    resources: [
      {
        name: "Capture One Pro Tethered Capture & Color Editor",
        type: "tool",
        url: "https://www.captureone.com",
        note: "The professional industry-standard software used in all high-end commercial photo studios worldwide."
      },
      {
        name: "Light Science and Magic: An Introduction to Photographic Lighting",
        type: "book",
        url: "https://www.routledge.com",
        note: "The definitive scientific guide to reflections, glass, metal, and complex studio lighting surfaces."
      },
      {
        name: "Profoto Academy Lighting Tutorials",
        type: "course",
        url: "https://profoto.com/academy",
        note: "Masterclass tutorials on shaping light, using beauty dishes, snoots, and balancing flash with ambient light."
      }
    ],
    checkpoint: {
      criteria: "Assisting on at least 25 commercial advertising, magazine editorial, or luxury wedding assignments.",
      deliverable: "Tethered capture operation competency letter and specialized commercial portfolio."
    },
    decisionPoints: [
      {
        question: "Luxury Wedding & Candid Photography vs Commercial Advertising & Fashion Photography",
        options: [
          {
            choice: "Luxury Destination Wedding Photography",
            pros: "Massive Indian wedding market, high per-wedding ticket size (₹2L - ₹15L), immediate booking cash flow.",
            cons: "Exhausting 16-hour continuous shoot days; high seasonal stress from November to February."
          },
          {
            choice: "Commercial Fashion & Advertising Photography",
            pros: "Creative prestige, billboards, magazine covers (Vogue, GQ), working with supermodels and celebrities.",
            cons: "Slow agency payment cycles (90-120 days) and intense competition for limited ad agency campaigns."
          }
        ]
      }
    ],
    warning: "Failing to backup client shoot data immediately: Memory cards corrupt and hard drives fail; shoot with dual-card slot cameras (backup RAWs to both cards) and create 3 separate backups before reformatting.",
    fallbackPlan: "Specialize in High-End Newborn, Maternity, or Architectural Real Estate photography, commanding predictable private client retainers.",
    realWorldStats: [
      {
        label: "Photography Assistant Day Rate",
        value: "₹2,500 - ₹6,000/day",
        context: "Daily pay for 1st camera/lighting assistant on commercial shoots"
      },
      {
        label: "Dual Card Slot Reliability",
        value: "Zero Data Loss Standard",
        context: "Mandatory requirement for professional commercial and wedding work"
      }
    ]
  },
  {
    investment: {
      time: "1-2 Years (Launching solo commercial brand + studio equipment acquisition)",
      cost: "₹3,00,000 - ₹8,00,000 (Professional studio strobes, C-stands, flagship full-frame body, prime lenses)"
    },
    actionItems: [
      {
        task: "Invest in high-end optical gear: Sony A7R / Canon R5 series with Holy Trinity lenses (16-35mm, 24-70mm, 70-200mm f/2.8).",
        detail: "Deliver ultra-high-resolution 45MP+ images required for large commercial billboards and glossy print spreads."
      },
      {
        task: "Pitch commercial photography portfolios directly to creative directors at advertising agencies and fashion brands.",
        detail: "Send personalized printed lookbooks or sleek iPad presentations to art buyers and marketing directors."
      },
      {
        task: "Draft standard commercial photography licensing contracts with clear Usage Rights and Copyright terms.",
        detail: "Differentiate Creative Fee from Usage Rights (billboard, digital, packaging, regional vs global)."
      }
    ],
    resources: [
      {
        name: "APA (American Photographic Artists) Professional Business Practices",
        type: "documentation",
        url: "https://apanational.org",
        note: "Authoritative templates for commercial photography licensing agreements, usage rights, and day rates."
      },
      {
        name: "Better Photography Magazine India",
        type: "platform",
        url: "https://www.betterphotography.in",
        note: "India's leading specialized photography publication covering equipment reviews and master interviews."
      },
      {
        name: "Wacom Intuos Pro Graphic Pen Tablet",
        type: "tool",
        url: "https://www.wacom.com",
        note: "The indispensable pressure-sensitive pen tablet for precision skin retouching and dodging/burning."
      }
    ],
    checkpoint: {
      criteria: "Winning your first independent commercial advertising campaign or luxury wedding contract valued above ₹2,00,000.",
      deliverable: "Signed commercial client agreement, proof of published advertising campaign, and client testimonial."
    },
    decisionPoints: [
      {
        question: "Owning a Physical Photo Studio Space vs Renting Daily Rental Studios on Demand",
        options: [
          {
            choice: "Rent On-Demand Studios (Grip & Studio Rentals)",
            pros: "Zero monthly fixed rent overhead, choose different specialized studio spaces based on client needs.",
            cons: "Must pack and transport all camera gear and props to external studios for every shoot."
          },
          {
            choice: "Lease a Dedicated Private Photo Studio",
            pros: "Permanent infinity cyclorama wall, client meeting lounge, ready-to-shoot equipment, high prestige.",
            cons: "High fixed monthly overhead (₹40,000 - ₹1,50,000/mo rent + electricity)."
          }
        ]
      }
    ],
    warning: "Giving away full copyright of your images for free: Always sell usage licenses (e.g. 1-year digital and print usage in India); if the client wants worldwide perpetual copyright buyout, charge 2x-3x your base creative fee.",
    fallbackPlan: "Partner with luxury wedding planning companies as their exclusive in-house photography vendor partner.",
    realWorldStats: [
      {
        label: "Commercial Advertising Shoot Day Rate",
        value: "₹50,000 - ₹2,50,000/day",
        context: "Creative fee for established commercial photographers in Mumbai/Delhi"
      },
      {
        label: "Luxury Destination Wedding Package",
        value: "₹5 Lakhs - ₹25 Lakhs+",
        context: "For comprehensive 3-day multi-camera photo and cinema coverage"
      }
    ]
  },
  {
    investment: {
      time: "3-5 Years (A-list celebrity / commercial advertising campaign master)",
      cost: "₹2,00,000 - ₹6,00,000 (International portfolio marketing, solo gallery exhibitions, agency representation)"
    },
    actionItems: [
      {
        task: "Shoot magazine covers and national advertising campaigns for top brands and A-list celebrities.",
        detail: "Direct complex 30-person crew shoots: lighting technicians, digital techs, wardrobe stylists, hair and makeup artists."
      },
      {
        task: "Hold fine-art photography gallery exhibitions and publish limited-edition coffee table photo books.",
        detail: "Sell limited-edition archival pigment prints to fine art collectors and museums."
      },
      {
        task: "Secure representation with elite creative artist management agencies (e.g. Inega, Faze Management).",
        detail: "Agents handle contract negotiations, licensing renewals, billing, and international campaign bookings."
      }
    ],
    resources: [
      {
        name: "National Geographic Photography Guidelines & Grants",
        type: "platform",
        url: "https://www.nationalgeographic.com/photography",
        note: "The pinnacle of documentary photography, ethics in visual journalism, and grant funding."
      },
      {
        name: "Hasselblad Masters Awards",
        type: "platform",
        url: "https://www.hasselblad.com/masters",
        note: "One of the world's most prestigious biennial photography competitions celebrating master visual artists."
      },
      {
        name: "Photo London & India Art Fair",
        type: "platform",
        url: "https://indiaartfair.in",
        note: "Premier international art fair showcasing fine art photography to galleries and institutional collectors."
      }
    ],
    checkpoint: {
      criteria: "Photographing a major national billboard campaign or leading fashion magazine cover (Vogue, Harper's Bazaar, Elle).",
      deliverable: "Published national magazine tear sheets and verified commercial billboard campaign in Indian metros."
    },
    decisionPoints: [
      {
        question: "Commercial Celebrity/Fashion Photography vs Documentary & Fine-Art Gallery Career",
        options: [
          {
            choice: "Commercial Celebrity / Fashion Photography",
            pros: "Consistent high-income revenue, working with Bollywood stars, massive social media following.",
            cons: "High commercial pressure; brief creative lifespan if visual style falls out of trend."
          },
          {
            choice: "Fine-Art / Documentary Fellowship Track",
            pros: "Immortal artistic legacy, museum acquisitions, global grant funding (Guggenheim, NatGeo).",
            cons: "Unpredictable fine-art print sales; takes decades to establish auction value."
          }
        ]
      }
    ],
    warning: "Neglecting ongoing digital asset archiving: Storing 10 years of commercial shoots on unlabelled external drives without offsite cloud backups (LTO tape/AWS Glacier) guarantees catastrophic client data loss.",
    fallbackPlan: "Conduct international photography masterclasses and luxury photography expeditions, generating lucrative educational revenue.",
    realWorldStats: [
      {
        label: "Celebrity / A-List Day Rate",
        value: "₹2 Lakhs - ₹6 Lakhs/day",
        context: "Top Indian celebrity and luxury advertising photographers"
      },
      {
        label: "Fine-Art Print Auction Price",
        value: "₹1 Lakh - ₹15 Lakhs+ / Print",
        context: "Limited-edition archival prints sold at art galleries"
      }
    ]
  }
];

const allCreative = {
  ...partialCreativeRoadmaps,
  "fashion-designer": fashionDesigner,
  "content-creator": contentCreator,
  "film-director": filmDirector,
  "photographer": photographer
};

const code = `// Creative domain enriched roadmap data
export const creativeRoadmaps = ${JSON.stringify(allCreative, null, 2)};
`;

fs.writeFileSync('./backend/src/data/enriched/creative.js', code, 'utf8');
console.log('Successfully written complete backend/src/data/enriched/creative.js with 8 roadmaps!');
