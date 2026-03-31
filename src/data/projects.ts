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
  /** Optional hero image for featured cards on the home page */
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
    id: 'renewable-energy',
    title: 'Renewable Energy Mapping',
    description: "Developing a geospatial dashboard to identify optimal locations for micro-grid solar installations across Virginia's rural counties.",
    category: 'Sustainability',
    status: 'Active',
    tags: ['Python', 'GIS', 'Tableau'],
    icon: '⚡',
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    longDescription: "Developing a geospatial dashboard to identify optimal locations for micro-grid solar installations across Virginia's rural counties. This project partners with the Virginia Department of Energy to deliver actionable infrastructure recommendations to local planners and policymakers.",
    methodology: [
      "We aggregated satellite imagery, county energy consumption records, and topographical data to build a composite suitability score for each census tract.",
      "A gradient boosting model (XGBoost) was trained on known solar farm locations to validate the scoring system. Visualizations were built in Tableau and embedded in a public-facing dashboard accessible to county planners.",
    ],
    outcomes: [
      { value: '12', label: 'Counties Mapped' },
      { value: '340+', label: 'Optimal Sites Identified' },
    ],
    team: [
      { name: 'Alex Chen', role: 'Project Lead' },
      { name: 'Maya Patel', role: 'GIS Analyst' },
      { name: 'Jordan Rivera', role: 'Data Engineer' },
    ],
    partner: 'VA Dept of Energy',
    timeline: 'Aug 2023 – Present',
  },
  {
    id: 'food-desert',
    title: 'Food Desert Analytics',
    description: 'Analyzing transit patterns and grocery store accessibility to propose mobile market routes for underserved Charlottesville neighborhoods.',
    category: 'Social Equity',
    status: 'Completed',
    tags: ['R', 'SQL', 'Leaflet'],
    icon: '🍽️',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    longDescription: "Analyzing transit patterns and grocery store accessibility to propose mobile market routes for underserved Charlottesville neighborhoods. Data was collected from city transit APIs and mapped against USDA food desert designations.",
    methodology: [
      "We combined GTFS transit data with grocery store locations and demographic data from the American Community Survey to compute accessibility scores per census block.",
      "Route optimization was performed using the OR-Tools library to suggest three viable mobile market corridors minimizing total travel time.",
    ],
    outcomes: [
      { value: '8', label: 'Neighborhoods Analyzed' },
      { value: '3', label: 'Routes Proposed' },
    ],
    team: [
      { name: 'Priya Nair', role: 'Project Lead' },
      { name: 'Sam Torres', role: 'Geospatial Analyst' },
    ],
    partner: 'City of Charlottesville',
    timeline: 'Jan 2023 – Aug 2023',
  },
  {
    id: 'enrollment-ai',
    title: 'Predictive Enrollment AI',
    description: 'Using machine learning to predict dropout risks and resource needs for local K-12 public schools based on historical socio-economic data.',
    category: 'Education',
    status: 'Active',
    tags: ['Python', 'scikit-learn', 'Pandas'],
    icon: '🎓',
    imageUrl:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80',
    longDescription: "Using machine learning to predict dropout risks and resource needs for local K-12 public schools based on historical socio-economic data. The model flags at-risk students early so interventions can be targeted before academic decline.",
    methodology: [
      "Historical enrollment, attendance, and free-lunch eligibility records spanning 10 years were cleaned and merged into a unified dataset with 45 features per student-year record.",
      "A random forest classifier was trained with 5-fold cross-validation, achieving an F1 score of 0.81 on held-out test data. SHAP values were used to surface the top contributing factors to each prediction.",
    ],
    outcomes: [
      { value: '81%', label: 'Model F1 Score' },
      { value: '4', label: 'School Districts Partnered' },
    ],
    team: [
      { name: 'Dana Kim', role: 'ML Engineer' },
      { name: 'Eli Brooks', role: 'Data Analyst' },
      { name: 'Yara Ahmed', role: 'Domain Expert' },
    ],
    partner: 'Albemarle County Schools',
    timeline: 'Sep 2023 – Present',
  },
  {
    id: 'water-quality',
    title: 'Water Quality Sensors',
    description: 'An automated pipeline for cleaning and visualizing real-time sensor data from local river basins to track pollutant spikes.',
    category: 'Public Health',
    status: 'Completed',
    tags: ['Python', 'PostgreSQL', 'D3.js'],
    icon: '💧',
  },
  {
    id: 'equitable-zoning',
    title: 'Equitable Zoning Study',
    description: 'Modeling the impact of proposed zoning changes on housing affordability and demographic displacement in university towns.',
    category: 'Social Equity',
    status: 'Active',
    tags: ['R', 'Census API', 'ggplot2'],
    icon: '🏗️',
  },
]

export const featuredProjects = projects.slice(0, 3)

export const categories = ['All Projects', 'Sustainability', 'Social Equity', 'Education', 'Public Health'] as const
