export const SITE_SETTINGS_FIELDS = `
  brandName
  whatsappNumber
  whatsappMessageDefault
  email
  city
  businessHours { label hours notes }
  coverage { cityOrZone notes }
  socialLinks { instagramUrl facebookUrl linkedinUrl }
  agendaEnabled
  agendaLink
`;

export const SERVICE_FIELDS = `
  documentId
  title
  slug
  type
  for_who
  whatsapp_desc
  what_it_solves
  benefits { text }
  deliverables { text }
  delivery_time
  price
  ctaType
  guarantee
  top_banner
  order
  featured
  publishedAt
`;

export const SERVICE_LIST_QUERY = `
  query ServicesList($page: Int!, $pageSize: Int!, $filters: ServiceFiltersInput, $sort: [String], $status: PublicationStatus) {
    services_connection(
      pagination: { page: $page, pageSize: $pageSize }
      filters: $filters
      sort: $sort
      status: $status
    ) {
      nodes { ${SERVICE_FIELDS} }
      pageInfo { page pageSize pageCount total }
    }
  }
`;

export const SERVICE_LIST_QUERY_NO_STATUS = `
  query ServicesListNoStatus($page: Int!, $pageSize: Int!, $filters: ServiceFiltersInput, $sort: [String]) {
    services_connection(
      pagination: { page: $page, pageSize: $pageSize }
      filters: $filters
      sort: $sort
    ) {
      nodes { ${SERVICE_FIELDS} }
      pageInfo { page pageSize pageCount total }
    }
  }
`;

export const SERVICE_BY_SLUG_QUERY = `
  query ServiceBySlug($slug: String!, $status: PublicationStatus) {
    services(filters: { slug: { eq: $slug } }, status: $status) {
      ${SERVICE_FIELDS}
    }
  }
`;

export const CASE_FIELDS = `
  documentId
  title
  slug
  clientName
  summary
  industry
  city
  coverImage { url alternativeText }
  beforeTitle
  afterTitle
  beforePoints { text tone }
  afterPoints { text tone }
  impactTags { text variant }
  ctaPrimaryType
  ctaPrimaryLabel
  ctaPrimaryUrl
  siteUrl
  order
  featured
  gallery { url alternativeText }
  screenshotsBefore { url alternativeText }
  screenshotsAfter { url alternativeText }
  problem { text }
  results { text }
  publicAllowed
  publishedAt
`;

export const CASES_QUERY = `
  query Cases($status: PublicationStatus) {
    cases(
      sort: ["publishedAt:desc"]
      filters: { publicAllowed: { eq: true } }
      status: $status
    ) {
      ${CASE_FIELDS}
    }
  }
`;

export const CASE_BY_SLUG_QUERY = `
  query CaseBySlug($slug: String!, $status: PublicationStatus) {
    cases(
      filters: { slug: { eq: $slug }, publicAllowed: { eq: true } }
      status: $status
    ) {
      ${CASE_FIELDS}
    }
  }
`;

export const TESTIMONIAL_FIELDS = `
  documentId
  namePerson
  companyOrRubro
  quote
  rating
  publicAllowed
  publishedAt
`;

export const FAQ_FIELDS = `
  question
  answer
`;

export const POST_FIELDS = `
  documentId
  title
  slug
  excerpt
  content
  createdAt
  updatedAt
  publishedAt
  cover { url alternativeText }
  category { name slug }
  tags { name slug }
`;

export const LEGAL_FIELDS = `
  slug
  title
  content
`;

export const DEFAULT_SERVICE_SORT = ["order:asc"];
export const FALLBACK_SERVICE_SORT = ["createdAt:desc"];
