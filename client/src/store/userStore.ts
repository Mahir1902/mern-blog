import {create} from 'zustand'


type UserStore = {
  username: string | null
  setUsername: (username: string | null) => void
}


export const useUserStore = create<UserStore>((set) => ({
    username: null,
    setUsername: (username) => set({username}),
}))