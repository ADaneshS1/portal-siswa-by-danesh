import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ppqita:santri@ppqitadb.dada60q.mongodb.net/portal-siswa', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }) 
  } catch (error) {
      console.log(error);
  }
};

connectionDB();

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  nis: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  token: {
    type: String,
    default:'',
  }
});

const User = mongoose.model("user", userSchema);

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
          return res.status(405).json({ error: true, message: 'mehtod tidak diijinkan' });
        }
    
        const { token } = req.body;
    
        if (!token) {
          return res.status(400).json({ error: true, message: 'tidak ada token' });
        }
        
        const user = await User.findOne({ token });
        console.log('user: ', user);
    
        if (!user || !user.nis) {
          return res.status(400).json({
            error: false,
            message: 'token tidak valid atau sudah logout',
          });
        }
    
        // delete token
        const users = await User.findOneAndUpdate(
          { nis: user.nis },
          { token: '' },
          { new: true }
        );
        console.log('users after update: ', users);
    
        // kasih tahu client (hanya data yg diperbolehkan)
        return res.status(200).json({ error: false, message: 'berhasil logout' });
      } catch (error) {
        console.log('error:', error);
        res.status(500).json({ error: true, message: 'ada masalah harap hubungi developer' });
      }
}