import { IngressoTopPortalPage } from './app.po';

describe('ingresso-top-portal App', () => {
  let page: IngressoTopPortalPage;

  beforeEach(() => {
    page = new IngressoTopPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
