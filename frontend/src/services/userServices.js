import api from './api';

// Ambil semua alat (bisa difilter status=tersedia di backend nanti)
export const getPublicTools = async () => {
  try {
    const response = await api.get('/tools');
    // Mapping data jika perlu (menyesuaikan format backend ke frontend)
    return response.data.map(tool => ({
      id: tool.id,
      name: tool.name,
      category: tool.category_id, // Backend kamu pakai category_id string
      description: tool.description,
      stock: tool.stock,
      condition: tool.condition,
      // Tambahkan field lain jika ada
    }));
  } catch (error) {
    console.error("Gagal ambil alat:", error);
    return [];
  }
};

// Ambil kategori (jika backend punya endpoint categories)
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