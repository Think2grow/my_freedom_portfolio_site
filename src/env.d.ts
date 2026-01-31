/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE?: string;
  readonly PUBLIC_SITE_NAME?: string;
  readonly SHEET_PORTFOLIO_ID?: string;
  readonly SHEET_PORTFOLIO_GID?: string;
  readonly SHEET_ETF_ID?: string;
  readonly SHEET_ETF_GID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
