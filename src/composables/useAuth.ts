import { ref } from 'vue'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDocs, or, query, setDoc, where } from 'firebase/firestore'
import type { IUser } from '@/types'

export const useAuth = () => {
  const authError = ref<Nullable<string>>(null)

  const signUp = async (email: string, password: string, fullname: string, username: string) => {
    authError.value = null

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const userData = {
        email,
        fullname,
        username,
        avatar: '',
        bio: '',
        insight: { followersCount: 0, followingCount: 0, postsCount: 0 },
        search: {
          lowerUsername: username.toLowerCase(),
          lowerFullname: fullname.toLowerCase()
        }
      }

      await setDoc(doc(db, 'users', userCredential.user.uid), userData)

      return {
        id: userCredential.user.uid,
        ...userData
      } as IUser
    } catch (error: any) {
      let message = ''
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Email inválido.'
          break
        case 'auth/missing-password':
          message = 'No has introducido una contraseña.'
          break
        case 'auth/weak-password':
          message = 'Si la contraseña es débil, cámbiela por una contraseña más segura.'
          break
        case 'auth/email-already-in-use':
          message = 'Otra cuenta comparte el mismo correo electrónico.'
          break
      }
      authError.value = message
    }
  }

  const getUserInLogin = async (username: string, password: string): Promise<Nullable<IUser>> => {
    try {
      let user: Nullable<IUser> = null
      const querySnapshot = await getDocs(
        query(
          collection(db, 'users'),
          or(
            where('username', '==', username),
            where('phoneNumber', '==', username),
            where('email', '==', username)
          )
        )
      )

      if (querySnapshot.empty) {
        return null
      } else {
        querySnapshot.forEach((doc) => {
          user = {
            id: doc.id,
            ...doc.data()
          } as IUser
        })

        await signInWithEmailAndPassword(auth, user!.email as string, password)

        return user
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

  return { authError, signUp, getUserInLogin }
}
