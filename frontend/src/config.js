
const config = {
    devlopment: {
        backendUrl: 'http://localhost:5000',
    },
    qa: {},
    production: {}
}

const getConfig = () => {
    const environ = import.meta.env.VITE_ENVIRON || 'development';
    return config[environ] || {};
}

export default getConfig;