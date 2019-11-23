 
 import { mount } from '@vue/test-utils';
 import Stories from '../Stories.vue';

 describe( 'Stories', () => {
  test('is a vue instance', () => {
    const wrapper = mount( Stories );
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
 });


