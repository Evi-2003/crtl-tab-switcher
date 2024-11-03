let hasRan = 0
let matchedDomains = []
let latestClickedLetter

browser.runtime.onMessage.addListener(async (message) => {
  if (message.action === 'switchToTab' && message.letter) {
    const letter = message.letter

    try {
      const tabs = await browser.tabs.query({})

      for (const tab of tabs) {
        const url = new URL(tab.url)
        const cleanDomain = url.hostname.replace(/^www\./, '')

        if (cleanDomain.startsWith(letter)) {
          matchedDomains.push(tab.id)
        }
      }
    } catch (error) {
      console.error(error)
    }

    const activeTab = await browser.tabs.query({ active: true })

    if (latestClickedLetter === letter) {
      if (activeTab.at(0).id === matchedDomains.at(hasRan)) {
        hasRan += 1
      }

      await browser.tabs.update(matchedDomains.at(hasRan), {
        active: true,
      })

      hasRan += 1

      if (hasRan === matchedDomains.length) {
        hasRan = 0
      }
    } else {
      if (activeTab.at(0).id === matchedDomains.at(0)) {
        await browser.tabs.update(matchedDomains.at(1), { active: true })
        hasRan += 1
        latestClickedLetter = letter

        return
      }

      await browser.tabs.update(matchedDomains.at(0), { active: true })
      latestClickedLetter = letter

      hasRan = 0
    }

    matchedDomains = []
  }
})
