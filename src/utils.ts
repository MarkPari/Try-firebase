export const formatCollection  = (collection: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
    const data: Record<any, any>[] = [];
    collection.forEach((doc) => {
        data.push({id:doc.id, ...doc.data()});
    });
    return data;
}

// export const concatCollection = (dat: FirebaseFirestore.Firestore,) => {
//     const db = 
// }


