import api from "./api";

export const getTools = async () => {
  try {
    const response = await api.get("/tools");
    return response.data.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category_id,
      type: item.type,
      size: item.size,
      dimensions: item.dimensions,
      weight_cap: item.weight_cap,
      image_url: item.image_url,
      description: item.description,
      stock: item.stock, 
      condition: item.condition,
      status: item.status,
      totalQuantity: item.stock, 
      availableQuantity: item.stock, 
    }));
  } catch (error) {
    console.error("Gagal ambil alat:", error);
    return [];
  }
};

export const createTool = async (toolData) => {
  return await api.post("/tools", toolData);
};

export const deleteTool = async (id) => {
  return await api.delete(`/tools/${id}`);
};

export const getPendingLoans = async () => {
  try {
    const response = await api.get("/loans?status=pending");
    return response.data.map(loan => ({
      id: loan.id,
      userId: loan.user_id,
      medicalToolId: loan.tool_id,
      startDate: loan.loan_date,
      endDate: loan.return_due,
      purpose: loan.notes,
      status: loan.status,
      quantity: loan.quantity || 1 
    }));
  } catch (error) {
    console.error("Gagal ambil peminjaman:", error);
    return [];
  }
};

export const updateLoanStatus = async (id, status) => {
  return await api.put(`/loans/${id}`, { status });
};

export const getNews = async () => {
  try {
    const response = await api.get("/news");
    return response.data;
  } catch (error) {
    console.error("Gagal ambil berita:", error);
    return [];
  }
};

export const createNews = async (newsData) => {
  return await api.post("/news", newsData);
};