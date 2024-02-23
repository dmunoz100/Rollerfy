import { Firestore } from 'firebase/firestore'
import { create } from 'zustand'


interface ILoading {
    isLoad: boolean ,
    ShowLoad: () => void,
    HidenLoad: () => void,
  }

export const useLoading = create<ILoading>((set) => ({
    isLoad : false ,
    ShowLoad : () => set({isLoad:true}),
    HidenLoad : () => set({isLoad:false}),
  }))