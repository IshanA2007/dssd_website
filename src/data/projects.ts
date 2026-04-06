export interface ProjectOutcome {
  value: string
  label: string
}

export interface ProjectMember {
  name: string
  role: string
}

export interface Project {
  id: string
  title: string
  description: string
  category: 'Sustainability' | 'Social Equity' | 'Education' | 'Public Health'
  status: 'Active' | 'Completed'
  tags: string[]
  icon: string
  /** Optional hero image — used on featured cards and the project detail page */
  imageUrl?: string
  // detail-page fields (all optional)
  longDescription?: string
  methodology?: string[]
  outcomes?: ProjectOutcome[]
  team?: ProjectMember[]
  partner?: string
  timeline?: string
}

export const projects: Project[] = [
  {
    id: 'leap-energy-operations',
    title: 'LEAP Energy Operations Platform',
    description: "Modernizing a local energy nonprofit's internal operations through CRM migration, workflow automation, and a customer-facing market rate calculator.",
    category: 'Sustainability',
    status: 'Active',
    tags: ['Monday.com', 'Make.com', 'Snugg Pro', 'JavaScript'],
    icon: '🏠',
    imageUrl:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80',
    longDescription: "LEAP is a Charlottesville-area nonprofit that provides energy assessments and weatherization services for homeowners. Their operations were spread across disconnected tools, making HR tracking, client referrals, and cost estimation inefficient. DSSD partnered with LEAP to consolidate their workflows into Monday.com, automate data pipelines from their audit software (Snugg Pro), and rebuild a public-facing market rate calculator that gives homeowners an instant assessment quote based on square footage and building characteristics.",
    methodology: [
      "We migrated LEAP's HR records and client data into structured Monday.com workspaces, building custom dashboards and automation recipes for their referral reward program—automatically issuing Tango Card gift cards when a successful referral is logged.",
      "Using Make.com, we built integration workflows between Snugg Pro (LEAP's energy audit platform) and Monday.com to eliminate manual data re-entry. Separately, we redesigned the customer-facing price calculator on LEAP's website, updating the assessment formula, repositioning the cost output below the input fields, and adding a sign-up prompt after quote generation.",
    ],
    outcomes: [
      { value: '3', label: 'Automation Workflows Built' },
      { value: '1', label: 'Calculator Redesigned' },
    ],
    team: [
      { name: 'Sahvir Bhaskaruni', role: 'Project Lead' },
      { name: 'Vinith Jayamani', role: 'Co-President / DS Track' },
      { name: 'Winston Shek', role: 'Co-President / SWE Track' },
    ],
    partner: 'LEAP (Local Energy Alliance Program)',
    timeline: 'Oct 2025 – Present',
  },
  {
    id: 'resilient-va-resource-hub',
    title: 'Be-Resilient VA Resource Hub',
    description: "Building an interactive GIS map and public resource hub so Virginians can discover resilience funding, projects, and organizations in their region.",
    category: 'Sustainability',
    status: 'Completed',
    tags: ['ArcGIS', 'WordPress', 'Elementor', 'Data Engineering'],
    icon: '🗺️',
    imageUrl:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
    longDescription: "Be-Resilient VA needed a way to make Virginia's scattered resilience resources—flood mitigation grants, energy resilience funding, green infrastructure projects—discoverable by the public. DSSD is building an interactive resource hub anchored by an ArcGIS map where users can click into any region and instantly surface available funding, eligibility criteria, deadlines, and direct application links. The WordPress/Elementor site will serve as the public-facing platform while ResilientVA.org remains the organization's informational home.",
    methodology: [
      "We compiled a master spreadsheet of funding opportunities with fields for organization, funding type, amount, eligibility, due date, RFP link, summary, and geocoded location—structured for direct upload into ArcGIS hosted layers with minimal cleanup.",
      "The beta map focuses on the Roanoke Valley–Alleghany region as a proof of concept, featuring a single filterable map with pop-up detail cards rather than multiple separate maps. Filters cover category, location, and resilience topic. The ArcGIS dashboard is being integrated into a WordPress + Elementor site for seamless public access.",
    ],
    outcomes: [
      { value: '1', label: 'Beta Region Mapped' },
      { value: '4', label: 'Filter Dimensions' },
    ],
    team: [
      { name: 'Meneja Gautam', role: 'Project Lead' },
      { name: 'Vinith Jayamani', role: 'Co-President / DS Track' },
      { name: 'Dhruv Sarang', role: 'VP / Business Consulting' },
    ],
    partner: 'Be-Resilient VA',
    timeline: 'Oct 2025 – Present',
  },
  {
    id: 'project-placeholder-1',
    title: 'Project Coming Soon',
    description: 'A new sustainability project is currently in the planning phase. Check back soon for details on this upcoming initiative.',
    category: 'Education',
    status: 'Active',
    tags: ['TBD'],
    icon: '🔜',
  },
  {
    id: 'project-placeholder-2',
    title: 'Project Coming Soon',
    description: 'Another exciting project is being scoped with a community partner. More details will be shared once the partnership is finalized.',
    category: 'Public Health',
    status: 'Active',
    tags: ['TBD'],
    icon: '🔜',
  },
  {
    id: 'project-placeholder-3',
    title: 'Project Coming Soon',
    description: 'We are actively seeking new partnerships for this project slot. Interested organizations can reach out through our Partner page.',
    category: 'Social Equity',
    status: 'Active',
    tags: ['TBD'],
    icon: '🔜',
  },
]

export const featuredProjects = projects.slice(0, 3)

export const categories = ['All Projects', 'Sustainability', 'Social Equity', 'Education', 'Public Health'] as const
