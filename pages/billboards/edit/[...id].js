import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import BillboardForm from "@/components/BillboardForm";

export default function EditBillboardPage() {
  const [billboardInfo, setBillboardInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/billboards?id=" + id).then((response) => {
      setBillboardInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit Product</h1>
      {billboardInfo && <BillboardForm {...billboardInfo} />}
    </Layout>
  );
}
