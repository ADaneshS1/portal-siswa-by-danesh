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
        const { NIS, password } = req.body;
        const user = await User.findOne({ NIS });
    
        if (!user || !(await bcrypt.compare(password, user.password)) || user.status !== 'aktif') {
          return res.status(401).json({ message: 'Login gagal.' });
        }
    
        const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
        user.token = token;
        await user.save();
    
        res.json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat login.' });
      }
}