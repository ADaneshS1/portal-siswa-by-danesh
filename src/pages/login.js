import styles from "@/styles/login.module.css";

export default function Login() {
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
            <label className={styles.label}>Email <span style={{color:'blue'}}>*</span> </label>
            <input className={styles.bodra} style={{ width: "70%", marginTop: "4px", padding:"10px 5px", border:"2px solid silver" }} placeholder="mail@simmmple.com" />

            <label className={styles.label}>Password <span style={{color:'blue'}}>*</span>  </label>
            <input className={styles.bodra} style={{ width: "70%", marginTop: "4px", padding:"10px 5px", border:"2px solid silver"}} placeholder="Min. 8 characters" />
            
            <button className={styles.bodra} style={{ width: "72%", marginTop: "15px", padding:"15px 20px", backgroundColor:"blue", color:"white", fontWeight:"600", border:"2px solid blue" }}>Sign In</button>
          </form>
          
          <p>Not registed yet? <span style={{color:'blue'}}>Create an Account</span> </p>
        </div>
      </div>
    </div>
  );
}
