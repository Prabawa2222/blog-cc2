import {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface CategoryFields extends EntrySkeletonType {
  name: EntryFieldTypes.Symbol;
  slug?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Symbol;
}

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

export interface ListCategory {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
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
