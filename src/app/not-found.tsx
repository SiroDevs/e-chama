import "./globals.css";
import Footer from "@/presentation/components/common/footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>404 - Page Not Found</h2>
          <p>Could not find the requested resource</p>
          <Link href="/">Return Home</Link>
        </div>
        <Footer />
      </body>
    </html>
  );
}
