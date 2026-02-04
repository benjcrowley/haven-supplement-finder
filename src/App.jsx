import React, { useState, useMemo } from 'react';
import {
  Activity,
  Heart,
  Brain,
  Shield,
  Clock,
  Zap,
  ArrowRight,
  Info,
  CheckCircle,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  Search,
  RefreshCw,
  Scale,
  Pill,
  X,
  Square,
  CheckSquare,
  Sparkles,
  FlaskConical,
  ShoppingCart,
  ExternalLink
} from 'lucide-react';

// --- Shopify Config ---
const SHOPIFY_DOMAIN = 'haven-wellness.co';

// --- Haven Wellness Brand Constants ---
const BRAND = {
  colors: {
    grayDark: '#545a6d',
    grayLight: '#fbfaf6',
    sky: '#93a5d0',
    earth: '#d59f84',
    sage: '#acbbb5',
    sand: '#dcd1c4',
    darkest: '#111216',
  }
};

// --- Product Data ---
const CATEGORIES = [
  { id: 'all', label: 'ALL PROTOCOLS', icon: null },
  { id: 'recovery', label: 'INJURY & RECOVERY', icon: Activity, color: BRAND.colors.sky },
  { id: 'gut', label: 'GUT HEALTH', icon: RefreshCw, color: BRAND.colors.sage },
  { id: 'aging', label: 'LONGEVITY', icon: Clock, color: BRAND.colors.earth },
  { id: 'energy', label: 'ENERGY & FOCUS', icon: Zap, color: BRAND.colors.sand },
  { id: 'immunity', label: 'IMMUNITY', icon: Shield, color: BRAND.colors.sage },
  { id: 'metabolism', label: 'METABOLISM', icon: Scale, color: BRAND.colors.earth },
  { id: 'cardio', label: 'HEART HEALTH', icon: Heart, color: BRAND.colors.sky },
];

const PRODUCTS = [
  {
    id: 'bpc-157',
    name: 'BPC-157',
    subtitle: 'BODY PROTECTION COMPOUND',
    coreFunction: 'Accelerates tissue repair and reduces inflammation.',
    delivery: 'Oral Capsule',
    tags: ['recovery', 'gut'],
    benefits: [
      'Accelerates Healing: Promotes faster tendon, ligament, and muscle repair.',
      'Supports Gut Repair: Helps heal GI lining (IBS, ulcers).',
      'Anti-Inflammatory: Reduces systemic inflammation and oxidative stress.'
    ],
    audience: 'Athletes, injury patients, or those with musculoskeletal/gut injuries.',
    evidence: 'A 2025 review found BPC-157 significantly improved healing in muscle, tendon, ligament, and bone injury models. 7 of 12 patients with chronic knee pain had >6 months of relief.',
    theme: 'sky',
    price: 135.00,
    comparePrice: 180.00,
    variantId: '44488724447279',
    shopUrl: 'https://haven-wellness.co/products/bcp-157-body-protection-compound'
  },
  {
    id: 'epitalon',
    name: 'EPITALON',
    subtitle: 'LONGEVITY PEPTIDE',
    coreFunction: 'Stimulates telomerase to support telomere maintenance and cellular health.',
    delivery: 'Oral Capsule',
    tags: ['aging', 'sleep'],
    benefits: [
      'Telomere Support: May preserve telomere length, potentially slowing cellular aging.',
      'Hormonal Balance: Regulates melatonin, improving sleep and circadian rhythm.',
      'Antioxidant Effects: Protects cells from age-related damage.'
    ],
    audience: 'Adults interested in anti-aging, longevity, and better sleep.',
    evidence: 'Decades of research show impact on aging; animal studies showed ~50% lifespan extension in rats. Human trials report improved immune profiles.',
    theme: 'earth',
    price: 135.00,
    comparePrice: 180.00,
    variantId: '44443701575727',
    shopUrl: 'https://haven-wellness.co/products/epitalon'
  },
  {
    id: 'kpv',
    name: 'KPV',
    subtitle: 'LYSINE–PROLINE–VALINE',
    coreFunction: 'Potent anti-inflammatory and antimicrobial properties.',
    delivery: 'Oral Capsule',
    tags: ['gut', 'recovery', 'immunity'],
    benefits: [
      'Gut Inflammation Relief: Reduces cytokines in Crohn\'s/Colitis.',
      'Wound Healing: Speeds up tissue repair while reducing scarring.',
      'Antimicrobial Action: Inhibits S. aureus and C. albicans growth.'
    ],
    audience: 'Individuals with chronic inflammatory conditions (IBD) or difficult wounds.',
    evidence: 'In mouse colitis models, targeted KPV markedly improved colonic healing. Dermatology research found treated wounds healed faster with better cosmetic outcomes.',
    theme: 'sage',
    price: 135.00,
    comparePrice: 180.00,
    variantId: '44443751710767',
    shopUrl: 'https://haven-wellness.co/products/kpv'
  },
  {
    id: 'mitomax',
    name: 'MITOMAX',
    subtitle: 'CELLULAR ENERGY BIOREGULATOR',
    coreFunction: 'Recharges mitochondrial energy production and provides antioxidant support.',
    delivery: 'Oral Capsule',
    tags: ['energy', 'aging', 'immunity'],
    benefits: [
      'Boosts Cellular Energy: Enhances mitochondrial ATP production.',
      'Enhances Antioxidant Defenses: Raises glutathione levels.',
      'Supports Immune Function: Strengthens cellular defense pathways.'
    ],
    audience: 'Those with low energy, chronic fatigue, or age-related stamina decline.',
    evidence: 'Ames "rejuvenation" study showed old rats given acetyl-L-carnitine + lipoic acid regained youthful energy and memory performance.',
    theme: 'sand',
    price: 66.40,
    comparePrice: 75.00,
    variantId: '44693906554927',
    shopUrl: 'https://haven-wellness.co/products/mitomax'
  },
  {
    id: 'opticut',
    name: 'OPTICUT',
    subtitle: 'METABOLIC BIOREGULATOR',
    coreFunction: 'Activates AMPK, enhancing metabolic efficiency and cardiometabolic health.',
    delivery: 'Oral Capsule',
    tags: ['metabolism', 'cardio', 'weight'],
    benefits: [
      'Improves Metabolic Efficiency: Activates AMPK to increase fat burning.',
      'Weight & Satiety Support: Elevates satiety hormones to decrease cravings.',
      'Cardiovascular Support: Helps maintain healthy blood pressure.'
    ],
    audience: 'Adults struggling with weight management, metabolic syndrome, or blood sugar.',
    evidence: 'Participants in trials saw significant improvements in body weight and appetite hormones vs placebo. Better weight loss outcomes in clinical studies.',
    theme: 'earth',
    price: 46.90,
    comparePrice: 80.00,
    variantId: '44694039855151',
    shopUrl: 'https://haven-wellness.co/products/opticut'
  },
  {
    id: 'prebio-plus',
    name: 'PREBIO PLUS',
    subtitle: 'GUT BARRIER BIOREGULATOR',
    coreFunction: 'Restores healthy gut microflora and strengthens intestinal barrier.',
    delivery: 'Oral Capsule',
    tags: ['gut', 'immunity'],
    benefits: [
      'Gut Microbiome Support: Spore probiotics boost beneficial bacteria.',
      'Mucosal Immune Defense: Immunoglobulins bind pathogens/toxins.',
      'Improves GI Balance: Reduces discomfort, regulates movements (IBS/SIBO).'
    ],
    audience: 'Individuals with digestive issues like IBS, leaky gut, SIBO, or bloating.',
    evidence: 'Oral immunoglobulin therapy led to normal stool frequency in 91% of IBS patients (vs 35% before). Spore probiotics reduced abdominal pain significantly.',
    theme: 'sage',
    price: 64.90,
    comparePrice: 75.00,
    variantId: '44694125314095',
    shopUrl: 'https://haven-wellness.co/products/prebio-plus'
  },
  {
    id: 'prospore',
    name: 'PROSPORE',
    subtitle: 'DIGESTIVE HEALTH BIOREGULATOR',
    coreFunction: 'Prebiotic fiber supplement that soothes digestion and supports metabolism.',
    delivery: 'Oral Capsule',
    tags: ['gut', 'metabolism'],
    benefits: [
      'Improves Regularity Gently: Promotes bowel movements without bloating.',
      'Nourishes Microbiome: Feeds Akkermansia and Faecalibacterium.',
      'Enhances Satiety: Stimulates GLP-1 response for appetite control.'
    ],
    audience: 'Those with constipation/irregularity or seeking weight management support.',
    evidence: '28-day RCT of gold kiwifruit fiber showed significant increase in beneficial bacteria and improved bowel habits compared to baseline.',
    theme: 'sage',
    price: 59.90,
    comparePrice: 75.00,
    variantId: '44651030118447',
    shopUrl: 'https://haven-wellness.co/products/prospore'
  },
  {
    id: 'tb4-frag',
    name: 'TB4 FRAG',
    subtitle: 'THYMOSIN BETA-4 FRAGMENT',
    coreFunction: 'Engineered for enhanced tissue repair and immune modulation.',
    delivery: 'Oral Capsule',
    tags: ['recovery', 'immunity'],
    benefits: [
      'Enhanced Tissue Repair: Promotes angiogenesis and collagen synthesis.',
      'Immune Modulation: Supports balanced immune response during recovery.',
      'Anti-Inflammatory: Lowers local inflammatory cytokines.'
    ],
    audience: 'Athletes or patients recovering from musculoskeletal injuries/surgeries.',
    evidence: 'Fragment Ac-SDKP exhibits robust angiogenic properties in vitro and in vivo. Early case observations report quicker recovery times.',
    theme: 'sky',
    price: 135.00,
    comparePrice: 180.00,
    variantId: '44436627128367',
    shopUrl: 'https://haven-wellness.co/products/tb4-frag-muscle-joint-recovery-bioregulator'
  },
  {
    id: 'thymogen',
    name: 'THYMOGEN ALPHA-1',
    subtitle: 'IMMUNE OPTIMIZER',
    coreFunction: 'Powerfully modulates the immune system and reduces chronic inflammation.',
    delivery: 'Oral Capsule',
    tags: ['immunity', 'aging'],
    benefits: [
      'Immune Enhancement: Boosts T-cell activity and thymus function.',
      'Antiviral Support: Enhances interferon and antibody responses.',
      'Inflammation Regulation: Tones down chronic inflammation/autoimmunity.'
    ],
    audience: 'Individuals with recurrent infections, aging immune systems, or chronic challenges.',
    evidence: 'Trials indicate better clinical outcomes than standard Thymosin α1. Normalized low lymphocyte counts and boosted resistance in practice.',
    theme: 'sage',
    price: 135.00,
    comparePrice: 180.00,
    variantId: '44443758231599',
    shopUrl: 'https://haven-wellness.co/products/thymogen-alpha-1'
  },
  {
    id: 'ultromega',
    name: 'ULTROMEGA',
    subtitle: 'OMEGA-3 BIOREGULATOR',
    coreFunction: 'High-potency omega-3 to reduce inflammation and support heart/gut.',
    delivery: 'Oral Capsule',
    tags: ['cardio', 'gut', 'recovery'],
    benefits: [
      'Cardiovascular Health: Lowers triglycerides and blood pressure.',
      'Anti-Inflammatory: Precursors to resolvins that reduce systemic pain.',
      'Gut Barrier Support: Improves mucus barrier and modulates microbiome.'
    ],
    audience: 'Adults supporting heart/brain health or reducing chronic inflammation.',
    evidence: 'Meta-analysis found fish oil significantly lowered heart attack risk. Studies link omega-3s to enhanced gut barrier function and reduced permeability.',
    theme: 'sky',
    price: 86.60,
    comparePrice: 109.00,
    variantId: '44696975704111',
    shopUrl: 'https://haven-wellness.co/products/ultromega'
  },
  {
    id: 'methylene-blue',
    name: 'METHYLENE BLUE',
    subtitle: 'NOOTROPIC GRADE',
    coreFunction: 'Mitochondrial support and cognitive-enhancing effects.',
    delivery: 'Oral Capsule',
    tags: ['energy', 'aging', 'recovery'],
    benefits: [
      'Cognitive Enhancement: Improves memory, attention, and BDNF levels.',
      'Neuroprotective: Antioxidant effects protect neurons.',
      'Energy Support: Enhances mitochondrial ATP production.'
    ],
    audience: 'Biohackers, those with brain fog, memory loss, or post-viral fatigue.',
    evidence: 'Low-dose MB improved short-term memory in humans. fMRI showed enhanced brain network connectivity. Used for fatigue in post-viral cases.',
    theme: 'sky'
  }
];

// --- Quiz Data ---
const QUIZ_STEPS = [
  {
    id: 'goal',
    question: "WHAT IS YOUR PRIMARY HEALTH GOAL?",
    options: [
      { id: 'recovery', label: "HEAL AN INJURY OR REDUCE PAIN", icon: Activity, next: 'injury_type' },
      { id: 'gut', label: "IMPROVE DIGESTION & GUT HEALTH", icon: RefreshCw, next: 'gut_type' },
      { id: 'brain', label: "BOOST ENERGY & BRAIN FUNCTION", icon: Brain, next: 'energy_type' },
      { id: 'aging', label: "SLOW AGING & IMPROVE LONGEVITY", icon: Clock, next: 'aging_type' },
      { id: 'weight', label: "MANAGE WEIGHT & METABOLISM", icon: Scale, products: ['opticut', 'prospore'] },
      { id: 'immune', label: "STRENGTHEN IMMUNITY", icon: Shield, products: ['thymogen', 'prebio-plus'] },
    ]
  },
  {
    id: 'injury_type',
    question: "WHAT BEST DESCRIBES YOUR INJURY OR PAIN?",
    options: [
      { label: "MUSCLE, TENDON, OR LIGAMENT TEAR", products: ['bpc-157', 'tb4-frag'] },
      { label: "POST-SURGERY RECOVERY", products: ['tb4-frag', 'bpc-157'] },
      { label: "CHRONIC JOINT PAIN / ARTHRITIS", products: ['ultromega', 'bpc-157'] },
      { label: "SYSTEMIC INFLAMMATION", products: ['kpv', 'ultromega'] }
    ]
  },
  {
    id: 'gut_type',
    question: "WHAT IS YOUR SPECIFIC GUT CONCERN?",
    options: [
      { label: "BLOATING, GAS, OR IBS", products: ['prebio-plus', 'bpc-157'] },
      { label: "INFLAMMATION (COLITIS/CROHN'S)", products: ['kpv', 'ultromega'] },
      { label: "CONSTIPATION / IRREGULARITY", products: ['prospore', 'prebio-plus'] },
      { label: "LEAKY GUT / FOOD SENSITIVITIES", products: ['prebio-plus', 'kpv'] }
    ]
  },
  {
    id: 'energy_type',
    question: "WHAT TYPE OF ENERGY BOOST DO YOU NEED?",
    options: [
      { label: "MENTAL CLARITY & MEMORY (BRAIN FOG)", products: ['methylene-blue', 'mitomax'] },
      { label: "PHYSICAL STAMINA & FATIGUE RELIEF", products: ['mitomax', 'methylene-blue'] },
    ]
  },
  {
    id: 'aging_type',
    question: "WHAT ASPECT OF AGING CONCERNS YOU MOST?",
    options: [
      { label: "CELLULAR HEALTH, SLEEP & TELOMERES", products: ['epitalon'] },
      { label: "ENERGY DECLINE & MITOCHONDRIAL HEALTH", products: ['mitomax', 'opticut'] },
    ]
  }
];

// --- Helper Functions ---
const getThemeStyles = (themeName) => {
  const color = BRAND.colors[themeName] || BRAND.colors.grayDark;
  return {
    badge: { backgroundColor: color, color: '#fff' },
    border: { borderColor: color },
    text: { color: color },
  };
};

// --- Logo Component ---
const HavenLogo = ({ size = 'default' }) => {
  const dimensions = size === 'small' ? { box: 40, text: 'text-lg' } : { box: 48, text: 'text-xl' };
  return (
    <div className="flex items-center gap-4">
      <div 
        className="relative flex items-center justify-center"
        style={{ width: dimensions.box, height: dimensions.box }}
      >
        <div 
          className="absolute inset-0 border-2 rounded-sm"
          style={{ borderColor: BRAND.colors.grayDark }}
        />
        <div 
          className="absolute inset-1 rounded-full border"
          style={{ borderColor: `${BRAND.colors.grayDark}40` }}
        />
        <span 
          className="font-semibold tracking-tight"
          style={{ 
            color: BRAND.colors.grayDark,
            fontSize: size === 'small' ? '14px' : '16px',
            letterSpacing: '-0.02em'
          }}
        >
          ĀV
        </span>
      </div>
      <div>
        <h1 
          className={`font-semibold tracking-[0.2em] ${dimensions.text}`}
          style={{ color: BRAND.colors.grayDark }}
        >
          HĀVEN
        </h1>
        <p 
          className="text-[9px] font-light tracking-[0.35em] uppercase"
          style={{ color: BRAND.colors.grayDark, opacity: 0.6 }}
        >
          W E L L N E S S
        </p>
      </div>
    </div>
  );
};

// --- Product Card Component ---
const ProductCard = ({ product, isSelected, onToggleCompare, index }) => {
  const [expanded, setExpanded] = useState(false);
  const styles = getThemeStyles(product.theme);

  return (
    <div 
      className={`group relative bg-white overflow-hidden transition-all duration-500 hover:shadow-xl ${isSelected ? 'ring-2' : ''}`}
      style={{ 
        borderColor: isSelected ? styles.border.borderColor : 'transparent',
        ringColor: isSelected ? styles.border.borderColor : 'transparent',
        animationDelay: `${index * 80}ms`
      }}
    >
      {/* Top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
        style={{ backgroundColor: styles.badge.backgroundColor }}
      />
      
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="inline-block px-4 py-1.5 text-[9px] font-semibold tracking-[0.2em]"
                style={styles.badge}
              >
                {product.id.toUpperCase()}
              </span>
              <span 
                className="flex items-center text-[9px] font-medium tracking-[0.15em] px-3 py-1.5"
                style={{ 
                  backgroundColor: BRAND.colors.grayLight,
                  color: BRAND.colors.grayDark
                }}
              >
                <Pill className="w-3 h-3 mr-1.5" style={{ color: styles.text.color }} /> 
                {product.delivery.toUpperCase()}
              </span>
            </div>
            <h3 
              className="text-2xl font-semibold tracking-[0.08em] mb-1"
              style={{ color: BRAND.colors.grayDark }}
            >
              {product.name}
            </h3>
            <p 
              className="text-[10px] font-light tracking-[0.25em] uppercase"
              style={{ color: BRAND.colors.grayDark, opacity: 0.5 }}
            >
              {product.subtitle}
            </p>
          </div>
          <button 
            onClick={() => onToggleCompare(product.id)}
            className="transition-all duration-200 p-2 hover:scale-110"
            title={isSelected ? "Remove from comparison" : "Add to comparison"}
          >
            {isSelected ? (
              <CheckSquare className="w-6 h-6" style={{ color: styles.border.borderColor }} />
            ) : (
              <Square className="w-6 h-6 text-gray-300 hover:text-gray-400" />
            )}
          </button>
        </div>

        {/* Core Function */}
        <div className="mb-8">
          <h4 
            className="text-[9px] font-semibold uppercase tracking-[0.25em] mb-3"
            style={{ color: BRAND.colors.grayDark, opacity: 0.4 }}
          >
            Core Function
          </h4>
          <p 
            className="text-sm font-light leading-relaxed tracking-wide"
            style={{ color: BRAND.colors.grayDark }}
          >
            {product.coreFunction}
          </p>
        </div>

        {/* Benefits Preview */}
        <div className="mb-6">
          <h4 
            className="text-[9px] font-semibold uppercase tracking-[0.25em] mb-4"
            style={{ color: BRAND.colors.grayDark, opacity: 0.4 }}
          >
            Key Benefits
          </h4>
          <ul className="space-y-3">
            {(expanded ? product.benefits : product.benefits.slice(0, 1)).map((benefit, idx) => (
              <li 
                key={idx} 
                className="flex items-start text-sm font-light tracking-wide"
                style={{ color: BRAND.colors.grayDark }}
              >
                <CheckCircle 
                  className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" 
                  style={{ color: styles.border.borderColor }} 
                />
                <span className="leading-relaxed">{benefit}</span>
              </li>
            ))}
            {!expanded && product.benefits.length > 1 && (
              <li 
                className="text-[10px] font-medium pl-7 tracking-wide"
                style={{ color: styles.text.color, opacity: 0.7 }}
              >
                +{product.benefits.length - 1} more benefits...
              </li>
            )}
          </ul>
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div className="border-t pt-6 mt-6 space-y-6" style={{ borderColor: `${BRAND.colors.grayDark}10` }}>
            <div>
              <div 
                className="flex items-center text-[9px] font-semibold uppercase tracking-[0.25em] mb-3"
                style={{ color: BRAND.colors.grayDark }}
              >
                <Users className="w-4 h-4 mr-2" style={{ color: styles.text.color }} />
                Target Audience
              </div>
              <p 
                className="text-sm font-light leading-relaxed tracking-wide"
                style={{ color: BRAND.colors.grayDark, opacity: 0.8 }}
              >
                {product.audience}
              </p>
            </div>
            
            <div 
              className="p-6"
              style={{ backgroundColor: BRAND.colors.grayLight }}
            >
              <div 
                className="flex items-center text-[9px] font-semibold uppercase tracking-[0.25em] mb-3"
                style={{ color: BRAND.colors.grayDark }}
              >
                <FileText className="w-4 h-4 mr-2" style={{ color: styles.text.color }} />
                Evidence of Success
              </div>
              <p 
                className="text-xs font-light italic leading-relaxed pl-4 border-l-2"
                style={{ 
                  borderColor: styles.border.borderColor, 
                  color: BRAND.colors.grayDark,
                  opacity: 0.85
                }}
              >
                "{product.evidence}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full border-t p-4 text-[9px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 flex items-center justify-center"
        style={{
          borderColor: `${BRAND.colors.grayDark}10`,
          color: BRAND.colors.grayDark,
          backgroundColor: expanded ? BRAND.colors.grayLight : 'white'
        }}
      >
        {expanded ? (
          <>Less Details <ChevronUp className="w-3 h-3 ml-2" /></>
        ) : (
          <>Full Details & Evidence <ChevronDown className="w-3 h-3 ml-2" /></>
        )}
      </button>

      {/* Shop Now Button */}
      {product.shopUrl && (
        <a
          href={product.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-4 text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 hover:opacity-90"
          style={{
            backgroundColor: styles.badge.backgroundColor,
            color: '#fff'
          }}
        >
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Shop Now</span>
          </span>
          <span className="flex items-center gap-2">
            <span>${product.price?.toFixed(2)}</span>
            {product.comparePrice && (
              <span className="line-through opacity-60 text-[9px]">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
            <ExternalLink className="w-3 h-3 hidden sm:block" />
          </span>
        </a>
      )}
    </div>
  );
};

// --- Filter Button Component ---
const FilterButton = ({ category, isActive, onClick }) => {
  const Icon = category.icon;

  return (
    <button
      onClick={() => onClick(category.id)}
      className="flex items-center px-3 sm:px-5 py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-semibold tracking-[0.12em] sm:tracking-[0.18em] transition-all duration-300 whitespace-nowrap border"
      style={isActive ? {
        backgroundColor: category.color || BRAND.colors.grayDark,
        color: '#fff',
        borderColor: category.color || BRAND.colors.grayDark
      } : {
        backgroundColor: 'white',
        color: BRAND.colors.grayDark,
        borderColor: `${BRAND.colors.grayDark}20`
      }}
    >
      {Icon && <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-2" style={{ opacity: isActive ? 1 : 0.5 }} />}
      {category.label}
    </button>
  );
};

// --- Compare Modal Component ---
const CompareModal = ({ isOpen, onClose, productIds }) => {
  if (!isOpen) return null;
  
  const selectedProducts = PRODUCTS.filter(p => productIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/30">
      <div 
        className="bg-white w-full max-w-6xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div 
          className="p-8 border-b flex justify-between items-center"
          style={{ backgroundColor: BRAND.colors.grayLight, borderColor: `${BRAND.colors.grayDark}10` }}
        >
          <div>
            <h2 
              className="text-2xl font-semibold tracking-[0.15em]"
              style={{ color: BRAND.colors.grayDark }}
            >
              COMPARISON
            </h2>
            <p 
              className="text-[10px] font-light tracking-[0.3em] uppercase mt-1"
              style={{ color: BRAND.colors.grayDark, opacity: 0.5 }}
            >
              Side-by-side analysis
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 transition-colors hover:bg-white/50 rounded-full"
          >
            <X className="w-6 h-6" style={{ color: BRAND.colors.grayDark }} />
          </button>
        </div>
        
        {/* Content */}
        <div className="overflow-auto flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-[180px_repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {/* Labels Column */}
            <div className="hidden md:flex flex-col gap-6 pt-36">
              {['Function', 'Benefits', 'Audience', 'Delivery'].map((label) => (
                <div 
                  key={label}
                  className="h-24 flex items-center justify-end pr-6 text-[9px] font-semibold uppercase tracking-[0.25em] text-right"
                  style={{ color: BRAND.colors.grayDark, opacity: 0.4 }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Product Columns */}
            {selectedProducts.map(p => {
              const styles = getThemeStyles(p.theme);
              return (
                <div 
                  key={p.id} 
                  className="flex flex-col gap-6 border p-6 bg-white"
                  style={{ borderColor: `${BRAND.colors.grayDark}10` }}
                >
                  {/* Product Header */}
                  <div className="h-36">
                    <span 
                      className="inline-block px-3 py-1 text-[8px] font-semibold tracking-[0.2em] mb-4"
                      style={{ backgroundColor: styles.badge.backgroundColor, color: '#fff' }}
                    >
                      {p.id.toUpperCase()}
                    </span>
                    <h3 
                      className="text-xl font-semibold tracking-[0.1em] mb-2"
                      style={{ color: BRAND.colors.grayDark }}
                    >
                      {p.name}
                    </h3>
                    <p 
                      className="text-[9px] uppercase tracking-[0.2em]"
                      style={{ color: BRAND.colors.grayDark, opacity: 0.5 }}
                    >
                      {p.subtitle}
                    </p>
                  </div>
                  
                  {/* Function */}
                  <div className="h-24">
                    <span 
                      className="md:hidden text-[9px] font-semibold uppercase tracking-[0.2em] mb-2 block"
                      style={{ color: BRAND.colors.grayDark, opacity: 0.4 }}
                    >
                      Function
                    </span>
                    <p 
                      className="text-sm font-light leading-relaxed tracking-wide"
                      style={{ color: BRAND.colors.grayDark }}
                    >
                      {p.coreFunction}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="h-24 overflow-y-auto">
                    <span 
                      className="md:hidden text-[9px] font-semibold uppercase tracking-[0.2em] mb-2 block"
                      style={{ color: BRAND.colors.grayDark, opacity: 0.4 }}
                    >
                      Benefits
                    </span>
                    <ul className="space-y-2">
                      {p.benefits.map((b, i) => (
                        <li 
                          key={i} 
                          className="text-xs font-light flex items-start"
                          style={{ color: BRAND.colors.grayDark }}
                        >
                          <span 
                            className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: styles.badge.backgroundColor }}
                          />
                          {b.split(':')[0]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Audience */}
                  <div className="h-24">
                    <span 
                      className="md:hidden text-[9px] font-semibold uppercase tracking-[0.2em] mb-2 block"
                      style={{ color: BRAND.colors.grayDark, opacity: 0.4 }}
                    >
                      Audience
                    </span>
                    <p 
                      className="text-xs font-light leading-relaxed"
                      style={{ color: BRAND.colors.grayDark, opacity: 0.8 }}
                    >
                      {p.audience}
                    </p>
                  </div>

                  {/* Delivery */}
                  <div className="h-24 flex items-center">
                    <span 
                      className="md:hidden text-[9px] font-semibold uppercase tracking-[0.2em] mr-3"
                      style={{ color: BRAND.colors.grayDark, opacity: 0.4 }}
                    >
                      Delivery:
                    </span>
                    <div 
                      className="flex items-center text-xs font-medium px-4 py-2 border"
                      style={{ 
                        borderColor: `${BRAND.colors.grayDark}15`,
                        color: BRAND.colors.grayDark
                      }}
                    >
                      <Pill className="w-3 h-3 mr-2" style={{ color: styles.text.color }} />
                      {p.delivery.toUpperCase()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Add Bundle to Cart Component ---
const AddBundleToCart = ({ items, buttonText = "Add Bundle to Cart", className = "" }) => {
  const buildCartUrl = () => {
    const itemsString = items
      .map(item => `${item.variantId}:${item.quantity || 1}`)
      .join(',');
    return `https://${SHOPIFY_DOMAIN}/cart/${itemsString}`;
  };

  const handleClick = () => {
    window.open(buildCartUrl(), '_blank');
  };

  const totalPrice = items.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.variantId === item.variantId);
    return sum + (product?.price || 0) * (item.quantity || 1);
  }, 0);

  const totalComparePrice = items.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.variantId === item.variantId);
    return sum + (product?.comparePrice || product?.price || 0) * (item.quantity || 1);
  }, 0);

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 text-white text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-200 hover:shadow-lg active:scale-[0.98] sm:hover:scale-[1.02] ${className}`}
      style={{ backgroundColor: BRAND.colors.grayDark }}
    >
      <span className="flex items-center gap-2">
        <ShoppingCart className="w-4 h-4" />
        {buttonText}
      </span>
      <span className="flex items-center gap-2">
        <span>— ${totalPrice.toFixed(2)}</span>
        {totalComparePrice > totalPrice && (
          <span className="line-through opacity-50 text-[9px]">
            ${totalComparePrice.toFixed(2)}
          </span>
        )}
      </span>
    </button>
  );
};

// --- Quiz Results Component ---
const QuizResults = ({ productIds, onClose, onReset }) => {
  const [selectedProducts, setSelectedProducts] = useState(productIds);
  const recommendedProducts = PRODUCTS.filter(p => productIds.includes(p.id));

  const toggleProduct = (id) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const bundleItems = selectedProducts
    .map(id => {
      const product = PRODUCTS.find(p => p.id === id);
      return product?.variantId ? { variantId: product.variantId, quantity: 1 } : null;
    })
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-md bg-black/30">
      <div className="bg-white w-full sm:max-w-2xl overflow-hidden flex flex-col relative shadow-2xl max-h-[95vh] sm:max-h-[90vh] rounded-t-2xl sm:rounded-none">
        {/* Header */}
        <div
          className="p-5 sm:p-8 text-center border-b"
          style={{ backgroundColor: BRAND.colors.grayLight, borderColor: `${BRAND.colors.grayDark}10` }}
        >
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${BRAND.colors.sage}20` }}
          >
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: BRAND.colors.sage }} />
          </div>
          <h2
            className="text-lg sm:text-xl font-semibold tracking-[0.1em] sm:tracking-[0.15em]"
            style={{ color: BRAND.colors.grayDark }}
          >
            YOUR RECOMMENDED PROTOCOL
          </h2>
          <p
            className="text-[9px] sm:text-[10px] font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-1 sm:mt-2"
            style={{ color: BRAND.colors.grayDark, opacity: 0.5 }}
          >
            Based on your goals
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" style={{ color: BRAND.colors.grayDark, opacity: 0.5 }} />
          </button>
        </div>

        {/* Products */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          <p
            className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4"
            style={{ color: BRAND.colors.grayDark, opacity: 0.5 }}
          >
            Select products to add to your cart:
          </p>
          <div className="space-y-2 sm:space-y-3">
            {recommendedProducts.map(product => {
              const styles = getThemeStyles(product.theme);
              const isSelected = selectedProducts.includes(product.id);
              return (
                <button
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`w-full text-left p-3 sm:p-5 border transition-all duration-200 flex items-start gap-3 sm:gap-4 ${isSelected ? 'ring-2' : ''}`}
                  style={{
                    borderColor: isSelected ? styles.border.borderColor : `${BRAND.colors.grayDark}15`,
                    ringColor: isSelected ? styles.border.borderColor : 'transparent'
                  }}
                >
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5" style={{ color: styles.border.borderColor }} />
                    ) : (
                      <Square className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                      <span
                        className="inline-block px-1.5 sm:px-2 py-0.5 text-[7px] sm:text-[8px] font-semibold tracking-[0.1em] sm:tracking-[0.15em]"
                        style={{ backgroundColor: styles.badge.backgroundColor, color: '#fff' }}
                      >
                        {product.id.toUpperCase()}
                      </span>
                      <span
                        className="font-semibold text-xs sm:text-sm tracking-[0.03em] sm:tracking-[0.05em]"
                        style={{ color: BRAND.colors.grayDark }}
                      >
                        {product.name}
                      </span>
                    </div>
                    <p
                      className="text-[11px] sm:text-xs font-light leading-relaxed line-clamp-2"
                      style={{ color: BRAND.colors.grayDark, opacity: 0.7 }}
                    >
                      {product.coreFunction}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    {product.price && (
                      <>
                        <p
                          className="text-xs sm:text-sm font-semibold"
                          style={{ color: BRAND.colors.grayDark }}
                        >
                          ${product.price.toFixed(2)}
                        </p>
                        {product.comparePrice && (
                          <p
                            className="text-[9px] sm:text-[10px] line-through"
                            style={{ color: BRAND.colors.grayDark, opacity: 0.4 }}
                          >
                            ${product.comparePrice.toFixed(2)}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-4 sm:p-6 border-t space-y-3 sm:space-y-4"
          style={{ backgroundColor: BRAND.colors.grayLight, borderColor: `${BRAND.colors.grayDark}10` }}
        >
          {bundleItems.length > 0 ? (
            <AddBundleToCart
              items={bundleItems}
              buttonText={`Add ${bundleItems.length} Product${bundleItems.length > 1 ? 's' : ''} to Cart`}
              className="w-full"
            />
          ) : (
            <p
              className="text-center text-[10px] font-medium uppercase tracking-[0.15em] py-4"
              style={{ color: BRAND.colors.grayDark, opacity: 0.5 }}
            >
              Select at least one product
            </p>
          )}
          <button
            onClick={onReset}
            className="w-full text-center text-[10px] font-semibold uppercase tracking-[0.2em] py-3 transition-opacity hover:opacity-60"
            style={{ color: BRAND.colors.grayDark, opacity: 0.5 }}
          >
            ← Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Quiz Modal Component ---
const QuizModal = ({ isOpen, onClose, onFinish }) => {
  const [currentStepId, setCurrentStepId] = useState('goal');
  const [history, setHistory] = useState([]);

  if (!isOpen) return null;

  const currentStep = QUIZ_STEPS.find(s => s.id === currentStepId);

  const handleOptionClick = (option) => {
    if (option.next) {
      setHistory([...history, currentStepId]);
      setCurrentStepId(option.next);
    } else if (option.products) {
      onFinish(option.products);
      onClose();
      setHistory([]);
      setCurrentStepId('goal');
    }
  };

  const handleBack = () => {
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentStepId(prev || 'goal');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-md bg-black/30">
      <div className="bg-white w-full sm:max-w-lg overflow-hidden flex flex-col relative shadow-2xl max-h-[90vh] rounded-t-2xl sm:rounded-none">
        {/* Header */}
        <div
          className="p-5 sm:p-8 text-center border-b"
          style={{ backgroundColor: BRAND.colors.grayLight, borderColor: `${BRAND.colors.grayDark}10` }}
        >
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${BRAND.colors.earth}15` }}
          >
            <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: BRAND.colors.earth }} />
          </div>
          <h2
            className="text-lg sm:text-xl font-semibold tracking-[0.1em] sm:tracking-[0.15em]"
            style={{ color: BRAND.colors.grayDark }}
          >
            PROTOCOL FINDER
          </h2>
          <p
            className="text-[9px] sm:text-[10px] font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-1 sm:mt-2"
            style={{ color: BRAND.colors.grayDark, opacity: 0.5 }}
          >
            Let's find your perfect match
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" style={{ color: BRAND.colors.grayDark, opacity: 0.5 }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 overflow-y-auto">
          {history.length > 0 && (
            <button
              onClick={handleBack}
              className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-4 sm:mb-6 flex items-center transition-opacity hover:opacity-60"
              style={{ color: BRAND.colors.grayDark, opacity: 0.5 }}
            >
              ← Back
            </button>
          )}

          <h3
            className="text-sm sm:text-base font-semibold text-center mb-5 sm:mb-8 leading-relaxed tracking-[0.08em] sm:tracking-[0.1em]"
            style={{ color: BRAND.colors.grayDark }}
          >
            {currentStep.question}
          </h3>

          <div className="space-y-2 sm:space-y-3">
            {currentStep.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className="w-full text-left p-3 sm:p-5 border transition-all duration-200 group flex items-center justify-between hover:shadow-md active:bg-gray-50"
                style={{ borderColor: `${BRAND.colors.grayDark}15` }}
              >
                <div className="flex items-center">
                  {option.icon && (
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-3 sm:mr-4 transition-colors"
                      style={{ backgroundColor: BRAND.colors.grayLight }}
                    >
                      <option.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: BRAND.colors.grayDark, opacity: 0.6 }} />
                    </div>
                  )}
                  <span
                    className="font-semibold text-[10px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.15em] uppercase"
                    style={{ color: BRAND.colors.grayDark }}
                  >
                    {option.label}
                  </span>
                </div>
                <ArrowRight
                  className="w-4 h-4 flex-shrink-0 transform group-hover:translate-x-1 transition-transform"
                  style={{ color: BRAND.colors.grayDark, opacity: 0.3 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-3 sm:p-4 text-center border-t"
          style={{ backgroundColor: BRAND.colors.grayLight, borderColor: `${BRAND.colors.grayDark}10` }}
        >
          <p
            className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]"
            style={{ color: BRAND.colors.grayDark, opacity: 0.3 }}
          >
            Step {history.length + 1} of 2
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function HavenSupplementFinder() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  const toggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(p => p !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const handleQuizResult = (productIds) => {
    setSearchTerm('');
    setActiveCategory('all');
    setQuizResults(productIds);
  };

  const handleQuizReset = () => {
    setQuizResults(null);
    setShowQuiz(true);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.tags.includes(activeCategory);
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) || 
        product.coreFunction.toLowerCase().includes(searchLower) ||
        product.benefits.some(b => b.toLowerCase().includes(searchLower));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div 
      className="min-h-screen pb-24"
      style={{ backgroundColor: BRAND.colors.grayLight }}
    >
      {/* Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@200;300;400;500;600&display=swap');
          * { font-family: 'Lexend Deca', sans-serif; }
          
          @keyframes slideUp {
            from { transform: translate(-50%, 100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
          }
          .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
          
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: ${BRAND.colors.sand}; border-radius: 4px; }

          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* Modals */}
      <CompareModal
        isOpen={showCompare}
        onClose={() => setShowCompare(false)}
        productIds={compareList}
      />
      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        onFinish={handleQuizResult}
      />
      {quizResults && (
        <QuizResults
          productIds={quizResults}
          onClose={() => setQuizResults(null)}
          onReset={handleQuizReset}
        />
      )}

      {/* Header */}
      <header 
        className="bg-white/90 backdrop-blur-lg border-b sticky top-0 z-20"
        style={{ borderColor: `${BRAND.colors.grayDark}08` }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <HavenLogo />
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4" style={{ color: BRAND.colors.grayDark, opacity: 0.3 }} />
                </div>
                <input
                  type="text"
                  placeholder="Search symptoms..."
                  className="block w-full pl-11 pr-4 py-3 border text-xs font-light tracking-[0.1em] placeholder-gray-400 focus:outline-none focus:ring-1 transition-all uppercase"
                  style={{ 
                    color: BRAND.colors.grayDark, 
                    borderColor: `${BRAND.colors.grayDark}12`,
                    backgroundColor: BRAND.colors.grayLight
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowQuiz(true)}
                className="hidden md:flex items-center px-6 py-3 text-white text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: BRAND.colors.grayDark }}
              >
                <Sparkles className="w-3 h-3 mr-2" style={{ color: BRAND.colors.sand }} />
                Help Me Choose
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <p 
            className="text-[10px] font-semibold uppercase tracking-[0.4em] mb-4"
            style={{ color: BRAND.colors.earth }}
          >
            Protocol Intelligence
          </p>
          <h2 
            className="text-3xl md:text-4xl font-light mb-6 tracking-[0.05em]"
            style={{ color: BRAND.colors.grayDark }}
          >
            Which protocol fits your physiology?
          </h2>
          <p 
            className="max-w-xl mx-auto mb-10 font-light leading-relaxed text-sm tracking-wide"
            style={{ color: BRAND.colors.grayDark, opacity: 0.7 }}
          >
            Select a goal below to filter our research-backed protocols. From peptide therapy to microbiome support, find the right tool for your needs.
          </p>
          <button 
            onClick={() => setShowQuiz(true)}
            className="md:hidden inline-flex items-center px-8 py-4 text-white text-[10px] font-semibold uppercase tracking-[0.2em] shadow-lg"
            style={{ backgroundColor: BRAND.colors.grayDark }}
          >
            <Sparkles className="w-3 h-3 mr-2" style={{ color: BRAND.colors.sand }} />
            Help Me Choose
          </button>
        </div>

        {/* Filter Navigation */}
        <div className="overflow-x-auto -mx-6 px-6 mb-16 scrollbar-hide">
          <div className="flex md:flex-wrap md:justify-center gap-2 md:gap-3 min-w-max md:min-w-0">
            {CATEGORIES.map(cat => (
              <FilterButton
                key={cat.id}
                category={cat}
                isActive={activeCategory === cat.id}
                onClick={setActiveCategory}
              />
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-10 px-1">
          <h3 
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: BRAND.colors.grayDark }}
          >
            {activeCategory === 'all' 
              ? 'All Protocols' 
              : CATEGORIES.find(c => c.id === activeCategory)?.label}
            <span 
              className="ml-4 text-[10px] font-semibold text-white px-3 py-1 align-middle"
              style={{ backgroundColor: BRAND.colors.grayDark }}
            >
              {filteredProducts.length}
            </span>
          </h3>
          {searchTerm && (
            <button 
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              className="text-[10px] font-semibold uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
              style={{ color: BRAND.colors.earth }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isSelected={compareList.includes(product.id)}
                onToggleCompare={toggleCompare}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div 
            className="text-center py-24 bg-white border border-dashed"
            style={{ borderColor: `${BRAND.colors.grayDark}20` }}
          >
            <Search 
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: BRAND.colors.grayDark, opacity: 0.15 }}
            />
            <h3 
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: BRAND.colors.grayDark, opacity: 0.4 }}
            >
              No protocols found
            </h3>
          </div>
        )}

        {/* Floating Compare Bar */}
        {compareList.length > 0 && (
          <div 
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-white px-8 py-4 shadow-2xl flex items-center gap-8 animate-slideUp backdrop-blur-xl"
            style={{ backgroundColor: `${BRAND.colors.grayDark}F5` }}
          >
            <div className="flex items-center gap-3">
              <span 
                className="text-xs font-bold w-6 h-6 flex items-center justify-center"
                style={{ backgroundColor: BRAND.colors.sage, color: BRAND.colors.darkest }}
              >
                {compareList.length}
              </span>
              <span className="font-semibold text-[10px] uppercase tracking-[0.2em]">Selected</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <button 
              onClick={() => setShowCompare(true)}
              className="text-[10px] font-semibold uppercase tracking-[0.2em] hover:text-white/70 transition-colors"
              style={{ color: BRAND.colors.sand }}
            >
              Compare Now
            </button>
            <button 
              onClick={() => setCompareList([])}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Disclaimer Footer */}
        <div 
          className="mt-24 border-t pt-12 pb-6"
          style={{ borderColor: `${BRAND.colors.grayDark}10` }}
        >
          <div 
            className="flex items-start gap-5 bg-white p-8 border"
            style={{ borderColor: `${BRAND.colors.grayDark}08` }}
          >
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: BRAND.colors.sky }} />
            <div>
              <p 
                className="text-[10px] font-semibold uppercase tracking-[0.25em] mb-2"
                style={{ color: BRAND.colors.grayDark }}
              >
                Medical Disclaimer
              </p>
              <p 
                className="text-xs font-light leading-relaxed tracking-wide"
                style={{ color: BRAND.colors.grayDark, opacity: 0.7 }}
              >
                The information provided in this app is for educational purposes only and is based on available research. These products are not intended to diagnose, treat, cure, or prevent any disease. Please consult with a healthcare professional before starting any new supplement regimen, especially if you have a medical condition or are taking medication.
              </p>
            </div>
          </div>
          <p 
            className="text-center text-[9px] font-semibold uppercase tracking-[0.3em] mt-10"
            style={{ color: BRAND.colors.grayDark, opacity: 0.25 }}
          >
            © 2025 Haven Wellness. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
