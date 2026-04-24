// lib/types.ts

export interface About {
  id: string
  title: string
  content: string
  image?: string
}

export interface Brand {
  id: string
  name: string
  logo: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface Footer {
  id: string
  email: string
  phone: string
  address: string
  facebook: string
  linkedin: string
  twitter: string
  links?: { label: string; href: string }[]
  copyright?: string
}

export interface Hero {
  id: string
  heading: string
  subheading: string
  image: string
  cta?: { label: string; href: string }
}

export interface Story {
  id: string
  title: string
  slug: string
  content: string
  image?: string
  date: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  images: string[]
  tags: string[]
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  icon?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  avatar?: string
  rating?: number
}