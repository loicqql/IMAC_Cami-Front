export const useSocket = () => {
  const ctx = useNuxtApp();
  return ctx.$nuxtSocket({persist: 'main', reconnection: true});
}
