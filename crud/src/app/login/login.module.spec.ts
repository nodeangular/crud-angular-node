import { Login\loginModule } from './login\login.module';

describe('Login\loginModule', () => {
  let login\loginModule: Login\loginModule;

  beforeEach(() => {
    login\loginModule = new Login\loginModule();
  });

  it('should create an instance', () => {
    expect(login\loginModule).toBeTruthy();
  });
});
