import { PlanovanieSluziebPage } from './app.po';

describe('planovanie-sluzieb App', function() {
  let page: PlanovanieSluziebPage;

  beforeEach(() => {
    page = new PlanovanieSluziebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
