import { fetchInvoiceById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const invoice = await fetchInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  // Rest of your component logic
  return <EditInvoiceForm invoice={invoice} />;
}
