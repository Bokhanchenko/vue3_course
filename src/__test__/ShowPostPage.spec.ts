import {mount} from '@vue/test-utils';
import ShowPostPage from "../ShowPostPage.vue";
import * as mockData from "../service/mocks";
import {createStore, initialState} from "../service/store";
import {makeRouter} from "../service/router";
import flushPromises from "flush-promises";

jest.mock('axios', () => ({
  get: (url: string) => ({
    data: [mockData.todayPost]
  })
}))

const createShowPostPage = async (options?: any) => {
  const store = createStore(options?.initState)
  const router = makeRouter()
  await router.push({ name: 'post', params: { id: options?.pageId || '1' } })

  return mount(ShowPostPage, {
    global: {
      provide: { store },
      plugins: [router]
    }
  })
}

describe('ShowPostPage', () => {
  it('does not render an edit link when no user is logged in', async () => {
    const wrapper = await createShowPostPage();
    await flushPromises()
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false)
  })

  it('does not render an edit link when not authorized', async () => {
    const options = {
      initState: {
        ...initialState(),
        authors: {
          ...initialState().authors,
          currentUserId: '2'
        }
      }
    }
    const wrapper = await createShowPostPage(options);

    await flushPromises()

    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false)
  })

  it('does render an edit link when authorized', async () => {
    const options = {
      initState: {
        ...initialState(),
        authors: {
          ...initialState().authors,
          currentUserId: '1'
        }
      }
    }
    const wrapper = await createShowPostPage(options);

    await flushPromises()

    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(true)
  })
});
