export const seoConfig = {
  site: "https://therohitpatwa.me",
  title: "Rohit Patwa - Full Stack Developer",
  description: "Full-Stack developer skilled in building scalable web applications using Spring Framework, React and modern UI frameworks. Available for work.",
  keywords: [
    "Rohit Patwa",
    "Full Stack Developer", 
    "Java",
    "Spring Boot",
    "React",
    "JavaScript",
    "Portfolio",
    "Web Developer",
    "Backend Developer",
    "Frontend Developer",
    "MySQL",
    "RESTful APIs",
    "Microservices",
    "Docker",
    "Git"
  ],
  author: "Rohit Patwa",
  image: "https://therohitpatwa.me/profile.webp",
  twitter: "@therohitpatwa",
  linkedin: "https://linkedin.com/in/therohitpatwa",
  github: "https://github.com/therohitpatwa",
  blog: "https://therohitpatwa.hashnode.dev/",
  email: "therohitpatwa@gmail.com",
  location: "Lucknow, Uttar Pradesh, India"
};

export const generateSEOTags = (customTitle?: string, customDescription?: string) => {
  const title = customTitle || seoConfig.title;
  const description = customDescription || seoConfig.description;
  
  return {
    title,
    description,
    canonical: seoConfig.site,
    openGraph: {
      type: "website",
      url: seoConfig.site,
      title,
      description,
      image: seoConfig.image,
      siteName: seoConfig.title,
      locale: "en_US"
    },
    twitter: {
      card: "summary_large_image",
      site: seoConfig.twitter,
      creator: seoConfig.twitter,
      title,
      description,
      image: seoConfig.image
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};
