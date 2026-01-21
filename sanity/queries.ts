export const pageBySlugQuery = `
*[_type in ["page", "useCase"] && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  seo{
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage
  },
  hero{
    _type,
    eyebrow,
    headline,
    subheadline,
    badge,
    "primaryCta": select(defined(primaryCta) => {
      "label": primaryCta.label,
      "variant": primaryCta.variant,
      "href": select(
        defined(primaryCta.anchor) => select(
          defined(primaryCta.href) || defined(primaryCta.externalHref) => coalesce(primaryCta.href, primaryCta.externalHref) + "#" + primaryCta.anchor,
          true => select(primaryCta.pageRef->slug.current == "home" => "/", "/" + primaryCta.pageRef->slug.current) + "#" + primaryCta.anchor
        ),
        true => select(
          defined(primaryCta.href) || defined(primaryCta.externalHref) => coalesce(primaryCta.href, primaryCta.externalHref),
          true => select(primaryCta.pageRef->slug.current == "home" => "/", "/" + primaryCta.pageRef->slug.current)
        )
      )
    }, true => primaryCta),
    "secondaryCta": select(defined(secondaryCta) => {
      "label": secondaryCta.label,
      "variant": secondaryCta.variant,
      "href": select(
        defined(secondaryCta.anchor) => select(
          defined(secondaryCta.href) || defined(secondaryCta.externalHref) => coalesce(secondaryCta.href, secondaryCta.externalHref) + "#" + secondaryCta.anchor,
          true => select(secondaryCta.pageRef->slug.current == "home" => "/", "/" + secondaryCta.pageRef->slug.current) + "#" + secondaryCta.anchor
        ),
        true => select(
          defined(secondaryCta.href) || defined(secondaryCta.externalHref) => coalesce(secondaryCta.href, secondaryCta.externalHref),
          true => select(secondaryCta.pageRef->slug.current == "home" => "/", "/" + secondaryCta.pageRef->slug.current)
        )
      )
    }, true => secondaryCta),
    dataDictionary{
      enabled,
      buttonText,
      title,
      description,
      csvFile{
        asset->{
          url
        }
      }
    }
  },
  sections[]{
    _key,
    _type,
    ...,
    anchor,
    "selectedAnchors": select(
      _type == "section.anchorLinks" => selectedAnchors,
      true => []
    ),
    "csvFile": select(
      _type == "section.dataDictionary" => csvFile {
        asset->{
          url
        }
      },
      true => csvFile
    ),
    // Normalize common CTA shapes present in various sections
    "primaryCta": select(defined(primaryCta) => {
      "label": primaryCta.label,
      "variant": primaryCta.variant,
      "href": select(
        defined(primaryCta.anchor) => select(
          defined(primaryCta.href) || defined(primaryCta.externalHref) => coalesce(primaryCta.href, primaryCta.externalHref) + "#" + primaryCta.anchor,
          true => select(primaryCta.pageRef->slug.current == "home" => "/", "/" + primaryCta.pageRef->slug.current) + "#" + primaryCta.anchor
        ),
        true => select(
          defined(primaryCta.href) || defined(primaryCta.externalHref) => coalesce(primaryCta.href, primaryCta.externalHref),
          true => select(primaryCta.pageRef->slug.current == "home" => "/", "/" + primaryCta.pageRef->slug.current)
        )
      )
    }, true => primaryCta),
    "secondaryCta": select(defined(secondaryCta) => {
      "label": secondaryCta.label,
      "variant": secondaryCta.variant,
      "href": select(
        defined(secondaryCta.anchor) => select(
          defined(secondaryCta.href) || defined(secondaryCta.externalHref) => coalesce(secondaryCta.href, secondaryCta.externalHref) + "#" + secondaryCta.anchor,
          true => select(secondaryCta.pageRef->slug.current == "home" => "/", "/" + secondaryCta.pageRef->slug.current) + "#" + secondaryCta.anchor
        ),
        true => select(
          defined(secondaryCta.href) || defined(secondaryCta.externalHref) => coalesce(secondaryCta.href, secondaryCta.externalHref),
          true => select(secondaryCta.pageRef->slug.current == "home" => "/", "/" + secondaryCta.pageRef->slug.current)
        )
      )
    }, true => secondaryCta),
    "cta": select(defined(cta) => {
      "label": cta.label,
      "variant": cta.variant,
      "href": select(
        defined(cta.anchor) => select(
          defined(cta.href) || defined(cta.externalHref) => coalesce(cta.href, cta.externalHref) + "#" + cta.anchor,
          true => select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current) + "#" + cta.anchor
        ),
        true => select(
          defined(cta.href) || defined(cta.externalHref) => coalesce(cta.href, cta.externalHref),
          true => select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current)
        )
      )
    }, true => cta),
    // Nested left/right objects with CTAs
    "left": select(defined(left) => left{
      ...,
      "cta": select(defined(cta) => {
        "label": cta.label,
        "variant": cta.variant,
        "href": select(
          defined(cta.anchor) => select(
            defined(cta.href) || defined(cta.externalHref) => coalesce(cta.href, cta.externalHref) + "#" + cta.anchor,
            true => select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current) + "#" + cta.anchor
          ),
          true => select(
            defined(cta.href) || defined(cta.externalHref) => coalesce(cta.href, cta.externalHref),
            true => select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current)
          )
        )
      }, true => cta)
    }, true => left),
    "right": select(defined(right) => right{
      ...,
      "cta": select(defined(cta) => {
        "label": cta.label,
        "variant": cta.variant,
        "href": select(
          defined(cta.anchor) => select(
            defined(cta.href) || defined(cta.externalHref) => coalesce(cta.href, cta.externalHref) + "#" + cta.anchor,
            true => select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current) + "#" + cta.anchor
          ),
          true => select(
            defined(cta.href) || defined(cta.externalHref) => coalesce(cta.href, cta.externalHref),
            true => select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current)
          )
        )
      }, true => cta)
    }, true => right),
    "center": select(defined(center) => center{
      ...,
      "cta": select(defined(cta) => {
        "label": cta.label,
        "variant": cta.variant,
        "href": select(
          defined(cta.anchor) => select(
            defined(cta.href) || defined(cta.externalHref) => coalesce(cta.href, cta.externalHref) + "#" + cta.anchor,
            true => select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current) + "#" + cta.anchor
          ),
          true => select(
            defined(cta.href) || defined(cta.externalHref) => coalesce(cta.href, cta.externalHref),
            true => select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current)
          )
        )
      }, true => cta)
    }, true => center),
    // Arrays of cards with inner CTA
    "cards": select(defined(cards) => cards[]{
      ...,
      "cta": select(defined(cta) => {
        "label": cta.label,
        "variant": cta.variant,
        "href": select(
          defined(cta.anchor) => select(
            defined(cta.href) || defined(cta.externalHref) => coalesce(cta.href, cta.externalHref) + "#" + cta.anchor,
            true => select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current) + "#" + cta.anchor
          ),
          true => select(
            defined(cta.href) || defined(cta.externalHref) => coalesce(cta.href, cta.externalHref),
            true => select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current)
          )
        )
      }, true => cta)
    }, true => cards),
    // documentList sections
    "documents": select(defined(documents) => documents[]{
      ...,
      "cta": select(defined(cta) => {
        "label": cta.label,
        "variant": cta.variant,
        "href": coalesce(
          cta.href,
          cta.externalHref,
          select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current)
        )
      }, true => cta)
    }, true => documents),
    // nested features inside grids
    "features": select(defined(features) => features[]{
      ...,
      "cta": select(defined(cta) => {
        "label": cta.label,
        "variant": cta.variant,
        "href": coalesce(
          cta.href,
          cta.externalHref,
          select(cta.pageRef->slug.current == "home" => "/", "/" + cta.pageRef->slug.current)
        )
      }, true => cta)
    }, true => features)
  }
}
`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  logo,
  tagline,

  navLinks[]{
    label,
    "href": select(
      defined(anchor) => select(
        defined(href) || defined(externalHref) => coalesce(href, externalHref) + "#" + anchor,
        true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current) + "#" + anchor
      ),
      true => select(
        defined(href) || defined(externalHref) => coalesce(href, externalHref),
        true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
      )
    ),
    children[]{
      label,
      "href": select(
        defined(anchor) => select(
          defined(href) || defined(externalHref) => coalesce(href, externalHref) + "#" + anchor,
          true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current) + "#" + anchor
        ),
        true => select(
          defined(href) || defined(externalHref) => coalesce(href, externalHref),
          true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
        )
      )
    }
  },

  // Legacy (keep)
  footerLinks[]{
    label,
    "href": select(
      defined(anchor) => select(
        defined(href) || defined(externalHref) => coalesce(href, externalHref) + "#" + anchor,
        true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current) + "#" + anchor
      ),
      true => select(
        defined(href) || defined(externalHref) => coalesce(href, externalHref),
        true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
      )
    )
  },

  // NEW: footer content + grouped footer links
  footerAbout,
  securityEmail,
  copyright,

  productLinks[]{
    label,
    "href": select(
      defined(anchor) => select(
        defined(href) || defined(externalHref) => coalesce(href, externalHref) + "#" + anchor,
        true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current) + "#" + anchor
      ),
      true => select(
        defined(href) || defined(externalHref) => coalesce(href, externalHref),
        true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
      )
    )
  },

  trustLinks[]{
    label,
    "href": select(
      defined(anchor) => select(
        defined(href) || defined(externalHref) => coalesce(href, externalHref) + "#" + anchor,
        true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current) + "#" + anchor
      ),
      true => select(
        defined(href) || defined(externalHref) => coalesce(href, externalHref),
        true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
      )
    )
  },

  companyLinks[]{
    label,
    "href": select(
      defined(anchor) => select(
        defined(href) || defined(externalHref) => coalesce(href, externalHref) + "#" + anchor,
        true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current) + "#" + anchor
      ),
      true => select(
        defined(href) || defined(externalHref) => coalesce(href, externalHref),
        true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
      )
    )
  },

  primaryCta{
    label,
    variant,
    "href": select(
      defined(href) || defined(externalHref) => coalesce(href, externalHref),
      true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    ),
    anchor
  },

  secondaryCta{
    label,
    variant,
    "href": select(
      defined(href) || defined(externalHref) => coalesce(href, externalHref),
      true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    ),
    anchor
  },

  portalCta{
    label,
    variant,
    "href": select(
      defined(href) || defined(externalHref) => coalesce(href, externalHref),
      true => select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    ),
    anchor
  },

  social
}`;

export const allBlogPostsQuery = `
*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "tags": tags[],
  "imageUrl": image.asset->url
}
`;

export const blogPostBySlugQuery = `
*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url
    }
  },
  tags,
  seo
}
`;
