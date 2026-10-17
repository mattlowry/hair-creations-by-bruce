/**
 * Complete Services Data for Hair Creations by Bruce (14 Dedicated Service Pages)
 * Updated 2026 McLean, VA Market Pricing & Deep Educational Content
 */

export const PRICING_CATEGORIES = [
  {
    id: 'cuts-styling',
    title: 'Haircuts, Grooming & Signature Styling',
    subtitle: 'Tailored precision cuts and long-lasting blowouts for men and women.',
    items: [
      {
        name: "Men's Precision Haircut & Style",
        price: '$45',
        desc: 'Custom scissor or clipper cut, neckline detailing, hot towel finish, and styling.',
        link: '/services/mens-haircuts-grooming.html'
      },
      {
        name: "Women's Haircut & Signature Blowout",
        price: '$85',
        desc: 'Consultation, relaxing shampoo, custom layered or precision cut, and round-brush finish.',
        link: '/services/womens-haircuts-blowouts.html'
      },
      {
        name: 'Shampoo & Signature Blowout',
        price: '$55',
        desc: 'Deep cleansing wash, conditioning massage, and voluminous sleek or wavy blowout.',
        link: '/services/womens-haircuts-blowouts.html'
      },
      {
        name: "Men's Beard Trim, Shaping & Facial Waxing",
        price: '$25+',
        desc: 'Precision beard sculpting, brow cleanup, ear/nose waxing, and grooming.',
        link: '/services/mens-haircuts-grooming.html'
      }
    ]
  },
  {
    id: 'color-highlights',
    title: 'Custom Color, Balayage & Highlights Studio',
    subtitle: "Formulated with Wella, Goldwell, L'Oréal Professionnel & Redken.",
    items: [
      {
        name: 'Haircut & Custom Color Finish',
        price: '$165+',
        desc: 'Full single-process color or root retouch paired with a precision haircut and blowout.',
        link: '/services/hair-coloring.html'
      },
      {
        name: "Women's Single-Process Color Only",
        price: '$110+',
        desc: 'Rich, luminous root-to-end color or gray coverage with conditioning gloss finish.',
        link: '/services/hair-coloring.html'
      },
      {
        name: "Men's Gray Blending / Color & Finish",
        price: '$75',
        desc: 'Natural-looking demi-permanent or permanent color that turns back the clock without harsh lines.',
        link: '/services/mens-haircuts-grooming.html'
      },
      {
        name: 'Partial Highlights (Foil or Cap) with Finish',
        price: '$145+',
        desc: 'Face-framing and crown dimensional brightness with custom toner and blowout.',
        link: '/services/balayage-highlights-ombre.html'
      },
      {
        name: 'Whole Head Highlights / Balayage & Finish',
        price: '$225+',
        desc: 'Full-head hand-painted balayage, ombré, or traditional foil highlights with gloss and style.',
        link: '/services/balayage-highlights-ombre.html'
      },
      {
        name: 'Non-Peroxide / Ammonia-Free Gentle Color',
        price: '$125+',
        desc: 'Ultra-gentle, scalp-safe color formulation for sensitive skin and fragile hair textures.',
        link: '/services/non-peroxide-hair-color.html'
      }
    ]
  },
  {
    id: 'extensions-systems',
    title: 'Hair Extensions, Toupees & Wigs Studio',
    subtitle: '100% Remy Hair, Micro-Links, Micro-Fusion, Men’s Hair Systems & BYOH Installation.',
    items: [
      {
        name: 'Full Head Hair Extensions with Finish',
        price: 'Free Consultation',
        desc: 'Custom Micro-Link, Weft, or Micro-Fusion extensions in Straight, Curly, Deep Curl, or Italian Wave. Bring your own hair (BYOH) or custom order.',
        link: '/services/hair-extensions.html'
      },
      {
        name: 'Bring Your Own Hair (BYOH) Extension Install',
        price: '$250+',
        desc: 'Have your own bundles, wefts, or keratin tips? Bruce installs, blends, and razor-cuts them to perfection.',
        link: '/guides/byoh-bring-your-own-hair-policy.html'
      },
      {
        name: 'Tightening Micro-Links Maintenance',
        price: '$95 / hr',
        desc: 'Move-up tightening, bead replacement (copper & acrylic), detangling, and section check.',
        link: '/services/extension-removal-maintenance.html'
      },
      {
        name: 'Professional Extension Removal',
        price: '$85+',
        desc: 'Safe, damage-free bond or microbead removal with clarifying wash and detangling.',
        link: '/services/extension-removal-maintenance.html'
      },
      {
        name: "Men's Hair System Applied (with Cut-In)",
        price: '$125 – $165',
        desc: 'All bases serviced (lace, thin skin, poly, tape/liquid adhesive). Order custom through Bruce or bring your own unit.',
        link: '/services/mens-hair-systems-toupees.html'
      },
      {
        name: "Men's Toupee / System Maintenance",
        price: '$95',
        desc: 'Private removal, scalp exfoliation, adhesive cleanup, re-attachment, and blend trim.',
        link: '/services/mens-hair-systems-toupees.html'
      },
      {
        name: "Women's Wig Application & Custom Sew-Ins",
        price: '$120+',
        desc: 'Secure wig fitting, sew-in perimeter attachment, hairline customization, and styling.',
        link: '/services/womens-wigs-hairpieces.html'
      }
    ]
  },
  {
    id: 'smoothing-texture',
    title: 'Keratin Smoothing, Perms & Concierge Visits',
    subtitle: 'Frizz elimination, modern curl texture, and in-home or facility visits.',
    items: [
      {
        name: 'Brazilian Blowout / Keratin Smoothing',
        price: '$250+',
        desc: 'Eliminates frizz, seals the cuticle, and cuts blow-dry time in half for up to 12 weeks.',
        link: '/services/brazilian-blowout-keratin.html'
      },
      {
        name: 'Perms & Spiral Waves with Finish',
        price: '$165+',
        desc: 'Classic body waves, directional perms, or defined spiral curls with conditioning finish.',
        link: '/services/perms-spiral-waves-crimping.html'
      },
      {
        name: 'In-Home, Senior Facility & Hospital Visits',
        price: 'Custom Quote',
        desc: 'Compassionate on-site haircuts, styling, perms, and grooming across McLean & Northern Virginia.',
        link: '/services/home-facility-mobile-hairstylist.html'
      },
      {
        name: "Men's Personal Valet & Expert Sterling Silver Cleaning",
        price: 'By Request',
        desc: 'Signature specialty valet care and heirloom sterling silver polishing available by appointment.',
        link: '/services/home-facility-mobile-hairstylist.html'
      }
    ]
  }
];

export const SERVICES = [
  {
    slug: 'hair-extensions',
    title: 'Hair Extensions Studio in McLean, VA',
    shortTitle: 'Hair Extensions Overview',
    category: 'extensions',
    priceLabel: 'Free Consultation • BYOH $250+',
    heroImage: '/assets/images/service-extensions.jpg',
    heroAlt: 'Woman with voluminous seamless Remy hair extensions styled in soft waves at Hair Creations by Bruce in McLean VA',
    metaDescription: 'Custom hair extensions in McLean, VA by Bruce. Specializing in 100% Remy hair, Micro-Links, Wefts, Micro-Fusion, Italian Wave, Deep Curl, Tinsel, and Bring Your Own Hair (BYOH) installation.',
    lead: 'Transform your length, volume, and confidence with custom-blended hair extensions in our private McLean studio. Whether you want Bruce to source 100% Remy human hair or you prefer to bring your own hair (BYOH) for expert installation and cutting, every set is tailored to your natural hair density.',
    highlights: [
      '100% Premium Remy Human Hair in Straight, Curly, Deep Curl, and Italian Wave textures',
      'Weft Extensions with Micro-Links, Micro-Fusion Keratin Bonds, and Colorful Tinsel Extensions',
      'Bring Your Own Hair (BYOH) welcome — bring your bundles or tips and Bruce will install and blend them',
      'Complimentary 1-on-1 color-matching and texture consultation at McLean House Suite 106'
    ],
    sections: [
      {
        heading: 'A Complete Hair Extension Studio Built Around Hair Health',
        body: [
          'At Hair Creations by Bruce, hair extensions are never a one-size-fits-all service. With over 30 years of hands-on styling experience in McLean and Fairfax County, Bruce evaluates your natural strand thickness, scalp sensitivity, lifestyle, and styling habits before recommending an attachment method.',
          'Many salons lock clients into a single brand or refuse to install hair purchased elsewhere. Bruce takes a refreshingly client-first approach: you can order custom color-matched 100% Remy hair directly through our studio, or if you already have your own quality hair bundles, wefts, or keratin tips, bring them in and Bruce will professionally apply, layer, and finish them.'
        ]
      },
      {
        heading: 'Styles, Textures & Specialty Options Available',
        body: [
          'Matching texture is just as critical as matching color. An extension installation only looks undetectable when the wave pattern and luster mirror your natural hair in Northern Virginia humidity. We work with all colors and four signature textures: Silky Straight, Natural Curly, Deep Curl, and luxurious Italian Wave.',
          'Looking for a festive shimmer or subtle dimensional sparkle? We also offer multi-color Tinsel Extensions that withstand heat styling and add effortless catch-light reflection without chemical processing.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Can I bring my own hair extensions for Bruce to install?',
        a: 'Yes! Unlike most salons in McLean and Tysons Corner, Bruce welcomes Bring Your Own Hair (BYOH) appointments. Bring your clean, new or well-maintained wefts, tape-ins, or keratin tips, and Bruce will install, blend, and style them.'
      },
      {
        q: 'Do I need a consultation before booking full-head extensions?',
        a: 'Yes, all full-head extension services begin with a complimentary consultation so Bruce can assess your hair health, match your color and curl pattern (Straight, Curly, Deep Curl, or Italian Wave), and provide an exact price quote.'
      },
      {
        q: 'How long do hair extensions last?',
        a: 'With proper home care and routine tightening maintenance every 6 to 8 weeks, high-quality Remy hair extensions can last 4 to 9 months or longer depending on the method.'
      }
    ]
  },
  {
    slug: 'microlink-weft-extensions',
    title: 'Micro-Link & Weft Hair Extensions in McLean, VA',
    shortTitle: 'Micro-Links & Wefts',
    category: 'extensions',
    priceLabel: 'Install by Quote • Tightening $95/hr',
    heroImage: '/assets/images/service-microlinks.jpg',
    heroAlt: 'Close-up of precision micro-link and weft hair extension installation at Hair Creations by Bruce',
    metaDescription: 'Damage-free Micro-Link (copper and acrylic microbeads) and Weft hair extensions in McLean, VA. No glue, heat, or harsh chemicals. Book a free consultation with Bruce.',
    lead: 'Experience fullness and length without heat, glue, or chemical solvents. Bruce specializes in both individual Micro-Link strand extensions and beaded Weft extensions using lightweight copper and acrylic microbeads tailored to your hair color and scalp sensitivity.',
    highlights: [
      'Zero heat, zero glue, and zero chemical removers required during installation or maintenance',
      'Choice of silicone-lined copper micro-links or hypoallergenic acrylic beads for metal sensitivities',
      'Weft extensions attached via micro-links for maximum volume with minimal tension points',
      'Affordable hourly tightening and move-up maintenance ($95/hr) to keep extensions reusable'
    ],
    sections: [
      {
        heading: 'Why Micro-Links & Beaded Wefts Are a Client Favorite in McLean',
        body: [
          'Micro-link extensions (also known as microbead or I-tip/weft beaded extensions) anchor extension hair to small, evenly distributed sections of your natural hair using tiny, color-matched beads. Because no melted keratin, tape adhesive, or tight cornrow braiding is used, your hair can move 360 degrees naturally and comfortably.',
          'Bruce stocks both gentle copper micro-links (which lie ultra-flat against the head) and specialized acrylic micro-links for clients who prefer non-metallic attachments.'
        ]
      },
      {
        heading: 'Weft Extensions with Micro-Links vs. Individual Strands',
        body: [
          'If you want dramatic density through the mid-lengths and ends, attaching a hand-tied or genius weft with micro-links distributes weight evenly across a horizontal row. If you have finer hair around the temples and crown and want versatile high-ponytail movement, individual micro-link strands allow pinpoint customization.'
        ]
      }
    ],
    faqs: [
      {
        q: 'What is the difference between copper and acrylic micro-links?',
        a: 'Copper micro-links are thinner and flatter when compressed, making them ideal for finer hair. Acrylic beads are completely metal-free, making them perfect for clients with metal allergies or sensitivities.'
      },
      {
        q: 'How often do micro-links need tightening?',
        a: 'As your natural hair grows about half an inch per month, micro-links should be moved up and tightened every 6 to 8 weeks. Bruce charges a straightforward $95/hour rate for micro-link tightening maintenance.'
      }
    ]
  },
  {
    slug: 'microfusion-keratin-extensions',
    title: 'Micro-Fusion & Keratin Bond Extensions in McLean, VA',
    shortTitle: 'Micro-Fusion Extensions',
    category: 'extensions',
    priceLabel: 'Free Consultation',
    heroImage: '/assets/images/service-microfusion.jpg',
    heroAlt: 'Seamless micro-fusion keratin bond extensions with natural movement and gloss',
    metaDescription: 'Custom Micro-Fusion keratin bond hair extensions in McLean, VA. Strand-by-strand precision placement for invisible bonds and effortless styling.',
    lead: 'For clients seeking the most discreet, low-maintenance strand-by-strand extension method available, Micro-Fusion bonds deliver featherlight movement that blends invisibly even in fine or layered hair.',
    highlights: [
      'Micro-sized keratin protein bonds matched to your root shade',
      '360-degree free movement — wear high updos, ponytails, and braids with confidence',
      'Custom strand sizing so fine areas around the face are never overloaded',
      'Lasts 3 to 5 months with zero routine move-up appointments required in between'
    ],
    sections: [
      {
        heading: 'Precision Micro-Fusion Craftsmanship',
        body: [
          'Micro-fusion extensions use a keratin-based polymer bond that mimics the natural molecular structure of human hair. Bruce uses a precision temperature-controlled fusion tool to wrap each microscopic bond cleanly around a matching section of natural hair, sealing the cuticle so water and styling products cannot weaken the attachment.',
          'Because Bruce can custom-split larger bonds into micro-strands, micro-fusion is exceptional for filling in sparse sides, adding chemical-free highlight ribbons, or creating a full cascading transformation.'
        ]
      },
      {
        heading: 'Ideal for Busy Northern Virginia Professionals',
        body: [
          'Unlike tape-ins or beaded rows that require move-up appointments every 6 weeks, properly cared-for micro-fusion extensions stay secure for 12 to 16 weeks at a time—making them a favorite for executives, diplomats, and frequent travelers across McLean, Tysons, and Washington, DC.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Will micro-fusion extensions damage my natural hair?',
        a: 'When applied with proper sectioning weight and removed professionally using bond-release gel (never pulled out at home), micro-fusion extensions leave your natural hair healthy and intact.'
      },
      {
        q: 'Can I color my roots while wearing micro-fusion extensions?',
        a: 'Yes! Bruce can carefully apply root touch-ups along your part line and hairline while avoiding direct contact with the keratin bonds.'
      }
    ]
  },
  {
    slug: 'extension-removal-maintenance',
    title: 'Hair Extension Removal & Tightening Maintenance in McLean, VA',
    shortTitle: 'Extension Removal & Care',
    category: 'extensions',
    priceLabel: 'Removal $85+ • Tightening $95/hr',
    heroImage: '/assets/images/service-extension-maintenance.jpg',
    heroAlt: 'Gentle professional hair extension maintenance and scalp care service in McLean VA',
    metaDescription: 'Safe hair extension removal ($85+) and micro-link tightening maintenance ($95/hr) in McLean, VA. Even if your extensions were installed elsewhere, Bruce can safely remove or maintain them.',
    lead: 'Healthy hair extensions depend on gentle, timely maintenance and safe removal. Whether your extensions were originally applied by Bruce or at another salon, we provide patient, damage-free removal, detangling, and micro-link tightening.',
    highlights: [
      'Professional Extension Removal starting at $85 (Fusion, Micro-Link, Weft, or Tape-In)',
      'Micro-Link & Weft Tightening Maintenance at $95 per hour',
      'Thorough shed-hair combing and scalp clarifying before re-installation or blowout',
      'Judgment-free care even if your extensions were installed at another salon or out of state'
    ],
    sections: [
      {
        heading: 'Why Professional Removal Matters',
        body: [
          'Naturally, every person sheds 50 to 100 hairs per day. When you wear hair extensions, those naturally shed hairs remain trapped inside the microbead or keratin bond. If extensions are removed carelessly without dissolving the bond or un-crimping the bead properly—and without detangling the trapped shed hair—healthy strands can snap.',
          'Bruce takes the time to unfasten every single attachment cleanly, comb out trapped shed fibers gently, and follow up with a nourishing shampoo and conditioning blowout.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Will Bruce remove extensions that were put in at another salon?',
        a: 'Absolutely. Whether you got extensions while traveling or at another salon in the DC metro area, Bruce is happy to safely remove or tighten them for you.'
      }
    ]
  },
  {
    slug: 'hair-coloring',
    title: 'Custom Hair Coloring Studio in McLean, VA',
    shortTitle: 'Custom Hair Coloring',
    category: 'color',
    priceLabel: 'Color Only $110+ • Cut & Color $165+',
    heroImage: '/assets/images/color-bar-products.jpg',
    heroAlt: 'Luxury professional hair color bowls and Wella Goldwell Redken formulas at Hair Creations by Bruce',
    metaDescription: 'Expert hair coloring in McLean, VA using Wella, Goldwell, L’Oréal, and Redken. Single-process color ($110+), Haircut & Color Finish ($165+), gray coverage, and corrective color.',
    lead: 'From luminous 100% gray coverage and rich espresso brunettes to multidimensional coppers and platinum blondes, Bruce custom-blends every formula using world-class color houses: Wella, Goldwell, L’Oréal Professionnel, and Redken.',
    highlights: [
      'Women’s Single-Process Color Only starting at $110+',
      'Complete Haircut & Custom Color Finish package starting at $165+',
      'Formulated with Wella Color, Goldwell Colors, L’Oréal, and Redken for superior shine',
      'Early morning appointments starting at 6:00 AM Monday through Saturday'
    ],
    sections: [
      {
        heading: 'Four World-Class Color Lines Under One Roof',
        body: [
          'Most salons sign an exclusive contract with a single product manufacturer, forcing stylists to use one brand for every hair type. As an independent studio in McLean House, Bruce stocks Wella, Goldwell, L’Oréal, and Redken simultaneously.',
          'Why does that matter for your hair? Wella excels at luminous, natural-looking cool and warm blondes; Goldwell is legendary for vibrant reds and fade-resistant tonal depth; L’Oréal offers supreme conditioning gray coverage for coarse textures; and Redken Shades EQ delivers unmatched acidic glossing without lifting your natural base.'
        ]
      },
      {
        heading: 'Personalized Color Formulation & Finish',
        body: [
          'Every color service at Hair Creations by Bruce is applied and monitored personally by Bruce from bowl to blowout—never handed off to an inexperienced assistant. Your appointment concludes with a color-sealing wash and professional finish so you see the true tone in natural morning light.'
        ]
      }
    ],
    faqs: [
      {
        q: 'How often should I schedule a root touch-up for gray coverage?',
        a: 'Most clients visit every 4 to 6 weeks for root retouches. To keep mid-lengths and ends prevents from becoming over-processed or dull, Bruce refreshes the ends with a conditioning demi-permanent gloss rather than overlapping permanent dye.'
      },
      {
        q: 'Can I book a color appointment before work?',
        a: 'Yes! Bruce opens at 6:00 AM Monday through Saturday, making it easy to complete a full root color and blowout before a 8:30 AM or 9:00 AM workday in McLean, Tysons, or DC.'
      }
    ]
  },
  {
    slug: 'non-peroxide-hair-color',
    title: 'Non-Peroxide & Ammonia-Free Hair Color in McLean, VA',
    shortTitle: 'Non-Peroxide Gentle Color',
    category: 'color',
    priceLabel: 'Starting at $125+',
    heroImage: '/assets/images/service-non-peroxide-color.jpg',
    heroAlt: 'Radiant woman with glossy ammonia-free non-peroxide hair color in McLean VA',
    metaDescription: 'Gentle Non-Peroxide and Ammonia-Free hair coloring in McLean, VA. Ideal for sensitive scalps, allergy sufferers, fragile hair, and damage-free gray blending.',
    lead: 'Love rich, glossy hair color but struggle with scalp irritation, chemical sensitivity, or fragile strands? Bruce specializes in gentle Non-Peroxide and Ammonia-Free color systems that deposit vibrant pigment and shine without lifting or damaging your hair’s inner cortex.',
    highlights: [
      'Zero harsh peroxide lift and zero pungent ammonia fumes',
      'Safe for sensitive scalps, chemically treated hair, perms, and hair extensions',
      'Imparts mirror-like shine while blending grays and enriching natural undertones',
      'Fades gracefully on-tone without leaving a harsh horizontal root line'
    ],
    sections: [
      {
        heading: 'How Non-Peroxide Color Works',
        body: [
          'Traditional permanent hair dye uses ammonia to swell the hair cuticle and hydrogen peroxide to bleach out your natural melanin before depositing new color. While effective for dramatic lightening, repeated peroxide exposure can leave delicate hair porous and dry—or trigger contact irritation on sensitive scalps.',
          'Non-peroxide color works in harmony with your hair’s natural pH. It coats and stains the outer cuticle layers with botanical and conditioning pigments, filling in microscopic rough spots so light reflects evenly off every strand.'
        ]
      },
      {
        heading: 'Who Benefits Most from Non-Peroxide Coloring?',
        body: [
          'Clients recovering from over-bleached highlights, clients with dermatological sensitivities, men and women who want soft gray blending without a high-maintenance grow-out line, and clients who wear perms or keratin treatments all thrive with non-peroxide formulas.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Can non-peroxide color lighten dark hair to blonde?',
        a: 'Because it contains no peroxide or bleach, non-peroxide color cannot lighten hair lighter than your natural starting level. However, it can add rich tone, deepen color, blend gray hair, and deliver extraordinary gloss.'
      }
    ]
  },
  {
    slug: 'balayage-highlights-ombre',
    title: 'Balayage, Foil Highlights & Ombré Color in McLean, VA',
    shortTitle: 'Balayage & Highlights',
    category: 'color',
    priceLabel: 'Partial $145+ • Full Head $225+',
    heroImage: '/assets/images/service-balayage.jpg',
    heroAlt: 'Dimensional sun-kissed blonde and caramel balayage highlights by Hair Creations by Bruce',
    metaDescription: 'Dimensional Balayage, Foil Highlights, Cap Hi-Lites, and Ombré color in McLean, VA. Partial Highlights ($145+) and Full Head Highlights/Balayage ($225+) with finish.',
    lead: 'Whether you want sun-kissed, hand-painted balayage that grows out seamlessly for months, classic precision foil highlights right to the root, or traditional cap hi-lites for short styles, Bruce crafts dimensional brightness that flatters your skin tone.',
    highlights: [
      'Partial Highlights with Finish starting at $145+',
      'Whole Head Highlighting or Hand-Painted Balayage with Finish starting at $225+',
      'Expertise in Foil Highlights, Freehand Balayage, Ombré / Sombré, and Cap Hi-Lites',
      'Custom post-lightening gloss and bond protection included for silky, healthy blondes'
    ],
    sections: [
      {
        heading: 'Balayage vs. Foil Highlights vs. Cap Hi-Lites',
        body: [
          'Every highlighting technique creates a distinct visual effect. Hand-painted Balayage and Ombré sweep lightener onto the surface of the hair with a soft, graduated transition at the root—giving you lived-in dimension that only needs refreshing every 3 to 4 months.',
          'Traditional Foil Highlights isolate fine weaves of hair from root to tip for maximum lift and crisp ribbon contrast. And for cropped cuts or men’s and women’s short textured styles, classic Cap Hi-Lites prevent root bleeding and create natural frosted tips.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Does the highlight price include the blowout finish?',
        a: 'Yes! Both Partial Highlights ($145+) and Whole Head Highlighting ($225+) at Hair Creations by Bruce include a professional shampoo, conditioning treatment, and blowout finish.'
      }
    ]
  },
  {
    slug: 'womens-haircuts-blowouts',
    title: "Women's Haircuts & Signature Blowouts in McLean, VA",
    shortTitle: "Women's Cuts & Blowouts",
    category: 'cuts',
    priceLabel: 'Cut & Finish $85 • Blowout $55',
    heroImage: '/assets/images/service-womens-cut.jpg',
    heroAlt: 'Sophisticated woman with a fresh layered haircut and bouncy blowout in McLean VA',
    metaDescription: "Women's precision haircuts & blowouts ($85) and signature shampoo & blow dry ($55) in McLean, VA. Early 6:00 AM appointments available at McLean House Suite 106.",
    lead: 'A great haircut should hold its shape weeks after you leave the chair and fall effortlessly into place when you style it at home. Bruce combines classic European geometric cutting with soft internal texturizing for movement, volume, and ease.',
    highlights: [
      "Women's Haircut and Signature Finish: $85",
      'Express Shampoo & Voluminous Blow Dry: $55',
      'Tailored for straight, wavy, curly, fine, or thick hair textures',
      'Open at 6:00 AM Mon–Sat for pre-work, gala, and morning event blowouts'
    ],
    sections: [
      {
        heading: 'Designed for Your Face Shape and Morning Routine',
        body: [
          'During your consultation, Bruce looks at your natural growth patterns, crown cowlicks, neck length, and how much time you realistically spend styling your hair each morning. Whether you want a sharp collarbone bob, long face-framing layers with curtain bangs, or a cropped pixie cut, every section is cut with precision.',
          'Have an early morning presentation in Tysons Corner, a Capitol Hill briefing, or a flight out of Dulles or Reagan National? Our 6:00 AM opening time makes it effortless to step out with a salon-fresh $55 blowout before the rest of Northern Virginia is even awake.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Do you wash and blow-dry hair with every women’s haircut?',
        a: 'Yes, our $85 Women’s Haircut & Finish includes a relaxing shampoo, conditioning rinse, precision wet-and-dry cutting, and a full round-brush blowout.'
      }
    ]
  },
  {
    slug: 'mens-haircuts-grooming',
    title: "Men's Haircuts, Gray Blending, Waxing & Grooming in McLean, VA",
    shortTitle: "Men's Cuts & Grooming",
    category: 'mens',
    priceLabel: 'Haircut $45 • Color $75 • Grooming $25+',
    heroImage: '/assets/images/service-mens-cut.jpg',
    heroAlt: 'Distinguished executive man receiving a precision scissor haircut and grooming in McLean VA',
    metaDescription: "Executive men's haircuts ($45), gray blending color ($75), beard shaping, men's waxing, and personal valet services in McLean, VA. Open 6:00 AM Mon–Sat.",
    lead: 'Skip the rushed strip-mall barbershop. In Bruce’s private McLean House studio, men enjoy tailored scissor and clipper haircuts, subtle gray-blending color, facial waxing, beard detailing, and signature personal valet services—starting as early as 6:00 AM.',
    highlights: [
      "Men's Precision Haircut & Style: $45",
      "Men's Color Finish / Natural Gray Blending: $75",
      "Men's Grooming: Beard Trimming, Shaving, Clipping & Facial Waxing ($25+)",
      'Private, one-on-one appointment setting with zero waiting room crowds'
    ],
    sections: [
      {
        heading: 'Executive Grooming That Fits a Demanding Schedule',
        body: [
          'Many of Bruce’s long-time clients are Northern Virginia executives, attorneys, physicians, and government professionals who value privacy, consistency, and early morning availability. Whether you prefer a classic executive side-part scissor cut, a textured crop, or a clean taper fade, Bruce cuts with attention to how your hair grows out over 3 to 4 weeks.',
          'Want to take 5 to 10 years off your appearance without anyone suspecting you colored your hair? Our $75 Men’s Color Finish blends away harsh gray or yellowing white strands into a distinguished, natural tone that fades gradually without an obvious root line.'
        ]
      },
      {
        heading: "Complete Men's Waxing & Personal Valet Services",
        body: [
          'Beyond haircuts and color, Bruce provides complete men’s grooming including eyebrow shaping, ear and nose waxing, neck shaving/clipping, and bespoke Men’s Personal Valet Services.'
        ]
      }
    ],
    faqs: [
      {
        q: 'How early can I book a men’s haircut in McLean?',
        a: 'Bruce takes appointments starting at 6:00 AM Monday through Saturday—perfect for getting a fresh haircut before your morning commute or workout.'
      }
    ]
  },
  {
    slug: 'mens-hair-systems-toupees',
    title: "Men's Hair Systems, Toupees & Non-Surgical Hair Replacement in McLean, VA",
    shortTitle: "Men's Hair Systems & Toupees",
    category: 'mens',
    priceLabel: 'Application w/ Cut $125–$165 • Maintenance $95',
    heroImage: '/assets/images/service-mens-system.jpg',
    heroAlt: 'Natural undetectable mens hair replacement system and haircut in McLean VA',
    metaDescription: "Confidential men's hair replacement systems and toupee maintenance in McLean, VA. All bases serviced (lace, skin, poly, tape/glue). Custom order or bring your own unit.",
    lead: 'Regain a full, completely undetectable head of hair in total privacy. With decades of specialized experience in men’s non-surgical hair replacement, Bruce fits, attaches, cuts in, and maintains all types of men’s hair systems and toupees inside a discreet private suite.',
    highlights: [
      "Men's Hair System Applied with Custom Cut-In: $125 – $165",
      "Men's Toupee Maintenance, Cleaning & Re-Bonding: $95",
      'All bases serviced: Swiss/French Lace, Ultra-Thin Skin/Poly, Mono, Tape or Liquid Adhesive',
      'Order a custom system through Bruce OR bring your own unit purchased online'
    ],
    sections: [
      {
        heading: 'No High-Pressure Contracts — Bring Your Own System or Order Custom',
        body: [
          'National hair club franchises often lock men into $4,000 to $6,000 annual contracts and refuse to touch hairpieces bought elsewhere. At Hair Creations by Bruce, there are never pushy sales pitches or mandatory memberships.',
          'If you order your own lace, skin, or hybrid hair system from a direct supplier, bring it right in—Bruce will create your template, prep your scalp, apply the system with medical-grade tape or liquid bond, and razor-blend the hairpiece seamlessly into your natural side and back hair for $125 to $165. Prefer to have Bruce handle custom ordering, color matching, and gray-percentage selection? We offer special-order hair systems tailored to your exact crown swirl and density.'
        ]
      },
      {
        heading: 'Complete Privacy at McLean House Suite 106',
        body: [
          'Because Bruce operates as an independent, appointment-only stylist with hours starting at 6:00 AM, you never have to sit in an open multi-chair salon row during your toupee maintenance or application. Your privacy and comfort always come first.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Can I bring a hair system I bought online for Bruce to apply and cut?',
        a: 'Yes! Bruce gladly accepts client-supplied hair systems of all base types (lace, thin skin, polyurethane, monofilament) and will attach and cut them to match your natural hair.'
      },
      {
        q: 'How often should I come in for men’s hair system maintenance?',
        a: 'Most men schedule a $95 maintenance visit every 2 to 4 weeks for safe bond removal, residue cleaning, scalp refresh, a perimeter trim on their natural growing hair, and fresh re-attachment.'
      }
    ]
  },
  {
    slug: 'womens-wigs-hairpieces',
    title: "Women's Wigs, Custom Sew-Ins & Hair Systems in McLean, VA",
    shortTitle: "Women's Wigs & Hairpieces",
    category: 'extensions',
    priceLabel: 'Application & Sew-Ins $120+',
    heroImage: '/assets/images/service-wigs-systems.jpg',
    heroAlt: 'Private boutique consultation display of custom human hair wigs and hairpieces in McLean VA',
    metaDescription: "Compassionate, private women's wig fitting, wig application, custom sew-ins, toppers, and hair replacement systems in McLean, VA. Home and hospital visits also available.",
    lead: 'Whether you are experiencing medical or thinning hair loss, wearing protective styles, or seeking effortless glamour with a custom human-hair wig or topper, Bruce provides private, compassionate wig fitting, sew-in security, and bespoke cutting.',
    highlights: [
      "Women's Wig Application, Custom Fitting & Styling starting at $120+",
      "Women's Wig Sew-Ins and secure perimeter attachment for active lifestyles",
      'Custom face-framing cut-ins, baby-hair hairline customization, and thinning of bulky density',
      'Private studio appointments OR in-home / hospital / facility visits across Northern Virginia'
    ],
    sections: [
      {
        heading: 'Making a Wig Look Like Your Own Natural Hair',
        body: [
          'Even the finest human-hair wig or crown topper rarely looks natural straight out of the box—manufacturers intentionally pack extra hair density so a stylist can customize it to the wearer’s face. Bruce customizes the part line, shapes face-framing layers while you wear the piece, and secures it via custom sew-in, micro-links, or gentle adhesive so it never shifts.'
        ]
      },
      {
        heading: 'Dignified Care for Medical & Alopecia Hair Loss',
        body: [
          'For clients undergoing chemotherapy, radiation, or managing alopecia, Bruce offers quiet one-on-one appointments in our McLean studio as well as private visits to your home or medical facility.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Do you wash, condition, and re-style human hair wigs?',
        a: 'Yes, Bruce services, washes, deep-conditions, colors, and restyles both human-hair wigs and custom women’s hair systems.'
      }
    ]
  },
  {
    slug: 'brazilian-blowout-keratin',
    title: 'Brazilian Blowout & Keratin Smoothing Treatments in McLean, VA',
    shortTitle: 'Brazilian Blowout & Keratin',
    category: 'smoothing',
    priceLabel: 'Starting at $250+',
    heroImage: '/assets/images/service-keratin-blowout.jpg',
    heroAlt: 'Ultra-sleek mirror-shine brunette hair after a Brazilian Blowout keratin treatment in McLean VA',
    metaDescription: 'Professional Brazilian Blowout straightener and Keratin smoothing treatments in McLean, VA ($250+). Eliminate frizz for up to 12 weeks and cut blow-dry time in half.',
    lead: 'Northern Virginia summers and damp Potomac winters are notorious for causing unruly frizz. Our professional Brazilian Blowout and Keratin Smoothing Treatments seal the hair cuticle with amino acids for mirror-like shine, humidity resistance, and effortless styling.',
    highlights: [
      'Complete Brazilian Blowout / Keratin Smoothing Treatment starting at $250+',
      'Eliminates up to 95% of frizz while preserving natural body or smoothing curls sleek',
      'Cuts daily at-home blow-dry and flat-ironing time in half for 10 to 12 weeks',
      'Safe for color-treated, highlighted, and balayage hair—locks in pigment vibrancy'
    ],
    sections: [
      {
        heading: 'Customizable Smoothing: Keep Your Wave or Go Sleek',
        body: [
          'Unlike old-fashioned chemical relaxers that permanently break disulfide bonds and leave a harsh grow-out line, a Brazilian Blowout or Keratin treatment creates a protective protein layer around each hair shaft. Bruce adjusts the thermal sealing passes based on your goal: we can calm frizz while keeping your natural curl pattern defined, or create maximum sleekness and glass-hair smoothness.'
        ]
      },
      {
        heading: 'Pair with Color on the Same Day',
        body: [
          'Applying a Brazilian Blowout immediately after a fresh color or highlight service seals the cuticle over the new pigment molecules, dramatically extending color longevity and shine.'
        ]
      }
    ],
    faqs: [
      {
        q: 'How long does a Brazilian Blowout last?',
        a: 'With sulfate-free home care shampoo and conditioner, results last 10 to 12 weeks and gradually wash out without leaving a line of demarcation.'
      }
    ]
  },
  {
    slug: 'perms-spiral-waves-crimping',
    title: 'Perms, Spiral Waves & Texture Styling in McLean, VA',
    shortTitle: 'Perms, Spirals & Crimping',
    category: 'smoothing',
    priceLabel: 'Perms w/ Finish $165+',
    heroImage: '/assets/images/service-spiral-perm.jpg',
    heroAlt: 'Woman with bouncy hydrated spiral perm curls styled at Hair Creations by Bruce',
    metaDescription: 'Experienced perm specialist in McLean, VA. Classic body perms, spiral perms ($165+ with finish), root lift waves, and texture crimping by Bruce.',
    lead: 'Finding a master stylist who truly understands the art and chemistry of permanent waves is rare today. With over three decades of experience, Bruce crafts modern, hydrated Spiral Perms, classic body waves, and textured crimping that add lasting volume and bounce.',
    highlights: [
      'Perms & Spiral Waves with Complete Finish starting at $165+',
      'Custom rod selection: from soft beachy body waves to defined spiral ringlets',
      'Gentle conditioning waving lotions that protect hair elasticity and shine',
      'Specialty Texture & Crimping styling for events, volume, or editorial looks'
    ],
    sections: [
      {
        heading: 'The Art of Modern Perms & Spiral Waves',
        body: [
          'Whether you want a partial root perm for crown lift, a classic roller-set body wave, or a full-head Spiral Perm for cascading curls on long hair, wrapping technique determines everything. Bruce uses custom rod diameters and tension control so your curls spring evenly from root to tip without frizzy ends.'
        ]
      }
    ],
    faqs: [
      {
        q: 'How soon after a perm can I wash my hair?',
        a: 'You should wait at least 48 hours before shampooing after a perm so the neutralized disulfide bonds lock completely into their new curl memory.'
      }
    ]
  },
  {
    slug: 'home-facility-mobile-hairstylist',
    title: 'In-Home, Senior Facility & Valet Hair Services in McLean, VA',
    shortTitle: 'Home & Facility Visits',
    category: 'concierge',
    priceLabel: 'Available Across McLean & NoVA',
    heroImage: '/assets/images/service-mobile-concierge.jpg',
    heroAlt: 'Upscale mobile hairstylist concierge setup in a sunlit McLean Virginia home',
    metaDescription: 'Available for Home, Assisted Living, Rehabilitation, and Hospital hair care visits in McLean & Northern Virginia. Plus Men’s Personal Valet Services & Expert Sterling Silver Cleaning.',
    lead: 'When getting to the salon isn’t convenient—or when you prefer the comfort of your own residence—Bruce brings 30+ years of professional salon expertise directly to private homes, senior living communities, rehabilitation centers, and hospitals across McLean and Northern Virginia.',
    highlights: [
      'Available for Private Homes, Assisted Living, Nursing Facilities & Hospitals',
      'Full mobile haircare: Men’s & Women’s Haircuts, Blowouts, Color, Wigs & Toupee Care',
      "Men's Personal Valet Services & Wardrobe/Grooming Assistance",
      'Expert Sterling Silver Cleaning — heirloom hollowware, flatware & jewelry hand-polished'
    ],
    sections: [
      {
        heading: 'Compassionate Hair Care for Homebound & Facility Clients',
        body: [
          'A fresh haircut, blowout, or perm does wonders for dignity, morale, and well-being. Bruce regularly visits private residences, retirement communities, memory care facilities, and hospitals throughout McLean, Great Falls, Vienna, Arlington, Falls Church, and Fairfax.',
          'Bruce arrives fully equipped with sanitized tools, capes, portable wash/spray supplies, and gentle styling products—treating every client and family member with patience, warmth, and respect.'
        ]
      },
      {
        heading: "Men's Personal Valet & Expert Sterling Silver Cleaner",
        body: [
          'A beloved signature of Bruce’s practice for decades in McLean is his dedication to old-world personal service. In addition to executive hair care, Bruce offers discreet Men’s Personal Valet Services and is known locally as an Expert Sterling Silver Cleaner—restoring tarnished family silver tea sets, trays, candelabra, and flatware to a museum-grade mirror gleam.'
        ]
      }
    ],
    faqs: [
      {
        q: 'How do I schedule an in-home or assisted living facility visit?',
        a: 'Call Bruce directly at (571) 213-3667 or email Sambru703@aol.com with the location address in McLean or Northern Virginia and the requested services, and Bruce will coordinate a convenient afternoon or morning window.'
      }
    ]
  }
];
