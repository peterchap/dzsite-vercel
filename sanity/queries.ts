export const pageBySlugQuery = `
*[_type in ["page", "pricingPage", "useCase"] && slug.current == $slug][0]{
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
    primaryCta{
      label,
      variant,
      "href": coalesce(
        href,
        externalHref,
        select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
      )
    },
    secondaryCta{
      label,
      variant,
      "href": coalesce(
        href,
        externalHref,
        select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
      )
    },
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
      "href": coalesce(
        primaryCta.href,
        primaryCta.externalHref,
        select(primaryCta.pageRef->slug.current == "home" => "/", "/" + primaryCta.pageRef->slug.current)
      )
    }, true => primaryCta),
    "secondaryCta": select(defined(secondaryCta) => {
      "label": secondaryCta.label,
      "variant": secondaryCta.variant,
      "href": coalesce(
        secondaryCta.href,
        secondaryCta.externalHref,
        select(secondaryCta.pageRef->slug.current == "home" => "/", "/" + secondaryCta.pageRef->slug.current)
      )
    }, true => secondaryCta),
    // Nested left/right objects with CTAs
    "left": select(defined(left) => left{
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
    }, true => left),
    "right": select(defined(right) => right{
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
    }, true => right),
    // Arrays of cards with inner CTA
    "cards": select(defined(cards) => cards[]{
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
    "href": coalesce(
      href,
      externalHref,
      select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    )
  },

  // Legacy (keep)
  footerLinks[]{
    label,
    "href": coalesce(
      href,
      externalHref,
      select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    )
  },

  // NEW: footer content + grouped footer links
  footerAbout,
  securityEmail,
  copyright,

  productLinks[]{
    label,
    "href": coalesce(
      href,
      externalHref,
      select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    )
  },

  trustLinks[]{
    label,
    "href": coalesce(
      href,
      externalHref,
      select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    )
  },

  companyLinks[]{
    label,
    "href": coalesce(
      href,
      externalHref,
      select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    )
  },

  primaryCta{
    label,
    variant,
    "href": coalesce(
      href,
      externalHref,
      select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    )
  },

  secondaryCta{
    label,
    variant,
    "href": coalesce(
      href,
      externalHref,
      select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    )
  },

  portalCta{
    label,
    variant,
    "href": coalesce(
      href,
      externalHref,
      select(pageRef->slug.current == "home" => "/", "/" + pageRef->slug.current)
    )
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
