type NavigationMessages = typeof import('../messages/zh-TW/Navigation.json');
type HeroMessages = typeof import('../messages/zh-TW/Hero.json');
type AboutMessages = typeof import('../messages/zh-TW/About.json');
type PortfolioMessages = typeof import('../messages/zh-TW/Portfolio.json');
type ContactMessages = typeof import('../messages/zh-TW/Contact.json');

declare interface IntlMessages {
  Navigation: NavigationMessages;
  Hero: HeroMessages;
  About: AboutMessages;
  Portfolio: PortfolioMessages;
  Contact: ContactMessages;
}
