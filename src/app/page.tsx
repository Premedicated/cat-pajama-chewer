import { redirect } from "next/navigation";

export default function Page() {
  // Redirect to the PDF/Excel to CSV page
  redirect("/pdf-excel-to-csv");
}
