/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_EMAILJS_SERVICE_ID?: string;
  readonly PUBLIC_EMAILJS_TEMPLATE_ID?: string;
  readonly PUBLIC_EMAILJS_PUBLIC_KEY?: string;
  readonly PUBLIC_EMAILJS_TO_EMAIL?: string;
  readonly TIKTOK_USERNAME?: string;
  readonly TIKTOK_TOP_N?: string;
  readonly NOMINATIM_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
