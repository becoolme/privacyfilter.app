import rss from "@astrojs/rss";
import { i18n } from "../../lib/i18n.js";
import { blogPostPath, getPostsForLocale, postSlug } from "../../lib/blog";

export async function GET(context) {
  const posts = await getPostsForLocale("en");
  const tBlog = i18n.en.blog;
  return rss({
    title: "Privacy Filter Blog",
    description: tBlog.metaDescription,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: blogPostPath("en", postSlug(post))
    })),
    customData: "<language>en</language>"
  });
}
