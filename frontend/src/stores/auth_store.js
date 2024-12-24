import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const token = ref('')
    const expiresAt = ref(0)
    const router = useRouter()

    function handleLogin(newToken, newExpiresAt) {
        try {
            if (!newToken || !newExpiresAt) {
                throw new Error("Missing token or expiry date")
            }

            console.log("Login data:", newToken, newExpiresAt)

            // Ensure `newExpiresAt` is a valid timestamp
            const expiryTimestamp = typeof newExpiresAt === 'string' ? Date.parse(newExpiresAt) : newExpiresAt;

            if (isNaN(expiryTimestamp)) {
                throw new Error("Invalid expiry date format");
            }

            token.value = newToken // Set the new token
            expiresAt.value = expiryTimestamp // Set the new expiry time as timestamp
            isAuthenticated.value = true // Mark user as authenticated
            return true
        } catch (error) {
            console.error("Error during login:", error)
            return false
        }
    }

    function logout() {
        isAuthenticated.value = false
        token.value = '' // Clear token
        expiresAt.value = 0 // Reset expiry date

    }

    // Standalone Timeout to Check Expiry
    function checkTokenExpiry() {
        setInterval(() => {
            if (isAuthenticated.value && expiresAt.value) {
                const currentTime = Date.now()
                const timeDiff = expiresAt.value - currentTime;

                if (timeDiff <= 0) {
                    console.warn("Token expired. Logging out.")
                    logout()
                    router.push({ name: "AuthHome" });
                } else {
                    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                    console.log(`Time Remaining: ${hours}h ${minutes}m ${seconds}s`);
                }
            }
        }, 30011) // Check every 30 seconds approximately
    }

    // Watcher to start standalone expiry check automatically
    watch(
        isAuthenticated,
        (newValue, oldValue) => {
            if (newValue && !oldValue) {
                checkTokenExpiry() // Start expiry check when user logs in
            }
        }
    )

    return {
        isAuthenticated,
        handleLogin,
        logout,
        token,
        expiresAt, // Export `expiresAt` for debugging if needed
    }
})
