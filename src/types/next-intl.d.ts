type NavigationMessages = typeof import('../content/locales/zh-TW/Navigation.json');
type HeroMessages = typeof import('../content/locales/zh-TW/Hero.json');
type AboutMessages = typeof import('../content/locales/zh-TW/About.json');
type PortfolioMessages = typeof import('../content/locales/zh-TW/Portfolio.json');
type ContactMessages = typeof import('../content/locales/zh-TW/Contact.json');
type PersonalMessages = typeof import('../content/locales/zh-TW/Personal.json');

declare interface IntlMessages {
  Navigation: NavigationMessages;
  Hero: HeroMessages;
  About: AboutMessages;
  Portfolio: PortfolioMessages;
  Contact: ContactMessages;
  Personal: PersonalMessages;
}
