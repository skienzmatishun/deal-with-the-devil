export type WebsiteConfig = {
  title: string;
  description: string;
  coverImage?: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  facebook?: string;
  /**
   * full url, no username
   */
  twitter?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  /**
   * name and id of the mailchimp email field
   */
  mailchimpEmailFieldName?: string;
  /**
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;
  /**
   * Shows all post tags in main index view and post view if true
   * Otherwise only shows first (primary) tag
   */
  showAllTags: boolean;
};

const config: WebsiteConfig = {
  title: 'Deal with the Devil',
  description: 'Wrongful Conviction',
  coverImage: 'img/blog-cover.png',
  logo: 'img/ghost-logo.png',
  lang: 'en',
  siteUrl: 'https://deal-with-the-devil.com',
  facebook: 'https://www.facebook.com/dealwiththedevilblog',
  twitter: 'https://twitter.com/rippreport',
  showSubscribe: true,
  footer: '',
  showAllTags: true,
};

export default config;
