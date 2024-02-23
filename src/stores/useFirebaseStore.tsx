import { Firestore } from 'firebase/firestore'
import { create } from 'zustand'


interface IFirebaseStore {
    bd: Firestore | null,
    setbd: (bd:Firestore) => void
  }

export const useFirebaseStore = create<IFirebaseStore>((set) => ({
    bd: null,
    setbd: (bd:Firestore) => set({bd:bd})
  }))