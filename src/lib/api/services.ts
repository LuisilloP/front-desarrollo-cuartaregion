export {
  fetchFeaturedServices,
  fetchServiceBySlug,
  fetchServices,
  getFeaturedServices,
  getServiceBySlug,
  getServicesAdminList,
  getServicesList
} from "./domains/serviceDomain";
export { fetchCaseBySlug, fetchCases } from "./domains/caseDomain";
export {
  fetchFaqs,
  fetchLegalPage,
  fetchSiteSettings,
  fetchTestimonials
} from "./domains/globalDomain";
export {
  fetchAllPosts,
  fetchPostBySlug,
  fetchPostsPage,
  type FetchPostsParams
} from "./domains/postDomain";

export { fetchTestimonials as fetchReviews } from "./domains/globalDomain";
export { fetchAllPosts as fetchPosts } from "./domains/postDomain";
