import api from './api';
import { jwtDecode } from "jwt-decode";

export const getCurrentUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    const userId = decoded.user_id; 

    if (!userId) return null;

    const response = await api.get(`/users/${userId}`);
    return response.data;

  } catch (error) {
    console.error("Gagal ambil profil user:", error);
    return null;
  }
};

export const getPublicTools = async () => {
  try {
    const response = await api.get('/tools');
    
    return response.data.map(tool => ({
      id: tool.id,
      name: tool.name,
      category: tool.category_id,
      type: tool.type,
      size: tool.size,
      dimensions: tool.dimensions,
      weight_cap: tool.weight_cap,
      description: tool.description,
      stock: tool.stock,
      condition: tool.condition,
      image_url: tool.image_url,
    }));
  } catch (error) {
    console.error("Gagal ambil alat:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data; 
  } catch (error) {
    console.error("Gagal ambil kategori:", error);
    return [
      { id: 'mobilitas', name: 'Mobilitas' },
      { id: 'rehabilitasi', name: 'Rehabilitasi' },
      { id: 'pernapasan', name: 'Pernapasan' },
    ];
  }
};

export const getToolById = async (id) => {
  try {
    const response = await api.get(`/tools/${id}`);
    const tool = response.data;
    
    return {
      id: tool.id,
      name: tool.name,
      category: tool.category_id,
      type: tool.type,
      size: tool.size,
      dimensions: tool.dimensions,
      weight_cap: tool.weight_cap,
      description: tool.description,
      stock: tool.stock,
      condition: tool.condition,
      image_url: tool.image_url,
      reviews: [] 
    };
  } catch (error) {
    console.error("Gagal ambil detail alat:", error);
    return null;
  }
};

export const createLoan = async (loanData) => {
  try {
    const response = await api.post('/loans', loanData);
    return response.data;
  } catch (error) {
    console.error("Gagal mengajukan pinjaman:", error);
    throw error; 
  }
};

export const getMyLoans = async () => {
  try {
    const response = await api.get('/loans/my');
    
    return response.data.map(loan => ({
      id: loan._id,
      
      toolName: loan.tool_detail ? loan.tool_detail.name : "Alat Tidak Dikenal",
      toolImage: loan.tool_detail ? loan.tool_detail.image_url : null,
      
      quantity: loan.quantity,
      loanDate: loan.loan_date,
      returnDue: loan.return_due,
      status: loan.status, 
      
      medicalCondition: loan.medical_condition,
      notes: loan.notes
    }));
  } catch (error) {
    console.error("Gagal ambil riwayat pinjaman:", error);
    return [];
  }
};