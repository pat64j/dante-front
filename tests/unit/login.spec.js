import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Login from '@/views/Login.vue';


describe('Login.vue', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    wrapper = shallowMount(Login, {
      localVue,
    });
  });

  it('should render the title and the login button', () => {
    // to make sure we are free from vuetify components in our tests, use data-testid attributes to search for elements
    // expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('[data-testid="second-lower"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="login-button"]').exists()).toBe(true);
  });

});