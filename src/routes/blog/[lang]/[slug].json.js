import posts from '../_posts.js';

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
    const { lang, slug } = req.params;
    
    const lookup = new Map();
    posts.forEach(post => {
        if (post.lang === lang) lookup.set(post.slug, JSON.stringify(post));
    });

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
