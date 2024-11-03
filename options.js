document.addEventListener('DOMContentLoaded', async () => {
  browser.storage.local.get(['leaderKey'], (result) => {
    const leaderKey = result.leaderKey || 'Control'

    document.getElementById('leaderKey').value = leaderKey
  })
})

document.getElementById('save').addEventListener('click', () => {
  const selectedKey = document.getElementById('leaderKey').value

  browser.storage.local.set({
    ['leaderKey']: selectedKey,
  })
})
