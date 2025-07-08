import type { VCProfile } from "./types"

/**
 * Comprehensive mock VC data for testing purposes
 * Will be replaced with real API calls in production
 */
export const mockVCData: VCProfile[] = [
  {
    id: "1",
    firmName: "Andreessen Horowitz",
    industryFocus: "Fintech",
    contactPerson: {
      name: "Marc Andreessen",
      designation: "Co-Founder & General Partner",
      bio: "Marc Andreessen is a co-founder and general partner of the venture capital firm Andreessen Horowitz. He co-created the highly influential Mosaic Internet browser and co-founded Netscape.",
    },
    email: "marc@a16z.com",
    websiteUrl: "https://a16z.com",
    linkedinUrl: "https://linkedin.com/in/pmarca",
    location: "Menlo Park, CA",
    description:
      "Andreessen Horowitz (a16z) is a venture capital firm that backs bold entrepreneurs building the future through technology. We are stage agnostic: we invest in seed to growth-stage technology companies, across bio/healthcare, consumer, crypto, enterprise, fintech, games, and companies building toward American dynamism.",
    sectors: ["Fintech", "Blockchain", "Digital Banking", "Payment Systems", "InsurTech"],
  },
  {
    id: "2",
    firmName: "Sequoia Capital",
    industryFocus: "Healthcare",
    contactPerson: {
      name: "Roelof Botha",
      designation: "Senior Partner",
      bio: "Roelof Botha is a Senior Partner at Sequoia Capital, where he focuses on investments in internet, software, and financial services companies. He previously served as CFO of PayPal.",
    },
    email: "roelof@sequoiacap.com",
    websiteUrl: "https://sequoiacap.com",
    linkedinUrl: "https://linkedin.com/in/roelofbotha",
    location: "Menlo Park, CA",
    description:
      "Sequoia Capital helps daring founders build legendary companies. We've been partnering with entrepreneurs for almost 50 years, helping them build companies that benefit everyone by creating jobs, revenue, and value.",
    sectors: ["Digital Health", "Biotech", "Medical Devices", "Healthcare IT", "Telemedicine"],
  },
  {
    id: "3",
    firmName: "Tesla Ventures",
    industryFocus: "Automotive",
    contactPerson: {
      name: "Sarah Chen",
      designation: "Managing Partner",
      bio: "Sarah Chen leads Tesla Ventures with over 15 years of experience in automotive technology and sustainable transportation. She previously worked at BMW Ventures and Ford Motor Company.",
    },
    email: "sarah.chen@teslaventures.com",
    websiteUrl: "https://teslaventures.com",
    linkedinUrl: "https://linkedin.com/in/sarahchen-auto",
    location: "Palo Alto, CA",
    description:
      "Tesla Ventures invests in companies developing breakthrough technologies for sustainable transportation and energy. We focus on electric vehicles, autonomous driving, battery technology, and charging infrastructure.",
    sectors: ["Electric Vehicles", "Autonomous Driving", "Battery Tech", "Charging Infrastructure", "Smart Mobility"],
  },
  {
    id: "4",
    firmName: "Fashion Forward Capital",
    industryFocus: "Fashion",
    contactPerson: {
      name: "Isabella Rodriguez",
      designation: "Founder & Managing Partner",
      bio: "Isabella Rodriguez founded Fashion Forward Capital after a successful career in fashion retail and technology. She previously held executive positions at Zara and H&M Group.",
    },
    email: "isabella@fashionforward.vc",
    websiteUrl: "https://fashionforward.vc",
    linkedinUrl: "https://linkedin.com/in/isabella-rodriguez-fashion",
    location: "New York, NY",
    description:
      "Fashion Forward Capital is the leading venture capital firm focused exclusively on fashion technology, sustainable fashion, and retail innovation. We partner with entrepreneurs revolutionizing how fashion is designed, produced, and consumed.",
    sectors: ["Fashion Tech", "Sustainable Fashion", "E-commerce", "Retail Technology", "Supply Chain"],
  },
  {
    id: "5",
    firmName: "EduTech Ventures",
    industryFocus: "EdTech",
    contactPerson: {
      name: "David Kim",
      designation: "General Partner",
      bio: "David Kim is a General Partner at EduTech Ventures with a background in education technology and online learning. He was previously VP of Product at Coursera and held roles at Khan Academy.",
    },
    email: "david@edutechventures.com",
    websiteUrl: "https://edutechventures.com",
    linkedinUrl: "https://linkedin.com/in/davidkim-edtech",
    location: "San Francisco, CA",
    description:
      "EduTech Ventures invests in companies transforming education through technology. We back entrepreneurs building solutions for K-12, higher education, corporate training, and lifelong learning.",
    sectors: ["Online Learning", "Educational Software", "Corporate Training", "Language Learning", "STEM Education"],
  },
  {
    id: "6",
    firmName: "Cloud Capital Partners",
    industryFocus: "SaaS",
    contactPerson: {
      name: "Jennifer Walsh",
      designation: "Senior Partner",
      bio: "Jennifer Walsh is a Senior Partner at Cloud Capital with extensive experience in enterprise software and SaaS businesses. She previously led investments at Bessemer Venture Partners.",
    },
    email: "jennifer@cloudcapital.vc",
    websiteUrl: "https://cloudcapital.vc",
    linkedinUrl: "https://linkedin.com/in/jennifer-walsh-saas",
    location: "Boston, MA",
    description:
      "Cloud Capital Partners specializes in B2B SaaS and enterprise software investments. We partner with founders building scalable software solutions that transform how businesses operate.",
    sectors: ["Enterprise SaaS", "Business Intelligence", "Productivity Tools", "DevOps", "Cybersecurity"],
  },
  {
    id: "7",
    firmName: "Retail Revolution Fund",
    industryFocus: "E-commerce",
    contactPerson: {
      name: "Michael Thompson",
      designation: "Managing Director",
      bio: "Michael Thompson leads Retail Revolution Fund with deep expertise in e-commerce and retail technology. He was previously an executive at Amazon and founded two successful e-commerce startups.",
    },
    email: "michael@retailrevolution.fund",
    websiteUrl: "https://retailrevolution.fund",
    linkedinUrl: "https://linkedin.com/in/michael-thompson-ecommerce",
    location: "Seattle, WA",
    description:
      "Retail Revolution Fund invests in companies reimagining retail and commerce. We focus on direct-to-consumer brands, marketplace platforms, and technologies that enhance the shopping experience.",
    sectors: ["D2C Brands", "Marketplace Platforms", "Retail Tech", "Supply Chain", "Customer Experience"],
  },
  {
    id: "8",
    firmName: "AI Frontier Capital",
    industryFocus: "AI/ML",
    contactPerson: {
      name: "Dr. Lisa Zhang",
      designation: "Founding Partner",
      bio: "Dr. Lisa Zhang is a Founding Partner at AI Frontier Capital with a PhD in Machine Learning from Stanford. She previously led AI research at Google and was a principal at GV (Google Ventures).",
    },
    email: "lisa@aifrontier.capital",
    websiteUrl: "https://aifrontier.capital",
    linkedinUrl: "https://linkedin.com/in/dr-lisa-zhang-ai",
    location: "Mountain View, CA",
    description:
      "AI Frontier Capital invests in artificial intelligence and machine learning companies across various industries. We back entrepreneurs building AI-first solutions that solve real-world problems.",
    sectors: ["Machine Learning", "Computer Vision", "Natural Language Processing", "AI Infrastructure", "Robotics"],
  },
  {
    id: "9",
    firmName: "Blockchain Ventures",
    industryFocus: "Blockchain",
    contactPerson: {
      name: "Alex Rivera",
      designation: "General Partner",
      bio: "Alex Rivera is a General Partner at Blockchain Ventures with extensive experience in cryptocurrency and blockchain technology. He was an early employee at Coinbase and founded a successful DeFi protocol.",
    },
    email: "alex@blockchainventures.io",
    websiteUrl: "https://blockchainventures.io",
    linkedinUrl: "https://linkedin.com/in/alex-rivera-blockchain",
    location: "Austin, TX",
    description:
      "Blockchain Ventures is a leading crypto-focused venture capital firm. We invest in blockchain infrastructure, DeFi protocols, NFT platforms, and Web3 applications that are building the decentralized future.",
    sectors: ["DeFi", "NFTs", "Web3", "Blockchain Infrastructure", "Cryptocurrency"],
  },
  {
    id: "10",
    firmName: "GreenTech Capital",
    industryFocus: "CleanTech",
    contactPerson: {
      name: "Emma Johnson",
      designation: "Managing Partner",
      bio: "Emma Johnson is the Managing Partner at GreenTech Capital with a focus on clean technology and sustainability. She has an MBA from Wharton and previously worked at Tesla and SolarCity.",
    },
    email: "emma@greentech.capital",
    websiteUrl: "https://greentech.capital",
    linkedinUrl: "https://linkedin.com/in/emma-johnson-cleantech",
    location: "Denver, CO",
    description:
      "GreenTech Capital invests in companies developing clean technologies and sustainable solutions. We focus on renewable energy, energy storage, carbon capture, and environmental technologies.",
    sectors: ["Renewable Energy", "Energy Storage", "Carbon Capture", "Waste Management", "Sustainable Materials"],
  },
]
