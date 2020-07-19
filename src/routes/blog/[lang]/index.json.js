import posts from '../_posts.js';

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  const { lang } = req.params

  const langPosts = posts.filter(el => el.lang == lang)

  const contents = JSON.stringify(langPosts.map(post => {
    return {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      printDate: post.printDate,
      lang: post.lang
    };
  }));

  res.end(contents);
}
