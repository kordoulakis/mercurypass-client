import { defineStore } from 'pinia'

import { getAuth, onAuthStateChanged, updateProfile, } from "firebase/auth";
import { firebaseApp } from '../services/firebaseApp';

const auth = getAuth(firebaseApp);

export const useAuth = defineStore('authentication', {
    state() {
        return {
            user: {},
        };
    },
    actions: {
        async bindUser() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user = user
                }
                else {
                    this.user = ''
                }
            });
        },
        async editDisplayName(newName) {
            await updateProfile(auth.currentUser, { displayName: newName })
        }
    },
    getters: {
        getUser() {
            if (typeof (user) != 'undefined')
                return null;
            else
                return this.user;
        },
    }
})