import styles from "@/styles/login.module.css";
import { useState } from "react";

export default function regristrasi() {
  const [name, setName] = useState('');
  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');

  return (

    <div className={styles.font}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh"
      }}
    >
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          color: "black",
          borderRadius: "8px",
          padding: "20px",
          width: "50%"
        }}
      >
        <div>
          <h2>Registrasi</h2>
          <p style={{opacity:"0.4"}}>Enter your email and password to sign in!</p>
          <button className={styles.bodra} style={{ width: "70%", marginTop: "15px", padding:"15px 20px", fontWeight:"600", backgroundColor:"#F4F7FE", color:"#2B3674"}}>Sign in with Google</button>

          <form style={{ display: "flex", flexDirection: "column", marginRight:"20px", marginTop:"20px", gap:"10px" }}>
            <label className={styles.label}>Nama Lengkap <span style={{color:'blue'}}>*</span> </label>
            <input  onChange={(e) => {
              setName(e.target.value)
              }} 
             className={styles.bodra} style={{ width: "70%", marginTop: "4px", padding:"10px 5px", border:"2px solid silver" }} placeholder="Abdullah Ihsan" />

            <label 
            onChange={(e) => {
              setNis(e.target.value)
              console.log(e.target.value)
              }} className={styles.label}>NIS <span style={{color:'blue'}}>*</span> </label>
            <input className={styles.bodra} style={{ width: "70%", marginTop: "4px", padding:"10px 5px", border:"2px solid silver" }} placeholder="Max. 5 characters" />

            <label className={styles.label}>Password <span style={{color:'blue'}}>*</span>  </label>
            <input onChange={(e) => {
              setPassword(e.target.value)
              }} 
            className={styles.bodra} style={{ width: "70%", marginTop: "4px", padding:"10px 5px", border:"2px solid silver"}} placeholder="Min. 8 characters" />
            
            <button 

onClick={async () => {
  const data = { name, nis, password };
  console.log('click daftar by: ', data);

  try {
    const res = await fetch('/api/registration', {
      method: 'POST', // Corrected the typo in 'method'
      body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
      headers: {
        'Content-Type': 'application/json', // Specifying the content type as JSON
      },
    });

    if (res.ok) {
      // Periksa apakah respons memiliki status code 200 (OK)
      const responseData = await res.json(); // Mendapatkan data JSON dari respons
      console.log(responseData);
      alert('Data sudah sukses didaftarkan');
      router.push('/login');
    } else {
      console.error('Gagal melakukan permintaan:', res.status);
      alert('Data gagal didaftarkan');
    }

    console.log('Res: ', res);
  } catch (error) {
    console.log('error: ', error);
    alert('Terjadi Kesalahan, harap hubungi team support');
  }
}}

            className={styles.bodra} style={{ width: "72%", marginTop: "15px", padding:"15px 20px", backgroundColor:"blue", color:"white", fontWeight:"600", border:"2px solid blue" }}>Sign In</button>
          </form>
          
          <p>Not registed yet? <span style={{color:'blue'}}>Create an Account</span> </p>
        </div>
      </div>
    </div>
  );
}
