// persistPlugin.js
export function createPersistPlugin() {
    return ({ store }) => {
        // Load stored state on initialization
        const savedState = sessionStorage.getItem(store.$id)
        if (savedState) {
            store.$patch(JSON.parse(savedState))
        }

        // Save the state every 5 seconds
        setInterval(() => {
            sessionStorage.setItem(store.$id, JSON.stringify(store.$state))
        }, 5003)
    }
}
