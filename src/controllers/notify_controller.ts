import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { query, collection, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { IFirebaseRequest } from '../custom/dto/firebase_request';
import { IFirebaseResponse } from '../custom/response/firebase_response';

const firebaseConfig = {
  apiKey: 'AIzaSyDCxebpiUJ75-d2dwuNFLjdJR25uFeOOMs',
  authDomain: 'bithubby-notifier.firebaseapp.com',
  projectId: 'bithubby-notifier',
  storageBucket: 'bithubby-notifier.appspot.com',
  messagingSenderId: '524522615509',
  appId: '1:524522615509:web:cbe8c00c49ab53f6aae85c',
  measurementId: 'G-MX1ZBTPN3V',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = 'devices';
const apiKey =
  'AAAAeh_78tU:APA91bEwwyAv6hnkA886X0j4J6N19pA3b-3zoFcQGQpc4uAvTEz9kpb55d2jTxpjxYYa5bPk0pQGWP7WRYe0rUVod1cn9g9Zphm_S-N62Y8QOyCZB6XhoScpUHpNlcTlrhBEtX1f-WL8';

export default class NotifyController {
  async post(request: IFirebaseRequest): Promise<void> {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      request.to = doc.data().firebase_token;

      const data = JSON.stringify(request);
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
          Authorization: `key=${apiKey}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      await axios.request<IFirebaseRequest, IFirebaseResponse>(config);
    });
  }
}
