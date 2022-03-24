import { Books } from './interfaces/interfaces';
import { collection } from 'firebase/firestore';

export const formatCollection = <T>(collection: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>)  => {
    const data: (T & {id: string})[] = collection.docs.map((doc) => {
        return {id: doc.id,...doc.data() as T};
    });
    return data;
}




