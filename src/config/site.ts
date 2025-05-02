
export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Hawkly",
  description: "Web3 security marketplace connecting security professionals with blockchain projects",
  url: "https://hawkly.io",
  ogImage: "/og.jpg",
  links: {
    twitter: "https://twitter.com/hawkly",
    github: "https://github.com/hawkly",
  }
}
