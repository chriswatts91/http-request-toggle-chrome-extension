import Tab = chrome.tabs.Tab;

const setState = (active: boolean) => {
  console.debug(`Successfully set state to ${active}`);
  chrome.storage.sync.set({ active: !active });
  chrome.action.setIcon({
    path: active ? "img/stop-128.png" : "img/play-128.png",
  });
};

/**
 * Toggles the active state and sends the appropriate request
 *
 * @param tab The current tab
 */
const toggle = (tab: Tab) => {
  chrome.storage.sync.get(
    ["active", "activeRequest", "inactiveRequest"],
    ({ active, activeRequest, inactiveRequest }) => {
      if (!tab.url) {
        console.debug("Skipping due to no url");
        return;
      }

      const origin = new URL(tab.url).origin;
      const request = active ? inactiveRequest : activeRequest;

      console.debug("Sending request: ", request);
      fetch(`${origin}/graphql`, {
        method: "POST",
        body: request,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.debug("Request success: ", response);
          setState(active);
        })
        .catch((error) => {
          console.debug("Request error: ", error);
          setState(false);
        });
    }
  );
};

chrome.storage.sync.set({ active: false }, () => {
  console.debug("Successfully defaulted active to false");
});

chrome.commands.onCommand.addListener(() =>
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    (tabs) => toggle(tabs[0])
  )
);

chrome.action.onClicked.addListener((tab) => toggle(tab));

// Default to inactive
setState(false);

export {};
