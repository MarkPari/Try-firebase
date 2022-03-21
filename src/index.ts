import express, {Request} from "express";
import firebaseConfig from "./config/config";
// import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { collection, doc, setDoc, getDoc, getFirestore  } from "firebase/firestore"; 
import { getFirestore }  from "firebase-admin/firestore";
import { initializeApp, cert } from "firebase-admin/app";
import { formatCollection } from './utils';
import { Books } from "./interfaces/interfaces";

const serviceAccount = require('./cre.json');

const cors = require('cors');

initializeApp({credential: cert(serviceAccount)});

const app = express();
const port='3004';



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// initializeApp(firebaseConfig);
//const analytics = getAnalytics(init);
const db = getFirestore();

interface QueryModel {
    title: string,
    author: string
}

app.get('/prova', async({query: {title, author}}: Request<{},{},{},QueryModel>, res)=> {
    const books = db.collection("Books");
    // const filtTitle = title ? formatCollection(await books.where("title", ">=", title).where("title", "<=", title + "~").get()) : [];
    // const filtAuthor = author ? formatCollection(await books.where("author", ">=", author).where("author", "<=", author + "~").get()) : [];
    
    // const result = [...filtTitle, ...filtAuthor]

    // const unique2 = result.map(({id}) => id).filter((elem, index, self) => index === self.indexOf(elem));
    
    // const newResult = unique2.reduce((acc, item) => {
    //     const filter = result.filter(element=> element.id===item);
    //     const ord = {...filter[0]};
    //     return [...acc, ord]
    // }, []);
    
    // const t = newResult.filter((element: any) => element.title.includes(title) && element.author.includes(author));
    let resp = formatCollection<Books>(await books.get());
    title && (resp = resp.filter(({title: ETitle}) => ETitle.includes(title)));
    author && (resp = resp.filter(({author: EAuthor}) => EAuthor.includes(author)));

    // const resp = (!title && !author) ? formatCollection(await books.get()) : [];
    
    return res.json(resp);  
    
})

app.post('/prova/:id', async({body: {title, author}, params: {id}}, res)=> {
    const docRef = db.collection('Books').doc(id);
        await docRef.set({
        title: title,
        author: author
    });

    res.json({message: "hai aggiunto un libro"})
});

app.post('/prova', async({body: {title, author}}, res)=> {
    const resp = formatCollection<Books>(await db.collection("Books").get());
    const max = Math.max(...resp.map(({id}) => Number(id)) as number[]) + 1;
    const docRef = db.collection('Books').doc(String(max));
        await docRef.set({
        title: title,
        author: author
    });

    res.json({message: "hai aggiunto un libro"})
})

app.listen(port, ()=>console.log('Server listen on port: '+ port));