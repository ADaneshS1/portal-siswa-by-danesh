import mongoose from "mongoose";
import uuid from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const url = 'mongodb+srv://ppqita:santri@ppqitadb.dada60q.mongodb.net/';
let myCollection, myClient;

const initDB = async () => {
    try {
        const { collection, client } = await connectionDB(url,"portal-siswa","users"
        );
        myCollection = collection;
        myClient = client;
        console.log("Server DB berjalan");
    } catch (error) {
        console.log(error);
    }
};

const connectionDB = async (uri, dbName, collectionName) => {
  const client = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
  });

  const collection = client.connection.collection(collectionName);

  return { collection, client };
};

initDB();

const userSchema = new mongoose.Schema({
  id: String,
  nama: String,
  NIS: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
  token: String,
  status: { type: String, default: 'aktif' },
  role: { type: String, default: 'siswa' },
});

const User = mongoose.model("User", userSchema);

export default async function handler(req, res) {
    try {
        const { nama, NIS, password } = req.body;
    
        if (nama.length < 3 && nama.length > 20) {
          return res.status(400).json({ message: 'Nama harus memiliki 3-20 karakter.' });
        }
    
        if (NIS.length !== 5) {
          return res.status(400).json({ message: 'NIS harus memiliki 5 karakter.' });
        }
    
        if (password.length < 6 || password.length > 14) {
          return res.status(400).json({ message: 'Password harus memiliki 6-14 karakter.' });
        }
    
        const id = uuid.v4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ id, nama, NIS, password: hashedPassword });
        await user.save();
    
        res.status(201).json({ message: 'Pendaftaran berhasil.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mendaftar.' });
      }
}