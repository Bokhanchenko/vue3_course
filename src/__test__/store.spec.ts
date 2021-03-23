import {State, initialState, createStore} from "../service/store"
import {Post} from "../service/types"
import moment from 'moment'

const mockPost: Post = {
  id: 1,
  authorId: 1,
  html: '<p>markdown</p>',
  markdown: 'Hello',
  created: moment(),
  title: 'Test Post'
}

jest.mock('axios', () => ({
  get: () => {
    return {
      data: [mockPost]
    }
  }
}))

describe('fetchPost', () => {
  it('fetches posts and updates the store', async () => {
    const expected: State = {
      ...initialState(),
      posts: {
        ...initialState().posts,
        all: { 1: mockPost },
        ids: [String(mockPost.id)],
        loaded: true
      }
    }

    const store = createStore()
    await store.fetchPosts()

    expect(store.getState()).toEqual(expected)
  })
});
