import styles from "app/app.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/chenycl">
        github ChenYCL @ {new Date().getFullYear()}
      </a>
    </footer>
  )
}
