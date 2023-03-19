<script lang="ts">
  let activeRequest =
    '{"query": "mutation {\\n endTrace {\\n result\\n }\\n}"}';
  chrome.storage.sync.get("activeRequest", (store) => {
    console.debug("Retrieving active request: ", store.activeRequest);
    if (store.activeRequest !== undefined) {
      activeRequest = store.activeRequest;
    } else {
      chrome.storage.sync.set({ activeRequest }, () => {
        console.debug("Set active request: ", activeRequest);
      });
    }
  });

  const handleOnActiveChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    chrome.storage.sync.set({ activeRequest: target.value }, () => {
      console.debug("Set active request: ", target.value);
    });
  };

  let inactiveRequest =
    '{"query": "mutation {\\n startTrace {\\n result\\n }\\n}"}';
  chrome.storage.sync.get("inactiveRequest", (store) => {
    console.debug("Retrieving inactive request: ", store.activeRequest);
    if (store.inactiveRequest !== undefined) {
      inactiveRequest = store.inactiveRequest;
    } else {
      chrome.storage.sync.set({ inactiveRequest }, () => {
        console.debug("Set inactive request: ", inactiveRequest);
      });
    }
  });

  const handleOnInActiveChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    chrome.storage.sync.set({ inactiveRequest: target.value }, () => {
      console.debug("Set inactive request: ", target.value);
    });
  };
</script>

<main>
  <h2>HTTP Request Toggle Options</h2>
  <h4>v0.1.0</h4>

  <label for="activeRequest">Active Request</label>
  <textarea
    id="activeRequest"
    bind:value={activeRequest}
    on:input={handleOnActiveChange}
    cols="30"
  />

  <label for="inactiveRequest">Inactive Request</label>
  <textarea
    id="inactiveRequest"
    bind:value={inactiveRequest}
    on:input={handleOnInActiveChange}
  />
</main>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }

  label,
  textarea {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  textarea {
    padding: 10px;
    margin: 0 -1em;
    width: 100%;
    line-height: 1.5;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }
</style>
