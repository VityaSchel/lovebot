import scrollIntoView from 'scroll-into-view-if-needed'

export default function addListener() {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1)
    const hashTargets = {
      'description': 'description',
      'author': 'author',
      'buy': 'buy'
    }
    if (!Object.keys(hashTargets).includes(hash)) return
    // @ts-expect-error
    const target = document.getElementById(hashTargets[hash])
    if (!target) return
    scrollIntoView(target, {
      scrollMode: 'always',
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    })
  })
}
