import { RouterdemnoPage } from './app.po';

describe('routerdemno App', function() {
  let page: RouterdemnoPage;

  beforeEach(() => {
    page = new RouterdemnoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
