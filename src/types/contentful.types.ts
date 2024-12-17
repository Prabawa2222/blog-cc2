import {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface BlogPostFields extends EntrySkeletonType {
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  excerpt?: EntryFieldTypes.Symbol;
  content?: EntryFieldTypes.RichText;
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  category?: Entry<CategoryFields>;
  publishDate?: EntryFieldTypes.Date;
}

export interface BlogPostAsset {
  sys: {};
  fields: {
    file: {
      url: string;
      details?: any;
      filename?: string;
      contentType?: string;
    };
  };
}

export interface CategoryFields extends EntrySkeletonType {
  name: EntryFieldTypes.Symbol;
  slug?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Symbol;
}

export type ListCategory = Entry<CategoryFields>;

export interface CategoryPost {
  sys: {
    id: string;
  };
  fields: {
    title: string | null;
    slug: string | null;
    category: {
      fields: {
        name: string | null;
      };
    } | null;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    } | null;
    publishDate: string | null;
  };
}

export type TypeBlogPostSkeleton = EntrySkeletonType<
  BlogPostFields,
  "blogspot"
>;

export type TypeBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
