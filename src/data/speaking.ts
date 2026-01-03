// Speaking data - unified chronological list

export type SpeakingItemType = 'podcast' | 'talk' | 'meetup' | 'livestream'

export interface SpeakingItem {
  id: string
  type: SpeakingItemType
  title: string
  event: string
  date: string
  description: string
  // For podcasts
  url?: string
  // For talks and livestreams
  youtubeId?: string
  slides?: string
  // Fallback image when no youtubeId is provided
  image?: string
  // For meetups
  location?: string
  images?: string[]
}

export const speakingItems: SpeakingItem[] = [
  // 1. React Summit US 2025 - This Is How We Made Postman Launch Twice as Fast
  {
    id: 'talk-react-summit-us-2025',
    type: 'talk',
    title: 'This Is How We Made Postman Launch Twice as Fast by Ruben Casas',
    event: 'React Summit US 2025',
    date: '2025-11-21',
    image: '/images/speaking/postman-in-half-time.jpeg',
    description:
      'CEO tests Postman on cheap laptop, reveals performance issue. Ruben Casas gives 5 tips to enhance app performance, emphasizing the importance of measuring and focusing on a key metric like TTF from mobile gaming.',
    url: 'https://gitnation.com/contents/this-is-how-we-made-postman-launch-twice-as-fast',
  },
  {
    id: 'pomerium-livestream-chatgpt-apps',
    type: 'talk',
    title: 'Pomerium Livestream: ChatGPT Apps',
    event: 'Pomerium',
    date: '2025-12-16',
    description:
      'Join us for a live discussion with Ruben Casas, Staff Engineer at Postman, as we explore the latest advancements in ChatGPT apps and how they are transforming the way we interact with AI.',
    youtubeId: '0u8ZHnWi4j0',
  },
  // 2. Livestream
  {
    id: 'livestream-8IDGOU02u4g',
    type: 'livestream',
    title: 'MCP Servers Explained',
    event: 'CompressedFM',
    date: '2025-12-02',
    description:
      'New to streaming or looking to level up? Check out StreamYard and get a $10 discount.',
    youtubeId: '8IDGOU02u4g',
  },
  // 3. Livestream
  {
    id: 'livestream-rDdspScnSWs',
    type: 'livestream',
    title: 'Jueves de Quack',
    event: 'GitHub',
    date: '2025-09-04',
    description:
      'Unete @acolombiadev y Ruben Casas (Staff Engineer en Postman) para una exploracion profunda de herramientas de desarrollo de APIs de vanguardia.',
    youtubeId: 'rDdspScnSWs',
  },
  // 4. Meetup - React Advanced London
  {
    id: 'meetup-react-advanced-london-2025',
    type: 'meetup',
    title: 'React Query Meets MobX',
    event: 'React Advanced London Meetup',
    date: '2025-04-03',
    description:
      'Hey, React London Community! Spring is in the air! Join us on April 3 for an exciting React Meetup filled with insightful talks, networking, and community connections!',
    location: 'London, UK',
    image: '/images/speaking/react-advanced-meetup.jpg',
    url: 'https://guild.host/events/react-advanced-london-rlt0qo',
  },
  // 5. Podcast - PodRocket Software Migrations
  {
    id: 'podcast-podrocket-migrations',
    type: 'podcast',
    title: 'Software migrations at scale with Ruben Casas',
    event: 'PodRocket',
    date: '2024-09-12',
    description:
      'Ruben Casas discusses software migrations at scale, understanding different migration patterns, making critical decisions on whether a full rewrite is necessary, and more. This episode covers all the essentials you need to navigate your next big software transformation.',
    url: 'https://podrocket.logrocket.com/software-migrations-at-scale-ruben-casas',
  },
  // 6. Livestream
  {
    id: 'livestream-oTZLTNtndxc',
    type: 'livestream',
    title: '"The Pit of Success" w/ Ruben Casas of Postman | The Enterprise Software Podcast By Nx #5',
    event: 'Nx - Smart Repos - Fast Builds',
    date: '2024-09-18',
    description:
      'In this episode, Zack sits down with Ruben to discuss the evolution of frontend architecture, the AngularJS to Angular2 transition, why React does not get enough credit, and platform teams and the pit of success.',
    youtubeId: 'oTZLTNtndxc',
  },
  // 7. Livestream
  {
    id: 'livestream-pNmqJ3NiZSs',
    type: 'livestream',
    title:
      'Migration to Micro-Frontends at @postman with Ruben Casas #developers #migration #web #engineering',
    event: 'My 50 cents',
    date: '2024-06-11',
    description:
      'Are you ready to dive deep into the intricate world of micro-frontends? In this episode, we sit down with Ruben Casas, a seasoned staff engineer at Postman, to explore one of the most challenging yet rewarding transformations in modern software development.',
    youtubeId: 'pNmqJ3NiZSs',
  },
  // 8. Podcast - Compressed.fm
  {
    id: 'podcast-compressed-fm',
    type: 'podcast',
    title: 'Inside Postman\'s Journey to Build a VS Code Extension',
    event: 'Compressed.fm',
    date: '2024-06-14',
    description:
      'This episode covers the detailed process of taking Postman\'s VS Code extension from a proof of concept to a fully-fledged product. Reuben Casas shares insights on the technical hurdles, team dynamics, and the iterative development process.',
    url: 'https://www.compressed.fm/episode/178',
  },
  // 9. Meetup - CityJS
  {
    id: 'meetup-cityjs-2024',
    type: 'meetup',
    title: 'Do you need a State Manager in 2024?',
    event: 'CityJS Conference',
    date: '2024-02-27',
    description:
      'Do you need a State Manager in 2024? Ruben Casas is coming back to give us useful answers for our #React development!',
    location: 'London, UK',
    url: 'https://www.linkedin.com/posts/cityjs-conferences_react-activity-7168199320511483905-TDa4/',
  },
  // 10. Conference Talk - YouTube R8dTiT9nKow
  {
    id: 'talk-R8dTiT9nKow',
    type: 'talk',
    title: 'The Risks of Micro-Frontends - Ruben Casas',
    event: 'CityJS Conference',
    date: '2022-05-11',
    description:
      'Are you considering if the micro-frontend pattern is a good fit for you and your organisation? In this talk I discuss the risks of micro-frontends and the disadvantages you should be aware of before adopting this architectural pattern.',
    youtubeId: 'R8dTiT9nKow',
  },
  // 11. Conference Talk - YouTube MGpTUx8MKMY
  {
    id: 'talk-MGpTUx8MKMY',
    type: 'talk',
    title: 'Micro Frontends Conference 2023 - Ruben Casas: The Evolution of Micro Frontends',
    event: 'Micro Frontends Conference 2023',
    date: '2023-07-28',
    description:
      "Have you ever wondered what's the difference between monoliths, monorepos and micro-frontends? This talk is a journey through the evolution of frontend applications at scale.",
    youtubeId: 'MGpTUx8MKMY',
  },
  // 12. Conference Talk - YouTube gmQ4I4adNec
  {
    id: 'talk-gmQ4I4adNec',
    type: 'talk',
    title: 'The Micro-Frontend Revolution at Amex - Ruben Casas',
    event: 'Node Congress 2021',
    date: '2021-03-22',
    description:
      'How do you scale a web application to be developed by thousands of engineers and upgrade it to use the latest JavaScript technologies (Node.js + React)? The answer is, using Micro-Frontends!',
    youtubeId: 'gmQ4I4adNec',
  },
  // 13. Conference Talk - YouTube W4biNjfmvvI
  {
    id: 'talk-W4biNjfmvvI',
    type: 'talk',
    title: 'Micro Frontends: the Evolution of Frontend Architecture',
    event: 'InfoQ',
    date: '2023-10-30',
    description:
      'Ruben Casas discusses the evolution of frontend applications at scale, starting from monoliths, evolving to modular monoliths, integrated applications, monorepos and arriving at micro frontends.',
    youtubeId: 'W4biNjfmvvI',
  },
  // 14. Conference Talk - YouTube tI8RYB5rcVw
  {
    id: 'talk-tI8RYB5rcVw',
    type: 'talk',
    title: 'Micro-frontends with React Router 6 by Ruben Casas',
    event: 'Wey Wey Web',
    date: '2022-12-29',
    description:
      'One of the most important decisions when designing Micro-Frontends is how to route the different applications and compose them together. In this talk I will show you how React Router could be a great option for Micro-Frontends.',
    youtubeId: 'tI8RYB5rcVw',
  },
  // 15. Conference Talk - YouTube 8QiUUsAnLjo
  {
    id: 'talk-8QiUUsAnLjo',
    type: 'talk',
    title: 'Micro-Frontends Performance and Centralised Data Caching - Ruben Casas, React Advanced 2021',
    event: 'React Advanced 2021',
    date: '2021-12-23',
    description:
      "Common myths about Micro-Frontends hold that they are bad for performance or that developers implementing this architectural style don't care about the performance implications. This talk shows how micro-frontends can make your applications faster and more resilient while keeping the benefits of independent deployments.",
    youtubeId: '8QiUUsAnLjo',
  },
  // 16. Conference Talk - CloudConf Italy (image only)
  {
    id: 'talk-cloudconf-italy-2023',
    type: 'talk',
    title: 'The Evolution Of Frontend Architecture',
    event: 'CloudConf Italy',
    date: '2023-05-16',
    description:
      'Exploring how frontend architecture has evolved over the years and where it is heading in the future.',
    images: [
      'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fichk1a9y8oa2s34j0536.jpeg',
    ],
  },
  // 17. Livestream - YouTube GOhRwqCX08g
  {
    id: 'livestream-GOhRwqCX08g',
    type: 'livestream',
    title: '8 Consejos para el uso de Micro frontend (feat. Ruben Casas) | Episodio #76',
    event: 'Coffee Power Podcast',
    date: '2021-12-13',
    description:
      'En este episodio te vamos a dar 8 consejos para el uso de micro frontends en tus aplicaciones.',
    youtubeId: 'GOhRwqCX08g',
  },
  // 18. Livestream - YouTube r92CUWlDwgE
  {
    id: 'livestream-r92CUWlDwgE',
    type: 'livestream',
    title: 'Building SSR React Micro Frontends | By Ruben Casas & Nelly Kiboi',
    event: 'Codu',
    date: '2020-08-11',
    description:
      'Ruben and Nelly will be giving a really exciting talk this week! Build scalable React applications following the micro frontend pattern using One App, a new modular approach to web application development.',
    youtubeId: 'r92CUWlDwgE',
  },
  // Additional talks from GitNation
  {
    id: 'talk-monolith-to-microfrontends',
    type: 'talk',
    title: 'Monolith to Micro-Frontends',
    event: 'React Advanced 2022',
    date: '2022-10-21',
    description:
      'How to transform monolithic React applications into modular, decoupled frontend architectures. Covering migration patterns like the Strangler and Reverse Strangler patterns.',
    url: 'https://gitnation.com/contents/monolith-to-micro-frontends',
  },
  {
    id: 'talk-microfrontend-revolution-amex',
    type: 'talk',
    title: 'The Micro-Frontend Revolution at Amex',
    event: 'Node Congress 2021',
    date: '2021-06-24',
    description:
      'How American Express scaled its web application across thousands of engineers using micro-frontends architecture, in production since 2016.',
    url: 'https://gitnation.com/contents/the-micro-frontend-revolution-at-amex',
  },
]

export function getAllSpeakingItems(): SpeakingItem[] {
  return [...speakingItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
