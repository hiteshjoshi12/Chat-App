import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";
import { createChatSlice } from "./slices/ChatSlice";

export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));
