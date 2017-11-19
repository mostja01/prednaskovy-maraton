import { NgrxFirePage } from './app.po';

describe('ngrx-fire App', () => {
  let page: NgrxFirePage;

  beforeEach(() => {
    page = new NgrxFirePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
