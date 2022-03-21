import { Books } from './interfaces/interfaces';
import { collection } from 'firebase/firestore';

export const formatCollection = <T>(collection: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>)  => {
    const data: (T & {id: string})[] = collection.docs.map((doc) => {
        return {id: doc.id,...doc.data() as T};
    });
    return data;
}


// class Post {
//     constructor(readonly title: string, readonly author: string) {}
  
//     toString(): string {
//       return this.title + ', by ' + this.author;
//     }
//   }
  
//   const postConverter = {
//     toFirestore(post: Post): firebase.firestore.DocumentData {
//       return {title: post.title, author: post.author};
//     },
//     fromFirestore(
//       snapshot: firebase.firestore.QueryDocumentSnapshot,
//       options: firebase.firestore.SnapshotOptions
//     ): Post {
//       const data = snapshot.data(options)!;
//       return new Post(data.title, data.author);
//     }
//   };
  
//   const postSnap = await firebase.firestore()
//     .collection('posts')
//     .withConverter(postConverter)
//     .doc().get();
//   const post = postSnap.data();
//   if (post !== undefined) {
//     post.title; // string
//     post.toString(); // Should be defined
//     post.someNonExistentProperty; // TS error
//   }
// export const concatCollection = (dat: FirebaseFirestore.Firestore,) => {
//     const db = 
// }


