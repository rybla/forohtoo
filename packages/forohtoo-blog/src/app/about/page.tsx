import Header from "@/component/Header";
import styles from "../page.module.css";

export default function About() {
  return (
    <div className={styles.Page}>
      <Header subtitle="about" />
      <div style={{ padding: "2rem" }}>
        <h1>About Us</h1>
        <p>This is a placeholder for the about page.</p>
        <p>
          You can edit this content in{" "}
          <code>packages/forohtoo-blog/src/app/about/page.tsx</code>.
        </p>
      </div>
    </div>
  );
}
