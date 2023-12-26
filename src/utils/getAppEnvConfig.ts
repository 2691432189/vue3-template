interface GlobEnvConfig {
    VITE_DOME_API_URL: any
}

export default () => {
    return ( import.meta.env as unknown ) as GlobEnvConfig
}