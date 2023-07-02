import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
    getFirestore,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    addDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBxjxOfpm7wbkW-ucTK4PVIG-yIi6RZ8T4",
    authDomain: "ai-chat-2-97136.firebaseapp.com",
    projectId: "ai-chat-2-97136",
    storageBucket: "ai-chat-2-97136.appspot.com",
    messagingSenderId: "254616921605",
    appId: "1:254616921605:web:b90f2c20b313e6acf7de6c",
    measurementId: "G-NTRH4F8EGL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);





async function loginWithGoogle() {
    try {

        const auth = getAuth();

        const { user } = await signInAnonymously(auth);

        return { uid: user.uid, displayName: user.displayName };
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }
        return null;
    }
}

async function sendAMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }

}


function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
            }));

            callback(messages);
        }
    );
}

export { loginWithGoogle, sendAMessage, getMessages };
