import styles from "@/styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function login() {
  const router = useRouter();
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
          <h2>Sign In</h2>
          <p style={{opacity:"0.4"}}>Enter your email and password to sign in!</p>
          <button className={styles.bodra} style={{ width: "70%", marginTop: "15px", padding:"15px 20px", fontWeight:"600", backgroundColor:"#F4F7FE", color:"#2B3674"}}>Sign in with Google</button>

          <form style={{ display: "flex", flexDirection: "column", marginRight:"20px", marginTop:"20px", gap:"10px" }}>
            <label className={styles.label}>NIS <span style={{color:'blue'}}>*</span> </label>
            <input className={styles.bodra} style={{ width: "70%", marginTop: "4px", padding:"10px 5px", border:"2px solid silver" }} placeholder="mail@simmmple.com" 
            onChange={(e) => {setNis(e.target.value)}}/>

            <label className={styles.label}>Password <span style={{color:'blue'}}>*</span>  </label>
            <input className={styles.bodra} style={{ width: "70%", marginTop: "4px", padding:"10px 5px", border:"2px solid silver"}} placeholder="Min. 8 characters" 
            onChange={(e) => {setPassword(e.target.value)}}
            />
            
            <button className={styles.bodra} style={{ width: "72%", marginTop: "15px", padding:"15px 20px", backgroundColor:"blue", color:"white", fontWeight:"600", border:"2px solid blue" }}
            onClick={async (e) => {
              const data = { nis, password };
              console.log('click daftar by: ', data);
  
              try {
                const res = await fetch('/api/login', {
                  method: 'POST', // Corrected the typo in 'method'
                  body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
                  headers: {
                    'Content-Type': 'application/json', // Specifying the content type as JSON
                  },
                });
                const responseData = await res.json();
                if (res.ok) {
                  // Periksa apakah respons memiliki status code 200 (OK)
                  // Mendapatkan data JSON dari respons
                  console.log('responseData: ', responseData);
                  alert('sukses login');
                  // router.push('/dashboard');
                } else {
                  console.error('Gagal melakukan permintaan:', res.status);
                  console.log(responseData);
                  alert(responseData.message);
                }
              } catch (error) {
                console.log('error: ', error);
                alert('Terjadi Kesalahan, harap hubungi team support');
              }
            }}
            >Sign In</button>
          </form>
          
          <p>Not registed yet? <a style={{color:'blue'}}>Create an Account</a> </p>
        </div>
      </div>
    </div>
  );
}
