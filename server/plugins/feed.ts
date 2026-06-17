import { marked } from 'marked'

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
})

// Hilfsfunktionen
const songsAsMarkup = (songArray: any[]) => {
  return songArray
    .map(
      (i) =>
        `<h4>${i.title}</h4><p>${
          i.description ? marked(i.description) : ''
        }</p><ul><li><a href="${
          i.spotify_url ? i.spotify_url : ''
        }">Spotify</a></li><li><a href="${
          i.youtube_url ? i.youtube_url : ''
        }">YouTube</a></li></ul>`
    )
    .join('')
}

const getTracks = (data: any) => {
  if (data.additional?.length) {
    return data.additional.filter((i: any) => i.__component === 'content.track')
  } else {
    return []
  }
}

const feedContentParsed = (post: any) => {
  const tracks = getTracks(post)
  const mdcontent = marked(post.body || '')
  if (tracks.length) {
    const mdtracks = songsAsMarkup(tracks)
    return mdcontent + mdtracks
  } else if (post.body) {
    return mdcontent
  } else {
    return post.description || ''
  }
}

// Function to strip HTML tags but keep line breaks
const stripHtmlAndClean = (html: string): string => {
  if (!html) return ''

  return html
    .replace(/<!--more-->/gi, '') // Remove <!--more--> comments
    .replace(/<br\s*\/?>/gi, '\n') // Convert <br> tags to line breaks
    .replace(/<\/p>/gi, '\n\n') // Convert closing </p> tags to double line breaks
    .replace(/<p[^>]*>/gi, '') // Remove opening <p> tags
    .replace(/<\/div>/gi, '\n') // Convert closing </div> tags to line breaks
    .replace(/<[^>]*>/g, '') // Remove all other HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple line breaks with double line breaks
    .replace(/[ \t]+/g, ' ') // Replace multiple spaces/tabs with single space
    .trim() // Remove leading/trailing whitespace
}

// Feed-Konfiguration pro Pfad. Der deutsche Feed nutzt die Default-Locale,
// der englische Feed filtert über `locale=en` und verlinkt auf /blog/en.
interface FeedConfig {
  locale?: string
  title: string
  description: string
  feedUrl: string
  itemBaseUrl: string
  language: string
}

const FEED_CONFIGS: Record<string, FeedConfig> = {
  '/feed.xml': {
    title: 'flore.nz RSS',
    description: 'RSS Feeds are not dead',
    feedUrl: 'https://blog.flore.nz/feed.xml',
    itemBaseUrl: 'https://blog.flore.nz/blog',
    language: 'de'
  },
  '/feed-en.xml': {
    locale: 'en',
    title: 'flore.nz RSS (English)',
    description: 'RSS Feeds are not dead — English articles',
    feedUrl: 'https://blog.flore.nz/feed-en.xml',
    itemBaseUrl: 'https://blog.flore.nz/blog/en',
    language: 'en'
  }
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("feed:generate", async ({ feed, options }) => {
    const config = FEED_CONFIGS[options.path];
    if (config) {
      await createBlogFeed(feed, config);
    }
  });

  async function createBlogFeed(feed: any, config: FeedConfig) {
    // Feed-Optionen setzen
    feed.options = {
      title: config.title,
      link: config.feedUrl,
      description: config.description,
      id: 'https://blog.flore.nz',
      language: config.language,
      copyright: 'Florenz',
      generator: 'Nuxt 3 with nuxt-module-feed',
      feedLinks: {
        rss2: config.feedUrl
      }
    };

    // Strapi URL aus der Umgebung oder Standard
    const BLOG_EP = process.env.STRAPI_URL || 'https://flrnz.strapi.florenz.dev';
    const localeQuery = config.locale ? `&locale=${config.locale}` : '';

    try {
      // Posts von der Strapi API abrufen
      const posts: any = await $fetch(`${BLOG_EP}/api/articles?populate=*&sort%5B0%5D=createdAt:DESC${localeQuery}`);

      // Posts zum Feed hinzufügen
      if (posts?.data) {
        posts.data.forEach((post: any) => {
          const fullContent = feedContentParsed(post);
          const cleanContent = stripHtmlAndClean(fullContent);

          // Description zusammensetzen: post.description + cleanContent
          let description = '';
          if (post.description && post.description.trim() !== '') {
            description = post.description + '\n' + cleanContent;
          } else {
            description = cleanContent;
          }

          feed.addItem({
            title: post.title,
            id: post.url || post.slug,
            link: `${config.itemBaseUrl}/${post.slug}`,
            description: description,
            content: fullContent,
            date: new Date(post.display_published_date || post.createdAt),
          });
        });

        // Items nach Datum sortieren
        feed.items.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    } catch (error) {
      console.error('Error fetching posts for RSS feed:', error);
    }

    // Contributor hinzufügen
    feed.addContributor({
      name: 'Florenz',
      email: 'moin@flore.nz',
      link: 'https://blog.flore.nz/',
    });
  }
});
