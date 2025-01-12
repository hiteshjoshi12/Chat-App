export const createAuthSlice = (set) => ({
    userInfo: undefined,
    setUserInfo: (userInfo) => set(() => ({ userInfo })), // Correctly set userInfo in the state
});
