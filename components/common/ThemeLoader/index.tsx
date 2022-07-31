import { store } from '%/store/index'

store.subscribe(() => {
  const state = store.getState()

  if(state.theme.theme === 'dark') {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
})
