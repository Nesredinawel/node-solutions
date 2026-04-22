// lib/api.ts
import type {
  About,
  Brand,
  FAQ,
  Footer,
  Hero,
  Story,
  Project,
  Service,
  Testimonial,
} from '@/lib/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com'

/**
 * Standardized Fetcher
 * Automatically unwraps Strapi-style { data: ... } wrappers
 */
async function fetcher<T>(
  endpoint: string,
  options?: RequestInit & { tags?: string[] }
): Promise<T> {
  const { tags, ...fetchOptions } = options || {}

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    next: { 
      revalidate: 60, // ISR: Cache for 60 seconds
      tags: tags || [] 
    },
    ...fetchOptions,
  })

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} — ${endpoint}`)
  }

  const json = await res.json()

  // This handles the Strapi/CMS "data" wrapper automatically
  return json.data ? json.data : json
}

// --- API Functions ---

export const getAbout = () => fetcher<About>('/about', { tags: ['about'] })

export const getBrand = () => fetcher<Brand>('/brand?populate=*', { tags: ['brand'] })

export const getFAQs = () => fetcher<FAQ[]>('/faqs', { tags: ['faqs'] })
export const getFAQ = (id: string) => fetcher<FAQ>(`/faqs/${id}`, { tags: [`faq-${id}`] })

export const getFooter = () => fetcher<Footer>('/footer', { tags: ['footer'] })

export const getHero = () => fetcher<Hero>('/hero?populate=*', { tags: ['hero'] })

export const getStories = () => fetcher<Story[]>('/our-stories', { tags: ['stories'] })
export const getStory = (id: string) => fetcher<Story>(`/our-stories/${id}`, { tags: [`story-${id}`] })

export const getProjects = () => fetcher<Project[]>('/projects', { tags: ['projects'] })
export const getProject = (id: string) => fetcher<Project>(`/projects/${id}`, { tags: [`project-${id}`] })

export const getServices = () => fetcher<Service[]>('/services', { tags: ['services'] })
export const getService = (id: string) => fetcher<Service>(`/services/${id}`, { tags: [`service-${id}`] })

export const getTestimonials = () => fetcher<Testimonial[]>('/testimonials', { tags: ['testimonials'] })
export const getTestimonial = (id: string) => fetcher<Testimonial>(`/testimonials/${id}`, { tags: [`testimonial-${id}`] })