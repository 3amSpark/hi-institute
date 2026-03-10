/// <reference types="astro/client" />

interface GlassixWidgetClientInstance {
  attach(): void;
  getIframeUri(): Promise<string>;
}

interface GlassixWidgetClientConstructor {
  new (options: GlassixWidgetOptions): GlassixWidgetClientInstance;
}

interface GlassixWidgetOptions {
  apiKey: string;
  snippetId: string;
}

interface Window {
  GlassixWidgetClient: GlassixWidgetClientConstructor | undefined;
  widgetClient: GlassixWidgetClientInstance | undefined;
  widgetOptions: GlassixWidgetOptions | undefined;
}
