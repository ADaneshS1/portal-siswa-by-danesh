import styles from "@/styles/dashboard.module.css";

export default function dashboard() {
  return (
    <div className={styles.font}>

        <div className={styles.sidebar}>
            <h1 style={{textAlign:"center"}}>ADS</h1>

            <ul>
                <li>Dashboard</li>
                <li>NFT Marketplace</li>
                <li>Tables</li>
                <li>Kanban</li>
                <li>Profile</li>
                <li>Sign In</li>
            </ul>
        </div>

        <div className={styles.navbar}>
         <div>
            <p>Pages/Dashboard</p>
            <p>Main Dashboard</p>
         </div>

         <div>
            <input placeholder="Search"></input>
         </div>
        </div>
      
    </div>
  );
}
