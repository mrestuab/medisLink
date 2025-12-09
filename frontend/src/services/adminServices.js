import api from "./api";

export const createTool = async (toolData) => {
  return await api.post("/tools", toolData);
};

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

export const deleteTool = async (id) => {
  return await api.delete(`/tools/${id}`);
};

export const getAllLoans = async () => {
  try {
    const response = await api.get("/loans"); 
  
    return response.data.map(loan => ({
        id: loan.id || loan._id,
        
        borrowerName: loan.user_detail ? loan.user_detail.name : "User Tidak Dikenal",
        borrowerPhone: loan.user_detail ? loan.user_detail.phone : "-",
        
        toolName: loan.tool_detail ? loan.tool_detail.name : "Alat Tidak Dikenal",
        medicalToolId: loan.tool_id, 
        
        startDate: loan.loan_date,
        endDate: loan.return_due,
        purpose: loan.notes,
        medicalCondition: loan.medical_condition,
        status: loan.status, 
        quantity: loan.quantity || 1 
    }));
  } catch (error) {
    console.error("Error fetch loans:", error);
    return [];
  }
};

export const updateLoanStatus = async (id, status) => {
  return await api.put(`/loans/${id}/status`, { status });
};

export const createNews = async (newsData) => {
  return await api.post("/news", newsData);
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
