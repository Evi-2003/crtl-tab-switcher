document.addEventListener('keydown', (event) => {
  if (event.ctrlKey) {
    event.preventDefault()
  }

  const isLeaderKeyPressed = event.ctrlKey

  if (isLeaderKeyPressed && event.key.length === 1 && /^[a-z]$/i.test(event.key.toLowerCase())) {
    const letter = event.key.toLowerCase()

    browser.runtime.sendMessage({ action: 'switchToTab', letter })
  }
})
